const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// POST /api/ai/predict
router.post('/predict', aiController.getAIRecommendation);

module.exports = router;