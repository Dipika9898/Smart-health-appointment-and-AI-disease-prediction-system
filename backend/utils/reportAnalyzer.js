import fs from "fs";
import path from "path";

const testsPath = path.resolve("./config/tests_reference.json");
const tests = JSON.parse(fs.readFileSync(testsPath, "utf8"));

const analyzeReport = (ocrResults) => {
  let result = [];

  ocrResults.forEach((item) => {
    const detectedName = item.name.toLowerCase();
    const value = item.value;

    // Compare detected text against our reference keys
    for (let testKey in tests) {
      if (detectedName.includes(testKey.toLowerCase())) {
        const ref = tests[testKey];
        let status = "Normal";

        if (ref.type === "range") {
          if (value < ref.min) status = "Low";
          if (value > ref.max) status = "High";
        } else if (ref.type === "positive_negative") {
          status = value > 0 ? "Abnormal" : "Normal";
        }

        result.push({
          test: testKey,
          value: value,
          unit: ref.unit || "",
          status: status,
          doctor: ref.doctor
        });
      }
    }
  });
  return result;
};

export default analyzeReport;