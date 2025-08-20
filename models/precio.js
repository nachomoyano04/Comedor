import pool from "../config/database.js";

//CREATE
export const insertPrecio = async (ins_id, prov_id, precio_unit, f_desde, f_hasta) => {
    const query = "INSERT INTO precio (insumo_id, proveedor_id, precio_unitario, fecha_desde, fecha_hasta) VALUES (?, ?, ?, ?, ?)";
    try{
        const resultado = await pool.query(query, [ins_id, prov_id, precio_unit, f_desde, f_hasta]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//READ
export const getPrecioByInsumo = async id => {
    const query = "SELECT * FROM precio WHERE insumo_id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//UPDATE
export const updatePrecio = async (ins_id, prov_id, precio_unit, f_desde, f_hasta, id) => {
    const query = "UPDATE precio SET (insumo_id = ?, proveedor_id = ?, precio_unitario = ?, fecha_desde = ?, fecha_hasta = ?) WHERE id = ?";
    try{
        const resultado = await pool.query(query, [ins_id, prov_id, precio_unit, f_desde, f_hasta, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//DELETE