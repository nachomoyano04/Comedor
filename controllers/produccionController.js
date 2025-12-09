import { getCostosPrimosUnitarios, changeStateOfProduccion, getProducciones, insertProduccion, updateProduccion, updateCostoPrimoTotalProduccion, getProduccionById } from "../models/produccion.js";
import { deleteInsumosDeProduccion, getInsumosByProduccion, insertProduccion_Insumo, updateProduccion_Insumo } from "../models/produccion-insumo.js";
import pool from "../config/database.js";
import { getPrecioActualInsumo } from "../models/precio.js";

export const nuevaProduccion = async (req, res) => {
    const {insumos, ...produccion} = req.body;
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        const result = await insertProduccion(produccion, connection);
        const produccion_id = result.insertId;
        let costo_primo_total = 0;
        for(const i of insumos){
            const resPrecio = await getPrecioActualInsumo(i.value, connection);
            if(resPrecio){
                const {precio_unitario} = resPrecio;
                costo_primo_total += parseFloat(precio_unitario) * parseFloat(i.cantidad);
                await insertProduccion_Insumo({produccion_id, insumo_id: i.value, cantidad_usada: i.cantidad}, connection);
            }else{
                await connection.rollback();
                return res.status(500).json({error: `El insumo "${i.label}" no tiene un precio asignado...`});
            }
        }
        await updateCostoPrimoTotalProduccion(costo_primo_total, produccion_id, connection);
        await connection.commit();
        return res.json("Produccion registrada.");
    }catch(error){
        await connection.rollback();
        console.log(error);
        return res.status(500).json({error: "Error al registrar nueva producción."});
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
        await updateProduccion(receta_id, fecha, cantidad_producida, turno, cantidad_comensales, id, connection);
        let costo_primo_total = 0;
        await deleteInsumosDeProduccion(id, connection);
        for(const i of insumos){
            const resPrecio = await getPrecioActualInsumo(i.value, connection);
            if(resPrecio){
                const {precio_unitario} = resPrecio;
                costo_primo_total += parseFloat(precio_unitario) * parseFloat(i.cantidad);
            }
            await insertProduccion_Insumo({insumo_id: i.value, produccion_id: id, cantidad_usada: i.cantidad}, connection);
        }
        await updateCostoPrimoTotalProduccion(costo_primo_total, id, connection)//actualizar costo_primo_total
        await connection.commit();
        return res.json("Producción editada.");
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
    try {
        const resultado = await changeStateOfProduccion(num, id);
        if(resultado.affectedRows == 1){
            if(num == 1){
                return res.json("Producción dada de baja.");
            }
            return res.json("Producción dada de alta.");
        }
        return res.json("No se pudo cambiar el estado de la producción.");
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error al cambiar de estado la produccion"});
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