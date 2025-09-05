import { Router } from "express"
import { createSprings, getSprings, updateSpringsById, deleteSprings } from "../springs/springs.conroller.js"

const router = Router()

router.post("/createSprings", createSprings)
router.get("/getSprings", getSprings)
router.put("/updateSprings/:id", updateSpringsById)
router.delete("/deleteSprings/:id", deleteSprings)

export default router; 