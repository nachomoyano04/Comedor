import { deletePrecio, getPrecioById, getPrecioByInsumo, insertPrecio, makeFechaNull, updateFechaHasta, updatePrecio } from "../models/precio.js";

export const crearPrecio = async (req, res) => {
    const precio = req.body;
    try{
        const precios = await getPrecioByInsumo(precio.insumo_id);
        if(precios.length > 0){
            await updateFechaHasta(precios[precios.length-1].id);
        }
        const resultado = await insertPrecio(precio);
        if(resultado.affectedRows == 1){
            return res.json("Precio registrado.");
        }
        return res.json("No se pudo registrar el precio.");
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
        if(resultado.affectedRows == 1){
            return res.json("Precio editado.")
        }
        return res.json("No se pudo editar el precio");
    }catch(error){
        console.log(error); 
        res.status(500).json({error: "Error al editar precio"});
    }
}

export const obtenerPrecioPorInsumo = async (req, res) => {
    const {insumo_id} = req.params;
    try{
        const resultado = await getPrecioByInsumo(insumo_id);
        return res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener precio"});
    }
}  

export const borrarPrecio = async (req, res) => {
    const {id} = req.params;
    try{
        const precio = await getPrecioById(id);
        const precios = await getPrecioByInsumo(precio[0].insumo_id);
        if(precios.length > 1){
            await makeFechaNull(precios[precios.length-2].id);
        }
        const resultado = await deletePrecio(id);
        if(resultado.affectedRows == 1){
            return res.json("Precio borrado");
        }
        return res.json("No se pudo borrar el precio");
    }catch(error){
        res.status(500).json({error: "Error al borrar el precio"});
    }
}