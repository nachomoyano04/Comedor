import { getCostosPrimosUnitarios, changeStateOfProduccion, getProducciones, insertProduccion, updateProduccion, updateCostoPrimoTotalProduccion, getProduccionById } from "../models/produccion.js";
import { deleteInsumosDeProduccion, getInsumosByProduccion, insertProduccion_Insumo, updateProduccion_Insumo } from "../models/produccion-insumo.js";
import pool from "../config/database.js";
import { getPrecioActualInsumo } from "../models/precio.js";
import { getInsumo, updateStockInsumo } from "../models/insumos.js";

export const nuevaProduccion = async (req, res) => {
    const {insumos, ...produccion} = req.body;
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        produccion.costo_primo_total = 0;
        const result = await insertProduccion(produccion, connection);
        const produccion_id = result.insertId;
        let costo_primo_total = 0;
        const alertasStock = [];

        for(const i of (insumos || [])){
            const resPrecio = await getPrecioActualInsumo(i.value, connection);
            if(resPrecio && resPrecio.precio_unitario != null){
                const {precio_unitario} = resPrecio;
                const cantidadUsada = parseFloat(i.cantidad) || 0;
                costo_primo_total += parseFloat(precio_unitario) * cantidadUsada;
                await insertProduccion_Insumo({produccion_id, insumo_id: i.value, cantidad_usada: cantidadUsada}, connection);

                // Descuento automático de stock de despensa
                const insumoInfo = await getInsumo(i.value, connection);
                const stockActual = parseFloat(insumoInfo?.stock) || 0;
                const nuevoStock = Number((stockActual - cantidadUsada).toFixed(2));
                await updateStockInsumo(i.value, nuevoStock, connection);

                const nombreInsumo = insumoInfo?.producto || i.label || `Insumo #${i.value}`;
                if (nuevoStock < 0) {
                    alertasStock.push(`"${nombreInsumo}": stock negativo (${nuevoStock} ${insumoInfo?.simbolo || ''}).`);
                } else if (nuevoStock === 0) {
                    alertasStock.push(`"${nombreInsumo}": stock agotado (0 ${insumoInfo?.simbolo || ''}).`);
                } else if (nuevoStock <= 5) {
                    alertasStock.push(`"${nombreInsumo}": stock bajo/crítico (${nuevoStock} ${insumoInfo?.simbolo || ''}).`);
                }
            }else{
                await connection.rollback();
                return res.status(400).json({error: `El insumo "${i.label || 'seleccionado'}" no tiene un precio registrado en el sistema. Debe registrar el precio antes de producir con él.`});
            }
        }
        await updateCostoPrimoTotalProduccion(costo_primo_total, produccion_id, connection);
        await connection.commit();
        return res.json({
            mensaje: "Producción registrada correctamente.",
            alertas: alertasStock
        });
    }catch(error){
        await connection.rollback();
        console.log(error);
        return res.status(500).json({error: "Error al registrar nueva producción: " + (error.sqlMessage || error.message)});
    }finally{
        connection.release();
    }
}

export const editarProduccion = async (req, res) => {
    const {id} = req.params;
    const {receta_id, fecha, cantidad_producida, turno, cantidad_comensales, insumos} = req.body;
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();

        // 1. Revertir el stock consumido por la producción original
        const insumosViejos = await getInsumosByProduccion(id, connection);
        for(const iv of (insumosViejos || [])){
            const insumoInfo = await getInsumo(iv.insumo_id, connection);
            const stockActual = parseFloat(insumoInfo?.stock) || 0;
            const stockRestituido = Number((stockActual + parseFloat(iv.cantidad_usada || 0)).toFixed(2));
            await updateStockInsumo(iv.insumo_id, stockRestituido, connection);
        }

        // 2. Actualizar cabecera de la producción
        await updateProduccion(receta_id, fecha, cantidad_producida, turno, cantidad_comensales, id, connection);
        let costo_primo_total = 0;
        await deleteInsumosDeProduccion(id, connection);

        const alertasStock = [];
        // 3. Aplicar nuevo descuento de stock y registrar nuevos insumos
        for(const i of (insumos || [])){
            const resPrecio = await getPrecioActualInsumo(i.value, connection);
            if(resPrecio && resPrecio.precio_unitario != null){
                const {precio_unitario} = resPrecio;
                const cantidadUsada = parseFloat(i.cantidad) || 0;
                costo_primo_total += parseFloat(precio_unitario) * cantidadUsada;
                await insertProduccion_Insumo({insumo_id: i.value, produccion_id: id, cantidad_usada: cantidadUsada}, connection);

                const insumoInfo = await getInsumo(i.value, connection);
                const stockActual = parseFloat(insumoInfo?.stock) || 0;
                const nuevoStock = Number((stockActual - cantidadUsada).toFixed(2));
                await updateStockInsumo(i.value, nuevoStock, connection);

                const nombreInsumo = insumoInfo?.producto || i.label || `Insumo #${i.value}`;
                if (nuevoStock < 0) {
                    alertasStock.push(`"${nombreInsumo}": stock negativo (${nuevoStock}).`);
                } else if (nuevoStock === 0) {
                    alertasStock.push(`"${nombreInsumo}": stock agotado.`);
                }
            } else {
                await connection.rollback();
                return res.status(400).json({error: `El insumo "${i.label || 'seleccionado'}" no tiene un precio registrado.`});
            }
        }
        await updateCostoPrimoTotalProduccion(costo_primo_total, id, connection);
        await connection.commit();
        return res.json({
            mensaje: "Producción editada correctamente.",
            alertas: alertasStock
        });
    }catch(error){
        await connection.rollback();
        console.log(error);
        return res.status(500).json({error: "Error al editar produccion"});
    }finally{
        connection.release();
    }
}

