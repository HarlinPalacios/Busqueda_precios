"use strict"

import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import AddUserAdmin from "../src/auth/auth.controlle.js"
import Springs from "../src/springs/springs.routes.js"
import authRoutes from "../src/auth/auth.routes.js"
import { dbConnection } from "./mongo.js"

const routes = (app) => {
    app.use("/busqueda/v1/auth", authRoutes)
    app.use("/busqueda/v1/", Springs)
}

const consfigs = (app) => {
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(express.json())
} 

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        consfigs(app)
        conectarDB()
        AddUserAdmin()
        routes(app)
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port: ${process.env.PORT}`)
        })
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}