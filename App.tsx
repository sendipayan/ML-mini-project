import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { LoanForm } from './components/LoanForm';
import { PredictionResultView } from './components/PredictionResult';
import { ApplicantData, PredictionResult } from './types';
import { DEFAULT_APPLICANT } from './constants';
import { predictEligibility } from './services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Metallic Logo Component matching the user's uploaded image
const Logo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" /> {/* slate-50 */}
        <stop offset="45%" stopColor="#94A3B8" /> {/* slate-400 */}
        <stop offset="55%" stopColor="#64748B" /> {/* slate-500 */}
        <stop offset="100%" stopColor="#F1F5F9" /> {/* slate-100 */}
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <g transform="translate(50, 50) rotate(30) translate(-50, -50)">
      {/* Three overlapping twisted petals to form the aperture shape */}
      {[0, 120, 240].map((rotation, i) => (
        <path
          key={i}
          d="M50 20 C 70 20, 85 40, 80 60 C 75 80, 50 80, 50 80"
          stroke="url(#metal-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          transform={`rotate(${rotation} 50 50)`}
          className="drop-shadow-sm"
        />
      ))}
      
      {/* Inner highlights for 3D effect */}
      {[0, 120, 240].map((rotation, i) => (
        <path
          key={`highlight-${i}`}
          d="M50 25 C 65 25, 75 40, 72 55"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.4"
          fill="none"
          transform={`rotate(${rotation} 50 50)`}
        />
      ))}
    </g>
  </svg>
);

export default function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [data, setData] = useState<ApplicantData>(DEFAULT_APPLICANT);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDataChange = (key: keyof ApplicantData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handlePredict = async () => {
    setIsLoading(true);
    // Scroll to top on mobile to see loading state if needed
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    try {
      const prediction = await predictEligibility(data);
      setResult(prediction);
    } catch (error) {
      console.error("Prediction failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-blue-500/30">
      <nav className="fixed top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('landing')}>
            <div className="relative flex h-10 w-10 items-center justify-center transition-transform group-hover:rotate-45 duration-500">
              <Logo className="h-full w-full" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Classifier<span className="text-slate-400">Demo</span></span>
          </div>
          <div className="flex items-center gap-4">
             <a href="https://groq.com" target="_blank" rel="noreferrer" className="hidden text-sm font-medium text-slate-400 transition-colors hover:text-white sm:block">
               Simulated by AI
             </a>
             {view === 'landing' && (
               <button onClick={() => setView('app')} className="text-sm font-medium text-blue-400 hover:text-blue-300">
                 Launch App
               </button>
             )}
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div
              key="landing"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero onStart={() => setView('app')} />
            </motion.div>
          ) : (
            <motion.div
              key="app"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto px-4 py-8 md:py-12"
            >
              <div className="mb-8 flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-white">Loan Eligibility Predictor</h2>
                <p className="text-slate-400">
                  Adjust the parameters below to see how the classification model reacts to different financial profiles.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7 xl:col-span-8">
                  <LoanForm 
                    data={data} 
                    onChange={handleDataChange} 
                    onSubmit={handlePredict}
                    isLoading={isLoading}
                  />
                </div>
                <div className="lg:col-span-5 xl:col-span-4 h-full min-h-[400px]">
                  <div className="sticky top-24 h-full">
                    <PredictionResultView result={result} isLoading={isLoading} />
                  </div>
                </div>
              </div>

              <div className="mt-16 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                 <p>This is a demonstration of Binary Classification using Generative AI.</p>
                 <p className="mt-2 opacity-60">Not valid for real financial advice.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}