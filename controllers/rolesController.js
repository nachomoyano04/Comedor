import { deleteRol, getRoles, getRolesByUser, insertRol, updateRol } from "../models/roles.js";
import { getUsuariosByRol } from "../models/usuario.js";

export const listarRoles = async (req, res) => {
    try{
        const resultado = await getRoles();
        return res.json(resultado);
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al listar los roles"}); 
    }
}

export const listarRolesPorUsuario = async (req, res) => {
    const {usuario_id} = req.params;
    try{
        const resultado = await getRolesByUser(usuario_id);
        return res.json(resultado);
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al listar los roles del usuario"}); 
    }
}

export const nuevoRol = async (req, res) => {
    const rol = req.body;
    try{
        const resultado = await insertRol(rol);
        if(resultado.affectedRows > 0){
            return res.json("Rol creado.");
        }
        return res.json("No se pudo crear el rol.")
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
        if(resultado.affectedRows > 0){
            return res.json("Rol editado correctamente.");
        }
        return res.json("No se pudo editar el rol.");
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al editar el rol"}); 
    }
}

export const borrarRol = async (req, res) => {
    const {id} = req.params;
    try{
        const usuario = await getUsuariosByRol(id);
        if(usuario.length > 0){
            return res.json({error: "Error, hay usuario/s con ese rol."});
        }else{
            const resultado = await deleteRol(id);
            if(resultado.affectedRows > 0){
                return res.json("Rol borrado correctamente.");
            }
            return res.json("No se pudo borrar el rol.");
        }
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al eliminar rol"}); 
    }
}