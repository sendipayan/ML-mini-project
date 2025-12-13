import React from 'react';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { ApplicantData, CreditScoreRange, EmploymentType, LoanTerm, PropertyOwnership } from '../types';
import { ArrowRight, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoanFormProps {
  data: ApplicantData;
  onChange: (key: keyof ApplicantData, value: any) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const LoanForm: React.FC<LoanFormProps> = ({ data, onChange, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    let finalValue: any = value;
    
    if (type === 'number') {
      finalValue = parseFloat(value) || 0;
    }
    
    if (id === 'existingLiabilities') {
        // Handle boolean select manually if needed, or simple cast
        finalValue = value === 'true';
    }

    onChange(id as keyof ApplicantData, finalValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full border-slate-800 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-400" />
            Applicant Details
          </CardTitle>
          <p className="text-sm text-slate-400">
            Enter financial details to simulate the classification model.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              id="applicantIncome"
              label="Applicant Income ($/mo)"
              type="number"
              value={data.applicantIncome}
              onChange={handleChange}
            />
            <Input
              id="coApplicantIncome"
              label="Co-Applicant Income ($/mo)"
              type="number"
              value={data.coApplicantIncome}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              id="loanAmount"
              label="Loan Amount Requested ($)"
              type="number"
              value={data.loanAmount}
              onChange={handleChange}
            />
            <Select
              id="loanTerm"
              label="Loan Term (Months)"
              value={data.loanTerm}
              onChange={handleChange}
              options={[
                { label: "12 Months (1 Year)", value: 12 },
                { label: "24 Months (2 Years)", value: 24 },
                { label: "36 Months (3 Years)", value: 36 },
                { label: "60 Months (5 Years)", value: 60 },
              ]}
            />
          </div>

          <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Credit Score Range</label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {Object.values(CreditScoreRange).map((range) => (
                    <button
                      key={range}
                      onClick={() => onChange('creditScore', range)}
                      className={`rounded-md px-3 py-2 text-xs font-medium transition-all ${
                        data.creditScore === range
                          ? 'bg-blue-600 text-white ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-900'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {range.split(' ')[0]}
                    </button>
                  ))}
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Select
              id="employmentType"
              label="Employment Type"
              value={data.employmentType}
              onChange={handleChange}
              options={[
                { label: "Salaried", value: EmploymentType.Salaried },
                { label: "Self-Employed", value: EmploymentType.SelfEmployed },
              ]}
            />
            <Input
              id="yearsEmployment"
              label="Years Employed"
              type="number"
              value={data.yearsEmployment}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
             <Select
              id="propertyOwnership"
              label="Property Ownership"
              value={data.propertyOwnership}
              onChange={handleChange}
              options={[
                { label: "Owned", value: PropertyOwnership.Owned },
                { label: "Rented", value: PropertyOwnership.Rented },
              ]}
            />
            <Select
              id="existingLiabilities"
              label="Existing Liabilities?"
              value={String(data.existingLiabilities)}
              onChange={(e) => onChange('existingLiabilities', e.target.value === 'true')}
              options={[
                { label: "No", value: "false" },
                { label: "Yes", value: "true" },
              ]}
            />
          </div>

          <div className="pt-4">
            <Button
              onClick={onSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              size="lg"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing Classification...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Predict Eligibility <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};