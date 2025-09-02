import express from "express";
import { activarUsuario, borrarUsuario, buscarUsuarioPorDni, cambiarPassword, cambiarRol, editarUsuario, loginUsuario, nuevoRolAUsuario, nuevoUsuario, obtenerUsuarios, obtenerUsuariosPorRol } from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", nuevoUsuario);
router.put("/:id", editarUsuario);
router.patch("/del/:id", borrarUsuario);
router.patch("/alt/:id", activarUsuario);
router.patch("/pass/:id", cambiarPassword);
router.get("/dni/:dni", buscarUsuarioPorDni);
router.post("/rol", nuevoRolAUsuario);
router.get("/rol/:rol_id", obtenerUsuariosPorRol);
router.patch("/rol/:rol_id/cambiar/:id", cambiarRol);
router.post("/login", loginUsuario)

export default router;