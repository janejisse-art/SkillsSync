@@ .. @@
 import React, { useEffect, useState } from 'react';
 import { useResumeContext } from '../context/ResumeContext';
+import { useLanguage } from '../context/LanguageContext';
 import { analyzeResumeWithAI } from '../services/aiService';
 import { getInternships } from '../services/internshipService';
 import { matchInternships } from '../utils/matchingUtils';
 import LoadingSpinner from './LoadingSpinner';
 import ScoreCard from './ScoreCard';
 import AnalysisResults from './AnalysisResults';
 import InternshipRecommendations from './InternshipRecommendations';
 import SkillGapAnalysis from './SkillGapAnalysis';
 import { FileText, RotateCcw } from 'lucide-react';
 
 const ResumeAnalysis: React.FC = () => {
   const { resumeData, setResumeData } = useResumeContext();
+  const { t } = useLanguage();
   const [analysis, setAnalysis] = useState<any>(null);
   const [internships, setInternships] = useState<any[]>([]);
   const [recommendations, setRecommendations] = useState<any[]>([]);
   const [skillsToGain, setSkillsToGain] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 
@@ .. @@
   if (error) {
     return (
       <div className="max-w-4xl mx-auto text-center">
         <div className="bg-red-50 border border-red-200 rounded-xl p-8">
-          <p className="text-red-600 mb-4">{error}</p>
+          <p className="text-red-600 mb-4">{t('common.error')}: {error}</p>
           <button
             onClick={analyzeResume}
             className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
           >
-            Try Again
+            {t('common.try_again')}
           </button>
         </div>
       </div>
@@ -67,7 +70,7 @@ const ResumeAnalysis: React.FC = () => {
   return (
     <div className="max-w-7xl mx-auto space-y-8">
       {/* Header */}
-      <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
+      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200/50 gap-4">
         <div className="flex items-center space-x-4">
           <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
             <FileText className="w-6 h-6 text-white" />
           </div>
           <div>
-            <h2 className="text-xl font-bold text-gray-900">{resumeData?.fileName}</h2>
+            <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate max-w-xs sm:max-w-none">{resumeData?.fileName}</h2>
             <p className="text-gray-600">Analyzed on {new Date().toLocaleDateString()}</p>
           </div>
         </div>
         <button
           onClick={handleStartOver}
           className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
         >
           <RotateCcw className="w-4 h-4" />
-          <span>Start Over</span>
+          <span>{t('common.start_over')}</span>
         </button>
       </div>
 
       {/* Score Card */}
       {analysis && <ScoreCard analysis={analysis} />}
 
-      <div className="grid lg:grid-cols-2 gap-8">
+      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
         {/* Analysis Results */}
         <div className="space-y-6">
           {analysis && <AnalysisResults analysis={analysis} />}
           {skillsToGain.length > 0 && <SkillGapAnalysis skills={skillsToGain} />}
         </div>
 
         {/* Internship Recommendations */}
         <div>
           {recommendations.length > 0 && (
             <InternshipRecommendations recommendations={recommendations} />
           )}
         </div>
       </div>
     </div>