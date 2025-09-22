import { changeStateUser, findUsuarioByDNI, getUsuarios, getUsuariosByRol, insertUsuario, updatePassword, updateRol, updateUsuario } from "../models/usuario.js";
import { hashearPassword, login } from "../services/auth.js";
import { insertUsuario_Rol } from "../models/roles.js";

export const nuevoUsuario = async (req, res) => {
    const usuario = req.body;
    try{
        usuario.estado = 1;
        usuario.password = await hashearPassword(usuario.dni);
        const resultado = await insertUsuario(usuario);
        if(resultado.affectedRows > 0){
            return res.json("Usuario registrado.");
        }
        return res.json("No se pudo registrar el usuario.");
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
        if(resultado.affectedRows > 0){
            return res.json("Usuario editado.");
        }
        return res.json("No se pudo editar el usuario.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al editar usuario"});
    }
}

export const obtenerUsuarios = async (req, res) => {
    try{
        const resultado = await getUsuarios();
        return res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener usuarios"});
    }
}

export const borrarUsuario = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await changeStateUser(0, id);
        if(resultado.affectedRows > 0){
            return res.json("Usuario dado de baja.")
        }
        return res.json("No se pudo dar de baja el usuario.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al borrar usuario"});
    }
}

export const activarUsuario = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await changeStateUser(1, id);
        if(resultado.affectedRows > 0){
            return res.json("Usuario dado de alta.")
        }
        return res.json("No se pudo dar de alta el usuario.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al activar usuario"});
    }
}

export const nuevoRolAUsuario = async (req, res) => {
    const usuario_rol = req.body;
    try{
        const resultado = await insertUsuario_Rol(usuario_rol);
        if(resultado.affectedRows > 0){
            return res.json("Rol asignado.");
        }
        return res.json("No se pudo asignar el rol.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al asignar rol al usuario"});
    }
}

export const obtenerUsuariosPorRol = async (req, res) => {
    const {rol_id} = req.params;
    try{
        const resultado = await getUsuariosByRol(rol_id);
        return res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener usuarios"});
    }
}

export const buscarUsuarioPorDni = async (req, res) => {
    const {dni} = req.params;
    try{
        const resultado = await findUsuarioByDNI(dni);
        return res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener usuario"});
    }
}

export const cambiarRol = async (req, res) => {
    const {rol_id, id} = req.params;
    try{
        const resultado = await updateRol(rol_id, id);
        if(resultado.affectedRows > 0){
            return res.json("Rol de usuario cambiado.");
        }
        return res.json("No se pudo cambiar el rol del usuario");
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
        if(resultado.affectedRows > 0){
            return res.json("Password cambiada.");
        }
        return res.json("No se pudo cambiar la password");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al actualizar password"});
    }
}

export const loginUsuario = async (req, res) => {
    const {dni, password} = req.body;
    try {
        const tokens = await login(dni, password);
        return res.json(tokens);
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al loguearse"});
    }
}