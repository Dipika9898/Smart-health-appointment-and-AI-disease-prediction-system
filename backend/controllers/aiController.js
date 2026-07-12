import axios from 'axios';

export const getAIRecommendation = async (req, res) => {
    try {
        const { symptoms } = req.body;

        if (!symptoms) {
            return res.status(400).json({ success: false, message: "Symptoms are required" });
        }

        // Forward the symptoms to the Python Flask server
        const response = await axios.post('http://127.0.0.1:5001/predict', {
            symptoms: symptoms
        });

        // Send the AI result (doctor, confidence, note) back to your frontend
        res.status(200).json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error("AI Server Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "The AI service is currently offline. Please ensure Python app.py is running." 
        });
    }
};