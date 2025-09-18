@@ .. @@
 import React from 'react';
 import { Zap, FileText, Target } from 'lucide-react';
+import { useLanguage } from '../context/LanguageContext';
+import LanguageSelector from './LanguageSelector';
 
 const Header: React.FC = () => {
 }
+  const { t } = useLanguage();
+
   return (
     <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
       <div className="container mx-auto px-4 py-6">
         <div className="flex items-center justify-between">
           <div className="flex items-center space-x-3">
             <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
               <Zap className="w-6 h-6 text-white" />
             </div>
             <div>
               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
-                SkillSync
+                {t('header.title')}
               </h1>
-              <p className="text-sm text-gray-600">AI-Powered Resume Analysis</p>
+              <p className="text-xs text-gray-600 max-w-xs">
+                {t('header.subtitle')}
+              </p>
             </div>
           </div>
-          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
+          <div className="flex items-center space-x-4">
+            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
+              <div className="flex items-center space-x-2">
+                <FileText className="w-4 h-4" />
+                <span>{t('header.resume_analysis')}</span>
+              </div>
+              <div className="flex items-center space-x-2">
+                <Target className="w-4 h-4" />
+                <span>{t('header.smart_matching')}</span>
+              </div>
+            </div>
+            <LanguageSelector />
+          </div>
+        </div>
+      </div>
+    </header>
+  );
+};
+
+export default Header;
   )