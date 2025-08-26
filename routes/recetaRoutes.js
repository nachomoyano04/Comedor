import express from "express";
import { agregarInsumoAReceta, borrarInsumoDeReceta, borrarReceta, editarReceta, modificarInsumoDeReceta, nuevaReceta, obtenerRecetas } from "../controllers/recetaController.js";

const router = express.Router();

router.get("/", obtenerRecetas);
router.post("/", nuevaReceta);
router.put("/:id", editarReceta);
router.patch("/:id", borrarReceta);
router.post("/insumo", agregarInsumoAReceta);
router.put("/insumo/:id", modificarInsumoDeReceta);
router.delete("/insumo/:id", borrarInsumoDeReceta);

export default router;