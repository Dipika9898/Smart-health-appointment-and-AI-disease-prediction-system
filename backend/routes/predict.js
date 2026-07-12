import express from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { getAIRecommendation } from '../controllers/aiController.js';

const predictRoute = express.Router();

// 1. Configure Multer to handle the file upload temporarily
// Files will be stored in 'uploads' folder
const upload = multer({ dest: 'uploads/' });

/**
 * @route   POST /api/predict/
 * @desc    Predict specialist based on text symptoms (Symptom Checker)
 */
predictRoute.post('/', getAIRecommendation);

/**
 * @route   POST /api/predict/scan
 * @desc    Predict specialist based on Lab Report Image (OCR + AI)
 */
predictRoute.post('/scan', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "No file uploaded. Please select a lab report image." 
            });
        }

        // Prepare the file to be sent to the Python Flask server (Port 5001)
        const formData = new FormData();
        const fileStream = fs.createReadStream(req.file.path);
        
        formData.append('file', fileStream, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        // 2. Calling the Python Flask Server running 'app.py'
        // Ensure your Python script is running on http://127.0.0.1:5001
        const response = await axios.post('http://127.0.0.1:5001/scan-report', formData, {
            headers: { 
                ...formData.getHeaders(),
                'Content-Type': 'multipart/form-data'
            }
        });

        // 3. Clean up: delete the temporary file from the 'uploads' folder immediately
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        // 4. Send the result back to the React Frontend
        // response.data.data contains { doctor: "...", note: "..." } from Python
        // 4. Send the result back to the React Frontend
if (response.data.success) {
    // PASS THE RAW OCR DATA INTO YOUR ANALYZER
    const detailedAnalysis = analyzeReport(response.data.data); 

    // Find the first abnormal specialist
    const abnormal = detailedAnalysis.find(a => a.status !== "Normal");
    const recommendedDoctor = abnormal ? abnormal.doctor : "General Physician";

    res.status(200).json({ 
        success: true, 
        doctor: recommendedDoctor, 
        analysis: detailedAnalysis, // This gives the UI the full list of High/Low values
        note: detailedAnalysis.map(a => `${a.test}: ${a.status}`).join(" | ")
    });
} else {
            res.status(400).json({ 
                success: false, 
                message: response.data.error || "Analysis failed" 
            });
        }

    } catch (error) {
        console.error("PulseLife OCR Route Error:", error.message);
        
        // Ensure the file is deleted even if the AI server is down/crashes
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        // Detailed error message for debugging during your project defense
        const errorMsg = error.code === 'ECONNREFUSED' 
            ? "AI Server (Python) is not running on Port 5001." 
            : "An error occurred while analyzing the report.";

        res.status(500).json({ 
            success: false, 
            message: errorMsg,
            debug: error.message 
        });
    }
});

export default predictRoute;