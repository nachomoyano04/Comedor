import { json } from "express";
import { deleteRol, getRoles, getUserByRolId, insertRol, updateRol } from "../models/roles";

export const listarRoles = async (req, res) => {
    try{
        const resultado = await getRoles();
        return json(resultado);
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al listar los roles"}); 
    }
}

export const crearRol = async (req, res) => {
    const [numero_rol, nombre_rol] = req.body;
    try{
        const resultado = await insertRol(numero_rol, nombre_rol);
        return json(resultado);
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al listar los roles"}); 
    }
}

export const editarRol = async (req, res) => {
    const [numero_rol, nombre_rol, id] = req.body;
    try{
        const resultado = await updateRol(numero_rol, nombre_rol, id);
        return json(resultado);
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al listar los roles"}); 
    }
}

export const eliminarRol = async (req, res) => {
    const [id] = req.body;
    try{
        const usuario = await getUserByRolId(id);
        if(usuario){
            return json({error: "Error, hay usuario/s con ese rol."});
        }else{
            const resultado = await deleteRol(id);
            return json(resultado);
        }
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al listar los roles"}); 
    }
}