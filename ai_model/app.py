from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import easyocr
import os
import re

app = Flask(__name__)
CORS(app)

# --- INITIALIZATION ---
# Load the OCR Reader and the AI Model
try:
    # Set gpu=True if you have an NVIDIA GPU installed
    reader = easyocr.Reader(['en'], gpu=False)
    model = joblib.load('pulse_life_brain.pkl')
    print("PulseLife Brain and OCR loaded successfully!")
except Exception as e:
    print(f"Initialization Error: {e}")

# --- CLINICAL DATABASE ---
# Structured for fuzzy OCR scanning with common markers
CLINICAL_DB = {
    "Cardiologist": {"markers": ["cholesterol", "ldl", "triglyceride", "hdl", "troponin"], "min": 0, "max": 200, "unit": "mg/dL"},
    "Endocrinologist": {"markers": ["glucose", "hba1c", "tsh", "sugar", "thyroid", "insulin"], "min": 70, "max": 105, "unit": "mg/dL"},
    "Gastroenterologist": {"markers": ["bilirubin", "alt", "ast", "sgpt", "sgot", "albumin"], "min": 0.1, "max": 1.2, "unit": "mg/dL"},
    "Nephrologist": {"markers": ["creatinine", "urea", "egfr", "bun", "potassium"], "min": 0.7, "max": 1.3, "unit": "mg/dL"},
    "Hematologist": {"markers": ["hemoglobin", "hgb", "platelets", "wbc", "rbc"], "min": 13.5, "max": 17.5, "unit": "g/dL"},
    "Neurologist": {"markers": ["vitamin b12", "folate", "homocysteine"], "min": 200, "max": 900, "unit": "pg/mL"},
    "Pulmonologist": {"markers": ["spo2", "oxygen", "fev1"], "min": 95, "max": 100, "unit": "%"},
    "Orthopedist": {"markers": ["calcium", "vitamin d", "uric acid", "bone"], "min": 8.5, "max": 10.2, "unit": "mg/dL"},
    "Gynecologist": {"markers": ["hcg", "fsh", "lh", "progesterone"], "min": 0, "max": 5, "unit": "mIU/mL"},
    "Opthalmologist": {"markers": ["iop", "eye pressure", "vision", "cataract"], "min": 10, "max": 21, "unit": "mmHg"},
    "Dermatologist": {"markers": ["ige", "allergy", "acne", "pimple", "rash"], "min": 0, "max": 100, "unit": "kU/L"},
    "ENT Doctor": {"markers": ["hearing", "throat", "audiometry", "sinus"], "min": 0, "max": 25, "unit": "dB"},
    "Pediatrician": {"markers": ["neonatal", "growth hormone"], "min": 0, "max": 10, "unit": "ng/mL"}
}

@app.route('/predict', methods=['POST'])
def predict():
    """Predicts specialist based on text symptom input"""
    try:
        data = request.get_json()
        user_input = data.get('symptoms', '').lower()
        
        if not user_input:
            return jsonify({"success": False, "error": "No symptoms provided"})

        # 1. HARD OVERRIDE (For high-accuracy keyword detection)
        specialist_keywords = {
            "Pediatrician": ["son", "daughter", "child", "baby", "infant", "neonatal", "kid"], # Added these
    "ENT Doctor": ["ear", "hearing", "tonsil", "throat", "sinus", "swallowing"],
    "Dermatologist": ["pimple", "acne", "rash", "skin", "itchy", "spots"],
    "Cardiologist": ["chest pain", "heart", "shortness of breath", "palpitations"],
    "Dentist": ["tooth", "gum", "cavity", "dentist"],
    "Opthalmologist": ["eye", "vision", "sight", "blurred"]
        }

        for dr, keywords in specialist_keywords.items():
            if any(k in user_input for k in keywords):
                return jsonify({
                    "success": True, 
                    "data": {"doctor": dr, "confidence": 1.0, "note": f"Direct symptom match for {dr}."}
                })

        # 2. AI MODEL PREDICTION
        probabilities = model.predict_proba([user_input])[0]
        max_prob = max(probabilities)
        prediction = model.classes_[probabilities.argmax()]

        # 3. THRESHOLD LOGIC
        # If confidence is low, refer to General Physician
        if max_prob < 0.55:
            final_dr = "General Physician"
            note = "Symptoms are generalized. A General Physician is recommended for a primary check-up."
        else:
            final_dr = prediction
            note = f"Our clinical analysis suggests a consultation with a {final_dr}."

        return jsonify({
            "success": True, 
            "data": {
                "doctor": final_dr, 
                "confidence": round(max_prob, 2),
                "note": note
            }
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

@app.route('/scan-report', methods=['POST'])
def scan_report():
    if 'file' not in request.files:
        return jsonify({"success": False, "error": "No file uploaded"})
        
    file = request.files['file']
    temp_path = "temp_report.jpg"
    file.save(temp_path)
    
    try:
        # 1. RAW EXTRACTION ONLY
        results = reader.readtext(temp_path, detail=0, paragraph=True)
        text = " ".join(results).lower()
        
        # 2. Use Regex to find ALL name/value pairs
        # Matches "Glucose 150", "Creatinine: 1.2", etc.
        pattern = r'([A-Za-z0-9 ]+)\s*[:\-\s]*\s*(\d+\.?\d*)'
        matches = re.findall(pattern, text)
        
        extracted_data = []
        for m in matches:
            name = m[0].strip()
            if len(name) > 2:
                extracted_data.append({
                    "name": name,
                    "value": float(m[1])
                })

        os.remove(temp_path)

        # Send raw data back to Node.js
        return jsonify({
            "success": True, 
            "data": extracted_data  # List of {name, value}
        })

    except Exception as e:
        if os.path.exists(temp_path): os.remove(temp_path)
        return jsonify({"success": False, "error": str(e)})

if __name__ == '__main__':
    # Run on Port 5001 to avoid conflicts
    app.run(host='0.0.0.0', port=5001, debug=False)