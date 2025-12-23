import express from "express";
import { activarReceta, agregarInsumoAReceta, borrarInsumoDeReceta, darDeBajaReceta, editarReceta, modificarInsumoDeReceta, nuevaReceta, obtenerRecetaPorId, obtenerRecetas } from "../controllers/recetaController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.use(authMiddleware); //Middleware de autenticacion con jwt


router.get("/", obtenerRecetas);
router.get("/:id", obtenerRecetaPorId);

router.use(roleMiddleware([ROLES.ADMIN, ROLES.COCINA]));

router.post("/", nuevaReceta);
router.put("/:id", editarReceta);
router.patch("/del/:id", darDeBajaReceta);
router.patch("/alt/:id", activarReceta);
router.post("/insumo", agregarInsumoAReceta);
router.put("/insumo/:id", modificarInsumoDeReceta);
router.delete("/insumo/:id", borrarInsumoDeReceta);

export default router;