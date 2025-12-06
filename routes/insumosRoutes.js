import express from "express";
import { activarInsumo, borrarInsumo, editarInsumo, listarInsumos, listarInsumosParaReceta, nuevoInsumo, obtenerInsumo } from "../controllers/insumosController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); //Middleware de autenticacion con jwt

router.get("/", listarInsumos)
router.get("/receta", listarInsumosParaReceta);
router.get("/id/:id", obtenerInsumo);
router.post("/", nuevoInsumo);
router.put("/:id", editarInsumo);
router.patch("/del/:id", borrarInsumo);
router.patch("/act/:id", activarInsumo);

export default router;