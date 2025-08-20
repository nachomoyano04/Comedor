import pool from "../config/database.js";

//CREATE
export const insertRol = async (numero_rol, nombre_rol) => {
    const query = "INSERT INTO rol (numero_rol, nombre_rol) VALUES (?,?)";
    try{
        const resultado = await pool.query(query, [numero_rol, nombre_rol]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//READ
export const getRoles = async () => {
    const query = "SELECT * FROM rol";
    try{
        const resultado = await pool.query(query);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

export const getUserByRolId = async rol_id => {
    const query = "SELECT * usuario WHERE rol_id = ?";
    try{
        const resultado = await pool.query(query, [rol_id]);
        return resultado[0]; 
    }catch(error){
        throw error;
    }
}

//UPDATE
export const updateRol = async (numero_rol, nombre_rol, id) => {
    const query = "UPDATE rol SET nombre_rol = ?, numero_rol = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [numero_rol, nombre_rol, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//DELETE
export const deleteRol = async id => {
    const query = "DELETE FROM rol WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}