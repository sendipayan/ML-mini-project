import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { PredictionResult } from '../types';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, BrainCircuit } from 'lucide-react';
import { cn } from '../utils';

interface PredictionResultProps {
  result: PredictionResult | null;
  isLoading: boolean;
}

export const PredictionResultView: React.FC<PredictionResultProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="h-full border-slate-800 bg-slate-900/60 p-6">
        <div className="flex h-full flex-col items-center justify-center space-y-6 opacity-70">
           <div className="relative h-20 w-20">
             <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20"></div>
             <div className="relative flex h-full w-full items-center justify-center rounded-full bg-slate-800 border border-slate-700">
               <BrainCircuit className="h-8 w-8 text-blue-400 animate-pulse" />
             </div>
           </div>
           <div className="space-y-2 text-center">
             <h3 className="text-lg font-medium text-white">Running Classification Model</h3>
             <p className="text-sm text-slate-400">Analyzing patterns in applicant data...</p>
           </div>
           <div className="w-full max-w-xs space-y-2">
             <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
               <div className="h-full w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
             </div>
             <div className="flex justify-between text-xs text-slate-500">
               <span>Input Vectorization</span>
               <span>Inference</span>
             </div>
           </div>
        </div>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="h-full border-slate-800 bg-slate-900/40 p-6 border-dashed">
         <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-slate-800 p-4">
              <BrainCircuit className="h-8 w-8 text-slate-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-slate-300">Awaiting Input</h3>
              <p className="max-w-xs text-sm text-slate-500">
                Complete the applicant details form and click predict to see the classification result.
              </p>
            </div>
         </div>
      </Card>
    );
  }

  const isEligible = result.prediction === "Eligible";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className={cn(
        "h-full border-l-4 overflow-hidden relative",
        isEligible ? "border-l-emerald-500 bg-emerald-950/10" : "border-l-rose-500 bg-rose-950/10"
      )}>
        {/* Decorative background gradients */}
        <div className={cn(
          "absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-20 pointer-events-none",
          isEligible ? "bg-emerald-500" : "bg-rose-500"
        )} />

        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-slate-900/50 backdrop-blur">
              Model Confidence: {(result.confidence * 100).toFixed(1)}%
            </Badge>
            <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
              Classification Output
            </span>
          </div>
          <div className="mt-4 flex items-center gap-3">
             {isEligible ? (
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
             ) : (
                <XCircle className="h-10 w-10 text-rose-400" />
             )}
             <div>
               <h2 className="text-3xl font-bold text-white tracking-tight">{result.prediction}</h2>
               <p className={cn("text-sm font-medium", isEligible ? "text-emerald-400" : "text-rose-400")}>
                 {isEligible ? "Low Risk Probability" : "High Risk Probability"}
               </p>
             </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-6 pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-slate-400">Eligibility Probability</span>
              <span className="text-slate-200">{Math.round(result.confidence * 100)}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={cn(
                  "h-full rounded-full transition-all",
                  isEligible ? "bg-emerald-500" : "bg-rose-500"
                )} 
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Key Factors</h4>
            <div className="grid gap-3">
              {result.reasons.map((reason, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="flex items-start gap-3 rounded-lg bg-slate-900/50 p-3 border border-slate-800/50"
                >
                  <div className={cn(
                    "mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
                    isEligible ? "bg-emerald-400" : "bg-rose-400"
                  )} />
                  <p className="text-sm text-slate-300 leading-relaxed">{reason}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="rounded-lg bg-blue-900/20 p-4 border border-blue-900/50">
             <div className="flex items-start gap-3">
               <BrainCircuit className="h-5 w-5 text-blue-400 mt-0.5" />
               <div className="text-xs text-blue-200/80">
                 <span className="font-semibold text-blue-300">How this works:</span> The AI analyzes input features against a trained decision boundary. This simulation demonstrates how banks use binary classification to automate risk assessment.
               </div>
             </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};