import express from "express";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { borrarPrecio, crearPrecio, obtenerPrecioPorInsumo, obtenerPrecios } from "../controllers/precioController.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/:insumo_id", obtenerPrecioPorInsumo);
router.get("/", obtenerPrecios);

router.use(roleMiddleware([ROLES.ADMIN, ROLES.COMPRADOR]));
router.post("/", crearPrecio);
router.delete("/:id", borrarPrecio);

export default router;