import { json } from "express";
import { deleteProveedor, getProveedores, insertProveedor, updateProveedor } from "../models/proveedor.js";
import { deleteContactoProveedor, getConProvByIdProveedor, insertContactoProveedor, updateContactoProveedor } from "../models/contacto_proveedor.js";

export const nuevoProveedor = async (req, res) => {
    const proveedor = req.body;
    try{
        const resultado = await insertProveedor(proveedor);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al registrar nuevo proveedor"});
    }
} 

export const editarProveedor = async (req, res) => {
    const {id} = req.params;
    const {codigo, razon_social, nombre_fantasia, cuit, horarios_atencion, domicilio, localidad, email} = req.body;
    try{
        const resultado = await updateProveedor(codigo, razon_social, nombre_fantasia, cuit, horarios_atencion, domicilio, localidad, email, id);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al actualizar proveedor"});
    }
} 

export const obtenerProveedores = async (req, res) => {
    try{
        const resultado = await getProveedores();
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener proveedores"});
    }
}

export const borrarProveedor = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await deleteProveedor(id);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al eliminar proveedor"});
    }
} 

export const nuevoContactoProveedor = async (req, res) => {
    const contacto_proveedor = req.body;
    try{
        const resultado = await insertContactoProveedor(contacto_proveedor);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al agregar nuevo contacto de proveedor"});       
    }
}

export const editarContactoProveedor = async (req, res) => {
    const {proveedor_id, nombre, telefono, email, es_principal} = req.body;
    const {id} = req.params;
    try{
        const resultado = await updateContactoProveedor(proveedor_id, nombre, telefono, email, es_principal, id);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al editar contacto de proveedor"});       
    }
}

export const obtenerContactosPorProveedor = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await getConProvByIdProveedor(id);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener contactos del proveedor"});       
    }
}

export const borrarContactoProveedor = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await deleteContactoProveedor(id);
        return json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al borrar contacto del proveedor"});       
    }
}