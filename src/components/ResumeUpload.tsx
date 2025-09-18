@@ .. @@
 import React, { useCallback, useState } from 'react';
 import { useDropzone } from 'react-dropzone';
 import { Upload, FileText, Loader2, Target, Zap } from 'lucide-react';
 import { useResumeContext } from '../context/ResumeContext';
+import { useLanguage } from '../context/LanguageContext';
 import { extractTextFromPDF } from '../utils/pdfUtils';
 import ResumeAnalysis from './ResumeAnalysis';
 
 const ResumeUpload: React.FC = () => {
   const { resumeData, setResumeData, isAnalyzing, setIsAnalyzing } = useResumeContext();
 }
+  const { t } = useLanguage();
   const [uploadProgress, setUploadProgress] = useState(0);
 
@@ .. @@
     <div className="max-w-4xl mx-auto">
       <div className="text-center mb-12">
         <h2 className="text-4xl font-bold text-gray-900 mb-4">
-          Unlock Your Career Potential
+          {t('upload.title')}
         </h2>
         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
-          Get AI-powered insights on your resume and discover internships perfectly matched to your skills
+          {t('upload.subtitle')}
         </p>
       </div>
 
@@ .. @@
           {isAnalyzing ? (
             <div className="space-y-4">
               <Loader2 className="w-12 h-12 text-blue-500 mx-auto animate-spin" />
               <div>
-                <p className="text-lg font-medium text-gray-700 mb-2">Processing your resume...</p>
+                <p className="text-lg font-medium text-gray-700 mb-2">{t('upload.processing')}</p>
                 <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
                   <div 
                     className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                     style={{ width: `${uploadProgress}%` }}
                   />
                 </div>
                 <p className="text-sm text-gray-500 mt-2">{uploadProgress}% complete</p>
               </div>
             </div>
           ) : (
             <div className="space-y-4">
               <div className="flex items-center justify-center">
                 <div className="relative">
                   <Upload className="w-16 h-16 text-blue-500" />
                   <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                     <FileText className="w-3 h-3 text-white" />
                   </div>
                 </div>
               </div>
               
               <div>
                 <p className="text-lg font-semibold text-gray-700 mb-2">
-                  {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
+                  {isDragActive ? t('upload.drag_active') : t('upload.drag_drop')}
                 </p>
                 <p className="text-gray-500">
-                  Drag and drop your PDF resume, or click to browse
+                  {t('upload.description')}
                 </p>
               </div>
               
               <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
-                <span>PDF only</span>
-                <span>•</span>
-                <span>Max 10MB</span>
-                <span>•</span>
-                <span>Secure & Private</span>
+                <span>{t('upload.file_info')}</span>
               </div>
             </div>
           )}
@@ -89,21 +91,21 @@ const ResumeUpload: React.FC = () => {
           <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
             <FileText className="w-6 h-6 text-white" />
           </div>
}
-          <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
-          <p className="text-gray-600 text-sm">Get detailed feedback on your resume with AI-powered insights</p>
+          <h3 className="font-semibold text-gray-900 mb-2">{t('features.ai_analysis')}</h3>
+          <p className="text-gray-600 text-sm">{t('features.ai_description')}</p>
         </div>
 
         <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50">
           <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
             <Target className="w-6 h-6 text-white" />
           </div>
-          <h3 className="font-semibold text-gray-900 mb-2">Smart Matching</h3>
-          <p className="text-gray-600 text-sm">Find internships that perfectly match your skills and experience</p>
+          <h3 className="font-semibold text-gray-900 mb-2">{t('features.smart_matching')}</h3>
+          <p className="text-gray-600 text-sm">{t('features.smart_description')}</p>
         </div>
 
         <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50">
           <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
             <Zap className="w-6 h-6 text-white" />
           </div>
-          <h3 className="font-semibold text-gray-900 mb-2">Skill Development</h3>
-          <p className="text-gray-600 text-sm">Discover which skills to learn next to unlock more opportunities</p>
+          <h3 className="font-semibold text-gray-900 mb-2">{t('features.skill_development')}</h3>
+          <p className="text-gray-600 text-sm">{t('features.skill_description')}</p>
         </div>
       </div>
     </div>