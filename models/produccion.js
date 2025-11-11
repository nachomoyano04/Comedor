import dayjs from "dayjs";
import pool from "../config/database.js";

//CREATE
export const insertProduccion = async (produccion, connection) => {
    produccion.fecha = dayjs().format("YYYY-MM-DD HH:mm:ss");
    produccion.estado = 1;
    const query = "INSERT INTO produccion SET ?";
    try{
        const resultado = await connection.query(query, produccion);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//READ
export const getProducciones = async () => {
    const query = `SELECT p.id, p.fecha, p.cantidad_producida, p.costo_primo_total, 
                    p.cantidad_comensales, p.turno, p.estado, r.nombre, r.descripcion, 
                    i.producto, pi.cantidad_usada, udm.simbolo, pi.insumo_id 
                    FROM produccion AS p 
                    JOIN receta AS r ON p.receta_id = r.id 
                    JOIN produccion_insumo AS pi ON pi.produccion_id = p.id 
                    JOIN insumo AS i ON pi.insumo_id = i.id 
                    JOIN unidad_de_medida AS udm ON i.id_unidad_de_medida = udm.id
                    ORDER BY p.fecha DESC`;
    try{
        const resultado = await pool.query(query);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

export const getProduccionById = async (id, connection) => {
    const query = `SELECT p.id, p.fecha, p.cantidad_producida, p.costo_primo_total, 
                    p.cantidad_comensales, p.turno, p.estado, r.nombre, r.descripcion, 
                    i.producto, pi.cantidad_usada, udm.simbolo, pi.insumo_id, p.receta_id 
                    FROM produccion AS p 
                    JOIN receta AS r ON p.receta_id = r.id 
                    JOIN produccion_insumo AS pi ON pi.produccion_id = p.id 
                    JOIN insumo AS i ON pi.insumo_id = i.id 
                    JOIN unidad_de_medida AS udm ON i.id_unidad_de_medida = udm.id
                    WHERE p.id = ?
                    ORDER BY pi.insumo_id ASC;`
    try {
        const resultado = await connection.query(query, [id]);
        return resultado[0];
    } catch (error) {
        throw error;
    }
}

export const getCostosPrimosUnitarios = async id => {
    const query = `SELECT ins.producto, (pi.cantidad_usada * pre.precio_unitario) AS "costo_primo_unitario", pi.cantidad_usada
                    FROM produccion_insumo AS pi
                    JOIN produccion AS prod ON pi.produccion_id = prod.id
                    JOIN insumo AS ins ON pi.insumo_id = ins.id
                    JOIN precio AS pre ON pre.insumo_id = ins.id
                    WHERE prod.fecha > pre.fecha_desde AND (pre.fecha_hasta IS NULL OR pre.fecha_hasta > prod.fecha) AND pi.produccion_id = ?`;
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//UPDATE
export const updateProduccion = async (receta_id, fecha, cantidad_producida, turno, cantidad_comensales, id, connection) => {
    const query = "UPDATE produccion SET receta_id = ?, fecha = ?, cantidad_producida = ?, turno = ?, cantidad_comensales = ? WHERE id = ?";
    try{
        const resultado = await connection.query(query, [receta_id, fecha, cantidad_producida, turno, cantidad_comensales, id]);
        return resultado[0];    
    }catch(error){
        throw error;
    }
}

export const updateCostoPrimoTotalProduccion = async (cpt, id, connection) => {
    const query = "UPDATE produccion SET costo_primo_total = ? WHERE id = ?";
    try {
        const resultado = await connection.query(query, [cpt, id]);
        return resultado[0];
    } catch (error) {
        throw error;
    }
}

//DELETE
export const changeStateOfProduccion = async (estado, id) => {
    const query = "UPDATE produccion set estado = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [estado == 1? 0 : 1, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}