import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader2, Target, Zap } from 'lucide-react';
import { useResumeContext } from '../context/ResumeContext';
import { extractTextFromPDF } from '../utils/pdfUtils';
import ResumeAnalysis from './ResumeAnalysis';

const ResumeUpload: React.FC = () => {
  const { resumeData, setResumeData, isAnalyzing, setIsAnalyzing } = useResumeContext();
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsAnalyzing(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const extractedText = await extractTextFromPDF(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      setResumeData({
        fileName: file.name,
        text: extractedText,
        preview: extractedText.substring(0, 500) + '...',
        uploadDate: new Date().toISOString()
      });

      setTimeout(() => {
        setUploadProgress(0);
        setIsAnalyzing(false);
      }, 500);

    } catch (error) {
      console.error('Error processing PDF:', error);
      setIsAnalyzing(false);
      setUploadProgress(0);
      alert('Failed to process the PDF file. Please try again.');
    }
  }, [setResumeData, setIsAnalyzing]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: isAnalyzing
  });

  if (resumeData) {
    return <ResumeAnalysis />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Unlock Your Career Potential
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get AI-powered insights on your resume and discover internships perfectly matched to your skills
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50/50 scale-105' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50/50'
            }
            ${isAnalyzing ? 'pointer-events-none opacity-75' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          {isAnalyzing ? (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 text-blue-500 mx-auto animate-spin" />
              <div>
                <p className="text-lg font-medium text-gray-700 mb-2">Processing your resume...</p>
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
                  {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
                </p>
                <p className="text-gray-500">
                  Drag and drop your PDF resume, or click to browse
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                <span>PDF only</span>
                <span>•</span>
                <span>Max 10MB</span>
                <span>•</span>
                <span>Secure & Private</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
          <p className="text-gray-600 text-sm">Get detailed feedback on your resume with AI-powered insights</p>
        </div>

        <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Smart Matching</h3>
          <p className="text-gray-600 text-sm">Find internships that perfectly match your skills and experience</p>
        </div>

        <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Skill Development</h3>
          <p className="text-gray-600 text-sm">Discover which skills to learn next to unlock more opportunities</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;