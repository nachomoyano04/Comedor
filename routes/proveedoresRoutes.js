import express from "express";
import { borrarContactoProveedor, obtenerProveedor, borrarProveedor, activarProveedor, editarContactoProveedor, editarProveedor, nuevoContactoProveedor, nuevoProveedor, obtenerContactosPorProveedor, obtenerProveedores } from "../controllers/proveedoresController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); //Middleware de autenticacion con jwt

router.get("/", obtenerProveedores);
router.get("/:id", obtenerProveedor);
router.post("/", nuevoProveedor);
router.put("/:id", editarProveedor);
router.patch("/del/:id", borrarProveedor);
router.patch("/alt/:id", activarProveedor);
router.get("/contacto/:id", obtenerContactosPorProveedor);
router.post("/contacto", nuevoContactoProveedor);
router.put("/contacto/:id", editarContactoProveedor);
router.delete("/contacto/:id_contacto", borrarContactoProveedor);

export default router;