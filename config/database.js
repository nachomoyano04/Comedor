import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const poolConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  timezone: "-03:00",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Configuración TLS/SSL segura para MySQL:
// - Si DB_SSL está en "false": se omite SSL (desarrollo local sin cifrado).
// - Si DB_SSL es "true" o en producción (NODE_ENV=production):
//     * Se exige TLS con validación estricta del certificado (rejectUnauthorized: true por defecto).
//     * Se puede especificar un certificado CA personalizado con DB_SSL_CA (ruta o contenido PEM).
//     * Solo si se define explícitamente DB_SSL_REJECT_UNAUTHORIZED="false" se desactiva la validación.
const useSSL = process.env.DB_SSL === "true" || (isProduction && process.env.DB_SSL !== "false");

if (useSSL) {
  const sslConfig = {
    minVersion: "TLSv1.2",
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false"
  };

  if (process.env.DB_SSL_CA) {
    try {
      if (fs.existsSync(process.env.DB_SSL_CA)) {
        sslConfig.ca = fs.readFileSync(process.env.DB_SSL_CA, "utf8");
      } else {
        sslConfig.ca = process.env.DB_SSL_CA;
      }
    } catch (err) {
      console.error("[CRÍTICO BD] Error al leer el certificado CA (DB_SSL_CA):", err.message);
    }
  }

  poolConfig.ssl = sslConfig;
}

const pool = createPool(poolConfig);
export default pool;

