import { ApplicantData, CreditScoreRange, EmploymentType, PropertyOwnership } from "./types";

export const DEFAULT_APPLICANT: ApplicantData = {
  applicantIncome: 5500,
  coApplicantIncome: 1200,
  loanAmount: 150000,
  loanTerm: 36,
  creditScore: CreditScoreRange.Good,
  employmentType: EmploymentType.Salaried,
  yearsEmployment: 4,
  existingLiabilities: false,
  propertyOwnership: PropertyOwnership.Rented,
};

export const MOCK_RESULT_ELIGIBLE = {
  prediction: "Eligible",
  confidence: 0.88,
  reasons: [
    "Applicant income exceeds the debt-to-income ratio threshold.",
    "Credit score falls within the 'Good' range, indicating responsible history.",
    "Consistent employment history of 4 years provides stability.",
  ],
};

export const MOCK_RESULT_NOT_ELIGIBLE = {
  prediction: "Not Eligible",
  confidence: 0.92,
  reasons: [
    "Requested loan amount is too high relative to combined monthly income.",
    "Recent credit history shows potential risk factors.",
    "Lack of collateral or property ownership increases lending risk.",
  ],
};