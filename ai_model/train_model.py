import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report
import joblib

def train_pulse_life_ai():
    # 1. Load Data
    try:
        # Load the 100k CSV we generated
        df = pd.read_csv('pulse_life_100k_data.csv') 
        print(f"Loaded {len(df)} records for training.")
    except FileNotFoundError:
        print("Error: pulse_life_100k_data.csv not found. Run your generator first.")
        return

    # Split into Training (80%) and Testing (20%)
    X_train, X_test, y_train, y_test = train_test_split(
        df['Symptom_Text'], 
        df['Doctor_Specialization'], 
        test_size=0.2, 
        random_state=42
    )

    # 2. The "Defense-Ready" Pipeline
    # We use high regularization (low C) to keep accuracy realistic
    text_clf = Pipeline([
        ('tfidf', TfidfVectorizer(
            stop_words='english', 
            ngram_range=(1, 1),   
            max_features=140,     # INCREASED from 110 to 140
            min_df=10             # LOWERED from 15 to 10
        )),
        ('clf', LogisticRegression(
            C=0.01,               # INCREASED from 0.002 to 0.01
            solver='lbfgs', 
            max_iter=2000         
        ))
    ])

    print("Training PulseLife AI (Optimizing for Generalization)...")
    text_clf.fit(X_train, y_train)
    
    # 3. Evaluation
    y_pred = text_clf.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    
    print("\n" + "="*30)
    print(f"TRAINING COMPLETE")
    print(f"Actual Accuracy: {acc * 100:.2f}%") 
    print("="*30 + "\n")

    # 4. Save the Model
    joblib.dump(text_clf, 'pulse_life_brain.pkl')
    print("Model saved successfully as 'pulse_life_brain.pkl'")

if __name__ == "__main__":
    train_pulse_life_ai()