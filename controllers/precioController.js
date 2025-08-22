import { json } from "express.js";
import { insertPrecio, updatePrecio } from "../models/precio";

export const crearPrecio = async (req, res) => {
    const [insumo_id, proveedor_id, precio_unitario, fecha_desde, fecha_hasta] = req.body;
    try{
        const resultado = await insertPrecio(insumo_id, proveedor_id, precio_unitario, fecha_desde, fecha_hasta);
        return json(resultado);
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al crear precio"});
    }
}

export const editarPrecio = async (req, res) => {
    const [insumo_id, proveedor_id, precio_unitario, fecha_desde, fecha_hasta, id] = req.body;
    try{
        const resultado = await updatePrecio(insumo_id, proveedor_id, precio_unitario, fecha_desde, fecha_hasta, id);
        return resultado;
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al crear precio"});
    }
}