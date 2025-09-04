"use strict"

import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import { dbConnection } from "./mongo.js"

const consfigs = (app) => {
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
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
        app.listen(process.env.PORT)
        console.log(`Server running on port: ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}