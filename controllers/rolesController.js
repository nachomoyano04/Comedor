import { json } from "express";
import { deleteRol, getRoles, getRolesByUser, getUserByRolId, insertRol, updateRol } from "../models/roles.js";

export const listarRoles = async (req, res) => {
    try{
        const resultado = await getRoles();
        return json(resultado);
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al listar los roles"}); 
    }
}

export const listarRolesPorUsuario = async (req, res) => {
    const {usuario_id} = req.params;
    try{
        const resultado = await getRolesByUser(usuario_id);
        return json(resultado);
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al listar los roles del usuario"}); 
    }
}

export const nuevoRol = async (req, res) => {
    const rol = req.body;
    try{
        const resultado = await insertRol(rol);
        return json(resultado);
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al crear los roles"}); 
    }
}

export const editarRol = async (req, res) => {
    const {id} = req.params;
    const {numero_rol, nombre_rol} = req.body;
    try{
        const resultado = await updateRol(numero_rol, nombre_rol, id);
        return json(resultado);
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al editar el rol"}); 
    }
}

export const borrarRol = async (req, res) => {
    const {id} = req.params;
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
        res.status(500).json({error: "Error al eliminar rol"}); 
    }
}