import express from "express";
import { activarReceta, agregarInsumoAReceta, borrarInsumoDeReceta, darDeBajaReceta, editarReceta, modificarInsumoDeReceta, nuevaReceta, obtenerRecetaPorId, obtenerRecetas } from "../controllers/recetaController.js";

const router = express.Router();

router.get("/", obtenerRecetas);
router.get("/:id", obtenerRecetaPorId);
router.post("/", nuevaReceta);
router.put("/:id", editarReceta);
router.patch("/del/:id", darDeBajaReceta);
router.patch("/alt/:id", activarReceta);
router.post("/insumo", agregarInsumoAReceta);
router.put("/insumo/:id", modificarInsumoDeReceta);
router.delete("/insumo/:id", borrarInsumoDeReceta);

export default router;