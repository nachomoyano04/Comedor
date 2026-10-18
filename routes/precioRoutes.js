import express from "express";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { borrarPrecio, crearPrecio, obtenerAlertasVencimiento, obtenerPrecioPorInsumo, obtenerPrecios, obtenerTodasLasCompras } from "../controllers/precioController.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/vencimientos/alertas", obtenerAlertasVencimiento);
router.get("/historial/todas", obtenerTodasLasCompras);
router.get("/", obtenerPrecios);
router.get("/:insumo_id", obtenerPrecioPorInsumo);

router.use(roleMiddleware([ROLES.ADMIN, ROLES.COMPRADOR, ROLES.COCINA]));
router.post("/", crearPrecio);
router.delete("/:id", borrarPrecio);

export default router;