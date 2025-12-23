import express from "express";
import { agregarInsumoALaProduccion, altaBajaProduccion, editarProduccion, modificarInsumoDeProduccion, nuevaProduccion, obtenerProducciones, insumosPorProduccion, calcularCostoPrimoTotal, obtenerProduccionPorId } from "../controllers/produccionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.use(authMiddleware); //Middleware de autenticacion con jwt

router.use(roleMiddleware([ROLES.ADMIN, ROLES.COCINA]));

router.get("/", obtenerProducciones);
router.get("/:id", obtenerProduccionPorId);
router.post("/", nuevaProduccion);
router.put("/:id", editarProduccion);
router.patch("/:id/estado/:num", altaBajaProduccion);
router.get("/cpt/:id", calcularCostoPrimoTotal);
router.get("/insumo/:id", insumosPorProduccion);
router.post("/insumo", agregarInsumoALaProduccion);
router.put("/insumo/:id", modificarInsumoDeProduccion);

export default router;