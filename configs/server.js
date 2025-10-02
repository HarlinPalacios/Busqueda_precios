"use strict"

import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import AddUserAdmin from "../src/auth/auth.controlle.js"
import Springs from "../src/springs/springs.routes.js"
import Carpeta from "../src/carper/carpers.routes.js"
import authRoutes from "../src/auth/auth.routes.js"
import { dbConnection } from "./mongo.js"
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = (app) => {
    app.use("/busqueda/v1/auth", authRoutes)
    app.use("/busqueda/v1/springs", Springs)
    app.use("/busqueda/v1/carpetas", Carpeta)
}

const consfigs = (app) => {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
    app.use(cors({
        origin: 'http://localhost:5173', // Cambia al origen de tu frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }));
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(express.json())

    app.use('/uploads', express.static('uploads', {
        setHeaders: (res) => {
            res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        }
    }))
}
    
const conectarDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try {
        consfigs(app)
        conectarDB()
        AddUserAdmin()
        routes(app)
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port: ${process.env.PORT}`)
        })
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}
