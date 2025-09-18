@@ .. @@
 import React from 'react';
 import Header from './components/Header';
 import ResumeUpload from './components/ResumeUpload';
+import Footer from './components/Footer';
 import { ResumeProvider } from './context/ResumeContext';
+import { LanguageProvider } from './context/LanguageContext';
 
 function App() {
   return (
-    <ResumeProvider>
-      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
-        <Header />
-        <main className="container mx-auto px-4 py-8">
-          <ResumeUpload />
-        </main>
-      </div>
-    </ResumeProvider>
+    <LanguageProvider>
+      <ResumeProvider>
+        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
+          <Header />
+          <main className="container mx-auto px-4 py-4 sm:py-8 flex-1">
+            <ResumeUpload />
+          </main>
+          <Footer />
+        </div>
+      </ResumeProvider>
+    </LanguageProvider>
   );
 }
 
 export default App;