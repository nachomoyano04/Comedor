import pool from "../config/database.js";

//CREATE
export const insertProduccion = async (r_id, fecha, cant_prod, cpt, cpu, cpum, turno) => {
    const query = "INSERT INTO produccion (receta_id, fecha, cantidad_producida, costo_primo_total, costo_primo_unitario, cantidad_por_unidad_medida, turno) VALUES (?, ?, ?, ?, ?, ?, ?)";
    try{
        const resultado = await pool.query(query, [r_id, fecha, cant_prod, cpt, cpu, cpum, turno]);
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
export const updateProduccion = async (r_id, fecha, cant_prod, cpt, cpu, cpum, turno, id) => {
    const query = "UPDATE produccion SET receta_id = ?, fecha = ?, cantidad_producida = ?, costo_primo_total = ?, costo_primo_unitario = ?, cantidad_por_unidad_medida = ?, turno = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [r_id, fecha, cant_prod, cpt, cpu, cpum, turno, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//DELETE