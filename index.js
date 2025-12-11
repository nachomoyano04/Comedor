import express from "express";
import dotenv from "dotenv";
// import errorMiddleware from "./middleware/errorMiddleware.js";
import insumosRouter from "./routes/insumosRoutes.js";
import precioRouter from "./routes/precioRoutes.js";
import produccionRouter from "./routes/produccionRoutes.js";
import proveedoresRouter from "./routes/proveedoresRoutes.js";
import recetaRouter from "./routes/recetaRoutes.js";
import rolesRouter from "./routes/rolesRoutes.js";
import unidad_de_medidaRouter from "./routes/unidad_de_medidaRoutes.js";
import usuarioRouter from "./routes/usuarioRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//CORS
const corsOptions = {
    origin: `http://localhost:5173`, //Luego -> https://dominio_produccion.com
    credentials: true
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//JSON parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Rutas
app.use("/insumos", insumosRouter);
app.use("/precio", precioRouter);
app.use("/produccion", produccionRouter);
app.use("/proveedor", proveedoresRouter);
app.use("/receta", recetaRouter);
app.use("/roles", rolesRouter);
app.use("/udm", unidad_de_medidaRouter);
app.use("/usuario", usuarioRouter);

//Error Middleware
// app.use(errorMiddleware);

//Levantamos el servidor
app.listen(PORT, () => {
    console.log(`La app esta corriendo en http://localhost:${PORT}`)
});