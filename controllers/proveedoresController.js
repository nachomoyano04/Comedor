import { json } from "express";
import { deleteProveedor, getProveedores, insertProveedor, updateProveedor } from "../models/proveedor";

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

export const actualizarProveedor = async (req, res) => {
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

