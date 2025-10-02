import { Router } from "express"
import { createSprings, getSprings, updateSpringsById, deleteSprings } from "../springs/springs.conroller.js"
import { upload } from "../middlewares/upload.js";

const router = Router()

router.post("/createSprings", upload.single("imagen"), createSprings);
router.get("/getSprings", getSprings)
router.put("/updateSprings/:id", upload.single("imagen"), updateSpringsById)
router.delete("/deleteSprings/:id", deleteSprings)

export default router; 