-- =====================================================================
-- COMEDOR ESCOLAR - DATOS SINTÉTICOS PARA DESARROLLO Y TESTING (SEED)
-- Cumple con normativas de protección de datos personales.
-- No contiene nombres reales, teléfonos reales, DNI de terceros ni correos reales.
-- Utiliza dominios reservados para pruebas (RFC 2606: @example.com)
-- =====================================================================

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
-- Usuario Admin de pruebas (DNI: 44480378, Clave: 44480378)
-- Contraseña hasheada con Argon2id correspondiente al valor de prueba "44480378"
INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `dni`, `cuil`, `telefono`, `correo`, `password`, `estado`) VALUES 
(1, 'Admin', 'Sistema', '44480378', '20-44480378-9', '555-0100', 'admin@example.com', '$argon2id$v=19$m=65536,t=3,p=1$2+9b9lKx8gI85r0hP4dttg$iLYZUCTkwB3d2cp6oZboWQp2qAiKkd4OR0y+RfaiVEA', 1),
(2, 'Cocina', 'Operador', '10000002', '20-10000002-9', '555-0102', 'cocina@example.com', '$argon2id$v=19$m=65536,t=3,p=1$2+9b9lKx8gI85r0hP4dttg$iLYZUCTkwB3d2cp6oZboWQp2qAiKkd4OR0y+RfaiVEA', 1),
(3, 'Directivo', 'Escuela', '10000003', '20-10000003-9', '555-0103', 'directivo@example.com', '$argon2id$v=19$m=65536,t=3,p=1$2+9b9lKx8gI85r0hP4dttg$iLYZUCTkwB3d2cp6oZboWQp2qAiKkd4OR0y+RfaiVEA', 1),
(4, 'Comprador', 'Abastecimiento', '10000004', '20-10000004-9', '555-0104', 'compras@example.com', '$argon2id$v=19$m=65536,t=3,p=1$2+9b9lKx8gI85r0hP4dttg$iLYZUCTkwB3d2cp6oZboWQp2qAiKkd4OR0y+RfaiVEA', 1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `usuario_rol` WRITE;
/*!40000 ALTER TABLE `usuario_rol` DISABLE KEYS */;
-- Asignación de roles:
-- Usuario 1 (Admin) -> Rol 1 (Admin)
-- Usuario 2 (Cocina) -> Rol 5 (Cocina)
-- Usuario 3 (Directivo) -> Rol 6 (Directivos)
-- Usuario 4 (Comprador) -> Rol 7 (Comprador)
INSERT INTO `usuario_rol` (`id`, `rol_id`, `usuario_id`) VALUES 
(1, 1, 1),
(2, 5, 2),
(3, 6, 3),
(4, 7, 4);
/*!40000 ALTER TABLE `usuario_rol` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` (`id`, `codigo`, `razon_social`, `nombre_fantasia`, `cuit`, `horarios_atencion`, `domicilio`, `localidad`, `email`, `estado`) VALUES 
(1, 201, 'Distribuidora Central S.A.', 'Central Alimentos', '30-11223344-5', '8am-6pm', 'Calle Falsa 123', 'Ciudad Modelo', 'ventas@example.com', 1),
(2, 202, 'Lácteos del Sur S.R.L.', 'Lácteos Sur', '30-22334455-6', '8am-4pm', 'Av. Siempre Viva 742', 'Ciudad Modelo', 'pedidos@example.com', 1);
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `contacto_proveedor` WRITE;
/*!40000 ALTER TABLE `contacto_proveedor` DISABLE KEYS */;
INSERT INTO `contacto_proveedor` (`id_contacto`, `proveedor_id`, `nombre_contacto`, `telefono_contacto`, `email_contacto`, `es_principal`) VALUES 
(1, 1, 'Representante de Ventas 1', '555-0201', 'rep1@example.com', 1),
(2, 2, 'Representante de Ventas 2', '555-0202', 'rep2@example.com', 1);
/*!40000 ALTER TABLE `contacto_proveedor` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `insumo` WRITE;
/*!40000 ALTER TABLE `insumo` DISABLE KEYS */;
INSERT INTO `insumo` (`id`, `codigo`, `producto`, `marca`, `id_unidad_de_medida`, `stock`, `estado`) VALUES 
(1, '101', 'Harina 0000', 'Genérica', 1, 50.00, 1),
(2, '102', 'Queso Cremoso', 'Genérica', 1, 25.00, 1),
(3, '103', 'Salsa de Tomate', 'Genérica', 2, 30.00, 1),
(4, '104', 'Leche Entera', 'Genérica', 2, 20.00, 1);
/*!40000 ALTER TABLE `insumo` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `precio` WRITE;
/*!40000 ALTER TABLE `precio` DISABLE KEYS */;
INSERT INTO `precio` (`id`, `insumo_id`, `proveedor_id`, `precio_unitario`, `fecha_desde`, `fecha_hasta`, `fecha_vencimiento`, `cantidad`) VALUES 
(1, 1, 1, 1200.50, '2026-01-01 08:00:00', NULL, '2026-12-31', 50.00),
(2, 2, 1, 4500.00, '2026-01-01 08:00:00', NULL, '2026-10-31', 25.00),
(3, 3, 1, 850.00, '2026-01-01 08:00:00', NULL, '2026-11-30', 30.00);
/*!40000 ALTER TABLE `precio` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `receta` WRITE;
/*!40000 ALTER TABLE `receta` DISABLE KEYS */;
INSERT INTO `receta` (`id`, `nombre`, `descripcion`, `fecha`, `cuantos_comen`, `estado`) VALUES 
(2, 'Pizza de Muzzarella', 'Receta base de prueba para comensales escolares', '2026-01-01 10:00:00', 10, 1);
/*!40000 ALTER TABLE `receta` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `receta_insumo` WRITE;
/*!40000 ALTER TABLE `receta_insumo` DISABLE KEYS */;
INSERT INTO `receta_insumo` (`id`, `receta_id`, `insumo_id`, `cantidad`) VALUES 
(1, 2, 1, 2.00),
(2, 2, 2, 1.50),
(3, 2, 3, 0.80);
/*!40000 ALTER TABLE `receta_insumo` ENABLE KEYS */;
UNLOCK TABLES;
