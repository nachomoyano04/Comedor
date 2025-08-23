import { json } from "express";
import { getProducciones, insertProduccion, updateProduccion } from "../models/produccion";
import { insertProduccion_Insumo } from "../models/produccion-insumo";

export const nuevaProduccion = async (req, res) => {
    const produccion = req.body;
    try{
        const resultado = await insertProduccion(produccion);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al registrar nueva produccion"});
    }
}

export const agregarInsumoALaProduccion = async (req, res) => {
    const produccion_insumo = req.body;
    try{
        const resultado = await insertProduccion_Insumo(produccion_insumo);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al agregar insumo a la produccion"});
    }
}

export const modificarInsumoDeProduccion = async (req, res) => {
    const {id} = req.params;
    const {produccion_id, insumo_id, cantidad_usada, precio_unitario......} = req.body;
    try{
        const resultado = await insertProduccion_Insumo(produccion_insumo);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al agregar insumo a la produccion"});
    }
}

export const editarProduccion = async (req, res) => {
    const {id} = req.params;
    const {receta_id, fecha, cantidad_producida, costo_primo_total, costo_primo_unitario, cantidad_por_unidad_medida, turno} = req.body;
    try{
        const resultado = await updateProduccion(receta_id, fecha, cantidad_producida, costo_primo_total, costo_primo_unitario, cantidad_por_unidad_medida, turno, id);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al editar produccion"});
    }
}

export const obtenerProducciones = async (req, res) => {
    try{
        const resultado = await getProducciones();
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al editar produccion"});
    }
}