import express from "express";
import { borrarPrecio, crearPrecio, obtenerPrecioPorInsumo, obtenerPrecios } from "../controllers/precioController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); //Middleware de autenticacion con jwt

router.get("/:insumo_id", obtenerPrecioPorInsumo);
router.get("/", obtenerPrecios);
router.post("/", crearPrecio);
router.delete("/:id", borrarPrecio);

export default router;