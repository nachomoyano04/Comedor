import pool from "../config/database.js";

//CREATE
export const insertProduccion_Insumo = async(prod_id, ins_id, cant_usada, precio_unitario) => {
    const query = "INSERT INTO produccion-insumo (produccion_id, insumo_id, cantidad_usada, precio_unitario) VALUES (?, ?, ?, ?)";
    try{
        const resultado = await pool.query(query, [prod_id, ins_id, cant_usada, precio_unitario]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//READ
export const getProduccion_Insumo = async() => {
    const query = "SELECT * FROM produccion-insumo";
    try{
        const resultado = await pool.query(query, []);
    }catch(error){
        throw error;
    }
}
//UPDATE
export const updateProduccion_Insumo = async(prod_id, ins_id, cant_usada, precio_unitario, id) => {
    const query = "UPDATE produccion-insumo SET produccion_id = ?, insumo_id = ?, cantidad_usada = ?, precio_unitario = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [prod_id, ins_id, cant_usada, precio_unitario, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//DELETE
export const deleteProduccion_Insumo = async(id) => {
    const query = "DELETE FROM produccion-insumo WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}