import express from "express";
import {listarUDM, borrarUDM, editarUDM, nuevoUDM} from "../controllers/unidad_de_medidaController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";
const router = express.Router();

router.use(authMiddleware); //Middleware de autenticacion con jwt

router.get("/", listarUDM);

router.use(roleMiddleware([ROLES.ADMIN]));

router.post("/", nuevoUDM);
router.put("/:id", editarUDM);
router.delete("/:id", borrarUDM);

export default router;