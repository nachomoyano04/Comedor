import pool from "../config/database.js";
import { getInsumo, updateStockInsumo } from "../models/insumos.js";
import { deletePrecio, getPrecioById, getPrecioByInsumo, getPrecios, insertPrecio, makeFechaNull, updateFechaHasta, getAlertasVencimientos, getSugerenciasFIFO } from "../models/precio.js";

export const crearPrecio = async (req, res) => {
    const precio = { ...req.body };
    if (!precio.fecha_vencimiento) {
        delete precio.fecha_vencimiento;
    }
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        const precios = await getPrecioByInsumo(precio.insumo_id, connection);
        if(precios.length > 0){
            await updateFechaHasta(precios[precios.length-1].id, connection);
        }
        const resultadoPrecio = await insertPrecio(precio, connection);
        const insumo = await getInsumo(precio.insumo_id, connection);
        const stockActual = parseFloat(insumo?.stock) || 0;
        const cantidadComprada = parseFloat(precio.cantidad) || 0;
        const stock = stockActual + cantidadComprada;
        const resultadoStock = await updateStockInsumo(precio.insumo_id, stock, connection);
        if(resultadoPrecio.affectedRows == 1 && resultadoStock.affectedRows == 1){
            await connection.commit();
            return res.json("Precio registrado.");
        }
        await connection.rollback();
        return res.status(500).json({error: "No se pudo registrar el precio."});
    }catch(error){
        await connection.rollback();
        console.error("Error al crear precio:", error); 
        return res.status(500).json({ error: "Error al crear precio" });
    }finally{
        connection.release();
    }
}

export const obtenerPrecios = async (req, res) => {
    try {
        const resultado = await getPrecios();
        return res.json(resultado);
    } catch (error) {
        console.error("Error al obtener todos los precios:", error);
        return res.status(500).json({
            error: "Error al obtener todos los precios",
            details: error.sqlMessage || error.message
        });
    }
}

export const obtenerPrecioPorInsumo = async (req, res) => {
    const {insumo_id} = req.params;
    const connection = await pool.getConnection();
    try{
        const resultado = await getPrecioByInsumo(insumo_id, connection);
        return res.json(resultado);
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Error al obtener precio"});
    }finally{
        connection.release();
    }
}  

export const borrarPrecio = async (req, res) => {
    const {id} = req.params;
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        const precio = await getPrecioById(id, connection);
        const {insumo_id} = precio;
        const precios = await getPrecioByInsumo(insumo_id, connection);
        if(precios.length > 1){
            await makeFechaNull(precios[precios.length-2].id, connection);
        }
        const resultado = await deletePrecio(id, connection);
        const insumo = await getInsumo(insumo_id, connection);
        const stockInsumo = parseFloat(insumo?.stock) || 0;
        const cantidadPrecio = parseFloat(precio.cantidad) || 0;
        const stock = stockInsumo >= cantidadPrecio ? stockInsumo - cantidadPrecio : 0;  
        await updateStockInsumo(insumo_id, stock, connection);
        await connection.commit();
        if(resultado.affectedRows == 1){
            return res.json("Precio borrado");
        }
        return res.json("No se pudo borrar el precio");
    }catch(error){
        await connection.rollback();
        return res.status(500).json({error: "Error al borrar el precio"});
    } finally{
        connection.release();
    }
}

export const obtenerAlertasVencimiento = async (req, res) => {
    try {
        const registros = await getAlertasVencimientos();
        
        const vencidos = [];
        const criticos3Dias = [];
        const alerta7Dias = [];
        const proximos15Dias = [];
        const otros = [];

        for (const item of registros) {
            const dias = parseInt(item.dias_para_vencer, 10);
            if (dias < 0) {
                vencidos.push({ ...item, dias_para_vencer: dias, severidad: "vencido" });
            } else if (dias <= 3) {
                criticos3Dias.push({ ...item, dias_para_vencer: dias, severidad: "critico" });
            } else if (dias <= 7) {
                alerta7Dias.push({ ...item, dias_para_vencer: dias, severidad: "alerta" });
            } else if (dias <= 15) {
                proximos15Dias.push({ ...item, dias_para_vencer: dias, severidad: "proximo" });
            } else {
                otros.push({ ...item, dias_para_vencer: dias, severidad: "normal" });
            }
        }

        const sugerenciasFIFO = await getSugerenciasFIFO();

        return res.json({
            resumen: {
                totalVencidos: vencidos.length,
                totalCriticos3Dias: criticos3Dias.length,
                totalAlerta7Dias: alerta7Dias.length,
                totalProximos15Dias: proximos15Dias.length,
                totalAlertas: vencidos.length + criticos3Dias.length + alerta7Dias.length + proximos15Dias.length
            },
            vencidos,
            criticos3Dias,
            alerta7Dias,
            proximos15Dias,
            sugerenciasFIFO: sugerenciasFIFO.slice(0, 15)
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al obtener alertas de vencimiento" });
    }
};