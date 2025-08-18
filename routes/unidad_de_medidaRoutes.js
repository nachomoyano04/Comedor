import express from "express";
import {listarUDM, borrarUDM, editarUDM, nuevoUDM} from "../controllers/unidad_de_medidaController.js";
const router = express.Router();

router.get("/", listarUDM);
router.post("/", nuevoUDM);
router.put("/", editarUDM);
router.delete("/", borrarUDM);

export default router;