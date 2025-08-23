import { json } from "express";
import { getPrecioByInsumo, insertPrecio, updatePrecio } from "../models/precio";

export const crearPrecio = async (req, res) => {
    const precio = req.body;
    try{
        const resultado = await insertPrecio(precio);
        return json(resultado);
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al crear precio"});
    }
}

export const editarPrecio = async (req, res) => {
    const {id} = req.params;
    const {insumo_id, proveedor_id, precio_unitario, fecha_desde, fecha_hasta} = req.body;
    try{
        const resultado = await updatePrecio(insumo_id, proveedor_id, precio_unitario, fecha_desde, fecha_hasta, id);
        return resultado;
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al editar precio"});
    }
}

export const obtenerPrecioPorInsumo = async (req, res) => {
    const {insumo_id} = req.params;
    try{
        const resultado = await getPrecioByInsumo(insumo_id);
        return json(resultado);
    }catch(error){
        console.log("errror");
        res.status(500).json({error: "Error al obtener precio"});
    }
}  