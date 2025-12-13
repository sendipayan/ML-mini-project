import React from 'react';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Badge } from './ui/Badge';
import { PredictionResult } from '../types';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, BrainCircuit, Activity } from 'lucide-react';
import { cn } from '../utils';

interface PredictionResultProps {
  result: PredictionResult | null;
  isLoading: boolean;
}

export const PredictionResultView: React.FC<PredictionResultProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="h-full border-slate-200 bg-white/80 p-6 shadow-md">
        <div className="flex h-full flex-col items-center justify-center space-y-6 opacity-70">
           <div className="relative h-20 w-20">
             <div className="absolute inset-0 animate-ping rounded-full bg-indigo-500/10"></div>
             <div className="relative flex h-full w-full items-center justify-center rounded-full bg-slate-50 border border-slate-200">
               <Activity className="h-8 w-8 text-indigo-500 animate-pulse" />
             </div>
           </div>
           <div className="space-y-2 text-center">
             <h3 className="text-lg font-medium text-slate-900">Classifying Applicant</h3>
             <p className="text-sm text-slate-500">Vectorizing features & calculating risk...</p>
           </div>
           <div className="w-full max-w-xs space-y-2">
             <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
               <div className="h-full w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
             </div>
           </div>
        </div>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="h-full border-slate-200 bg-slate-50/50 p-6 border-dashed">
         <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-white p-4 shadow-sm border border-slate-100">
              <BrainCircuit className="h-8 w-8 text-slate-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-slate-900">Prediction Idle</h3>
              <p className="max-w-xs text-sm text-slate-500">
                The model is ready. Enter details to simulate the classification process.
              </p>
            </div>
         </div>
      </Card>
    );
  }

  const isEligible = result.prediction === "Eligible";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Card className={cn(
        "h-full border-l-4 overflow-hidden relative shadow-lg",
        isEligible ? "border-l-emerald-500 bg-emerald-50/50" : "border-l-rose-500 bg-rose-50/50"
      )}>
        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-white/80 backdrop-blur border-slate-200 text-slate-600">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </Badge>
            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
              Outcome
            </span>
          </div>
          <div className="mt-6 flex items-center gap-4">
             <div className={cn(
               "flex h-14 w-14 items-center justify-center rounded-full shadow-sm border-2",
               isEligible ? "bg-emerald-100 border-emerald-200" : "bg-rose-100 border-rose-200"
             )}>
               {isEligible ? (
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
               ) : (
                  <XCircle className="h-8 w-8 text-rose-600" />
               )}
             </div>
             <div>
               <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{result.prediction}</h2>
               <p className={cn("text-sm font-medium", isEligible ? "text-emerald-700" : "text-rose-700")}>
                 {isEligible ? "Model approves loan request" : "Model rejects loan request"}
               </p>
             </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-8 pt-8">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-slate-500">Probability Score</span>
              <span className="text-slate-900 font-bold">{Math.round(result.confidence * 100)}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200/60">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence * 100}%` }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className={cn(
                  "h-full rounded-full transition-all shadow-sm",
                  isEligible ? "bg-emerald-500" : "bg-rose-500"
                )} 
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-2">Determinants</h4>
            <div className="grid gap-3">
              {result.reasons.map((reason, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="flex items-start gap-3 rounded-lg bg-white p-3 shadow-sm border border-slate-100"
                >
                  <div className={cn(
                    "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                    isEligible ? "bg-emerald-400" : "bg-rose-400"
                  )} />
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{reason}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="rounded-lg bg-slate-100 p-4 border border-slate-200">
             <div className="flex items-start gap-3">
               <BrainCircuit className="h-5 w-5 text-slate-500 mt-0.5" />
               <div className="text-xs text-slate-500">
                 <span className="font-semibold text-slate-700">System Note:</span> This decision was generated by an LLM simulating a binary classifier trained on historical loan data.
               </div>
             </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};