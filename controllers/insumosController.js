import {activateInsumo, deleteInsumo, getInsumo, getInsumos, insertInsumo, updateInsumo} from "../models/insumos.js";

export const listarInsumos = async (req, res) => {
    try{
        const insumos = await getInsumos();
        res.json(insumos);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al listar los insumos", mensaje: error.sqlMessage});
    }
}

export const obtenerInsumo = async (req, res) => {
    const {id} = req.params;
    try {
        const insumo = await getInsumo(id);
        res.json(insumo);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error al obtener insumo", mensaje: error.sqlMessage});   
    }
}

export const nuevoInsumo = async (req, res) => {
    const insumo = req.body;
    try{
        const resultado = await insertInsumo(insumo);
        res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al crear insumo", mensaje: error.sqlMessage});    
    }
}

export const editarInsumo = async (req, res) => {
    const {codigo, producto, marca, id_unidad_de_medida} = req.body
    const {id} = req.params;
    try{
        const resultado = await updateInsumo(codigo, producto, marca, id_unidad_de_medida, id);
        res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al editar insumo", mensaje: error.sqlMessage});
    }
}

export const borrarInsumo = async (req, res) => {
    const {id} = req.params;
    try {
        const resultado = await deleteInsumo(id);
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error al eliminar insumo", mensaje: error.sqlMessage});
    }
}

export const activarInsumo = async (req, res) => {
    const {id} = req.params;
    try {
        const resultado = await activateInsumo(id);
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error al activar insumo", mensaje: error.sqlMessage});
    }
}