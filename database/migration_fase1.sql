-- ==============================================================
-- MIGRACIÓN FASE 1: SISTEMA DE COMEDOR ESCOLAR
-- Ejecutar en el servidor MySQL de producción si la base de datos
-- ya fue creada con el esquema anterior.
-- ==============================================================

USE comedor;

-- 1. Modificar columna stock en tabla insumo para soportar decimales (kg, litros, etc.)
ALTER TABLE `insumo` 
  MODIFY COLUMN `stock` DECIMAL(10,2) NOT NULL DEFAULT 0.00;

-- 2. Modificar columna cantidad en tabla precio (compras) para soportar cantidades decimales
ALTER TABLE `precio` 
  MODIFY COLUMN `cantidad` DECIMAL(10,2) NOT NULL DEFAULT 0.00;

-- 3. Confirmación de estado de columnas
DESCRIBE `insumo`;
DESCRIBE `precio`;
