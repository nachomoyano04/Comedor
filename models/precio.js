import pool from "../config/database.js";
import dayjs from "dayjs";

//CREATE
export const insertPrecio = async precio => {
    const fecha_actual = dayjs().format("YYYY-MM-DD HH:mm:ss");
    precio.fecha_desde = fecha_actual; 
    const query = "INSERT INTO precio SET ?";
    try{
        const resultado = await pool.query(query, precio);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//READ
export const getPrecioByInsumo = async id => {
    const query = "SELECT * FROM precio WHERE insumo_id = ? ORDER BY fecha_desde ASC";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

export const getPrecioById = async id => {
    const query = "SELECT * FROM precio WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch (error){
        throw error;
    }
}

//UPDATE
export const updatePrecio = async (ins_id, prov_id, precio_unit, f_desde, f_hasta, id) => {
    const query = "UPDATE precio SET insumo_id = ?, proveedor_id = ?, precio_unitario = ?, fecha_desde = ?, fecha_hasta = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [ins_id, prov_id, precio_unit, f_desde, f_hasta, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

export const updateFechaHasta = async id => {
    const fecha_actual = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const query = "UPDATE precio SET fecha_hasta = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [fecha_actual, id]);
        return resultado[0];
    }catch(error){
        throw error;
    } 
}

export const makeFechaNull = async id => {
    const query = "UPDATE precio SET fecha_hasta = NULL WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    } 
}

//DELETE
export const deletePrecio = async id => {
    const query = "DELETE FROM precio WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];       
    }catch(error){
        throw error;
    }
}