@@ .. @@
 import React, { useState } from 'react';
 import { ChevronDown, ChevronRight, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
+import { useLanguage } from '../context/LanguageContext';
 
 interface AnalysisResultsProps {
   analysis: {
@@ -10,6 +11,7 @@ interface AnalysisResultsProps {
 }
 
 const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
+  const { t } = useLanguage();
   const [expandedSection, setExpandedSection] = useState<string | null>('strengths');
 
   const sections = [
     {
       id: 'strengths',
-      title: 'Strengths',
+      title: t('analysis.strengths'),
       icon: CheckCircle,
       items: analysis.strengths,
       color: 'emerald',
@@ -25,7 +27,7 @@ const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
     },
     {
       id: 'weaknesses',
-      title: 'Areas for Improvement',
+      title: t('analysis.improvements'),
       icon: AlertTriangle,
       items: analysis.weaknesses,
       color: 'orange',
@@ -35,7 +37,7 @@ const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
     },
     {
       id: 'suggestions',
-      title: 'Recommendations',
+      title: t('analysis.recommendations'),
       icon: Lightbulb,
       items: analysis.suggestions,
       color: 'blue',
@@ -50,8 +52,8 @@ const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
   };
 
   return (
-    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
-      <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Analysis</h3>
+    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 sm:p-6">
+      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">{t('analysis.detailed_analysis')}</h3>
       
       <div className="space-y-4">
         {sections.map((section) => {
@@ -60,7 +62,7 @@ const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
           
           return (
             <div key={section.id} className={`border ${section.borderColor} rounded-xl overflow-hidden transition-all duration-200`}>
               <button
                 onClick={() => toggleSection(section.id)}
-                className={`w-full flex items-center justify-between p-4 ${section.bgColor} hover:opacity-80 transition-opacity`}
+                className={`w-full flex items-center justify-between p-3 sm:p-4 ${section.bgColor} hover:opacity-80 transition-opacity`}
               >
                 <div className="flex items-center space-x-3">
                   <Icon className={`w-5 h-5 ${section.iconColor}`} />
-                  <span className="font-medium text-gray-900">{section.title}</span>
+                  <span className="font-medium text-gray-900 text-sm sm:text-base">{section.title}</span>
                   <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white ${section.iconColor}`}>
                     {section.items.length}
                   </span>
                 </div>
                 {isExpanded ? (
                   <ChevronDown className="w-4 h-4 text-gray-500" />
                 ) : (
                   <ChevronRight className="w-4 h-4 text-gray-500" />
                 )}
               </button>
               
               {isExpanded && (
-                <div className="p-4 bg-white border-t border-gray-100">
+                <div className="p-3 sm:p-4 bg-white border-t border-gray-100">
                   <ul className="space-y-3">
                     {section.items.map((item, index) => (
                       <li key={index} className="flex items-start space-x-3">
                         <div className={`w-2 h-2 rounded-full ${section.iconColor.replace('text-', 'bg-')} mt-2 flex-shrink-0`}></div>
                         <p className="text-gray-700 text-sm leading-relaxed">
                           {item.replace(/^\s*[•\-\*]\s*/, '')}
                         </p>
                       </li>
                     ))}
                   </ul>
                 </div>
               )}
             </div>
           );
         })}
       </div>
     </div>