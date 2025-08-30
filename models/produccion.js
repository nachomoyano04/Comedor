import dayjs from "dayjs";
import pool from "../config/database.js";

//CREATE
export const insertProduccion = async produccion => {
    produccion.fecha = dayjs().format("YYYY-MM-DD HH:mm:ss");
    produccion.estado = 1;
    const query = "INSERT INTO produccion SET ?";
    try{
        const resultado = await pool.query(query, produccion);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//READ
export const getProducciones = async () => {
    const query = "SELECT * FROM produccion";
    try{
        const resultado = await pool.query(query);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//UPDATE
export const updateProduccion = async (receta_id, fecha, cantidad_producida, turno, id) => {
    const query = "UPDATE produccion SET receta_id = ?, fecha = ?, cantidad_producida = ?, turno = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [receta_id, fecha, cantidad_producida, turno, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//DELETE
export const changeStateOfProduccion = async (estado, id) => {
    const query = "UPDATE produccion set estado = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [estado, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}