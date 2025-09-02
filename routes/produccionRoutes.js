import express from "express";
import { agregarInsumoALaProduccion, altaBajaProduccion, editarProduccion, eliminarInsumoDeProduccion, modificarInsumoDeProduccion, nuevaProduccion, obtenerProducciones, insumosPorProduccion, calcularCostoPrimoTotal } from "../controllers/produccionController.js";

const router = express.Router();

router.get("/", obtenerProducciones);
router.post("/", nuevaProduccion);
router.put("/:id", editarProduccion);
router.patch("/:id/estado/:num", altaBajaProduccion);
router.get("/cpt/:id", calcularCostoPrimoTotal);
router.get("/insumo/:id", insumosPorProduccion);
router.post("/insumo", agregarInsumoALaProduccion);
router.put("/insumo/:id", modificarInsumoDeProduccion);
router.delete("/insumo/:id", eliminarInsumoDeProduccion);

export default router;