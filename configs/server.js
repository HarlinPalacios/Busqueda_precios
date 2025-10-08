"use strict";

import dotenv from "dotenv";
dotenv.config();

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

app.use(cors({
  origin: ['https://uniresortes.web.app'], // 👈 Tu frontend real
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/busqueda/v1/auth", authRoutes);
app.use("/busqueda/v1/springs", Springs);
app.use("/busqueda/v1/carpetas", Carpeta);

await dbConnection();
AddUserAdmin();

export default app;
