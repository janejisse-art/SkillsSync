@@ .. @@
 import React from 'react';
 import { TrendingUp, Award, BookOpen } from 'lucide-react';
+import { useLanguage } from '../context/LanguageContext';
 
 interface Skill {
   skill: string;
@@ -11,6 +12,7 @@ interface SkillGapAnalysisProps {
 }
 
 const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({ skills }) => {
+  const { t } = useLanguage();
   const maxCount = Math.max(...skills.map(s => s.count));
 
   const getSkillPriority = (skill: Skill) => {
-    if (skill.count >= maxCount * 0.8) return { color: 'emerald', label: 'High Priority' };
-    if (skill.count >= maxCount * 0.5) return { color: 'blue', label: 'Medium Priority' };
-    return { color: 'gray', label: 'Low Priority' };
+    if (skill.count >= maxCount * 0.8) return { color: 'emerald', label: t('skills.high_priority') };
+    if (skill.count >= maxCount * 0.5) return { color: 'blue', label: t('skills.medium_priority') };
+    return { color: 'gray', label: t('skills.low_priority') };
   };
 
   return (
-    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
+    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 sm:p-6">
       <div className="flex items-center justify-between mb-6">
         <div>
-          <h3 className="text-xl font-bold text-gray-900">Skills to Develop</h3>
-          <p className="text-gray-600 text-sm">Unlock more internship opportunities</p>
+          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t('skills.title')}</h3>
+          <p className="text-gray-600 text-sm">{t('skills.subtitle')}</p>
         </div>
         <BookOpen className="w-6 h-6 text-gray-400" />
       </div>
 
       <div className="space-y-4 mb-6">
         {skills.slice(0, 8).map((skill, index) => {
           const priority = getSkillPriority(skill);
           const percentage = (skill.count / maxCount) * 100;
           
           return (
-            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
+            <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-sm transition-all duration-200 hover:scale-[1.01]">
               <div className="flex items-center justify-between mb-2">
-                <div className="flex items-center space-x-3">
-                  <span className="font-medium text-gray-900">{skill.skill}</span>
+                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
+                  <span className="font-medium text-gray-900 text-sm sm:text-base">{skill.skill}</span>
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                     priority.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                     priority.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                     'bg-gray-100 text-gray-700'
                   }`}>
                     {priority.label}
                   </span>
                 </div>
-                <div className="flex items-center space-x-2 text-sm text-gray-600">
+                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mt-2 sm:mt-0">
                   <Award className="w-4 h-4" />
-                  <span>{skill.count} opportunities</span>
+                  <span>{skill.count} {t('skills.opportunities')}</span>
                 </div>
               </div>
               
               <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                 <div 
                   className={`h-2 rounded-full transition-all duration-500 ${
                     priority.color === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                     priority.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                     'bg-gradient-to-r from-gray-400 to-gray-500'
                   }`}
                   style={{ width: `${percentage}%` }}
                 />
               </div>
               
               <p className="text-xs text-gray-500">
-                Learning this skill would unlock <strong>{skill.count}</strong> additional internship{skill.count > 1 ? 's' : ''}
+                Learning this skill would unlock <strong>{skill.count}</strong> additional internship{skill.count > 1 ? 's' : ''}
               </p>
             </div>
           );
         })}
       </div>
 
       <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
         <div className="flex items-start space-x-3">
           <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
           <div>
-            <h4 className="font-medium text-blue-900 mb-1">💡 Pro Tip</h4>
+            <h4 className="font-medium text-blue-900 mb-1">{t('skills.tip')}</h4>
             <p className="text-blue-700 text-sm leading-relaxed">
-              Focus on learning the top 3-5 skills from this list to significantly increase your internship opportunities. 
-              Consider online courses, projects, or certifications in these areas.
+              {t('skills.tip_description')}
             </p>
           </div>
         </div>
       </div>
     </div>