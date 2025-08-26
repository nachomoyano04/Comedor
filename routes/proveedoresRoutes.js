import express from "express";
import { borrarContactoProveedor, borrarProveedor, activarProveedor, editarContactoProveedor, editarProveedor, nuevoContactoProveedor, nuevoProveedor, obtenerContactosPorProveedor, obtenerProveedores } from "../controllers/proveedoresController.js";

const router = express.Router();

router.get("/", obtenerProveedores);
router.post("/", nuevoProveedor);
router.put("/:id", editarProveedor);
router.patch("/del/:id", borrarProveedor);
router.patch("/alt/:id", activarProveedor);
router.get("/contacto/:id", obtenerContactosPorProveedor);
router.post("/contacto", nuevoContactoProveedor);
router.put("/contacto/:id", editarContactoProveedor);
router.delete("/contacto/:id", borrarContactoProveedor);

export default router;