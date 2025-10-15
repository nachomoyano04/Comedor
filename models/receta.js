import pool from "../config/database.js";
import dayjs from "dayjs";

//CREATE
export const insertReceta = async receta => {
    receta.fecha = dayjs().format("YYYY-MM-DD HH:mm:ss");
    receta.estado = 1;
    const query = "INSERT INTO receta SET ?";
    try{
        const resultado = await pool.query(query, receta);
        return resultado[0].insertId; // devolvemos el id creado
    }catch(error){
        throw error;
    }
}

//READ
export const getRecetas = async id => {
    const query = "SELECT r.id, r.estado, r.nombre, r.descripcion, ri.cantidad, ri.insumo_id, i.producto, udm.simbolo FROM receta AS r JOIN receta_insumo AS ri ON r.id = ri.receta_id JOIN insumo AS i ON i.id = ri.insumo_id JOIN unidad_de_medida AS udm ON udm.id = i.id_unidad_de_medida";
    try{
        const resultado = await pool.query(query);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

export const getRecetaById = async id => {
    const query = "SELECT r.id, r.estado, r.nombre, r.descripcion, ri.cantidad, ri.insumo_id, i.producto, udm.simbolo FROM receta AS r JOIN receta_insumo AS ri ON r.id = ri.receta_id JOIN insumo AS i ON i.id = ri.insumo_id JOIN unidad_de_medida AS udm ON udm.id = i.id_unidad_de_medida WHERE r.id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//UPDATE
export const updateReceta = async (nombre, descripcion, precio_unitario, importe, id) => {
    const query = "UPDATE receta SET nombre = ?, descripcion = ?, precio_unitario = ?, importe = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [nombre, descripcion, precio_unitario, importe, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//DELETE
export const deleteReceta = async id => {
    const query = "UPDATE receta SET estado = 0 WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

export const activateReceta = async id => {
    const query = "UPDATE receta SET estado = 1 WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}