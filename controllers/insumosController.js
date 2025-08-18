import { json } from "express";
import {deleteInsumo, getInsumos, insertInsumo, updateInsumo} from "../models/insumos.js";
import { deleteUnidadDeMedida, insertUnidadDeMedida, updateUnidadDeMedida } from "../models/unidad_de_medida.js";

export const listarInsumos = async (req, res) => {
    try{
        const insumos = await getInsumos();
        res.json(insumos);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al listar los insumos"});
    }
}

export const nuevoInsumo = async (req, res) => {
    try{
        const {codigo, producto, marca, unidad_de_medida} = req.body;
        const resultado = await insertInsumo(codigo, producto, marca, unidad_de_medida);
        res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al crear insumo"});    
    }
}

export const editarInsumo = async (req, res) => {
    try{
        const {cod, prod, marca, udm, id} = req.body
        const resultado = await updateInsumo(cod, prod, marca, udm, id);
        res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al editar insumo"});
    }
}

export const borrarInsumo = async (req, res) => {
    try {
        const {id} = req.body;
        const resultado = await deleteInsumo(id);
        return json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error al eliminar insumo"});
    }
}

export const nuevoUDM = async (req, res) => {
    const {nombre, simbolo} = req.body;
    try{
        const resultado = await insertUnidadDeMedida(nombre, simbolo);
        return json(resultado);
    }catch(error){
       console.log(error);
       res.status(500).json({error: "Error al crear unidad de medida"}) 
    }
}
export const editarUDM = async (req, res) => {
    const {nombre, simbolo, id} = req.body;
    try{
        const resultado = await updateUnidadDeMedida(nombre, simbolo, id);
        return json(resultado);
    }catch(error){
       console.log(error);
       res.status(500).json({error: "Error al editar unidad de medida"}) 
    }
}
export const borrarUDM = async (req, res) => {
    const {id} = req.body;
    try{
        const resultado = await deleteUnidadDeMedida(id);
        return json(resultado);        
    }catch(error){
       console.log(error);
       res.status(500).json({error: "Error al borrar unidad de medida"}) 
    }
}