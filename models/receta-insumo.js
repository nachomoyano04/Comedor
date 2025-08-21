import pool from "../config/database.js";

//CREATE
export const insertReceta_Insumo = async(receta_id, insumo_id, cantidad) => {
    const query = "INSERT INTO receta-insumo (receta_id, insumo_id, cantidad) VALUES (?, ?, ?)";
    try{
        const resultado = await pool.query(query, [receta_id, insumo_id, cantidad]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//READ
export const getReceta_Insumo = async() => {
    const query = "SELECT * FROM receta-insumo";
    try{
        const resultado = await pool.query(query);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//UPDATE
export const updateReceta_Insumo = async(receta_id, insumo_id, cantidad, id) => {
    const query = "UPDATE receta-insumo SET receta_id = ?, insumo_id = ?, cantidad = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [receta_id, insumo_id, cantidad, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//DELETE