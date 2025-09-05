import { Router } from "express"
import { login } from "./auth.controlle.js"

const router =Router();

router.post("/login", login)

export default router;
