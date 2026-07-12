import { exec } from "child_process";
import analyzeReport from "../utils/reportAnalyzer.js";
import path from "path";

export const analyzeMedicalReport = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "File is required" });

  const imagePath = req.file.path;
  // Use path.resolve to ensure the system finds the script correctly
  const scriptPath = path.resolve("./scripts/ocr_reader.py");

  exec(`python "${scriptPath}" "${imagePath}"`, (err, stdout) => {
    if (err) {
      console.error("OCR error:", err);
      return res.status(500).json({ error: "OCR failed. Ensure EasyOCR is installed." });
    }

    // Inside reportController.js
try {
  const ocrData = JSON.parse(stdout); 
  const detailedAnalysis = analyzeReport(ocrData);

  const abnormal = detailedAnalysis.find(a => a.status !== "Normal");
  const recommendedDoctor = abnormal ? abnormal.doctor : "General Physician";

  // CHANGE THIS: Wrap the response in a "data" object
  res.json({
    success: true,
    data: {
      doctor: recommendedDoctor,
      note: detailedAnalysis.length > 0 
        ? detailedAnalysis.map(a => `${a.test}: ${a.status}`).join(" | ") 
        : "All parameters appear normal.",
      confidence: 1.0,
      analysis: detailedAnalysis // Keeping this for extra detail if needed
    }
  });
} catch (parseErr) {
  res.status(500).json({ error: "Invalid OCR output format" });
}
  });
};