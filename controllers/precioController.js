import pool from "../config/database.js";
import { getInsumo, updateStockInsumo } from "../models/insumos.js";
import { deletePrecio, getPrecioById, getPrecioByInsumo, getPrecios, insertPrecio, makeFechaNull, updateFechaHasta, updatePrecio } from "../models/precio.js";

export const crearPrecio = async (req, res) => {
    const precio = req.body;
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        const precios = await getPrecioByInsumo(precio.insumo_id, connection);
        if(precios.length > 0){
            await updateFechaHasta(precios[precios.length-1].id, connection);
        }
        const resultadoPrecio = await insertPrecio(precio, connection);
        const insumo = await getInsumo(precio.insumo_id, connection);
        const stock = parseInt(insumo.stock) + parseInt(precio.cantidad);
        const resultadoStock = await updateStockInsumo(precio.insumo_id, stock, connection);
        if(resultadoPrecio.affectedRows == 1 && resultadoStock.affectedRows == 1){
            await connection.commit();
            return res.json("Precio registrado.");
        }
        await connection.rollback()
        return res.status(500).json({error: "No se pudo registrar el precio."});
    }catch(error){
        await connection.rollback()
        console.log(error); 
        return res.status(500).json({error: "Error al crear precio"});
    }finally{
        connection.release();
    }
}

export const editarPrecio = async (req, res) => {
    const {id} = req.params;
    const {insumo_id, proveedor_id, precio_unitario, fecha_desde, fecha_hasta} = req.body;
    try{
        const resultado = await updatePrecio(insumo_id, proveedor_id, precio_unitario, fecha_desde, fecha_hasta, id);
        if(resultado.affectedRows == 1){
            return res.json("Precio editado.")
        }
        return res.json("No se pudo editar el precio");
    }catch(error){
        console.log(error); 
        return res.status(500).json({error: "Error al editar precio"});
    }
}

export const obtenerPrecios = async (req, res) => {
    try {
        const resultado = await getPrecios();
        return res.json(resultado);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error al obtener todos los precios"});
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
        const stockInsumo = parseInt(insumo.stock);
        const cantidadPrecio = parseInt(precio.cantidad);
        const stock = stockInsumo >= cantidadPrecio? stockInsumo - cantidadPrecio : 0;  
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