import express from "express";
import { agregarInsumoALaProduccion, altaBajaProduccion, editarProduccion, modificarInsumoDeProduccion, nuevaProduccion, obtenerProducciones, insumosPorProduccion, calcularCostoPrimoTotal, obtenerProduccionPorId } from "../controllers/produccionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.use(authMiddleware); //Middleware de autenticacion con jwt

// Rutas de consulta / lectura: disponibles para Administrador, Cocina y Directivos (para métricas y reportes)
router.get("/", roleMiddleware([ROLES.ADMIN, ROLES.COCINA, ROLES.DIRECTIVOS]), obtenerProducciones);
router.get("/:id", roleMiddleware([ROLES.ADMIN, ROLES.COCINA, ROLES.DIRECTIVOS]), obtenerProduccionPorId);
router.get("/cpt/:id", roleMiddleware([ROLES.ADMIN, ROLES.COCINA, ROLES.DIRECTIVOS]), calcularCostoPrimoTotal);
router.get("/insumo/:id", roleMiddleware([ROLES.ADMIN, ROLES.COCINA, ROLES.DIRECTIVOS]), insumosPorProduccion);

// Rutas de escritura y modificación: restringidas a Cocina y Administrador
router.use(roleMiddleware([ROLES.ADMIN, ROLES.COCINA]));

router.post("/", nuevaProduccion);
router.put("/:id", editarProduccion);
router.patch("/:id/estado/:num", altaBajaProduccion);
router.post("/insumo", agregarInsumoALaProduccion);
router.put("/insumo/:id", modificarInsumoDeProduccion);

export default router;