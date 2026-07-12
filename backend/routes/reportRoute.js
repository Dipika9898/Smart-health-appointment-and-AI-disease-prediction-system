// backend/routes/reportRoute.js
import express from "express";
import multer from "multer";
import { analyzeMedicalReport } from "../controllers/reportController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/analyze-report", upload.single("report"), analyzeMedicalReport);

export default router;