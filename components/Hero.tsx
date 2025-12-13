import React from 'react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1 text-sm text-slate-300 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
          AI Classification Demo
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight lg:text-6xl max-w-4xl bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent"
        >
          Loan Eligibility Prediction <br/>
          <span className="text-white">Using Binary Classification</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-[700px] text-lg text-slate-400 leading-relaxed"
        >
          Experience how Machine Learning models assess financial risk. 
          This interactive demo simulates a loan approval classifier using 
          advanced features and real-time inference.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-md justify-center"
        >
          <Button size="lg" onClick={onStart} className="group text-lg h-14 bg-white text-slate-900 hover:bg-slate-200">
            Test Loan Eligibility
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left w-full max-w-5xl"
        >
          {[
            {
              icon: BarChart3,
              title: "Feature Engineering",
              desc: "Inputs like income, credit score, and term are vectorized for the model."
            },
            {
              icon: Zap,
              title: "Fast Inference",
              desc: "Simulated real-time classification using high-speed LLM logic."
            },
            {
              icon: ShieldCheck,
              title: "Risk Analysis",
              desc: "Binary classification separates applicants into low and high risk classes."
            }
          ].map((feature, i) => (
            <div key={i} className="group rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition-all hover:bg-slate-800/60 hover:-translate-y-1">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-500/10 p-2 text-blue-400 group-hover:text-blue-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};