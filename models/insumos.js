import pool from "../config/database.js";

//READ
export const getInsumos = async () => {
    try{
       const insumos = await pool.query("SELECT * FROM insumo");
       return insumos[0]; 
    }catch(error) {
        throw error;
    }
}

export const getInsumo = async id => {
    const query = "SELECT * FROM insumo WHERE id = ?";
    try {
        const insumo = await pool.query(query, [id]);
        return insumo[0];
    } catch (error) {
        throw error;
    }
}

//CREATE
export const insertInsumo = async insumo => {
    insumo.estado = 1;
    const query = "INSERT INTO insumo SET ?";
    try{
        const resultado = await pool.query(query, insumo);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//UPDATE
export const updateInsumo = async (c, p, m, udm, id) => {
    const query = "UPDATE insumo SET codigo = ?, producto = ?, marca = ?, id_unidad_de_medida = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [c, p, m, udm, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//DELETE
export const deleteInsumo = async id => {
    const query = "UPDATE insumo SET estado = 0 WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
export const activateInsumo = async id => {
    const query = "UPDATE insumo SET estado = 1 WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}