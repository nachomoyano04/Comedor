import { activateReceta, deleteReceta, getRecetaById, getRecetas, insertReceta, updateReceta } from "../models/receta.js";
import { deleteInsumosDeReceta, deleteReceta_Insumo, insertReceta_Insumo, updateReceta_Insumo } from "../models/receta-insumo.js";
import dayjs from "dayjs";
import pool from "../config/database.js";

export const nuevaReceta = async (req, res) => {
    const {nombre, descripcion, insumo} = req.body;
    const connection = await pool.getConnection();
    try{
        const fecha = dayjs().format("YYYY-MM-DD HH:mm:ss");
        const estado = 1;
        const receta = {nombre, descripcion, fecha, estado}
        const id = await insertReceta(receta);
        for(const i of insumo){
            await insertReceta_Insumo({receta_id: id, insumo_id: i.value, cantidad: i.cantidad})
        }
        await connection.commit();
        return res.json("Receta registrada.");
    }catch(error) {
        await connection.rollback();
        console.log(error);
        return res.status(500).json({error: "Error al registrar nueva receta"});
    }finally{
        connection.release();
    }
}

export const obtenerRecetas = async (req, res) => {
    try{
        const resultado = await getRecetas();
        return res.json(resultado);
    }catch(error) {
        console.log(error);
        return res.status(500).json({error: "Error al obtener recetas"});
    }
}

export const obtenerRecetaPorId = async (req, res) => {
    const {id} = req.params;
    try {
        const resultado = await getRecetaById(id);
        return res.json(resultado);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error al obtener receta"});
    }
}

export const editarReceta = async (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, cuantos_comen, insumo} = req.body;
    const connection = await pool.getConnection();
    try{ 
        await updateReceta(nombre, descripcion, cuantos_comen, id); //Le cambiamos el nombre, descripcion y cuantos_comen...
        await deleteInsumosDeReceta(id); //Eliminamos los insumos que tenia la receta 
        for(const i of insumo){ //Agregamos todos los insumos...
            await insertReceta_Insumo({receta_id: id, insumo_id: i.value, cantidad: i.cantidad}); 
        }
        await connection.commit();
        return res.json("Receta editada.")
    }catch(error) {
        await connection.rollback();
        console.log(error);
        return res.status(500).json({error: "Error al editar receta"});
    }finally{
        connection.release();
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
        return res.status(500).json({error: "Error al dar de baja la receta"});
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
        return res.status(500).json({error: "Error al dar de alta la receta"});
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
        return res.status(500).json({error: "Error al agregar insumo a receta"});
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
        return res.status(500).json({error: "Error al modificar insumo de receta"});
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
        return res.status(500).json({error: "Error al borrar insumo de receta"});
    }
}