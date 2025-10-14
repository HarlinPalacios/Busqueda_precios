"use strict";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary"; 

import AddUserAdmin from "../src/auth/auth.controlle.js";
import Springs from "../src/springs/springs.routes.js";
import Carpeta from "../src/carper/carpers.routes.js";
import authRoutes from "../src/auth/auth.routes.js";
import { dbConnection } from "./mongo.js";

const app = express();

// -----------------------------
// CONFIGURACIÓN GLOBAL DE CLOUDINARY
// -----------------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -----------------------------
// MIDDLEWARES
// -----------------------------
app.use(cors({
  origin: ['https://uniresortes.web.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// -----------------------------
// RUTAS
// -----------------------------
app.use("/busqueda/v1/auth", authRoutes);
app.use("/busqueda/v1/springs", Springs);
app.use("/busqueda/v1/carpetas", Carpeta);

// Endpoint de prueba para verificar Cloudinary
app.get("/api/test-cloudinary", (req, res) => {
  console.log("🌥️ Cloudinary Config:", {
    cloud_name: cloudinary.config().cloud_name,
    api_key: cloudinary.config().api_key ? "✅" : "❌",
    api_secret: cloudinary.config().api_secret ? "✅" : "❌",
  });

  res.json({
    CLOUD_NAME: cloudinary.config().cloud_name || "❌ No detectado",
    API_KEY: cloudinary.config().api_key ? "✅" : "❌ No detectado",
    API_SECRET: cloudinary.config().api_secret ? "✅" : "❌ No detectado",
  });
});

// -----------------------------
// CONEXIÓN A BASE DE DATOS Y ADMIN
// -----------------------------
await dbConnection();
AddUserAdmin();

export default app;
