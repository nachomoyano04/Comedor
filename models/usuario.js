import pool from "../config/database.js";

//CREATE
export const insertUsuario = async (usuario, connection) => {
    const query = "INSERT INTO usuario SET ?";
    try{
        const resultado = await connection.query(query, usuario);
        return resultado[0];
    }catch(error){
        throw(error);
    }
}

//READ
export const getUsuarios = async () => {
    const query = "SELECT * FROM usuario WHERE estado = 1";
    try{
        const resultado = await pool.query(query);
        return resultado[0];
    }catch(error){
        throw(error);
    }
}
export const getUsuariosByRol = async (rol_id) => {
    const query = "SELECT * FROM usuario_rol JOIN usuario WHERE rol_id = ?";
    try{
        const resultado = await pool.query(query, [rol_id]);
        return resultado[0];
    }catch(error){
        throw(error);
    }
}

export const findUsuarioByDNI = async (dni) => {
    const query = "SELECT * FROM usuario WHERE dni = ?";
    try{
        const resultado = await pool.query(query, [dni]);
        return resultado[0];
    }catch(error){
        throw(error);
    }
}

//UPDATE
export const updateUsuario = async (nombre, apellido, dni, cuil, telefono, id) => {
    const query = "UPDATE usuario SET nombre = ?, apellido = ?, dni = ?, cuil = ?, telefono = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [nombre, apellido, dni, cuil, telefono, id]);
        return resultado[0];
    }catch(error){
        throw(error);
    }
}

export const updateRol = async (rol_id, id) => {
    const query = "UPDATE usuario_rol SET rol_id = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [rol_id, id]);
        return resultado[0];
    }catch(error){
        throw(error);
    }
} 

export const updatePassword = async (password, id) => {
    const query = "UPDATE usuario SET password = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [password, id]);
        return resultado[0];
    }catch(error){
        throw(error);
    }
}
//DELETE
export const changeStateUser = async (state, id) => {
    const query = "UPDATE usuario SET estado = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [state, id]);
        return resultado[0];
    }catch(error){
        throw(error);       
    }
}