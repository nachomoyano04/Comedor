import {
  activateReceta,
  deleteReceta,
  getRecetaById,
  getRecetas,
  insertReceta,
  updateReceta,
} from "../models/receta.js";
import {
  deleteInsumosDeReceta,
  deleteReceta_Insumo,
  insertReceta_Insumo,
  updateReceta_Insumo,
} from "../models/receta-insumo.js";
import dayjs from "dayjs";
import pool from "../config/database.js";

export const nuevaReceta = async (req, res) => {
  const { nombre, descripcion, cuantos_comen, insumo } = req.body;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const fecha = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const estado = 1;
    const receta = { 
      nombre: String(nombre || "").trim(), 
      descripcion: String(descripcion || "").trim(), 
      cuantos_comen: Number(cuantos_comen) || 1, 
      fecha, 
      estado 
    };
    const id = await insertReceta(receta, connection);
    if (Array.isArray(insumo)) {
      for (const i of insumo) {
        const insumo_id = i.value || i.insumo_id;
        const cantidad = Number(i.cantidad);
        if (insumo_id && cantidad > 0) {
          const receta_insumo = {
            receta_id: id,
            insumo_id,
            cantidad,
          };
          await insertReceta_Insumo(receta_insumo, connection);
        }
      }
    }
    await connection.commit();
    return res.json("Receta registrada con éxito.");
  } catch (error) {
    await connection.rollback();
    console.log(error);
    return res.status(500).json({ error: "Error al registrar nueva receta: " + (error.sqlMessage || error.message) });
  } finally {
    connection.release();
  }
};

export const obtenerRecetas = async (req, res) => {
  try {
    const resultado = await getRecetas();
    return res.json(resultado);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener recetas" });
  }
};

export const obtenerRecetaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await getRecetaById(id);
    return res.json(resultado);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener receta" });
  }
};

export const editarReceta = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, cuantos_comen, insumo } = req.body;
  const connection = await pool.getConnection();
  try {
    await updateReceta(String(nombre || "").trim(), String(descripcion || "").trim(), Number(cuantos_comen) || 1, id, connection);
    await deleteInsumosDeReceta(id, connection);
    if (Array.isArray(insumo)) {
      for (const i of insumo) {
        const insumo_id = i.value || i.insumo_id;
        const cantidad = Number(i.cantidad);
        if (insumo_id && cantidad > 0) {
          const receta_insumo = {
            receta_id: id,
            insumo_id,
            cantidad,
          };
          await insertReceta_Insumo(receta_insumo, connection);
        }
      }
    }
    await connection.commit();
    return res.json("Receta editada.");
  } catch (error) {
    await connection.rollback();
    console.log(error);
    return res.status(500).json({ error: "Error al editar receta: " + (error.sqlMessage || error.message) });
  } finally {
    connection.release();
  }
};

export const darDeBajaReceta = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await deleteReceta(id);
    if (resultado.affectedRows == 1) {
      return res.json("Receta dada de baja.");
    }
    return res.json("No se pudo dar de baja la receta");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al dar de baja la receta" });
  }
};

export const activarReceta = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await activateReceta(id);
    if (resultado.affectedRows == 1) {
      return res.json("Receta dada de alta.");
    }
    return res.json("No se pudo dar de alta la receta");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al dar de alta la receta" });
  }
};

export const agregarInsumoAReceta = async (req, res) => {
  const receta_insumo = req.body;
  try {
    const resultado = await insertReceta_Insumo(receta_insumo);
    if (resultado.affectedRows == 1) {
      return res.json("Insumo agregado a la receta.");
    }
    return res.json("No se pudo agregar el insumo a la receta");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al agregar insumo a receta" });
  }
};

export const modificarInsumoDeReceta = async (req, res) => {
  const { receta_id, insumo_id, cantidad } = req.body;
  const { id } = req.params;
  try {
    const resultado = await updateReceta_Insumo(
      receta_id,
      insumo_id,
      cantidad,
      id,
    );
    if (resultado.affectedRows == 1) {
      return res.json("Insumo de receta modificado");
    }
    return res.json("No se pudo modificar el insumo de la receta");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error al modificar insumo de receta" });
  }
};
export const borrarInsumoDeReceta = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await deleteReceta_Insumo(id);
    if (resultado.affectedRows == 1) {
      return res.json("Insumo borrado de la receta.");
    }
    return res.json("No se pudo borrar el insumo de la receta");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al borrar insumo de receta" });
  }
};
