import pool from "../config/database.js";
import dayjs from "dayjs";

//CREATE
export const insertPrecio = async (precio, connection) => {
    const query = "INSERT INTO precio SET ?";
    try{
        const resultado = await connection.query(query, precio);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

//READ
export const getPrecios = async () => {
    const query = `SELECT i.id, i.codigo, i.producto, udm.nombre AS unidad_de_medida, p.precio_unitario, p.fecha_desde, pr.razon_social
                    FROM precio AS p
                    JOIN (
                        SELECT insumo_id, MAX(id) AS max_id
                        FROM precio
                        GROUP BY insumo_id
                    ) AS latest ON p.id = latest.max_id
                    JOIN insumo AS i ON i.id = p.insumo_id
                    LEFT JOIN unidad_de_medida AS udm ON udm.id = i.id_unidad_de_medida
                    LEFT JOIN proveedor AS pr ON pr.id = p.proveedor_id
                    ORDER BY p.fecha_desde DESC`;
    try {
        const resultado = await pool.query(query);
        return resultado[0];
    } catch (error) {
        throw error;
    }
}

export const getPrecioByInsumo = async (id, connection) => {
    const query = `SELECT p.id, p.insumo_id, p.proveedor_id, p.precio_unitario, p.fecha_desde, p.fecha_hasta, p.fecha_vencimiento, p.cantidad, i.producto, prov.razon_social
                    FROM precio AS p
                    JOIN insumo AS i ON p.insumo_id = i.id
                    JOIN proveedor AS prov ON p.proveedor_id = prov.id
                    WHERE p.insumo_id = ?
                    ORDER BY fecha_desde DESC`;
    try{
        const resultado = await connection.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    }
}

export const getPrecioActualInsumo = async (id, connection) => {
    const query = `SELECT p.precio_unitario
                    FROM precio AS p
                    JOIN insumo AS i ON p.insumo_id = i.id
                    JOIN proveedor AS prov ON p.proveedor_id = prov.id
                    WHERE p.insumo_id = ?
                    ORDER BY fecha_desde DESC
                    LIMIT 1`;
    try {
        const resultado = await connection.query(query, [id]);
        return resultado[0][0];
    } catch (error) {
        throw error;
    }
}

export const getPrecioById = async (id, connection) => {
    const query = "SELECT * FROM precio WHERE id = ?";
    try{
        const resultado = await connection.query(query, [id]);
        return resultado[0][0];
    }catch (error){
        throw error;
    }
}

//UPDATE

export const updateFechaHasta = async (id, connection) => {
    const fecha_actual = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const query = "UPDATE precio SET fecha_hasta = ? WHERE id = ?";
    try{
        const resultado = await connection.query(query, [fecha_actual, id]);
        return resultado[0];
    }catch(error){
        throw error;
    } 
}

export const makeFechaNull = async (id, connection) => {
    const query = "UPDATE precio SET fecha_hasta = NULL WHERE id = ?";
    try{
        const resultado = await connection.query(query, [id]);
        return resultado[0];
    }catch(error){
        throw error;
    } 
}

//DELETE
export const deletePrecio = async (id, connection) => {
    const query = "DELETE FROM precio WHERE id = ?";
    try{
        const resultado = await connection.query(query, [id]);
        return resultado[0];       
    }catch(error){
        throw error;
    }
}

// ALERTAS DE VENCIMIENTO Y FIFO (BROMATOLOGÍA ESCOLAR)
export const getAlertasVencimientos = async () => {
    const query = `
        SELECT p.id, p.insumo_id, i.producto, i.stock, udm.simbolo, 
               p.cantidad, p.precio_unitario, p.fecha_desde, p.fecha_vencimiento,
               prov.razon_social,
               DATEDIFF(p.fecha_vencimiento, CURDATE()) AS dias_para_vencer
        FROM precio AS p
        JOIN insumo AS i ON p.insumo_id = i.id
        JOIN unidad_de_medida AS udm ON i.id_unidad_de_medida = udm.id
        LEFT JOIN proveedor AS prov ON p.proveedor_id = prov.id
        WHERE p.fecha_vencimiento IS NOT NULL 
          AND i.estado = 1
        ORDER BY p.fecha_vencimiento ASC
    `;
    try {
        const resultado = await pool.query(query);
        return resultado[0];
    } catch (error) {
        throw error;
    }
};

export const getSugerenciasFIFO = async (insumo_id = null) => {
    let query = `
        SELECT p.id, p.insumo_id, i.producto, i.stock, udm.simbolo,
               p.cantidad, p.precio_unitario, p.fecha_desde, p.fecha_vencimiento,
               prov.razon_social,
               DATEDIFF(p.fecha_vencimiento, CURDATE()) AS dias_para_vencer
        FROM precio AS p
        JOIN insumo AS i ON p.insumo_id = i.id
        JOIN unidad_de_medida AS udm ON i.id_unidad_de_medida = udm.id
        LEFT JOIN proveedor AS prov ON p.proveedor_id = prov.id
        WHERE i.estado = 1
    `;
    const params = [];
    if (insumo_id) {
        query += " AND p.insumo_id = ?";
        params.push(insumo_id);
    }
    query += `
        ORDER BY 
            CASE WHEN p.fecha_vencimiento IS NOT NULL THEN 0 ELSE 1 END,
            p.fecha_vencimiento ASC,
            p.fecha_desde ASC
    `;
    try {
        const resultado = await pool.query(query, params);
        return resultado[0];
    } catch (error) {
        throw error;
    }
};