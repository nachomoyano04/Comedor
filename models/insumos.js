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

//CREATE
export const insertInsumo = async (c, p, m, udm) => {
    const query = "INSERT INTO insumo (codigo, producto, marca, id_unidad_de_medida, estado) VALUES (?,?,?,?,?)";
    try{
        const resultado = await pool.query(query, [c, p, m, udm, 1]);
        return resultado;
    }catch(error){
        console.log(`Error: ${error.message}`);
        throw error;
    }
}

//UPDATE
export const updateInsumo = async (c, p, m, udm, id) => {
    const query = "UPDATE insumo SET codigo = ?, producto = ?, marca = ?, id_unidad_de_medida = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [c, p, m, udm, id]);
        return resultado;
    }catch(error){
        console.log(`Error: ${error.message}`);
        throw error;
    }
}

//DELETE
export const deleteInsumo = async id => {
    const query = "UPDATE insumo SET estado = 0 WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado;
    }catch(error){
        console.log(`Error: ${error.message}`);
        throw error;
    }
}