import pandas as pd
import random

# Definitive, exclusive symptoms for 13 specialists
medical_patterns = {
    "Cardiologist": [
        "chest pain", "heart palpitations", "shortness of breath", "high blood pressure", 
        "pain in left arm", "irregular pulse", "angina", "heart valve issues", "swollen heart"
    ],
    "Dentist": [
        "toothache", "bleeding gums", "cavity", "wisdom tooth pain", "swollen gums", 
        "sensitive teeth", "mouth ulcer", "bad breath", "tooth decay", "dental abscess"
    ],
    "Dermatologist": [
        "red bumps on face", "itchy rash", "acne breakout", "eczema", "skin infection", 
        "pimples", "dry patches", "psoriasis", "moles changing color", "hives","dandruff"
    ],
    "Endocrinologist": [
        "high blood sugar", "excessive thirst", "sudden weight gain", "thyroid swelling", 
        "hormonal imbalance", "glucose spikes", "excessive sweating", "low energy"
    ],
    "ENT Doctor": [
        "ear ache", "hearing loss", "sore throat", "sinus pressure", "nasal congestion", 
        "ringing in ears", "difficulty swallowing", "tonsil pain", "nosebleed","tonsillitis","tonsils"
    ],
    "Gastroenterologist": [
        "stomach ache", "acid reflux", "bloating", "nausea", "abdominal pain", 
        "constipation", "heartburn", "indigestion", "yellow stools", "stomach cramps"
    ],
    "General Physician": [
        "mild fever", "common cold", "seasonal flu", "general weakness", "fatigue", 
        "body ache", "shivering", "runny nose", "sneezing", "mild headache"
    ],
    "Gynecologist": [
        "irregular periods", "pelvic pain", "pregnancy concerns", "hormonal mood swings", 
        "pcos symptoms", "menstrual cramps", "vaginal discharge", "morning sickness"
    ],
    "Neurologist": [
        "migraine", "dizziness", "seizures", "numbness in limbs", "chronic headache", 
        "memory gaps", "loss of balance", "tremors", "brain fog", "confusion"
    ],
    "Nephrologist": [
        "kidney pain", "blood in urine", "foamy urine", "swollen ankles", "lower back pressure", 
        "burning during urination", "frequent urination at night", "creatinine concerns"
    ],
    "Opthalmologist": [
        "blurred vision", "eye pressure", "red eyes", "eye strain", "double vision", 
        "itching in eyes", "cataracts", "glaucoma symptoms", "dry eyes", "seeing spots"
    ],
    "Pediatrician": [
        "childhood fever", "neonatal jaundice", "infant growth concerns", "pediatric rash", 
        "baby colic", "child vomiting", "diaper rash", "vaccination reaction"
    ],
    "Pulmonologist": [
        "chronic cough", "wheezing", "difficulty breathing", "low oxygen levels", 
        "lung congestion", "chest tightness", "asthma attack", "coughing up mucus"
    ]
}

def generate_medical_csv(filename, total_rows):
    rows = []
    
    # --- THIS WAS MISSING (The fix for the yellow line) ---
    prefixes = ["I have", "Suffering from", "Feeling", "Recently I got", "Experienced", "I am dealing with", "Showing signs of"]
    
    filler_words = ["yesterday", "suddenly", "actually", "maybe", "please", "help", "doctor", "severe", "mild"]
    
    print(f"Generating {total_rows} rows...")

    for _ in range(total_rows):
        specialist = random.choice(list(medical_patterns.keys()))
        symptom = random.choice(medical_patterns[specialist])
        
        # Randomly build the sentence
        if random.random() > 0.6:
            text = f"{random.choice(prefixes)} {random.choice(filler_words)} {symptom}"
        else:
            text = f"{random.choice(prefixes)} {symptom}"
            
        rows.append({"Symptom_Text": text, "Doctor_Specialization": specialist})

    df = pd.DataFrame(rows)
    df.to_csv(filename, index=False)
    print(f"File Saved: {filename}")

if __name__ == "__main__":
    generate_medical_csv('pulse_life_100k_data.csv', 100000)