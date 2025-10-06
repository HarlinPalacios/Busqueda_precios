"use strict";

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import AddUserAdmin from "../src/auth/auth.controlle.js";
import Springs from "../src/springs/springs.routes.js";
import Carpeta from "../src/carper/carpers.routes.js";
import authRoutes from "../src/auth/auth.routes.js";
import { dbConnection } from "./mongo.js";

const app = express();

// Middlewares
app.use(cors({
  origin: "*", // Acepta todas las conexiones (ajusta si es necesario)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/busqueda/v1/auth", authRoutes);
app.use("/busqueda/v1/springs", Springs);
app.use("/busqueda/v1/carpetas", Carpeta);

// Conexión a DB y crear admin
await dbConnection();
AddUserAdmin();

// ✅ Exportamos app directamente
export default app;
