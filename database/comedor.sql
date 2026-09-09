-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: comedor
-- ------------------------------------------------------
-- Server version	8.0.46-0ubuntu0.24.04.4

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

--
-- Table structure for table `contacto_proveedor`
--

DROP TABLE IF EXISTS `contacto_proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacto_proveedor` (
  `id_contacto` int NOT NULL AUTO_INCREMENT,
  `proveedor_id` int NOT NULL,
  `nombre_contacto` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono_contacto` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `email_contacto` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `es_principal` int NOT NULL,
  PRIMARY KEY (`id_contacto`),
  KEY `proveedor_id` (`proveedor_id`),
  CONSTRAINT `contacto_proveedor_ibfk_1` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacto_proveedor`
--

LOCK TABLES `contacto_proveedor` WRITE;
/*!40000 ALTER TABLE `contacto_proveedor` DISABLE KEYS */;
INSERT INTO `contacto_proveedor` VALUES (18,3,'Humberto Illia','2578234','illia@gmail.com',0);
/*!40000 ALTER TABLE `contacto_proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insumo`
--

DROP TABLE IF EXISTS `insumo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insumo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(11) COLLATE utf8mb4_general_ci NOT NULL,
  `producto` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `marca` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `id_unidad_de_medida` int NOT NULL,
  `stock` int NOT NULL,
  `estado` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  KEY `id_unidad_de_medida` (`id_unidad_de_medida`),
  CONSTRAINT `insumo_ibfk_1` FOREIGN KEY (`id_unidad_de_medida`) REFERENCES `unidad_de_medida` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insumo`
--

LOCK TABLES `insumo` WRITE;
/*!40000 ALTER TABLE `insumo` DISABLE KEYS */;
INSERT INTO `insumo` VALUES (1,'101','Harina 0000','Purezas',1,22,1),(2,'1012','Queso cremoso','Sancor  ',1,25,1),(3,'103','Salsa de tomate','Arcor',2,112,1),(4,'10','Leche','La Serenísima',2,3,1),(5,'105','Chocolate Blanco','Águila',3,1,1),(6,'106','Harina de avena','Tisar',1,0,1),(7,'9997','Salchicha','Viennisima',7,0,1),(8,'9994','Morcilla','Carlitos',1,1,1),(9,'1121','Harina de maiz','Tisar',1,2,1),(11,'5783','Fideos','Luccetti',4,0,1),(13,'1221','Harina de pejerrey','Tisar',1,0,1),(14,'5742123','Fideos moñitos','mataaa',7,11,1),(15,'10134','Mate Cocido','La virginia',7,0,1),(16,'5413','Membrillo','Dulcor',4,0,1),(17,'876','Levadura','Fresca',1,20,1),(18,'7465','Sal','Dos Anclas',1,400,1),(19,'3846','Paleta','Paladini',1,5,1),(20,'6389','Queso en barra','Paladini',1,10,1),(21,'657','Grasa','Arcor',1,10,1),(22,'10121','Pera','Bolivianita',4,0,1),(23,'59321','Chocolate en polvo','Nesquik',4,41,1);
/*!40000 ALTER TABLE `insumo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `precio`
--

DROP TABLE IF EXISTS `precio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `precio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `insumo_id` int NOT NULL,
  `proveedor_id` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `fecha_desde` datetime NOT NULL,
  `fecha_hasta` datetime DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `insumo_id` (`insumo_id`),
  KEY `proveedor_id` (`proveedor_id`),
  CONSTRAINT `precio_ibfk_1` FOREIGN KEY (`insumo_id`) REFERENCES `insumo` (`id`),
  CONSTRAINT `precio_ibfk_2` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `precio`
--

LOCK TABLES `precio` WRITE;
/*!40000 ALTER TABLE `precio` DISABLE KEYS */;
INSERT INTO `precio` VALUES (2,2,1,7000.45,'2025-08-30 14:25:01','2025-11-16 16:02:18',NULL,0),(3,3,1,4000.00,'2025-08-30 14:25:13','2025-12-22 11:46:37',NULL,0),(5,6,1,6570.33,'2025-08-30 13:14:33',NULL,NULL,0),(18,1,1,100.00,'2025-10-12 17:11:40','2025-11-18 23:38:14',NULL,8),(19,1,2,2500.00,'2025-10-12 17:57:21',NULL,NULL,4),(23,4,2,2500.00,'2025-10-23 15:13:29',NULL,NULL,3),(24,9,2,2000.00,'2025-10-23 15:14:13',NULL,NULL,2),(25,8,1,2500.00,'2025-10-26 20:51:12',NULL,NULL,1),(26,5,2,100.00,'2025-10-27 19:14:32',NULL,NULL,1),(27,17,1,1000.00,'2025-10-28 09:19:19',NULL,NULL,20),(28,18,2,400.00,'2025-10-28 09:20:02',NULL,NULL,400),(29,19,3,500.00,'2025-10-28 09:20:25',NULL,NULL,5),(31,20,4,11500.00,'2025-10-28 09:22:42',NULL,NULL,10),(32,21,1,500.00,'2025-10-28 09:23:30',NULL,NULL,10),(33,14,2,2500.00,'2025-10-29 19:08:12',NULL,NULL,11),(34,2,3,100.00,'2025-10-31 10:10:58',NULL,NULL,5),(35,3,2,2000.00,'2025-10-31 10:12:19',NULL,NULL,100),(37,23,1,200.00,'2025-11-12 05:27:00','2025-11-16 12:49:03',NULL,10),(39,23,2,1000.00,'2025-11-12 05:48:00',NULL,NULL,1),(40,23,3,3000.00,'2025-11-16 12:48:00',NULL,NULL,30),(41,2,2,2000.00,'2025-11-16 16:02:00',NULL,NULL,20),(42,1,1,4000.00,'2025-11-18 23:37:00',NULL,'2026-11-16',10),(44,3,3,200.00,'2025-12-22 11:46:00',NULL,'2026-09-16',12);
/*!40000 ALTER TABLE `precio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produccion`
--

DROP TABLE IF EXISTS `produccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produccion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `receta_id` int NOT NULL,
  `fecha` datetime NOT NULL,
  `cantidad_producida` int NOT NULL,
  `costo_primo_total` decimal(10,2) NOT NULL,
  `turno` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `cantidad_comensales` int NOT NULL,
  `estado` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `receta_id` (`receta_id`),
  CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`receta_id`) REFERENCES `receta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produccion`
--

LOCK TABLES `produccion` WRITE;
/*!40000 ALTER TABLE `produccion` DISABLE KEYS */;
INSERT INTO `produccion` VALUES (2,3,'2025-10-23 16:33:19',1,21751.08,'mañana',2,1),(4,2,'2025-10-26 22:51:00',15,39871.69,'noche',30,1),(5,2,'2025-10-26 21:01:01',2,6600.23,'noche',6,1),(7,4,'2025-10-27 21:16:00',3,8784.40,'noche',38,1),(10,8,'2025-10-28 09:23:00',5,31780.00,'tarde',5,1),(11,4,'2025-10-29 10:07:00',222,650045.30,'mañana',123,1),(12,4,'2025-10-29 15:18:00',12,35497.58,'mañana',202,0),(13,2,'2025-10-31 15:31:00',2,26670.66,'',2,1),(14,4,'2025-11-11 14:59:00',5,18973.66,'mañana',212,1),(15,3,'2025-11-13 00:58:00',10,80303.30,'tarde',10,1),(16,3,'2025-11-12 03:41:00',19,98610.00,'mañana',19,1),(17,3,'2025-11-16 16:03:00',10,49500.00,'tarde',10,1);
/*!40000 ALTER TABLE `produccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produccion_insumo`
--

DROP TABLE IF EXISTS `produccion_insumo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produccion_insumo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produccion_id` int NOT NULL,
  `insumo_id` int NOT NULL,
  `cantidad_usada` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `produccion_id` (`produccion_id`),
  KEY `insumo_id` (`insumo_id`),
  CONSTRAINT `produccion_insumo_ibfk_1` FOREIGN KEY (`insumo_id`) REFERENCES `insumo` (`id`),
  CONSTRAINT `produccion_insumo_ibfk_2` FOREIGN KEY (`produccion_id`) REFERENCES `produccion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produccion_insumo`
--

LOCK TABLES `produccion_insumo` WRITE;
/*!40000 ALTER TABLE `produccion_insumo` DISABLE KEYS */;
INSERT INTO `produccion_insumo` VALUES (5,2,4,1.50),(6,2,2,2.40),(7,2,9,0.60),(13,5,2,0.50),(14,5,3,0.40),(15,5,8,0.60),(33,7,4,0.30),(34,7,5,1.50),(35,7,6,1.20),(42,4,1,1.80),(43,4,2,3.75),(44,4,3,3.00),(63,10,1,2.50),(64,10,17,3.25),(65,10,18,1.95),(66,10,19,3.50),(67,10,20,2.00),(68,10,21,1.50),(78,11,4,22.20),(79,11,5,111.00),(80,11,6,88.80),(103,13,9,0.90),(104,13,20,1.02),(105,13,6,2.00),(134,12,4,1.20),(135,12,5,6.00),(136,12,2,3.60),(137,12,6,4.80),(142,14,1,5.00),(143,14,4,0.50),(144,14,5,0.83),(145,14,6,2.00),(159,15,2,20.00),(160,15,4,5.00),(161,15,5,1.00),(162,15,6,10.00),(166,16,2,45.60),(167,16,4,28.50),(168,16,9,11.40),(178,17,4,15.00),(179,17,9,6.00);
/*!40000 ALTER TABLE `produccion_insumo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  `estado` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  UNIQUE KEY `cuit` (`cuit`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,201,'Distribuidora Porkys','Porky\'s','4123','8am-10pms','Av. Mitre 301','Villa Mercedes, San Luis','azucarledesma@gmail.com	',1),(2,202,'Distribuidora Ledesma','Azúcar Ledesma','6372','8am-12pm y 4pm-11pm','Av. 25 de mayo','Villa Mercedes, San Luiss','azucarledesma@gmail.com',1),(3,203,'La Serenisima','La Serenisima lacteos','20002','09 a 21','San justino 3','San justo','lase@gmail.com',1),(4,204,'Las ramonas SRL','Las Ramons','2-12123213-4','08 a 22','San justino 4','San justo','lasramonas@gmail.com',1),(5,5223,'Proveeduria 3 chanchitos','Los 3 chanchitos','234-5435-234','Lun a juev: 12 a 23','Carlos Menem 412','San Clemente del Tuyú','3chanchitos@gmail.com',1),(6,5829,'Panadería La Celeste S.A.','La Celeste','23-4325234-3','Todos los días 24hs ','Ob. Trejo 124','Cordoba','laceleste@gmail.com',1);
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receta`
--

DROP TABLE IF EXISTS `receta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` varchar(400) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha` datetime NOT NULL,
  `cuantos_comen` int NOT NULL DEFAULT '1',
  `estado` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receta`
--

LOCK TABLES `receta` WRITE;
/*!40000 ALTER TABLE `receta` DISABLE KEYS */;
INSERT INTO `receta` VALUES (2,'Pizza','Pizza casera de 32 porciones','2025-10-14 13:18:37',1,1),(3,'Chocolatada','Chocolatada sin sugar','2025-10-14 15:20:49',1,1),(4,'Galletas de avena','Saludables con chocolate blanco','2025-10-14 18:57:59',1,1),(5,'Panchos','Panchos sin pan','2025-10-15 16:17:03',1,0),(6,'Pepas','Pepas con harina de avena','2025-10-20 11:43:40',1,1),(7,'asd','asd','2025-10-20 12:11:20',1,0),(8,'Pebete','Pebete de jyq','2025-10-22 22:01:32',1,1),(9,'Barroluco','Barroluco de jamon y queso','2025-10-31 15:07:48',1,1),(10,'Guiso','Guiso de lentejas','2025-11-16 12:52:37',1,1),(11,'Chocotorta','Chocotorta','2025-12-03 19:13:17',3,1),(12,'Receta de prueba','Receta para probar','2025-12-10 17:31:48',1,1),(13,'123','123','2025-12-10 17:49:13',1,1);
/*!40000 ALTER TABLE `receta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receta_insumo`
--

DROP TABLE IF EXISTS `receta_insumo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receta_insumo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `receta_id` int NOT NULL,
  `insumo_id` int NOT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `receta_id` (`receta_id`),
  KEY `insumo_id` (`insumo_id`),
  CONSTRAINT `receta_insumo_ibfk_1` FOREIGN KEY (`insumo_id`) REFERENCES `insumo` (`id`),
  CONSTRAINT `receta_insumo_ibfk_2` FOREIGN KEY (`receta_id`) REFERENCES `receta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receta_insumo`
--

LOCK TABLES `receta_insumo` WRITE;
/*!40000 ALTER TABLE `receta_insumo` DISABLE KEYS */;
INSERT INTO `receta_insumo` VALUES (12,5,7,2.23),(18,3,4,1.50),(19,3,2,2.40),(20,3,9,0.60),(23,6,6,200.00),(24,6,16,120.00),(25,6,4,200.00),(29,7,8,0.00),(30,7,3,0.00),(79,9,9,0.45),(80,9,19,0.30),(81,9,20,0.51),(82,4,1,1.00),(83,4,4,0.10),(84,4,5,0.50),(85,4,6,0.40),(88,10,3,0.20),(89,10,8,0.30),(98,11,2,0.20),(99,11,5,300.00),(100,11,23,5000.00),(101,8,1,0.40),(102,8,17,0.65),(103,8,18,0.39),(104,8,19,0.70),(105,8,20,0.40),(106,8,21,0.30),(107,12,1,0.00),(116,13,13,1.00),(127,2,1,1.00),(128,2,2,1.00),(129,2,3,0.80),(130,2,18,0.01),(131,2,19,0.50);
/*!40000 ALTER TABLE `receta_insumo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero_rol` int NOT NULL,
  `nombre_rol` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_rol` (`numero_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,1,'Administrador'),(5,2,'Cocina'),(6,3,'Directivos'),(7,4,'Comprador');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidad_de_medida`
--

DROP TABLE IF EXISTS `unidad_de_medida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidad_de_medida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `simbolo` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad_de_medida`
--

LOCK TABLES `unidad_de_medida` WRITE;
/*!40000 ALTER TABLE `unidad_de_medida` DISABLE KEYS */;
INSERT INTO `unidad_de_medida` VALUES (1,'kilogramo','kg'),(2,'litro','lt'),(3,'gramo','gr'),(4,'miligramo','mg'),(5,'centimetros cúbicos','cc'),(6,'mililitro','ml'),(7,'unidad','u');
/*!40000 ALTER TABLE `unidad_de_medida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `dni` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `cuil` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `correo` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `estado` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `cuil` (`cuil`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Flavio Rexss','Guzmán','192346783','23-44480378-9s','2657123456','flavio@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$9BGeH6/fb/tdh9vYoaWTaA$2D6P6kHqg/FzGzTjqB5IK0kLEsAMUEgXD6iLBkSz/XY',1),(2,'Iris','Guzmán','123456789','2-123456789-23','2657123222','iris@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$oXOeX6QlRmSqxDx/58x+kg$qiadSi0H7P1g/0PRUAbeuUFcuL2NiAUV3Gy01jtAC9M',1),(4,'Ignacio','Moyano','44480378','23-44480378-9','2657356970','nachomoyag@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$2+9b9lKx8gI85r0hP4dttg$iLYZUCTkwB3d2cp6oZboWQp2qAiKkd4OR0y+RfaiVEA',1),(5,'Pedro','Picapiedras','44480378s','23-44480378-29','2657356970','pedro@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$iIOl8xIp3sXklfnE0YOjuw$KGwaBGccitWti5LvDkPdDOW25dgonNoum5fymszKBok',1),(7,'Carlos','Delfino','444803782','Rawiii','124012','carlos@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$zCv5+xfOLyqIxfjTa41mIQ$A966rvVJSS9qvmnLdqr2KkSpSjIgVSLgg47k1V3VBME',1),(9,'Victoria','Moyano','46260591','21-24260591-1','2657584319','vicky@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$Nhc+rpqC0sLl9ACSiLe94Q$QH5ra470Egu+dQzS6qjXxT4cXaFftil+HnK5pyWb0fU',1),(10,'Perez','El Ratón','748921','1923412','43294320','perez@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$I4JUMiN24rmEZRFXvJ7hgQ$kpSE0dAN2hszYNW+JNHnb3/1Yu21Km2QpryWfPS+Dq8',1),(11,'Rene ','Descartes','513941','13-123432-25','2642523424','rene@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$jfEvlybtjouWpQ3LwDSSMQ$U7EVgpy9+Ee/uVZXVSBGE18DRfd7hBg+ALdv/lXWyxM',1),(12,'Lautaro','Do Santos','591341','14-124123123-43','39413411','lauta@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$ACZ/jWct2/9oCf0QVxTfCA$mzpxnCCPEHDnjvGnl5swqPiP1GDsP4P3tOnbSNdb4CA',1),(13,'Daniel','Saez','5428','131341341','439432','dani@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$+ead0PfwdKWfVQZCRU7dxg$wdGQfGEzcSEg5i9wVNiTq+Gj4vgvN97Y3q7vgixmVpQ',1),(16,'Lamine','Yamal','12344321','12-12344321-1','134854285','lamine@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$+CxpMI2n9ILNIfcKefyVVw$60hARB4qZ92UuiwDgzl29at+GEq0p0AUjszU3GJGaMU',1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_rol`
--

DROP TABLE IF EXISTS `usuario_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rol_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rol_id_2` (`rol_id`,`usuario_id`),
  KEY `rol_id` (`rol_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `usuario_rol_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `usuario_rol_ibfk_2` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_rol`
--

LOCK TABLES `usuario_rol` WRITE;
/*!40000 ALTER TABLE `usuario_rol` DISABLE KEYS */;
INSERT INTO `usuario_rol` VALUES (81,1,1),(104,1,4),(83,1,5),(85,1,9),(110,1,16),(82,5,2),(105,5,4),(84,5,7),(86,5,9),(88,5,10),(91,5,12),(106,6,4),(87,6,9),(89,7,11),(92,7,13);
/*!40000 ALTER TABLE `usuario_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'comedor'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-08 21:39:14
