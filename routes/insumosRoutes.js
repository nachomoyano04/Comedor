import express from "express";
import { activarInsumo, borrarInsumo, editarInsumo, listarInsumos, listarInsumosParaReceta, nuevoInsumo, obtenerInsumo } from "../controllers/insumosController.js";

const router = express.Router();

router.get("/", listarInsumos)
router.get("/receta", listarInsumosParaReceta);
router.get("/id/:id", obtenerInsumo);
router.post("/", nuevoInsumo);
router.put("/:id", editarInsumo);
router.patch("/del/:id", borrarInsumo);
router.patch("/act/:id", activarInsumo);

export default router;