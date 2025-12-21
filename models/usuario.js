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
    const query = "SELECT * FROM usuario";
    try{
        const resultado = await pool.query(query);
        return resultado[0];
    }catch(error){
        throw(error);
    }
}

export const getUserById = async id => {
    const query = "SELECT nombre, apellido, dni, cuil, telefono, correo, estado FROM usuario WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0][0];
    }catch(error){
        throw(error);
    }
}

export const getPassUserById = async id => {
    const query = "SELECT password FROM usuario WHERE id = ?";
    try {
        const resultado = await pool.query(query, [id]);
        return resultado[0][0];
    } catch (error) {
        throw error;
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

export const getPasswordByDNI = async dni => {
    const query= "SELECT password FROM usuario WHERE dni = ?";
    try {
        const resultado = await pool.query(query, [dni]);
        return resultado[0][0];
    } catch (error) {
        throw error;
    }
}

export const findUsuarioByDNI = async (dni) => {
    const query = `SELECT u.id, u.nombre, u.apellido, u.dni, u.cuil, u.correo, u.telefono, u.estado, ur.rol_id, r.nombre_rol, r.numero_rol 
                    FROM usuario AS u 
                    LEFT JOIN usuario_rol AS ur ON u.id = ur.usuario_id 
                    LEFT JOIN rol AS r ON ur.rol_id = r.id
                    WHERE u.dni = ?`;
    try{
        const resultado = await pool.query(query, [dni]);
        return resultado[0];
    }catch(error){
        throw(error);
    }
}

export const findByDniOrCuil = async (dni, cuil, id) => {
    try {
        if(id == null){ // para registrar
            const query = "SELECT * FROM usuario WHERE dni = ? or cuil = ?";
            const resultado = await pool.query(query, [dni, cuil]);
            return resultado[0];
        } 
        // para editar
        const query = "SELECT * FROM usuario WHERE (dni = ? or cuil = ?) AND id != ?";
        const resultado = await pool.query(query, [dni, cuil, id]);
        return resultado[0];
    } catch (error) {
        throw error;
    }
}

//UPDATE
export const updateUsuario = async (nombre, apellido, dni, cuil, correo, telefono, id, connection) => {
    const query = "UPDATE usuario SET nombre = ?, apellido = ?, dni = ?, cuil = ?, correo = ?, telefono = ? WHERE id = ?";
    try{
        const resultado = await connection.query(query, [nombre, apellido, dni, cuil, correo, telefono, id]);
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