# Sistema de Comedor Escolar — API Backend

Servicio backend RESTful para la gestión integral de comedores escolares (control bromatológico, trazabilidad de insumos, cálculo automático de costo primo, control de recetas, compras y perfiles de acceso basados en roles).

---

## 🛠️ Tecnologías

- **Entorno de Ejecución:** Node.js (v18+)
- **Framework:** Express.js (v5)
- **Base de Datos:** MySQL (v8.0+)
- **Autenticación y Sesión:** JWT (`HS256`), Argon2id (hashing de contraseñas), Cookies `HttpOnly`
- **Seguridad:** Cabeceras HTTP de seguridad (`nosniff`, `DENY`, `HSTS`), CORS estricto por lista blanca, validación numérica estricta contra SQLi, control de acceso RBAC y anti-IDOR.

---

## 📋 Requisitos Previos

- Node.js >= 18.0.0
- MySQL Server >= 8.0
- OpenSSL (para generación de claves criptográficas)

---

## 🚀 Instalación y Puesta en Marcha

### 1. Clonar el repositorio
```bash
git clone https://github.com/nachomoyano04/Comedor.git
cd Comedor
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configuración de Variables de Entorno
Copiar el archivo de plantilla `.env.example`:
```bash
cp .env.example .env
```
Configurar los valores de entorno en `.env`:
```dotenv
PORT=6970
DB_HOST=localhost
DB_USER=usuario_comedor
DB_PASSWORD=contraseña_segura
DB_DATABASE=comedor
DB_SSL=false
ACCESS_TOKEN_SECRET=generar_con_openssl_rand_hex_64
REFRESH_TOKEN_SECRET=generar_con_openssl_rand_hex_64
CORS_ORIGIN=http://localhost:5173
```

Para generar secretos criptográficos seguros:
```bash
openssl rand -hex 64
```

### 4. Inicialización de la Base de Datos

1. Crear la base de datos en MySQL:
   ```sql
   CREATE DATABASE comedor CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
   ```
2. Ejecutar el esquema estructural DDL:
   ```bash
   mysql -u usuario_comedor -p comedor < database/comedor_schema.sql
   ```
3. (Opcional - Desarrollo) Cargar datos de prueba sintéticos:
   ```bash
   mysql -u usuario_comedor -p comedor < database/comedor_seed_dev.sql
   ```

### 5. Ejecutar la Aplicación

- **Modo Desarrollo:**
  ```bash
  npm run dev
  ```
- **Modo Producción:**
  ```bash
  NODE_ENV=production npm start
  ```

---

## 🧪 Batería de Pruebas Automatizadas

El sistema cuenta con dos suites de verificación automatizada:

1. **Pruebas Funcionales Integrales (E2E):**
   ```bash
   npm test
   ```
   Valida el flujo de compras, aumento de stock decimal, descuento automático en producción, reposición por baja y alertas bromatológicas (24 pruebas).

2. **Pruebas de Seguridad y Resistencia:**
   ```bash
   npm run test:security
   ```
   Comprueba integridad de tokens JWT (malformados, vencidos, firmas alteradas, algoritmos prohibidos), RBAC, anti-IDOR, resistencia a SQLi y supresión de cabeceras sensibles (26 pruebas).

3. **Ejecución Completa:**
   ```bash
   npm run test:all
   ```

---

## 🔒 Buenas Prácticas de Seguridad y Privacidad

- El archivo `.env` y los volcados con datos personales sensibles nunca deben ser rastreados por Git.
- Para verificar el cumplimiento de seguridad antes de realizar cualquier commit o release, ejecute:
  ```bash
  ./scripts/verify_pre_publish.sh
  ```
