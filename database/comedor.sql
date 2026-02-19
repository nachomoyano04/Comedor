-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-02-2026 a las 20:14:33
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `comedor`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto_proveedor`
--

CREATE TABLE `contacto_proveedor` (
  `id_contacto` int(11) NOT NULL,
  `proveedor_id` int(11) NOT NULL,
  `nombre_contacto` varchar(100) NOT NULL,
  `telefono_contacto` varchar(30) NOT NULL,
  `email_contacto` varchar(100) NOT NULL,
  `es_principal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contacto_proveedor`
--

INSERT INTO `contacto_proveedor` (`id_contacto`, `proveedor_id`, `nombre_contacto`, `telefono_contacto`, `email_contacto`, `es_principal`) VALUES
(18, 3, 'Humberto Illia', '2578234', 'illia@gmail.com', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumo`
--

CREATE TABLE `insumo` (
  `id` int(11) NOT NULL,
  `codigo` varchar(11) NOT NULL,
  `producto` varchar(200) NOT NULL,
  `marca` varchar(200) NOT NULL,
  `id_unidad_de_medida` int(10) NOT NULL,
  `stock` int(11) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `insumo`
--

INSERT INTO `insumo` (`id`, `codigo`, `producto`, `marca`, `id_unidad_de_medida`, `stock`, `estado`) VALUES
(1, '101', 'Harina 0000', 'Purezas', 1, 22, 1),
(2, '1012', 'Queso cremoso', 'Sancor  ', 1, 25, 1),
(3, '103', 'Salsa de tomate', 'Arcor', 2, 112, 1),
(4, '10', 'Leche', 'La Serenísima', 2, 3, 1),
(5, '105', 'Chocolate Blanco', 'Águila', 3, 1, 1),
(6, '106', 'Harina de avena', 'Tisar', 1, 0, 1),
(7, '9997', 'Salchicha', 'Viennisima', 7, 0, 1),
(8, '9994', 'Morcilla', 'Carlitos', 1, 1, 1),
(9, '1121', 'Harina de maiz', 'Tisar', 1, 2, 1),
(11, '5783', 'Fideos', 'Luccetti', 4, 0, 1),
(13, '1221', 'Harina de pejerrey', 'Tisar', 1, 0, 1),
(14, '5742123', 'Fideos moñitos', 'mataaa', 7, 11, 1),
(15, '10134', 'Mate Cocido', 'La virginia', 7, 0, 1),
(16, '5413', 'Membrillo', 'Dulcor', 4, 0, 1),
(17, '876', 'Levadura', 'Fresca', 1, 20, 1),
(18, '7465', 'Sal', 'Dos Anclas', 1, 400, 1),
(19, '3846', 'Paleta', 'Paladini', 1, 5, 1),
(20, '6389', 'Queso en barra', 'Paladini', 1, 10, 1),
(21, '657', 'Grasa', 'Arcor', 1, 10, 1),
(22, '10121', 'Pera', 'Bolivianita', 4, 0, 1),
(23, '59321', 'Chocolate en polvo', 'Nesquik', 4, 41, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precio`
--

CREATE TABLE `precio` (
  `id` int(11) NOT NULL,
  `insumo_id` int(11) NOT NULL,
  `proveedor_id` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `fecha_desde` datetime NOT NULL,
  `fecha_hasta` datetime DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `precio`
--

INSERT INTO `precio` (`id`, `insumo_id`, `proveedor_id`, `precio_unitario`, `fecha_desde`, `fecha_hasta`, `fecha_vencimiento`, `cantidad`) VALUES
(2, 2, 1, 7000.45, '2025-08-30 14:25:01', '2025-11-16 16:02:18', NULL, 0),
(3, 3, 1, 4000.00, '2025-08-30 14:25:13', '2025-12-22 11:46:37', NULL, 0),
(5, 6, 1, 6570.33, '2025-08-30 13:14:33', NULL, NULL, 0),
(18, 1, 1, 100.00, '2025-10-12 17:11:40', '2025-11-18 23:38:14', NULL, 8),
(19, 1, 2, 2500.00, '2025-10-12 17:57:21', NULL, NULL, 4),
(23, 4, 2, 2500.00, '2025-10-23 15:13:29', NULL, NULL, 3),
(24, 9, 2, 2000.00, '2025-10-23 15:14:13', NULL, NULL, 2),
(25, 8, 1, 2500.00, '2025-10-26 20:51:12', NULL, NULL, 1),
(26, 5, 2, 100.00, '2025-10-27 19:14:32', NULL, NULL, 1),
(27, 17, 1, 1000.00, '2025-10-28 09:19:19', NULL, NULL, 20),
(28, 18, 2, 400.00, '2025-10-28 09:20:02', NULL, NULL, 400),
(29, 19, 3, 500.00, '2025-10-28 09:20:25', NULL, NULL, 5),
(31, 20, 4, 11500.00, '2025-10-28 09:22:42', NULL, NULL, 10),
(32, 21, 1, 500.00, '2025-10-28 09:23:30', NULL, NULL, 10),
(33, 14, 2, 2500.00, '2025-10-29 19:08:12', NULL, NULL, 11),
(34, 2, 3, 100.00, '2025-10-31 10:10:58', NULL, NULL, 5),
(35, 3, 2, 2000.00, '2025-10-31 10:12:19', NULL, NULL, 100),
(37, 23, 1, 200.00, '2025-11-12 05:27:00', '2025-11-16 12:49:03', NULL, 10),
(39, 23, 2, 1000.00, '2025-11-12 05:48:00', NULL, NULL, 1),
(40, 23, 3, 3000.00, '2025-11-16 12:48:00', NULL, NULL, 30),
(41, 2, 2, 2000.00, '2025-11-16 16:02:00', NULL, NULL, 20),
(42, 1, 1, 4000.00, '2025-11-18 23:37:00', NULL, '2026-11-16', 10),
(44, 3, 3, 200.00, '2025-12-22 11:46:00', NULL, '2026-09-16', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `produccion`
--

CREATE TABLE `produccion` (
  `id` int(11) NOT NULL,
  `receta_id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `cantidad_producida` int(11) NOT NULL,
  `costo_primo_total` decimal(10,2) NOT NULL,
  `turno` varchar(100) NOT NULL,
  `cantidad_comensales` int(11) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `produccion`
--

INSERT INTO `produccion` (`id`, `receta_id`, `fecha`, `cantidad_producida`, `costo_primo_total`, `turno`, `cantidad_comensales`, `estado`) VALUES
(2, 3, '2025-10-23 16:33:19', 1, 21751.08, 'mañana', 2, 1),
(4, 2, '2025-10-26 22:51:00', 15, 39871.69, 'noche', 30, 1),
(5, 2, '2025-10-26 21:01:01', 2, 6600.23, 'noche', 6, 1),
(7, 4, '2025-10-27 21:16:00', 3, 8784.40, 'noche', 38, 1),
(10, 8, '2025-10-28 09:23:00', 5, 31780.00, 'tarde', 5, 1),
(11, 4, '2025-10-29 10:07:00', 222, 650045.30, 'mañana', 123, 1),
(12, 4, '2025-10-29 15:18:00', 12, 35497.58, 'mañana', 202, 0),
(13, 2, '2025-10-31 15:31:00', 2, 26670.66, '', 2, 1),
(14, 4, '2025-11-11 14:59:00', 5, 18973.66, 'mañana', 212, 1),
(15, 3, '2025-11-13 00:58:00', 10, 80303.30, 'tarde', 10, 1),
(16, 3, '2025-11-12 03:41:00', 19, 98610.00, 'mañana', 19, 1),
(17, 3, '2025-11-16 16:03:00', 10, 49500.00, 'tarde', 10, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `produccion_insumo`
--

CREATE TABLE `produccion_insumo` (
  `id` int(11) NOT NULL,
  `produccion_id` int(11) NOT NULL,
  `insumo_id` int(11) NOT NULL,
  `cantidad_usada` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `produccion_insumo`
--

INSERT INTO `produccion_insumo` (`id`, `produccion_id`, `insumo_id`, `cantidad_usada`) VALUES
(5, 2, 4, 1.50),
(6, 2, 2, 2.40),
(7, 2, 9, 0.60),
(13, 5, 2, 0.50),
(14, 5, 3, 0.40),
(15, 5, 8, 0.60),
(33, 7, 4, 0.30),
(34, 7, 5, 1.50),
(35, 7, 6, 1.20),
(42, 4, 1, 1.80),
(43, 4, 2, 3.75),
(44, 4, 3, 3.00),
(63, 10, 1, 2.50),
(64, 10, 17, 3.25),
(65, 10, 18, 1.95),
(66, 10, 19, 3.50),
(67, 10, 20, 2.00),
(68, 10, 21, 1.50),
(78, 11, 4, 22.20),
(79, 11, 5, 111.00),
(80, 11, 6, 88.80),
(103, 13, 9, 0.90),
(104, 13, 20, 1.02),
(105, 13, 6, 2.00),
(134, 12, 4, 1.20),
(135, 12, 5, 6.00),
(136, 12, 2, 3.60),
(137, 12, 6, 4.80),
(142, 14, 1, 5.00),
(143, 14, 4, 0.50),
(144, 14, 5, 0.83),
(145, 14, 6, 2.00),
(159, 15, 2, 20.00),
(160, 15, 4, 5.00),
(161, 15, 5, 1.00),
(162, 15, 6, 10.00),
(166, 16, 2, 45.60),
(167, 16, 4, 28.50),
(168, 16, 9, 11.40),
(178, 17, 4, 15.00),
(179, 17, 9, 6.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id` int(11) NOT NULL,
  `codigo` int(11) NOT NULL,
  `razon_social` varchar(100) NOT NULL,
  `nombre_fantasia` varchar(100) NOT NULL,
  `cuit` varchar(20) NOT NULL,
  `horarios_atencion` varchar(50) NOT NULL,
  `domicilio` varchar(200) NOT NULL,
  `localidad` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id`, `codigo`, `razon_social`, `nombre_fantasia`, `cuit`, `horarios_atencion`, `domicilio`, `localidad`, `email`, `estado`) VALUES
(1, 201, 'Distribuidora Porkys', 'Porky\'s', '4123', '8am-10pms', 'Av. Mitre 301', 'Villa Mercedes, San Luis', 'azucarledesma@gmail.com	', 1),
(2, 202, 'Distribuidora Ledesma', 'Azúcar Ledesma', '6372', '8am-12pm y 4pm-11pm', 'Av. 25 de mayo', 'Villa Mercedes, San Luiss', 'azucarledesma@gmail.com', 1),
(3, 203, 'La Serenisima', 'La Serenisima lacteos', '20002', '09 a 21', 'San justino 3', 'San justo', 'lase@gmail.com', 1),
(4, 204, 'Las ramonas SRL', 'Las Ramons', '2-12123213-4', '08 a 22', 'San justino 4', 'San justo', 'lasramonas@gmail.com', 1),
(5, 5223, 'Proveeduria 3 chanchitos', 'Los 3 chanchitos', '234-5435-234', 'Lun a juev: 12 a 23', 'Carlos Menem 412', 'San Clemente del Tuyú', '3chanchitos@gmail.com', 1),
(6, 5829, 'Panadería La Celeste S.A.', 'La Celeste', '23-4325234-3', 'Todos los días 24hs ', 'Ob. Trejo 124', 'Cordoba', 'laceleste@gmail.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receta`
--

CREATE TABLE `receta` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(400) NOT NULL,
  `fecha` datetime NOT NULL,
  `cuantos_comen` int(11) NOT NULL DEFAULT 1,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `receta`
--

INSERT INTO `receta` (`id`, `nombre`, `descripcion`, `fecha`, `cuantos_comen`, `estado`) VALUES
(2, 'Pizza', 'Pizza casera de 32 porciones', '2025-10-14 13:18:37', 1, 1),
(3, 'Chocolatada', 'Chocolatada sin sugar', '2025-10-14 15:20:49', 1, 1),
(4, 'Galletas de avena', 'Saludables con chocolate blanco', '2025-10-14 18:57:59', 1, 1),
(5, 'Panchos', 'Panchos sin pan', '2025-10-15 16:17:03', 1, 0),
(6, 'Pepas', 'Pepas con harina de avena', '2025-10-20 11:43:40', 1, 1),
(7, 'asd', 'asd', '2025-10-20 12:11:20', 1, 0),
(8, 'Pebete', 'Pebete de jyq', '2025-10-22 22:01:32', 1, 1),
(9, 'Barroluco', 'Barroluco de jamon y queso', '2025-10-31 15:07:48', 1, 1),
(10, 'Guiso', 'Guiso de lentejas', '2025-11-16 12:52:37', 1, 1),
(11, 'Chocotorta', 'Chocotorta', '2025-12-03 19:13:17', 3, 1),
(12, 'Receta de prueba', 'Receta para probar', '2025-12-10 17:31:48', 1, 1),
(13, '123', '123', '2025-12-10 17:49:13', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receta_insumo`
--

CREATE TABLE `receta_insumo` (
  `id` int(11) NOT NULL,
  `receta_id` int(11) NOT NULL,
  `insumo_id` int(11) NOT NULL,
  `cantidad` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `receta_insumo`
--

INSERT INTO `receta_insumo` (`id`, `receta_id`, `insumo_id`, `cantidad`) VALUES
(12, 5, 7, 2.23),
(18, 3, 4, 1.50),
(19, 3, 2, 2.40),
(20, 3, 9, 0.60),
(23, 6, 6, 200.00),
(24, 6, 16, 120.00),
(25, 6, 4, 200.00),
(29, 7, 8, 0.00),
(30, 7, 3, 0.00),
(79, 9, 9, 0.45),
(80, 9, 19, 0.30),
(81, 9, 20, 0.51),
(82, 4, 1, 1.00),
(83, 4, 4, 0.10),
(84, 4, 5, 0.50),
(85, 4, 6, 0.40),
(88, 10, 3, 0.20),
(89, 10, 8, 0.30),
(98, 11, 2, 0.20),
(99, 11, 5, 300.00),
(100, 11, 23, 5000.00),
(101, 8, 1, 0.40),
(102, 8, 17, 0.65),
(103, 8, 18, 0.39),
(104, 8, 19, 0.70),
(105, 8, 20, 0.40),
(106, 8, 21, 0.30),
(107, 12, 1, 0.00),
(116, 13, 13, 1.00),
(127, 2, 1, 1.00),
(128, 2, 2, 1.00),
(129, 2, 3, 0.80),
(130, 2, 18, 0.01),
(131, 2, 19, 0.50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `numero_rol` int(11) NOT NULL,
  `nombre_rol` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `numero_rol`, `nombre_rol`) VALUES
(1, 1, 'Administrador'),
(5, 2, 'Cocina'),
(6, 3, 'Directivos'),
(7, 4, 'Comprador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad_de_medida`
--

CREATE TABLE `unidad_de_medida` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `simbolo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `unidad_de_medida`
--

INSERT INTO `unidad_de_medida` (`id`, `nombre`, `simbolo`) VALUES
(1, 'kilogramo', 'kg'),
(2, 'litro', 'lt'),
(3, 'gramo', 'gr'),
(4, 'miligramo', 'mg'),
(5, 'centimetros cúbicos', 'cc'),
(6, 'mililitro', 'ml'),
(7, 'unidad', 'u');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` varchar(15) NOT NULL,
  `cuil` varchar(30) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `correo` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `dni`, `cuil`, `telefono`, `correo`, `password`, `estado`) VALUES
(1, 'Flavio Rexss', 'Guzmán', '192346783', '23-44480378-9s', '2657123456', 'flavio@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$9BGeH6/fb/tdh9vYoaWTaA$2D6P6kHqg/FzGzTjqB5IK0kLEsAMUEgXD6iLBkSz/XY', 1),
(2, 'Iris', 'Guzmán', '123456789', '2-123456789-23', '2657123222', 'iris@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$oXOeX6QlRmSqxDx/58x+kg$qiadSi0H7P1g/0PRUAbeuUFcuL2NiAUV3Gy01jtAC9M', 1),
(4, 'Ignaciosss', 'Moyano', '44480378', '23-44480378-9', '2657356970', 'nachomoyag@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$2+9b9lKx8gI85r0hP4dttg$iLYZUCTkwB3d2cp6oZboWQp2qAiKkd4OR0y+RfaiVEA', 1),
(5, 'Pedro', 'Picapiedras', '44480378s', '23-44480378-29', '2657356970', 'pedro@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$iIOl8xIp3sXklfnE0YOjuw$KGwaBGccitWti5LvDkPdDOW25dgonNoum5fymszKBok', 1),
(7, 'Carlos', 'Delfino', '444803782', 'Rawiii', '124012', 'carlos@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$zCv5+xfOLyqIxfjTa41mIQ$A966rvVJSS9qvmnLdqr2KkSpSjIgVSLgg47k1V3VBME', 1),
(9, 'Victoria', 'Moyano', '46260591', '21-24260591-1', '2657584319', 'vicky@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$Nhc+rpqC0sLl9ACSiLe94Q$QH5ra470Egu+dQzS6qjXxT4cXaFftil+HnK5pyWb0fU', 1),
(10, 'Perez', 'El Ratón', '748921', '1923412', '43294320', 'perez@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$I4JUMiN24rmEZRFXvJ7hgQ$kpSE0dAN2hszYNW+JNHnb3/1Yu21Km2QpryWfPS+Dq8', 1),
(11, 'Rene ', 'Descartes', '513941', '13-123432-25', '2642523424', 'rene@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$jfEvlybtjouWpQ3LwDSSMQ$U7EVgpy9+Ee/uVZXVSBGE18DRfd7hBg+ALdv/lXWyxM', 1),
(12, 'Lautaro', 'Do Santos', '591341', '14-124123123-43', '39413411', 'lauta@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$ACZ/jWct2/9oCf0QVxTfCA$mzpxnCCPEHDnjvGnl5swqPiP1GDsP4P3tOnbSNdb4CA', 1),
(13, 'Daniel', 'Saez', '5428', '131341341', '439432', 'dani@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$+ead0PfwdKWfVQZCRU7dxg$wdGQfGEzcSEg5i9wVNiTq+Gj4vgvN97Y3q7vgixmVpQ', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_rol`
--

CREATE TABLE `usuario_rol` (
  `id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario_rol`
--

INSERT INTO `usuario_rol` (`id`, `rol_id`, `usuario_id`) VALUES
(81, 1, 1),
(104, 1, 4),
(83, 1, 5),
(85, 1, 9),
(82, 5, 2),
(105, 5, 4),
(84, 5, 7),
(86, 5, 9),
(88, 5, 10),
(91, 5, 12),
(106, 6, 4),
(87, 6, 9),
(89, 7, 11),
(92, 7, 13);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contacto_proveedor`
--
ALTER TABLE `contacto_proveedor`
  ADD PRIMARY KEY (`id_contacto`),
  ADD KEY `proveedor_id` (`proveedor_id`);

--
-- Indices de la tabla `insumo`
--
ALTER TABLE `insumo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD KEY `id_unidad_de_medida` (`id_unidad_de_medida`);

--
-- Indices de la tabla `precio`
--
ALTER TABLE `precio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `insumo_id` (`insumo_id`),
  ADD KEY `proveedor_id` (`proveedor_id`);

--
-- Indices de la tabla `produccion`
--
ALTER TABLE `produccion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receta_id` (`receta_id`);

--
-- Indices de la tabla `produccion_insumo`
--
ALTER TABLE `produccion_insumo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `produccion_id` (`produccion_id`),
  ADD KEY `insumo_id` (`insumo_id`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD UNIQUE KEY `cuit` (`cuit`);

--
-- Indices de la tabla `receta`
--
ALTER TABLE `receta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `receta_insumo`
--
ALTER TABLE `receta_insumo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receta_id` (`receta_id`),
  ADD KEY `insumo_id` (`insumo_id`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_rol` (`numero_rol`);

--
-- Indices de la tabla `unidad_de_medida`
--
ALTER TABLE `unidad_de_medida`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `cuil` (`cuil`);

--
-- Indices de la tabla `usuario_rol`
--
ALTER TABLE `usuario_rol`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rol_id_2` (`rol_id`,`usuario_id`),
  ADD KEY `rol_id` (`rol_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contacto_proveedor`
--
ALTER TABLE `contacto_proveedor`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `insumo`
--
ALTER TABLE `insumo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `precio`
--
ALTER TABLE `precio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `produccion`
--
ALTER TABLE `produccion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `produccion_insumo`
--
ALTER TABLE `produccion_insumo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=180;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `receta`
--
ALTER TABLE `receta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `receta_insumo`
--
ALTER TABLE `receta_insumo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `unidad_de_medida`
--
ALTER TABLE `unidad_de_medida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuario_rol`
--
ALTER TABLE `usuario_rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contacto_proveedor`
--
ALTER TABLE `contacto_proveedor`
  ADD CONSTRAINT `contacto_proveedor_ibfk_1` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedor` (`id`);

--
-- Filtros para la tabla `insumo`
--
ALTER TABLE `insumo`
  ADD CONSTRAINT `insumo_ibfk_1` FOREIGN KEY (`id_unidad_de_medida`) REFERENCES `unidad_de_medida` (`id`);

--
-- Filtros para la tabla `precio`
--
ALTER TABLE `precio`
  ADD CONSTRAINT `precio_ibfk_1` FOREIGN KEY (`insumo_id`) REFERENCES `insumo` (`id`),
  ADD CONSTRAINT `precio_ibfk_2` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedor` (`id`);

--
-- Filtros para la tabla `produccion`
--
ALTER TABLE `produccion`
  ADD CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`receta_id`) REFERENCES `receta` (`id`);

--
-- Filtros para la tabla `produccion_insumo`
--
ALTER TABLE `produccion_insumo`
  ADD CONSTRAINT `produccion_insumo_ibfk_1` FOREIGN KEY (`insumo_id`) REFERENCES `insumo` (`id`),
  ADD CONSTRAINT `produccion_insumo_ibfk_2` FOREIGN KEY (`produccion_id`) REFERENCES `produccion` (`id`);

--
-- Filtros para la tabla `receta_insumo`
--
ALTER TABLE `receta_insumo`
  ADD CONSTRAINT `receta_insumo_ibfk_1` FOREIGN KEY (`insumo_id`) REFERENCES `insumo` (`id`),
  ADD CONSTRAINT `receta_insumo_ibfk_2` FOREIGN KEY (`receta_id`) REFERENCES `receta` (`id`);

--
-- Filtros para la tabla `usuario_rol`
--
ALTER TABLE `usuario_rol`
  ADD CONSTRAINT `usuario_rol_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `usuario_rol_ibfk_2` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
