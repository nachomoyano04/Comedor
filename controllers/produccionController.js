import { changeStateOfProduccion, getProducciones, insertProduccion, updateProduccion } from "../models/produccion.js";
import { deleteProduccion_Insumo, getInsumosByProduccion, insertProduccion_Insumo, updateProduccion_Insumo } from "../models/produccion-insumo.js";

export const nuevaProduccion = async (req, res) => {
    const produccion = req.body;
    try{
        const resultado = await insertProduccion(produccion);
        if(resultado.affectedRows == 1){
            return res.json("Produccion registrada.");
        }
        return res.json("No se pudo registrar la producción.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al registrar nueva producción."});
    }
}

export const editarProduccion = async (req, res) => {
    const {id} = req.params;
    const {receta_id, fecha, cantidad_producida, turno} = req.body;
    try{
        const resultado = await updateProduccion(receta_id, fecha, cantidad_producida, turno, id);
        if(resultado.affectedRows == 1){
            return res.json("Producción editada.");
        }
        return res.json("No se pudo editar la producción.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al editar produccion"});
    }
}

export const obtenerProducciones = async (req, res) => {
    try{
        const resultado = await getProducciones();
        return res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener producciones"});
    }
}

export const altaBajaProduccion = async (req, res) => {
    const {id, num} = req.params;
    try {
        const resultado = await changeStateOfProduccion(num, id);
        if(resultado.affectedRows == 1){
            if(num == 1){
                return res.json("Producción dada de alta.");
            }
            return res.json("Producción dada de baja.");
        }
        return res.json("No se pudo cambiar el estado de la producción.");
    } catch (error) {
        
    }
}

export const agregarInsumoALaProduccion = async (req, res) => {
    const produccion_insumo = req.body;
    try{
        const resultado = await insertProduccion_Insumo(produccion_insumo);
        if(resultado.affectedRows == 1){
            return res.json("Insumo agregado a la producción.")
        }
        return res.json("No se pudo agregar el insumo a la producción.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al agregar insumo a la produccion"});
    }
}

export const insumosPorProduccion = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await getInsumosByProduccion(id);
        return res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener insumos por produccion"});
    }
}



export const modificarInsumoDeProduccion = async (req, res) => {
    const {id} = req.params;
    const {produccion_id, insumo_id, cantidad_usada} = req.body;
    try{
        const resultado = await updateProduccion_Insumo(produccion_id, insumo_id, cantidad_usada, id);
        if(resultado.affectedRows == 1){
            return res.json("Insumo en la producción modificado.")
        }
        return res.json("No se pudo modificar el insumo en la producción.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al modificar insumo de la produccion"});
    }
}

export const eliminarInsumoDeProduccion = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await deleteProduccion_Insumo(id);
        if(resultado.affectedRows == 1){
            return res.json("Insumo eliminado de la producción.");
        }
        return res.json("No se pudo eliminar el insumo de la producción.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al eliminar insumo de la producción"});
    }
}
