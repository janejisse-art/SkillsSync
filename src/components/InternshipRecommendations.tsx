@@ .. @@
 import React from 'react';
-import { MapPin, Building, Star, TrendingUp } from 'lucide-react';
+import { MapPin, Building, Star, TrendingUp, ExternalLink } from 'lucide-react';
+import { useLanguage } from '../context/LanguageContext';
 
 interface Internship {
+  id: number;
   title: string;
   company: string;
   location: string;
   category: string;
   description: string;
   skills_required: string[];
+  score_range: [number, number];
   matchedSkills: string[];
   matchCount: number;
   totalSkills: number;
+  matchPercentage: number;
 }
 
 interface InternshipRecommendationsProps {
@@ -20,6 +25,7 @@ interface InternshipRecommendationsProps {
 }
 
 const InternshipRecommendations: React.FC<InternshipRecommendationsProps> = ({ recommendations }) => {
+  const { t } = useLanguage();
   const getMatchPercentage = (internship: Internship) => {
     return internship.totalSkills > 0 ? Math.round((internship.matchCount / internship.totalSkills) * 100) : 0;
   };
@@ -33,15 +39,15 @@ const InternshipRecommendations: React.FC<InternshipRecommendationsProps> = ({
 
   return (
-    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
+    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 sm:p-6">
       <div className="flex items-center justify-between mb-6">
         <div>
-          <h3 className="text-xl font-bold text-gray-900">Recommended Internships</h3>
-          <p className="text-gray-600 text-sm">Based on your skills and experience</p>
+          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t('internships.title')}</h3>
+          <p className="text-gray-600 text-sm">{t('internships.subtitle')}</p>
         </div>
         <TrendingUp className="w-6 h-6 text-gray-400" />
       </div>
 
-      <div className="space-y-4">
+      <div className="space-y-3 sm:space-y-4">
         {recommendations.map((internship, index) => {
           const matchPercentage = getMatchPercentage(internship);
           
           return (
-            <div key={index} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
-              <div className="flex items-start justify-between mb-3">
+            <div key={internship.id || index} className="border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
+              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-3">
                 <div className="flex-1">
-                  <h4 className="font-semibold text-gray-900 text-lg mb-1">{internship.title}</h4>
-                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
+                  <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-2">{internship.title}</h4>
+                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
                     <div className="flex items-center space-x-1">
                       <Building className="w-4 h-4" />
                       <span>{internship.company}</span>
                     </div>
                     <div className="flex items-center space-x-1">
                       <MapPin className="w-4 h-4" />
-                      <span>{internship.location}</span>
+                      <span>{internship.location === 'Remote' ? t('common.remote') : internship.location}</span>
                     </div>
                   </div>
                 </div>
                 
-                <div className="flex items-center space-x-2">
+                <div className="flex items-center justify-between sm:justify-end space-x-2">
                   <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(matchPercentage)}`}>
-                    {matchPercentage}% match
+                    {matchPercentage}% {t('internships.match')}
                   </div>
                   <div className="flex items-center space-x-1 text-sm text-gray-500">
                     <Star className="w-4 h-4" />
                     <span>{internship.matchCount}/{internship.totalSkills}</span>
                   </div>
                 </div>
               </div>
 
-              <p className="text-gray-700 text-sm mb-4 line-clamp-2">{internship.description}</p>
+              <p className="text-gray-700 text-sm mb-4 leading-relaxed">{internship.description}</p>
 
               <div className="space-y-3">
-                <div>
-                  <h5 className="text-sm font-medium text-gray-900 mb-2">Your Matching Skills:</h5>
-                  <div className="flex flex-wrap gap-2">
-                    {internship.matchedSkills.map((skill, skillIndex) => (
-                      <span 
-                        key={skillIndex}
-                        className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium"
-                      >
-                        {skill}
-                      </span>
-                    ))}
+                {internship.matchedSkills.length > 0 && (
+                  <div>
+                    <h5 className="text-sm font-medium text-gray-900 mb-2">{t('internships.matching_skills')}</h5>
+                    <div className="flex flex-wrap gap-1 sm:gap-2">
+                      {internship.matchedSkills.map((skill, skillIndex) => (
+                        <span 
+                          key={skillIndex}
+                          className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium"
+                        >
+                          {skill}
+                        </span>
+                      ))}
+                    </div>
                   </div>
-                </div>
+                )}
 
                 {internship.skills_required.length > internship.matchedSkills.length && (
                   <div>
-                    <h5 className="text-sm font-medium text-gray-900 mb-2">Skills to Develop:</h5>
-                    <div className="flex flex-wrap gap-2">
+                    <h5 className="text-sm font-medium text-gray-900 mb-2">{t('internships.skills_to_develop')}</h5>
+                    <div className="flex flex-wrap gap-1 sm:gap-2">
                       {internship.skills_required
                         .filter(skill => !internship.matchedSkills.includes(skill))
                         .map((skill, skillIndex) => (
                           <span 
                             key={skillIndex}
                             className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
                           >
                             {skill}
                           </span>
                         ))}
                     </div>
                   </div>
                 )}
               </div>
 
-              <div className="mt-4 pt-4 border-t border-gray-100">
-                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
-                  {internship.category}
-                </span>
+              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
+                <div className="flex flex-wrap items-center gap-2">
+                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
+                    {internship.category}
+                  </span>
+                  {internship.score_range && (
+                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
+                      Score: {internship.score_range[0]}-{internship.score_range[1]}
+                    </span>
+                  )}
+                </div>
+                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
+                  <span>View Details</span>
+                  <ExternalLink className="w-3 h-3" />
+                </button>
               </div>
             </div>
           );
         })}
       </div>
     </div>