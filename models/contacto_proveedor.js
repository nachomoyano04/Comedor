import pool from "../config/database.js";

//CREATE
export const insertContactoProveedor = async contacto_proveedor => {
    const query = "INSERT INTO contacto_proveedor SET ?";
    try{
        const resultado = await pool.query(query, [contacto_proveedor]);
        return resultado[0].insertId;
    }catch(error){
        throw error;
    }
}
//READ
export const getConProvByIdProveedor = async (proveedor_id) => {
    const query = "SELECT * FROM contacto_proveedor WHERE proveedor_id = ?";
    try{
        const resultado = await pool.query(query, [proveedor_id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//UPDATE
export const updateContactoProveedor = async (proveedor_id, nombre, telefono, email, es_principal, id) => {
    const query = "UPDATE contacto_proveedor SET proveedor_id = ?, nombre = ?, telefono = ?, email = ?, es_principal = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [proveedor_id, nombre, telefono, email, es_principal, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//DELETE
export const deleteContactoProveedor = async id_contacto => {
    const query = "DELETE FROM contacto_proveedor WHERE id_contacto = ?";
    try{
        const resultado = await pool.query(query, [id_contacto]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}