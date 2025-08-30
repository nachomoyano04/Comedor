import { activateReceta, deleteReceta, getRecetasActivas, insertReceta, updateReceta } from "../models/receta.js";
import { deleteReceta_Insumo, insertReceta_Insumo, updateReceta_Insumo } from "../models/receta-insumo.js";

export const nuevaReceta = async (req, res) => {
    const receta = req.body;
    try{
        const resultado = await insertReceta(receta);
        if(resultado.affectedRows == 1){
            return res.json("Receta registrada.");
        }
        return res.json("No se pudo registrar la receta.");
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al registrar nueva receta"});
    }
}

export const obtenerRecetas = async (req, res) => {
    try{
        const resultado = await getRecetasActivas();
        return res.json(resultado);
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al obtener recetas"});
    }
}

export const editarReceta = async (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, precio_unitario, importe} = req.body;
    try{
        const resultado = await updateReceta(nombre, descripcion, precio_unitario, importe, id);
        if(resultado.affectedRows == 1){
            return res.json("Receta editada.")
        }
        return res.json("No se pudo editar la receta");
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al editar receta"});
    }
}

export const darDeBajaReceta = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await deleteReceta(id);
        if(resultado.affectedRows == 1){
            return res.json("Receta dada de baja.")
        }
        return res.json("No se pudo dar de baja la receta");
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al dar de baja la receta"});
    }
}

export const activarReceta = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await activateReceta(id);
        if(resultado.affectedRows == 1){
            return res.json("Receta dada de alta.")
        }
        return res.json("No se pudo dar de alta la receta");
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al dar de alta la receta"});
    }
}

export const agregarInsumoAReceta = async (req, res) => {
    const receta_insumo = req.body;
    try{
        const resultado = await insertReceta_Insumo(receta_insumo);
        if(resultado.affectedRows == 1){
            return res.json("Insumo agregado a la receta.");
        }
        return res.json("No se pudo agregar el insumo a la receta");
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al agregar insumo a receta"});
    }
}

export const modificarInsumoDeReceta = async (req, res) => {
    const {receta_id, insumo_id, cantidad} = req.body;
    const {id} = req.params;
    try{
        const resultado = await updateReceta_Insumo(receta_id, insumo_id, cantidad, id);
        if(resultado.affectedRows == 1){
            return res.json("Insumo de receta modificado");
        }
        return res.json("No se pudo modificar el insumo de la receta");
    }catch(error) {
        console.log(error); 
        res.status(500).json({error: "Error al modificar insumo de receta"});
    }
}
export const borrarInsumoDeReceta = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await deleteReceta_Insumo(id);
        if(resultado.affectedRows == 1){
            return res.json("Insumo borrado de la receta.");
        }
        return res.json("No se pudo borrar el insumo de la receta");
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Error al borrar insumo de receta"});
    }
}