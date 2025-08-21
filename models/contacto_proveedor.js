import pool from "../config/database.js";

//CREATE
export const insertContactoProveedor = async (proveedor_id, nombre, telefono, email, es_principal) => {
    const query = "INSERT INTO contacto_proveedor (proveedor_id, nombre, telefono, email, es_principal) VALUES (?, ?, ?, ?, ?)";
    try{
        const resultado = await pool.query(query, [proveedor_id, nombre, telefono, email, es_principal]);
        return resultado[0];
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
export const deleteContactoProveedor = async (id) => {
    const query = "DELETE FROM contacto_proveedor WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}