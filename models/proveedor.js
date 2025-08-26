import pool from "../config/database.js";

//CREATE
export const insertProveedor = async (proveedor) => {
    proveedor.estado = 1;
    const query = "INSERT INTO proveedor SET ?";
    try{
        const resultado = await pool.query(query, proveedor);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//READ
export const getProveedores = async () => {
    const query = "SELECT * FROM proveedor WHERE estado = 1";
    try{
        const resultado = await pool.query(query);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//UPDATE
export const updateProveedor = async (cdgo, rs, nf, cuit, ha, dclio, lc, email, id) => {
    const query = "UPDATE proveedor SET codigo = ?, razon_social = ?, nombre_fantasia = ?, cuit = ?, horarios_atencion = ?, domicilio = ?, localidad = ?, email = ? WHERE id = ?";
    try{
        const resultado = await pool.query(query, [cdgo, rs, nf, cuit, ha, dclio, lc, email, id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}
//DELETE
export const deleteProveedor = async (id) => {
    const query = "UPDATE proveedor SET estado = 0 WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

export const activateProveedor = async (id) => {
    const query = "UPDATE proveedor SET estado = 1 WHERE id = ?";
    try{
        const resultado = await pool.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}