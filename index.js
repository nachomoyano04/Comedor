import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/errorMiddleware.js";
import insumosRouter from "./routes/insumosRoutes.js";
import precioRouter from "./routes/precioRoutes.js";
import produccionRouter from "./routes/produccionRoutes.js";
import proveedoresRouter from "./routes/proveedoresRoutes.js";
import recetaRouter from "./routes/recetaRoutes.js";
import rolesRouter from "./routes/rolesRoutes.js";
import unidad_de_medidaRouter from "./routes/unidad_de_medidaRoutes.js";
import usuarioRouter from "./routes/usuarioRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

// Validación preventiva de configuración de entorno (Fail-fast en producción)
const validateEnvironment = () => {
    const isProduction = process.env.NODE_ENV === "production";
    const requiredVars = ["DB_HOST", "DB_USER", "DB_DATABASE"];
    const missing = requiredVars.filter(v => !process.env[v]);
    
    if (missing.length > 0) {
        console.error(`[CRÍTICO] Faltan variables de entorno esenciales: ${missing.join(", ")}`);
        if (isProduction) process.exit(1);
    }

    if (isProduction) {
        if (!process.env.DB_PASSWORD) {
            console.error("[CRÍTICO] DB_PASSWORD es obligatoria en entorno de producción.");
            process.exit(1);
        }
        if (!process.env.ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET.length < 32 || process.env.ACCESS_TOKEN_SECRET.includes("insecure") || process.env.ACCESS_TOKEN_SECRET.includes("cambiar")) {
            console.error("[CRÍTICO] ACCESS_TOKEN_SECRET no está configurado o es inseguro para producción.");
            process.exit(1);
        }
        if (!process.env.REFRESH_TOKEN_SECRET || process.env.REFRESH_TOKEN_SECRET.length < 32 || process.env.REFRESH_TOKEN_SECRET.includes("insecure") || process.env.REFRESH_TOKEN_SECRET.includes("cambiar")) {
            console.error("[CRÍTICO] REFRESH_TOKEN_SECRET no está configurado o es inseguro para producción.");
            process.exit(1);
        }
        if (!process.env.CORS_ORIGIN || process.env.CORS_ORIGIN.includes("localhost")) {
            console.warn("[ADVERTENCIA PRODUCCIÓN] CORS_ORIGIN no está definido o incluye dominios locales (localhost).");
        }
    }
};
validateEnvironment();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);
app.disable("x-powered-by");

// Cabeceras básicas de seguridad HTTP (DevSecOps Hardening)
app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    if (process.env.NODE_ENV === "production") {
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }
    next();
});

// CORS Seguro
const defaultOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const envOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(",").map(o => o.trim()).filter(Boolean) 
    : [];
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

const corsOptions = {
    origin: (origin, callback) => {
        // Permitir llamadas sin origin (herramientas locales, server-to-server o mismo origen)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origen no permitido por la política CORS: ${origin}`));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
};

app.use(cors(corsOptions));

//JSON parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

// Healthcheck endpoint para Docker / Kubernetes / Render / Railway
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

//Rutas
app.use("/insumos", insumosRouter);
app.use("/precio", precioRouter);
app.use("/produccion", produccionRouter);
app.use("/proveedor", proveedoresRouter);
app.use("/receta", recetaRouter);
app.use("/roles", rolesRouter);
app.use("/udm", unidad_de_medidaRouter);
app.use("/usuario", usuarioRouter);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

//Error Middleware
app.use(errorMiddleware);

//Levantamos el servidor
app.listen(PORT, () => {
    console.log(`La app esta corriendo en http://localhost:${PORT}`)
});