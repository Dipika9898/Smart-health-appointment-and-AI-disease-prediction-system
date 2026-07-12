import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const predictDisease = (symptoms) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(
      __dirname,
      "../../ai_model/predict_model.py"
    );

    // Wrap symptoms in quotes if it’s an array
    const symptomsArg = Array.isArray(symptoms) ? symptoms.join(",") : symptoms;
    const command = `python "${scriptPath}" "${symptomsArg.replace(/"/g, '\\"')}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      if (stderr) {
        return reject(stderr);
      }

      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (err) {
        reject("Invalid JSON response from Python");
      }
    });
  });
};

export default predictDisease; 

