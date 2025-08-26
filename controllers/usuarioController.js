import { json } from "express";
import { deleteUsuario, findUsuarioByDNI, getUsuarios, getUsuariosByRol, insertUsuario, updatePassword, updateRol, updateUsuario } from "../models/usuario.js";
import { hashearPassword } from "../servicios/auth.js";
import { insertUsuario_Rol } from "../models/roles.js";

export const nuevoUsuario = async (req, res) => {
    const usuario = req.body;
    try{
        const resultado = await insertUsuario(usuario);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al crear nuevo usuario"});
    }
}

export const editarUsuario = async (req, res) => {
    const {id} = req.params
    const {nombre, apellido, dni, cuil, telefono} = req.body;
    try{
        const resultado = await updateUsuario(nombre, apellido, dni, cuil, telefono, id);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al actualizar usuario"});
    }
}

export const obtenerUsuarios = async (req, res) => {
    try{
        const resultado = await getUsuarios();
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener usuarios"});
    }
}

export const borrarUsuario = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await deleteUsuario(id);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al borrar usuario"});
    }
}

export const nuevoRolAUsuario = async (req, res) => {
    const {usuario_id, rol_id} = req.body;
    try{
        const resultado = await insertUsuario_Rol(usuario_id, rol_id);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al asignar rol al usuario"});
    }
}

export const obtenerUsuariosPorRol = async (req, res) => {
    const {rol_id} = req.params;
    try{
        const resultado = await getUsuariosByRol(rol_id);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener usuarios"});
    }
}

export const buscarUsuarioPorDni = async (req, res) => {
    const {dni} = req.params;
    try{
        const resultado = await findUsuarioByDNI(dni);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener usuario"});
    }
}

export const cambiarRol = async (req, res) => {
    const {rol_id, id} = req.params;
    try{
        const resultado = await updateRol(rol_id, id);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al cambiar rol de usuario"});
    }
}

export const cambiarPassword = async (req, res) => {
    const {id} = req.params;
    const {password} = req.body;
    try{
        const pass = await hashearPassword(password);
        const resultado = await updatePassword(pass, id);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al actualizar password"});
    }
}