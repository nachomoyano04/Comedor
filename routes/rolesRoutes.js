import express from "express";
import { borrarRol, editarRol, listarRoles, listarRolesPorUsuario, nuevoRol } from "../controllers/rolesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.use(authMiddleware); //Middleware de autenticacion con jwt

router.use(roleMiddleware([ROLES.ADMIN]));

router.get("/", listarRoles);
router.get("/usuario/:usuario_id", listarRolesPorUsuario);
router.post("/", nuevoRol);
router.put("/:id", editarRol);
router.delete("/:id", borrarRol);

export default router;