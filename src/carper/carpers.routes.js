import { Router } from "express"
import { createCarpeta, getCarpetas, deleteCarpeta, getSpringsByCarpeta } from "./carpers.controller.js";

const router = Router();

router.post("/createCarpeta", createCarpeta);
router.get("/getCarpetas", getCarpetas);
router.delete("/deleteCarpeta/:id", deleteCarpeta)
router.get("/springs/byCarpeta/:carpetaId", getSpringsByCarpeta);

export default router;
