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
    const insumo = req.body;
    try{
        const resultado = await insertInsumo(insumo);
        res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al crear insumo"});    
    }
}

export const editarInsumo = async (req, res) => {
    const {cod, prod, marca, udm} = req.body
    const {id} = req.params;
    try{
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