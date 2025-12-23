import express from "express";
import { activarUsuario, borrarUsuario, buscarUsuarioPorDni, cambiarPassword, cambiarRol, editarUsuario, eliminar_token_refresh, loginUsuario, nuevoRolAUsuario, nuevoUsuario, obtenerUsuarios, obtenerUsuariosPorRol, renovar_token } from "../controllers/usuarioController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.post("/login", loginUsuario)
router.post("/auth/refresh", renovar_token)
router.post("/auth/logout", eliminar_token_refresh)

router.use(authMiddleware); //Middleware de autenticacion con jwt

router.patch("/pass/:id", cambiarPassword);
router.put("/:id", editarUsuario);
router.get("/dni/:dni", buscarUsuarioPorDni);
router.get("/rol/:rol_id", obtenerUsuariosPorRol);

router.use(roleMiddleware([ROLES.ADMIN]));

router.get("/", obtenerUsuarios);
router.post("/", nuevoUsuario);
router.patch("/del/:id", borrarUsuario);
router.patch("/alt/:id", activarUsuario);
router.post("/rol", nuevoRolAUsuario);
router.patch("/rol/:rol_id/cambiar/:id", cambiarRol); // <- ver si realmente nos sirve. Como puede ser mas de un rol...

export default router;