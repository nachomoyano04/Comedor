-- =====================================================================
-- COMEDOR ESCOLAR - ESQUEMA ESTRUCTURAL DDL (SIN DATOS PERSONALES)
-- Versión limpia para despliegue y repositorios públicos
-- Generado conforme a buenas prácticas de privacidad y protección de datos
-- =====================================================================

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- ---------------------------------------------------------------------
-- 1. Catálogos Base (Unidades de Medida y Roles)
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `unidad_de_medida`;
CREATE TABLE `unidad_de_medida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `simbolo` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `unidad_de_medida` WRITE;
INSERT INTO `unidad_de_medida` (`id`, `nombre`, `simbolo`) VALUES 
(1,'kilogramo','kg'),
(2,'litro','lt'),
(3,'gramo','gr'),
(4,'miligramo','mg'),
(5,'centimetros cúbicos','cc'),
(6,'mililitro','ml'),
(7,'unidad','u');
UNLOCK TABLES;

DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero_rol` int NOT NULL,
  `nombre_rol` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_rol` (`numero_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `rol` WRITE;
INSERT INTO `rol` (`id`, `numero_rol`, `nombre_rol`) VALUES 
(1,1,'Administrador'),
(5,2,'Cocina'),
(6,3,'Directivos'),
(7,4,'Comprador');
UNLOCK TABLES;

-- ---------------------------------------------------------------------
-- 2. Entidad Usuario y Relación con Roles (Estructura Vacía)
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `dni` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `cuil` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `correo` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `estado` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `cuil` (`cuil`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `usuario_rol`;
CREATE TABLE `usuario_rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rol_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rol_id_2` (`rol_id`,`usuario_id`),
  KEY `rol_id` (`rol_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `usuario_rol_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
  CONSTRAINT `usuario_rol_ibfk_2` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ---------------------------------------------------------------------
-- 3. Insumos y Proveedores
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `proveedor`;
CREATE TABLE `proveedor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` int NOT NULL,
  `razon_social` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `nombre_fantasia` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `cuit` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `horarios_atencion` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `domicilio` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `localidad` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `estado` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  UNIQUE KEY `cuit` (`cuit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `contacto_proveedor`;
CREATE TABLE `contacto_proveedor` (
  `id_contacto` int NOT NULL AUTO_INCREMENT,
  `proveedor_id` int NOT NULL,
  `nombre_contacto` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono_contacto` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `email_contacto` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `es_principal` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_contacto`),
  KEY `proveedor_id` (`proveedor_id`),
  CONSTRAINT `contacto_proveedor_ibfk_1` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedor` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `insumo`;
CREATE TABLE `insumo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(11) COLLATE utf8mb4_general_ci NOT NULL,
  `producto` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `marca` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `id_unidad_de_medida` int NOT NULL,
  `stock` decimal(10,2) NOT NULL DEFAULT '0.00',
  `estado` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  KEY `id_unidad_de_medida` (`id_unidad_de_medida`),
  CONSTRAINT `insumo_ibfk_1` FOREIGN KEY (`id_unidad_de_medida`) REFERENCES `unidad_de_medida` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `precio`;
CREATE TABLE `precio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `insumo_id` int NOT NULL,
  `proveedor_id` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `fecha_desde` datetime NOT NULL,
  `fecha_hasta` datetime DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `cantidad` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `insumo_id` (`insumo_id`),
  KEY `proveedor_id` (`proveedor_id`),
  CONSTRAINT `precio_ibfk_1` FOREIGN KEY (`insumo_id`) REFERENCES `insumo` (`id`),
  CONSTRAINT `precio_ibfk_2` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ---------------------------------------------------------------------
-- 4. Recetas y Producción
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `receta`;
CREATE TABLE `receta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` varchar(400) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha` datetime NOT NULL,
  `cuantos_comen` int NOT NULL DEFAULT '1',
  `estado` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `receta_insumo`;
CREATE TABLE `receta_insumo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `receta_id` int NOT NULL,
  `insumo_id` int NOT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `receta_id` (`receta_id`),
  KEY `insumo_id` (`insumo_id`),
  CONSTRAINT `receta_insumo_ibfk_1` FOREIGN KEY (`insumo_id`) REFERENCES `insumo` (`id`),
  CONSTRAINT `receta_insumo_ibfk_2` FOREIGN KEY (`receta_id`) REFERENCES `receta` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `produccion`;
CREATE TABLE `produccion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `receta_id` int NOT NULL,
  `fecha` datetime NOT NULL,
  `cantidad_producida` int NOT NULL,
  `costo_primo_total` decimal(10,2) NOT NULL,
  `turno` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `cantidad_comensales` int NOT NULL,
  `estado` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `receta_id` (`receta_id`),
  CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`receta_id`) REFERENCES `receta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `produccion_insumo`;
CREATE TABLE `produccion_insumo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produccion_id` int NOT NULL,
  `insumo_id` int NOT NULL,
  `cantidad_usada` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `produccion_id` (`produccion_id`),
  KEY `insumo_id` (`insumo_id`),
  CONSTRAINT `produccion_insumo_ibfk_1` FOREIGN KEY (`insumo_id`) REFERENCES `insumo` (`id`),
  CONSTRAINT `produccion_insumo_ibfk_2` FOREIGN KEY (`produccion_id`) REFERENCES `produccion` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
