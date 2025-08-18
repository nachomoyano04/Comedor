import express from "express";
import { borrarInsumo, borrarUDM, editarInsumo, editarUDM, listarInsumos, nuevoInsumo, nuevoUDM } from "../controllers/insumosController.js";

const router = express.Router();

router.get("/", listarInsumos);
router.post("/", nuevoInsumo);
router.put("/", editarInsumo);
router.patch("/", borrarInsumo);
router.post("/udm", nuevoUDM);
router.put("/udm", editarUDM);
router.delete("/udm", borrarUDM);

export default router;