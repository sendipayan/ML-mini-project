import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { LoanForm } from './components/LoanForm';
import { PredictionResultView } from './components/PredictionResult';
import { ApplicantData, PredictionResult } from './types';
import { DEFAULT_APPLICANT } from './constants';
import { predictEligibility } from './services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Metallic Logo Component - Updated for Light Theme visibility
const Logo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#334155" /> {/* slate-700 */}
        <stop offset="45%" stopColor="#0f172a" /> {/* slate-900 */}
        <stop offset="55%" stopColor="#1e293b" /> {/* slate-800 */}
        <stop offset="100%" stopColor="#334155" /> {/* slate-700 */}
      </linearGradient>
    </defs>
    
    <g transform="translate(50, 50) rotate(30) translate(-50, -50)">
      {/* Three overlapping twisted petals to form the aperture shape */}
      {[0, 120, 240].map((rotation, i) => (
        <path
          key={i}
          d="M50 20 C 70 20, 85 40, 80 60 C 75 80, 50 80, 50 80"
          stroke="url(#metal-grad)"
          strokeWidth="8"
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
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.3"
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('landing')}>
            <div className="relative flex h-10 w-10 items-center justify-center transition-transform group-hover:rotate-45 duration-500">
              <Logo className="h-full w-full" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Classifier<span className="text-slate-400 font-medium">Demo</span></span>
          </div>
          <div className="flex items-center gap-6">
             <a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="hidden text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 sm:block">
               Powered by Gemini
             </a>
             {view === 'landing' && (
               <button onClick={() => setView('app')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                 Launch Simulator
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
              className="container mx-auto px-6 py-12"
            >
              <div className="mb-10 flex flex-col gap-2 max-w-3xl">
                <h2 className="text-3xl font-bold text-slate-900">Loan Eligibility Predictor</h2>
                <p className="text-slate-500 text-lg">
                  Configure the applicant profile below. The classification model will analyze the vector in real-time.
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

              <div className="mt-20 border-t border-slate-200 pt-8 text-center text-sm text-slate-400">
                 <p>Demo Environment v1.0 • Built with Next.js & Gemini</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}