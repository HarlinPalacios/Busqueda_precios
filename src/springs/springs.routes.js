import { Router } from "express";
import multer from "multer";
import {
  createSprings,
  getSprings,
  updateSpringsById,
  deleteSprings,
} from "../springs/springs.conroller.js";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/createSprings", upload.single("imagen"), createSprings);

router.get("/getSprings", getSprings);
router.put("/updateSprings/:id", updateSpringsById);
router.delete("/deleteSprings/:id", deleteSprings);

export default router;
