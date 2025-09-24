import pool from "../config/database.js";

//CREATE
export const insertRol = async rol => {
    const query = "INSERT INTO rol SET ?";
    try{
        const resultado = await pool.query(query, rol);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

export const insertUsuario_Rol = async (usuario_rol, connection) => {
    const query = "INSERT INTO usuario_rol SET ?";
    try{
        const resultado = await connection.query(query, usuario_rol);
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

export const getRolesByUser = async usuario_id => {
    const query = "SELECT * FROM usuario_rol AS ur JOIN rol AS r ON ur.rol_id = r.id WHERE usuario_id = ?";
    try{
        const resultado = await pool.query(query, [usuario_id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//UPDATE
export const updateRol = async (numero_rol, nombre_rol, id) => {
    const query = "UPDATE rol SET numero_rol = ?, nombre_rol = ? WHERE id = ?";
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