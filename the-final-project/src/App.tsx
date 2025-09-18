import React from 'react';
import Header from './components/Header';
import ResumeUpload from './components/ResumeUpload';
import { ResumeProvider } from './context/ResumeContext';

function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <ResumeUpload />
        </main>
      </div>
    </ResumeProvider>
  );
}

export default App;