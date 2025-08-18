import express from "express";
import dotenv from "dotenv";
// import errorMiddleware from "./middleware/errorMiddleware.js";
import insumosRouter from "./routes/insumosRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Rutas
app.use("/insumos", insumosRouter);

//Error Middleware
// app.use(errorMiddleware);

//Levantamos el servidor
app.listen(PORT, () => {
    console.log(`La app esta corriendo en http://localhost:${PORT}`)
});