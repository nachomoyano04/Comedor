import express from "express";
import { borrarInsumo, editarInsumo, listarInsumos, nuevoInsumo } from "../controllers/insumosController.js";

const router = express.Router();

router.get("/", listarInsumos);
router.post("/", nuevoInsumo);
router.put("/", editarInsumo);
router.patch("/", borrarInsumo);

export default router;