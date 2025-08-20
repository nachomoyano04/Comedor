import pool from "../config/database.js";

//CREATE
export const insertReceta = async (fecha, precio_unitario, importe, estado) => {
    const query = "INSERT INTO receta (fecha, precio_unitario, importe, estado) VALUES (?, ?, ?, ?)";
    try{
        const resultado = await pool.query(query, [fecha, precio_unitario, importe, 1]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//READ
export const getRecetasActivas = async id => {
    const query = "SELECT * FROM receta WHERE estado = 1";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//UPDATE
export const updateReceta = async (fecha, precio_unitario, importe, estado, id) => {
    const query = "UPDATE receta SET (fecha = ?, precio_unitario = ?, importe = ?, estado = ?) WHERE id = ?";
    try{
        const resultado = await pool.query(query, [fecha, precio_unitario, importe, estado, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//DELETE
export const deleteReceta = async (id) => {
    const query = "UPDATE receta SET (estado = 0) WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}