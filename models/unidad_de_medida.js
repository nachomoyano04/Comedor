import pool from "../config/database.js";

//READ
export const getUnidadDeMedida = async () => {
    try{
        const resultado = await pool.query("SELECT * FROM unidad_de_medida");
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//CREATE
export const insertUnidadDeMedida = async (unidad_de_medida) => {
    const query = "INSERT INTO unidad_de_medida SET ?";
    try{
        const resultado = await pool.query(query, unidad_de_medida);
        return resultado[0];
    }catch(error){
        throw error; 
    }
}

//DELETE
export const deleteUnidadDeMedida = async id => {
    const query = "DELETE FROM unidad_de_medida WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//UPDATE
export const updateUnidadDeMedida = async (nombre, simbolo, id) => {
const query = "UPDATE unidad_de_medida SET nombre = ?, simbolo = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [nombre, simbolo, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}