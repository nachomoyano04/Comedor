import express from "express";
import { agregarInsumoALaProduccion, editarProduccion, eliminarInsumoDeProduccion, modificarInsumoDeProduccion, nuevaProduccion, obtenerProducciones } from "../controllers/produccionController.js";

const router = express.Router();

router.get("/", obtenerProducciones);
router.post("/", nuevaProduccion);
router.put("/:id", editarProduccion);
router.post("/insumo", agregarInsumoALaProduccion);
router.put("/insumo/:id", modificarInsumoDeProduccion);
router.delete("/insumo/:id", eliminarInsumoDeProduccion);

export default router;