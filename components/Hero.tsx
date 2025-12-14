import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight, Binary, FileSpreadsheet, GitGraph, Scale, ShieldAlert, BrainCircuit } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col w-full bg-slate-50">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center px-6 overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 z-0 opacity-40">
           {/* Subtle background mesh */}
           <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-[100px]" />
           <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-slate-200/50 blur-[80px]" />
        </div>

        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Content */}
          <div className="flex flex-col space-y-8 max-w-2xl">
             <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-600 shadow-sm">
                  Academic Demo
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
                  Binary Classification
                </span>
             </div>

             <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                Loan Eligibility <br />
                <span className="text-slate-500">Prediction Model</span>
             </h1>

             <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
                A transparent simulation of how financial institutions leverage machine learning to automate risk assessment and loan approvals.
             </p>

             <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" onClick={onStart} className="h-14 px-8 text-lg rounded-full shadow-lg shadow-slate-200 hover:shadow-xl transition-all">
                   Test Eligibility
                </Button>
                <Button size="lg" variant="ghost" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="h-14 px-8 text-lg rounded-full">
                   How it works
                </Button>
             </div>
          </div>

          {/* Right: Custom Illustration - Decision Pipeline */}
          <div className="relative hidden lg:flex h-[500px] w-full items-center justify-center">
             <div className="relative w-full h-full bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-8 flex flex-col justify-between">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-slate-200" />
                
                {/* Visualizing the Pipeline */}
                <div className="flex-1 flex flex-col justify-center space-y-8">
                   
                   {/* Step 1: Input */}
                   <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                         <FileSpreadsheet className="h-6 w-6 text-slate-500" />
                      </div>
                      <div className="flex-1 space-y-2">
                         <div className="h-2 w-24 bg-slate-100 rounded-full" />
                         <div className="h-2 w-32 bg-slate-100 rounded-full" />
                      </div>
                      <span className="text-xs font-mono text-slate-400">INPUT_VECTOR</span>
                   </div>

                   {/* Connection Line */}
                   <div className="h-8 w-0.5 bg-slate-200 ml-6" />

                   {/* Step 2: Processing Node */}
                   <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-inner">
                         <BrainCircuit className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="flex-1 p-3 bg-indigo-50/50 rounded-lg border border-indigo-50">
                         <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-semibold text-indigo-900">Inference Engine</span>
                            <span className="text-[10px] text-indigo-400">v2.1</span>
                         </div>
                         <div className="h-1.5 w-full bg-indigo-100 rounded-full overflow-hidden relative">
                            <div className="h-full bg-indigo-500 w-full animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
                         </div>
                      </div>
                   </div>

                   {/* Connection Line */}
                   <div className="h-8 w-0.5 bg-slate-200 ml-6" />

                   {/* Step 3: Decision */}
                   <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg">
                         <Binary className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                         <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-md">ELIGIBLE</span>
                         <span className="text-xs text-slate-400">or</span>
                         <span className="px-3 py-1 bg-slate-100 text-slate-400 text-xs font-bold rounded-md">NOT ELIGIBLE</span>
                      </div>
                   </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                   <div className="text-xs text-slate-400">
                      Simulated Environment
                   </div>
                   <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs font-medium text-slate-600">System Active</span>
                   </div>
                </div>
             </div>
             
             {/* Floating decorative elements */}
             <div className="absolute -right-8 top-20 bg-white p-4 rounded-xl shadow-xl border border-slate-100 max-w-[150px]">
                <div className="flex items-center space-x-2 mb-2">
                   <GitGraph className="h-4 w-4 text-slate-400" />
                   <span className="text-xs font-bold text-slate-700">Decision Tree</span>
                </div>
                <div className="h-1 w-full bg-slate-100 rounded-full mb-1" />
                <div className="h-1 w-2/3 bg-slate-100 rounded-full" />
             </div>

          </div>
        </div>
      </section>

      {/* --- WHAT THIS PROJECT DEMONSTRATES --- */}
      <section className="py-24 bg-white border-y border-slate-100">
         <div className="container px-6">
            <div className="mb-16 max-w-2xl">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Concepts</h2>
               <p className="text-slate-500 text-lg">
                  This application breaks down the black box of algorithmic lending into three understandable components.
               </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 {
                   icon: Scale,
                   title: "Weighted Classification",
                   desc: "The model weighs diverse features like income stability and credit history to compute a single probability score."
                 },
                 {
                   icon: BrainCircuit,
                   title: "LLM Simulation",
                   desc: "Instead of a static scikit-learn model, we use a Large Language Model to act as a reasoning engine for the decision."
                 },
                 {
                   icon: ShieldAlert,
                   title: "Risk Thresholding",
                   desc: "A binary output (Yes/No) is derived from a continuous confidence score, mirroring real-world banking cutoffs."
                 }
               ].map((card, i) => (
                 <div 
                   key={i}
                   className="group p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-lg transition-all transform hover:-translate-y-1"
                 >
                    <div className="h-12 w-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors">
                       <card.icon className="h-6 w-6 text-slate-700 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                    <p className="text-slate-500 leading-relaxed">
                       {card.desc}
                    </p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 bg-slate-50">
         <div className="container px-6">
            <div className="grid lg:grid-cols-2 gap-16">
               <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">The Classification Pipeline</h2>
                  <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                     Modern risk assessment isn't magic—it's math. Here is how a raw applicant profile is transformed into a lending decision.
                  </p>
                  
                  <div className="space-y-8">
                     {[
                       { step: "01", title: "Feature Extraction", desc: "Raw inputs (e.g., $5000 income) are normalized into numerical vectors." },
                       { step: "02", title: "Inference", desc: "The model compares the vector against learned patterns of default risk." },
                       { step: "03", title: "Binary Output", desc: "If Probability(Repayment) > Threshold, the loan is approved." }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-sm font-mono font-bold text-slate-400 bg-white">
                             {item.step}
                          </div>
                          <div>
                             <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                             <p className="text-slate-500">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="bg-slate-900 rounded-3xl p-8 text-slate-300 font-mono text-sm shadow-2xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                     <Binary className="h-24 w-24" />
                  </div>
                  <div className="space-y-4 relative z-10">
                     <div className="flex space-x-2 text-indigo-400">
                        <span>def</span>
                        <span className="text-yellow-200">predict_eligibility</span>
                        <span className="text-white">(applicant):</span>
                     </div>
                     <div className="pl-4 space-y-2">
                        <p><span className="text-indigo-400">score</span> = 0</p>
                        <p>if applicant.credit_score &gt; 700:</p>
                        <p className="pl-4 text-emerald-400">score += 0.4</p>
                        <p>if applicant.dti_ratio &lt; 0.3:</p>
                        <p className="pl-4 text-emerald-400">score += 0.3</p>
                        <br />
                        <p><span className="text-slate-500"># Sigmoid activation</span></p>
                        <p>probability = <span className="text-yellow-200">sigmoid</span>(score)</p>
                        <p>return probability &gt; 0.65</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- DISCLAIMER & CTA --- */}
      <section className="py-20 bg-white border-t border-slate-200">
         <div className="container px-6 text-center max-w-3xl mx-auto">
            <div className="mb-12 p-6 bg-slate-50 rounded-lg border border-slate-100">
               <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">Academic Disclaimer</h4>
               <p className="text-slate-500 text-sm">
                  This project uses a Large Language Model to <strong>simulate</strong> a classification algorithm. 
                  It does not access real credit bureaus, nor does it constitute actual financial advice. 
                  The "decisions" are generated based on prompt engineering logic for educational demonstration only.
               </p>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to test the model?</h2>
            <Button size="lg" onClick={onStart} className="h-14 px-10 text-lg rounded-full shadow-xl shadow-indigo-200 hover:shadow-indigo-300/50 bg-slate-900 hover:bg-slate-800 text-white transition-all">
               Launch Simulator
               <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
         </div>
      </section>

    </div>
  );
};