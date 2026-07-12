import easyocr
import sys
import json
import re
import os

def extract_lab_data(image_path):
    # check if file path is provided and exists
    if not os.path.exists(image_path):
        return []

    try:
        # initialize OCR (English language)
        # Note: 'gpu=False' is safer for college lab computers; set to True if you have a GPU
        reader = easyocr.Reader(['en'], gpu=False)

        # read text from image
        # 'detail=0' returns just the text; 'paragraph=True' keeps names and values on the same line
        results = reader.readtext(image_path, detail=0, paragraph=True)

        # combine detected text into one searchable block
        full_text = " ".join(results)

        # pattern to extract test name + number
        # This regex looks for:
        # ([A-Za-z0-9 ]+) -> Group 1: Letters, numbers, and spaces (Test Name)
        # \s*[:\-\s]*\s* -> Ignore colons, dashes, or extra spaces in between
        # (\d+\.?\d*)    -> Group 2: The actual numeric result (Value)
        pattern = r'([A-Za-z0-9 ]+)\s*[:\-\s]*\s*(\d+\.?\d*)'

        matches = re.findall(pattern, full_text)

        tests = []
        for m in matches:
            test_name = m[0].strip()
            # Basic filtering to avoid empty names or short junk text
            if len(test_name) > 2:
                tests.append({
                    "name": test_name,
                    "value": float(m[1])
                })

        return tests

    except Exception as e:
        # If there's an error, returning an empty list prevents the Node server from crashing
        return []

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("[]")
        sys.exit()

    image_input = sys.argv[1]
    extracted_data = extract_lab_data(image_input)
    
    # Final output as a clean JSON string for Node.js 'spawn' to capture
    print(json.dumps(extracted_data))