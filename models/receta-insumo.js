import pool from "../config/database.js";

//CREATE
export const insertReceta_Insumo = async receta_insumo => {
    const query = "INSERT INTO receta_insumo SET ?";
    try{
        const resultado = await pool.query(query, receta_insumo);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//READ
export const getReceta_Insumo = async() => {
    const query = "SELECT * FROM receta_insumo";
    try{
        const resultado = await pool.query(query);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//UPDATE
export const updateReceta_Insumo = async(receta_id, insumo_id, cantidad, id) => {
    const query = "UPDATE receta_insumo SET receta_id = ?, insumo_id = ?, cantidad = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [receta_id, insumo_id, cantidad, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//DELETE
export const deleteReceta_Insumo = async (id) => {
    const query = "DELETE FROM receta_insumo WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}