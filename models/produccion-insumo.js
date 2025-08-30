import pool from "../config/database.js";

//CREATE
export const insertProduccion_Insumo = async produccion_insumo => {
    const query = "INSERT INTO produccion_insumo SET ?";
    try{
        const resultado = await pool.query(query, produccion_insumo);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//READ
export const getProduccion_Insumo = async() => {
    const query = "SELECT * FROM produccion_insumo";
    try{
        const resultado = await pool.query(query);
    }catch(error){
        throw error;
    }
}
export const getInsumosByProduccion = async id => {
    const query = "SELECT * FROM produccion_insumo JOIN insumo ON insumo_id = insumo.id WHERE produccion_id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//UPDATE
export const updateProduccion_Insumo = async(produccion_id, insumo_id, cantidad_usada, id) => {
    const query = "UPDATE produccion_insumo SET produccion_id = ?, insumo_id = ?, cantidad_usada = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [produccion_id, insumo_id, cantidad_usada, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//DELETE
export const deleteProduccion_Insumo = async id => {
    const query = "DELETE FROM produccion_insumo WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}