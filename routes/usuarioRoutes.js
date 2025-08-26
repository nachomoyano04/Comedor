import express from "express";
import { borrarUsuario, buscarUsuarioPorDni, cambiarPassword, cambiarRol, editarUsuario, nuevoRolAUsuario, nuevoUsuario, obtenerUsuarios, obtenerUsuariosPorRol } from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", nuevoUsuario);
router.put("/:id", editarUsuario);
router.patch("/:id", borrarUsuario);
router.patch("/pass/:id", cambiarPassword);
router.post("/rol", nuevoRolAUsuario);
router.get("/rol/:rol_id", obtenerUsuariosPorRol);
router.get("/dni/:dni", buscarUsuarioPorDni);
router.patch("/rol/:rol_id/cambiar/:id", cambiarRol);

export default router;