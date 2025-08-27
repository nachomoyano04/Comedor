import express from "express";
import { borrarPrecio, crearPrecio, editarPrecio, obtenerPrecioPorInsumo } from "../controllers/precioController.js";

const router = express.Router();

router.get("/:insumo_id", obtenerPrecioPorInsumo);
router.post("/", crearPrecio);
router.put("/:id", editarPrecio);
router.delete("/:id", borrarPrecio);

export default router;