import express from "express";
import { getGenAI } from "../controllers/GenAI.control.js";
const router = express.Router();

router.post("/generateImage", getGenAI);

export default router;