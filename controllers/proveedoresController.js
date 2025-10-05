import { deleteProveedor, activateProveedor, getProveedores, getProveedor, insertProveedor, updateProveedor, getByCodigoCuitOrEmail } from "../models/proveedor.js";
import { deleteContactoProveedor, getConProvByIdProveedor, insertContactoProveedor, updateContactoProveedor } from "../models/contacto_proveedor.js";

export const nuevoProveedor = async (req, res) => {
    const proveedor = req.body;
    try{
        //Chequeamos de que el codigo, cuit o email no coincida con ningun otro
        const hayOtraCoincidencia = await getByCodigoCuitOrEmail(proveedor.codigo, proveedor.cuit, proveedor.email);
        if(hayOtraCoincidencia.length > 0){
            return res.status(500).json("Se encontró una coincidencia en CUIT, codigo o email");
        }
        const resultado = await insertProveedor(proveedor);
        if(resultado.affectedRows == 1){
            return res.json("Proveedor registrado.");
        }
        return res.json("No se pudo registrar el proveedor.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al registrar nuevo proveedor", message: error.sqlMessage});
    }
} 

export const editarProveedor = async (req, res) => {
    const {id} = req.params;
    const {codigo, razon_social, nombre_fantasia, cuit, horarios_atencion, domicilio, localidad, email} = req.body;
    try{
        const resultado = await updateProveedor(codigo, razon_social, nombre_fantasia, cuit, horarios_atencion, domicilio, localidad, email, id);
        if(resultado.affectedRows == 1){
            return res.json("Proveedor editado.");
        }
        return res.json("No se pudo editar el proveedor");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al actualizar proveedor", message: error.sqlMessage});
    }
} 

export const obtenerProveedores = async (req, res) => {
    try{
        const resultado = await getProveedores();
        return res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener proveedores", message: error.sqlMessage});
    }
}

export const obtenerProveedor = async (req, res) => {
    const {id} = req.params;
    try {
        const resultado = await getProveedor(id);
        return res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error al obtener proveedor", message: error.sqlMessage});
    }
}

export const borrarProveedor = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await deleteProveedor(id);
        if(resultado.affectedRows == 1){
            return res.json("Proveedor dado de baja");
        }
        return res.json("No se pudo dar de baja el proveedor.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al dar de baja al proveedor", message: error.sqlMessage});
    }
} 

export const activarProveedor = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await activateProveedor(id);
        if(resultado.affectedRows == 1){
            return res.json("Proveedor activado.");
        }
        return res.json("No se pudo activar el proveedor.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al activar el proveedor", message: error.sqlMessage});
    }
} 

export const nuevoContactoProveedor = async (req, res) => {
    const contacto_proveedor = req.body;
    try{
        const resultado = await insertContactoProveedor(contacto_proveedor);
        if(resultado.affectedRows == 1){
            return res.json("Contacto de proveedor registrado.");
        }
        return res.json("No se pudo registrar el contacto del proveedor.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al agregar nuevo contacto de proveedor", message: error.sqlMessage});       
    }
}

export const editarContactoProveedor = async (req, res) => {
    const {proveedor_id, nombre, telefono, email, es_principal} = req.body;
    const {id} = req.params;
    try{
        const resultado = await updateContactoProveedor(proveedor_id, nombre, telefono, email, es_principal, id);
        if(resultado.affectedRows == 1){
            return res.json("Contacto del proveedor editado");
        }
        return res.json("No se pudo editar el contacto del proveedor.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al editar contacto de proveedor", message: error.sqlMessage});       
    }
}

export const obtenerContactosPorProveedor = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await getConProvByIdProveedor(id);
        return res.json(resultado);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al obtener contactos del proveedor", message: error.sqlMessage});       
    }
}

export const borrarContactoProveedor = async (req, res) => {
    const {id} = req.params;
    try{
        const resultado = await deleteContactoProveedor(id);
        if(resultado.affectedRows == 1){
            return res.json("Contacto de proveedor borrado.");
        }
        return res.json("No se pudo borrar el contacto del proveedor.");
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al borrar contacto del proveedor", message: error.sqlMessage});       
    }
}