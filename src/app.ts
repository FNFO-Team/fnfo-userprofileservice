import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import profileRoutes from "./profile/profile.routes";
import { errorHandler } from "./common/errorHandler";

dotenv.config();

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas principales
app.use("/api/profiles", profileRoutes);

// Manejador global de errores (debe ir al final siempre)
app.use(errorHandler);

export default app;