export const obtenerProducciones = async (req, res) => {
    try{
        const resultado = await getProducciones();
        return res.json(resultado);
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Error al obtener producciones"});
    }
}

export const obtenerProduccionPorId = async (req, res) => {
    const {id} = req.params;
    const connection = await pool.getConnection();
    try {
        const resultado = await getProduccionById(id, connection);
        return res.json(resultado);        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error al obtener la produccion"});
    } finally {
        connection.release();
    }
}

export const altaBajaProduccion = async (req, res) => {
    const {id, num} = req.params;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const resultado = await changeStateOfProduccion(num, id, connection);
        if(resultado.affectedRows == 1){
            const insumosProduccion = await getInsumosByProduccion(id, connection);
            for(const item of (insumosProduccion || [])){
                const insumoInfo = await getInsumo(item.insumo_id, connection);
                const stockActual = parseFloat(insumoInfo?.stock) || 0;
                const cant = parseFloat(item.cantidad_usada) || 0;
                // Si num == 1 (baja), devolvemos el stock; si num == 0 (alta), volvemos a descontarlo
                const nuevoStock = num == 1 
                    ? Number((stockActual + cant).toFixed(2)) 
                    : Number((stockActual - cant).toFixed(2));
                await updateStockInsumo(item.insumo_id, nuevoStock, connection);
            }

            await connection.commit();
            if(num == 1){
                return res.json("Producción dada de baja y stock reincorporado.");
            }
            return res.json("Producción dada de alta y stock descontado.");
        }
        await connection.rollback();
        return res.json("No se pudo cambiar el estado de la producción.");
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(500).json({error: "Error al cambiar de estado la produccion"});
    } finally {
        connection.release();
    }
}

export const agregarInsumoALaProduccion = async (req, res) => {
    const produccion_insumo = req.body;
    const connection = await pool.getConnection();
    try{
        const resultado = await insertProduccion_Insumo(produccion_insumo, connection);
        if(resultado.affectedRows == 1){
            return res.json("Insumo agregado a la producción.")
        }
        return res.json("No se pudo agregar el insumo a la producción.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al agregar insumo a la produccion"});
    } finally {
        connection.release();
    }
}

export const insumosPorProduccion = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await getInsumosByProduccion(id);
        return res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener insumos por produccion"});
    }
}

export const modificarInsumoDeProduccion = async (req, res) => {
    const {id} = req.params;
    const {produccion_id, insumo_id, cantidad_usada} = req.body;
    try{
        const resultado = await updateProduccion_Insumo(produccion_id, insumo_id, cantidad_usada, id);
        if(resultado.affectedRows == 1){
            return res.json("Insumo en la producción modificado.")
        }
        return res.json("No se pudo modificar el insumo en la producción.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al modificar insumo de la produccion"});
    }
}

export const calcularCostoPrimoTotal = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await getCostosPrimosUnitarios(id);
        let costo_primo_total = 0;
        for(const r in resultado) {
            if(resultado[r].hasOwnProperty("costo_primo_unitario")) {
                let costo_primo_unitario = parseFloat(resultado[r]["costo_primo_unitario"]).toFixed(2);
                costo_primo_unitario = parseFloat(costo_primo_unitario);
                costo_primo_total += costo_primo_unitario;
            }
        }
        return res.json(costo_primo_total);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al calcular costo primo total"});
    }
}