import pool from "../config/database.js";
import dayjs from "dayjs";

//CREATE
export const insertPrecio = async (precio, connection) => {
    const fecha_actual = dayjs().format("YYYY-MM-DD HH:mm:ss");
    precio.fecha_desde = fecha_actual; 
    const query = "INSERT INTO precio SET ?";
    try{
        const resultado = await connection.query(query, precio);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//READ
export const getPrecios = async () => {
    const query = `SELECT pre.id, i.producto, pre.cantidad, p.razon_social, pre.precio_unitario, pre.fecha_desde 
                    FROM precio AS pre 
                    JOIN insumo AS i ON i.id = pre.insumo_id
                    JOIN proveedor AS p ON p.id = pre.proveedor_id`;
    try {
        const resultado = await pool.query(query);
        return resultado[0];
    } catch (error) {
        throw error;
    }
}

export const getPrecioByInsumo = async (id, connection) => {
    const query = `SELECT p.id, p.insumo_id, p.proveedor_id, p.precio_unitario, p.fecha_desde, p.fecha_hasta, p.cantidad, i.producto, prov.razon_social
                    FROM precio AS p
                    JOIN insumo AS i ON p.insumo_id = i.id
                    JOIN proveedor AS prov ON p.proveedor_id = prov.id
                    WHERE p.insumo_id = ?
                    ORDER BY fecha_desde ASC`;
    try{
        const resultado = await connection.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

export const getPrecioById = async (id, connection) => {
    const query = "SELECT * FROM precio WHERE id = ?";
    try{
        const resultado = await connection.query(query, [id]);
        return resultado[0][0];
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

export const updateFechaHasta = async (id, connection) => {
    const fecha_actual = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const query = "UPDATE precio SET fecha_hasta = ? WHERE id = ?";
    try{
        const resultado = await connection.query(query, [fecha_actual, id]);
        return resultado[0];
    }catch(error){
        throw error;
    } 
}

export const makeFechaNull = async (id, connection) => {
    const query = "UPDATE precio SET fecha_hasta = NULL WHERE id = ?";
    try{
        const resultado = await connection.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    } 
}

//DELETE
export const deletePrecio = async (id, connection) => {
    const query = "DELETE FROM precio WHERE id = ?";
    try{
        const resultado = await connection.query(query, [id]);
        return resultado[0];       
    }catch(error){
        throw error;
    }
}