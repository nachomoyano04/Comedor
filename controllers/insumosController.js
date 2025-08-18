import { json } from "express";
import {deleteInsumo, getInsumos, insertInsumo, updateInsumo} from "../models/insumos.js";

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