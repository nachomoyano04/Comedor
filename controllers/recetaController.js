import { json } from "express";
import { deleteReceta, getRecetasActivas, insertReceta, updateReceta } from "../models/receta.js";
import { deleteReceta_Insumo, insertReceta_Insumo, updateReceta_Insumo } from "../models/receta-insumo.js";

export const nuevaReceta = async (req, res) => {
    const receta = req.body;
    try{
        const resultado = await insertReceta(receta);
        return json(resultado);
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al registrar nueva receta"});
    }
}

export const obtenerRecetas = async (req, res) => {
    try{
        const resultado = await getRecetasActivas();
        return json(resultado);
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al obtener recetas"});
    }
}

export const editarReceta = async (req, res) => {
    const {id} = req.params;
    const {fecha, precio_unitario, importe} = req.body;
    try{
        const resultado = await updateReceta(fecha, precio_unitario, importe, id);
        return json(resultado);
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al actualizar receta"});
    }
}

export const borrarReceta = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await deleteReceta(id);
        return json(resultado);
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al borrar nueva receta"});
    }
}

export const agregarInsumoAReceta = async (req, res) => {
    const receta_insumo = req.body;
    try{
        const resultado = await insertReceta_Insumo(receta_insumo);
        return json(resultado);
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al agregar insumo a receta"});
    }
}

export const modificarInsumoDeReceta = async (req, res) => {
    const {receta_id, insumo_id, cantidad} = req.body;
    const {id} = req.params;
    try{
        const resultado = await updateReceta_Insumo(receta_id, insumo_id, cantidad, id);
        return json(resultado);
    }catch(error) {
        console.log(error); 
        res.status(500).json({error: "Error al modificar insumo de receta"});
    }
}
export const borrarInsumoDeReceta = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await deleteReceta_Insumo(id);
        return json(resultado);
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al borrar insumo de receta"});
    }
}