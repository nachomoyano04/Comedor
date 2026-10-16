import pool from "../config/database.js";
import {activateInsumo, deleteInsumo, getInsumo, getInsumoByCodigo, getInsumos, getInsumosParaReceta, insertInsumo, updateInsumo} from "../models/insumos.js";

export const listarInsumos = async (req, res) => {
    try{
        const insumos = await getInsumos();
        return res.json(insumos);
    }catch(error){
        console.error("Error al listar insumos:", error);
        return res.status(500).json({error: "Error al listar los insumos"});
    }
}
export const listarInsumosParaReceta = async (req, res) => {
    try{
        const insumos = await getInsumosParaReceta();
        return res.json(insumos);
    }catch(error){
        console.error("Error al listar insumos para receta:", error);
        return res.status(500).json({error: "Error al listar los insumos"});
    }
}

export const obtenerInsumo = async (req, res) => {
    const {id} = req.params;
    if (!id || !/^\d+$/.test(String(id).trim())) {
        return res.status(400).json({ error: "ID de insumo inválido" });
    }
    const connection = await pool.getConnection();
    try {
        const insumo = await getInsumo(id, connection);
        if (!insumo) {
            return res.status(404).json({ error: "Insumo no encontrado" });
        }
        return res.json(insumo);
    } catch (error) {
        console.error("Error al obtener insumo:", error);
        return res.status(500).json({error: "Error al obtener insumo"});   
    } finally {
        connection.release();
    }
}

export const nuevoInsumo = async (req, res) => {
    const insumo = req.body;
    try{
        const hayInsumo = await getInsumoByCodigo(insumo.codigo);
        if(hayInsumo.length > 0){
            return res.status(409).json({ error: "Código duplicado" });
        }
        const resultado = await insertInsumo(insumo);
        if(resultado.affectedRows == 1){
            return res.json("Insumo creado");
        }
        return res.json("No se pudo registrar el insumo.");
    }catch(error){
        console.error("Error al crear insumo:", error);
        return res.status(500).json({error: "Error al crear insumo"});    
    }
}

export const editarInsumo = async (req, res) => {
    const {codigo, producto, marca, id_unidad_de_medida} = req.body
    const {id} = req.params;
    try{
        const hayInsumo = await getInsumoByCodigo(codigo);
        if(hayInsumo.length > 0 && hayInsumo[0].id != id){
            return res.status(409).json({ error: "Código duplicado" });
        }
        const resultado = await updateInsumo(codigo, producto, marca, id_unidad_de_medida, id);
        if(resultado.affectedRows > 0){
            return res.json("Insumo editado");
        }
        return res.json("No se pudo editar el insumo");
    }catch(error){
        console.error("Error al editar insumo:", error);
        return res.status(500).json({error: "Error al editar insumo"});
    }
}

export const borrarInsumo = async (req, res) => {
    const {id} = req.params;
    try {
        const resultado = await deleteInsumo(id);
        if(resultado.affectedRows > 0){
            return res.json("Insumo borrado");
        }
        return res.json("No se pudo borrar el insumo");
    } catch (error) {
        console.error("Error al eliminar insumo:", error);
        return res.status(500).json({error: "Error al eliminar insumo"});
    }
}

export const activarInsumo = async (req, res) => {
    const {id} = req.params;
    try {
        const resultado = await activateInsumo(id);
        if(resultado.affectedRows > 0){
            return res.json("Insumo activado");
        }
        return res.json("No se pudo activar el insumo");
    } catch (error) {
        console.error("Error al activar insumo:", error);
        return res.status(500).json({error: "Error al activar insumo"});
    }
}