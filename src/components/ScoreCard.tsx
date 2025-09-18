@@ .. @@
 import React from 'react';
 import { TrendingUp, Star } from 'lucide-react';
+import { useLanguage } from '../context/LanguageContext';
 
 interface ScoreCardProps {
   analysis: {
@@ -9,6 +10,7 @@ interface ScoreCardProps {
 }
 
 const ScoreCard: React.FC<ScoreCardProps> = ({ analysis }) => {
+  const { t } = useLanguage();
   const score = analysis.overall_rating;
   const percentage = (score / 10) * 100;
 
@@ -25,9 +27,9 @@ const ScoreCard: React.FC<ScoreCardProps> = ({ analysis }) => {
   };
 
   const getScoreMessage = (score: number) => {
-    if (score >= 8) return 'Excellent Resume!';
-    if (score >= 6) return 'Good Resume';
-    if (score >= 4) return 'Needs Improvement';
-    return 'Requires Major Updates';
+    if (score >= 8) return t('analysis.excellent');
+    if (score >= 6) return t('analysis.good');
+    if (score >= 4) return t('analysis.needs_improvement');
+    return t('analysis.major_updates');
   };
 
   return (
-    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
+    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 sm:p-8">
       <div className="flex items-center justify-between mb-8">
         <div>
-          <h3 className="text-2xl font-bold text-gray-900 mb-2">Resume Score</h3>
-          <p className="text-gray-600">AI-powered analysis of your resume quality</p>
+          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('analysis.resume_score')}</h3>
+          <p className="text-gray-600 text-sm sm:text-base">{t('analysis.score_subtitle')}</p>
         </div>
         <TrendingUp className="w-8 h-8 text-gray-400" />
       </div>
 
-      <div className="grid md:grid-cols-2 gap-8">
+      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
         <div className="text-center">
-          <div className="relative w-40 h-40 mx-auto mb-6">
+          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
               <circle
                 cx="50"
                 cy="50"
                 r="40"
                 stroke="currentColor"
                 strokeWidth="8"
                 fill="transparent"
                 className="text-gray-200"
               />
               <circle
                 cx="50"
                 cy="50"
                 r="40"
                 stroke="currentColor"
                 strokeWidth="8"
                 fill="transparent"
                 strokeDasharray={`${percentage * 2.51} 251`}
                 className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
                 strokeLinecap="round"
               />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-center">
-                <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
+                <div className={`text-2xl sm:text-4xl font-bold ${getScoreColor(score)}`}>
                   {score.toFixed(1)}
                 </div>
-                <div className="text-sm text-gray-500">out of 10</div>
+                <div className="text-xs sm:text-sm text-gray-500">{t('common.out_of')} 10</div>
               </div>
             </div>
           </div>
           
           <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${getScoreGradient(score)} text-white text-sm font-medium`}>
             <Star className="w-4 h-4" />
             <span>{getScoreMessage(score)}</span>
           </div>
         </div>
 
         <div className="space-y-6">
           <div>
             <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
               <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
-              Top Strengths ({analysis.strengths.length})
+              {t('analysis.strengths')} ({analysis.strengths.length})
             </h4>
             <ul className="space-y-2">
               {analysis.strengths.slice(0, 3).map((strength, index) => (
                 <li key={index} className="text-sm text-gray-600 pl-4 border-l-2 border-emerald-200">
                   {strength.replace(/^\s*[•\-\*]\s*/, '')}
                 </li>
               ))}
             </ul>
           </div>
 
           <div>
             <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
               <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
-              Areas for Improvement ({analysis.weaknesses.length})
+              {t('analysis.improvements')} ({analysis.weaknesses.length})
             </h4>
             <ul className="space-y-2">
               {analysis.weaknesses.slice(0, 3).map((weakness, index) => (
                 <li key={index} className="text-sm text-gray-600 pl-4 border-l-2 border-orange-200">
                   {weakness.replace(/^\s*[•\-\*]\s*/, '')}
                 </li>
               ))}
             </ul>
           </div>
         </div>
       </div>
     </div>