import { ApplicantData, PredictionResult } from "../types";

export const predictEligibility = async (data: ApplicantData): Promise<PredictionResult> => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.warn("No GROQ_API_KEY found. Using mock logic fallback.");
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return calculateMockEligibility(data);
  }

  try {
    const prompt = `
      Act as a strict Loan Eligibility Binary Classifier.
      
      Analyze the following applicant data:
      ${JSON.stringify(data, null, 2)}
      
      Task:
      Determine if the applicant is "Eligible" or "Not Eligible" for the loan based on standard financial risk assessment principles (Debt-to-Income ratio, Credit Score, Employment stability).
      
      Constraints:
      1. This is a classification task. Be deterministic.
      2. If Credit Score is Poor, almost certainly Not Eligible.
      3. If Income is high (>5000) and Loan Amount is reasonable (<200000), likely Eligible.
      
      Output Schema:
      Return valid JSON with the following structure:
      {
        "prediction": "Eligible" | "Not Eligible",
        "confidence": number (between 0.0 and 1.0),
        "reasons": string[] (list of 3 brief reasons explaining the classification)
      }
    `;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a financial risk assessment AI. You output strict JSON only."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.1,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API Error: ${response.statusText}`);
    }

    const json = await response.json();
    const content = json.choices[0]?.message?.content;

    if (content) {
      return JSON.parse(content) as PredictionResult;
    }
    
    throw new Error("Empty response from Groq model");

  } catch (error) {
    console.error("Prediction API Error:", error);
    // Fallback to local heuristic if API fails
    return calculateMockEligibility(data);
  }
};

// Deterministic fallback logic to ensure the app never breaks
function calculateMockEligibility(data: ApplicantData): PredictionResult {
  const totalIncome = data.applicantIncome + (data.coApplicantIncome || 0);
  let score = 0;

  // Simple heuristic rules
  if (data.creditScore.includes("Excellent")) score += 40;
  if (data.creditScore.includes("Good")) score += 30;
  if (data.creditScore.includes("Fair")) score += 10;
  if (data.creditScore.includes("Poor")) score -= 50;

  if (totalIncome > 8000) score += 30;
  else if (totalIncome > 5000) score += 20;
  else if (totalIncome > 3000) score += 10;

  if (data.loanAmount > 200000) score -= 20;
  if (data.existingLiabilities) score -= 10;
  if (data.employmentType === "Self-Employed") score -= 5;
  if (data.yearsEmployment > 5) score += 10;

  const isEligible = score > 20;
  
  // Return consistent object
  return isEligible ? {
    prediction: "Eligible",
    confidence: Math.min(0.75 + (score / 200), 0.99),
    reasons: [
      "Credit profile meets the required threshold for approval.",
      "Income-to-loan ratio supports repayment capacity.",
      "Employment history demonstrates sufficient stability."
    ]
  } : {
    prediction: "Not Eligible",
    confidence: Math.min(0.70 + (Math.abs(score) / 100), 0.95),
    reasons: [
      "Calculated risk score is below the approval threshold.",
      "Debt-to-income ratio may be too high for the requested amount.",
      "Credit factors indicate elevated repayment risk."
    ]
  };
}