import express from "express";
import { borrarRol, editarRol, listarRoles, listarRolesPorUsuario, nuevoRol } from "../controllers/rolesController.js";

const router = express.Router();

router.get("/", listarRoles);
router.get("/usuario/:usuario_id", listarRolesPorUsuario);
router.post("/", nuevoRol);
router.put("/:id", editarRol);
router.delete("/:id", borrarRol);

export default router;