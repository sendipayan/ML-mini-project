export enum LoanTerm {
  Months12 = 12,
  Months24 = 24,
  Months36 = 36,
  Months60 = 60,
}

export enum CreditScoreRange {
  Poor = "Poor (300-579)",
  Fair = "Fair (580-669)",
  Good = "Good (670-739)",
  Excellent = "Excellent (740+)",
}

export enum EmploymentType {
  Salaried = "Salaried",
  SelfEmployed = "Self-Employed",
}

export enum PropertyOwnership {
  Owned = "Owned",
  Rented = "Rented",
}

export interface ApplicantData {
  applicantIncome: number;
  coApplicantIncome: number;
  loanAmount: number;
  loanTerm: number;
  creditScore: string;
  employmentType: string;
  yearsEmployment: number;
  existingLiabilities: boolean;
  propertyOwnership: string;
}

export interface PredictionResult {
  prediction: "Eligible" | "Not Eligible";
  confidence: number;
  reasons: string[];
}

export interface ClassificationState {
  isLoading: boolean;
  result: PredictionResult | null;
  error: string | null;
}