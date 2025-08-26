import { deleteUnidadDeMedida, insertUnidadDeMedida, getUnidadDeMedida, updateUnidadDeMedida } from "../models/unidad_de_medida.js";

export const listarUDM = async (req, res) => {
    try{
        const resultado = await getUnidadDeMedida();
        return res.json(resultado);
    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Error al listar unidades de medida"})  
    }
}

export const nuevoUDM = async (req, res) => {
    const unidad_de_medida = req.body;
    try{
        const resultado = await insertUnidadDeMedida(unidad_de_medida);
        return res.json(resultado);
    }catch(error){
       console.log(error);
       res.status(500).json({error: "Error al crear unidad de medida"}) 
    }
}
export const editarUDM = async (req, res) => {
    const {id} = req.params;
    const {nombre, simbolo} = req.body;
    try{
        const resultado = await updateUnidadDeMedida(nombre, simbolo, id);
        return res.json(resultado);
    }catch(error){
       console.log(error);
       res.status(500).json({error: "Error al editar unidad de medida"}) 
    }
}
export const borrarUDM = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await deleteUnidadDeMedida(id);
        return res.json(resultado);        
    }catch(error){
       console.log(error);
       res.status(500).json({error: "Error al borrar unidad de medida"}) 
    }
}