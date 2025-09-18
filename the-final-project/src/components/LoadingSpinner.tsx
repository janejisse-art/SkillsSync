import React from 'react';
import { Loader2, Brain, Target, FileText } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  const steps = [
    { icon: FileText, text: 'Parsing resume...', delay: 0 },
    { icon: Brain, text: 'Analyzing with AI...', delay: 1000 },
    { icon: Target, text: 'Finding matches...', delay: 2000 },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-12 text-center">
        <div className="space-y-8">
          <div className="flex justify-center">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Resume</h3>
            <p className="text-gray-600">Our AI is working hard to provide you with the best insights</p>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-3 text-gray-600"
                style={{ 
                  animation: `fadeInUp 0.5s ease-out ${step.delay}ms both`
                }}
              >
                <step.icon className="w-5 h-5" />
                <span>{step.text}</span>
              </div>
            ))}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;