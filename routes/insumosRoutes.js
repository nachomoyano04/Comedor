import express from "express";
import { activarInsumo, borrarInsumo, editarInsumo, listarInsumos, nuevoInsumo } from "../controllers/insumosController.js";

const router = express.Router();

router.get("/", listarInsumos);
router.post("/", nuevoInsumo);
router.put("/:id", editarInsumo);
router.patch("/del/:id", borrarInsumo);
router.patch("/act/:id", activarInsumo);

export default router;