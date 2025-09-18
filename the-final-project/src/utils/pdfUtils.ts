// Use CDN version of PDF.js
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export const extractTextFromPDF = async (file: File): Promise<string> => {
  // Load PDF.js from CDN if not already loaded
  if (!window.pdfjsLib) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.13.216/pdf.min.js';
    document.head.appendChild(script);
    
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });

    // Set worker source
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.13.216/pdf.worker.min.js';
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const typedarray = new Uint8Array(e.target?.result as ArrayBuffer);
        const pdf = await window.pdfjsLib.getDocument(typedarray).promise;
        
        let text = '';
        
        // Extract text from all pages
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item: any) => item.str).join(' ');
          text += pageText + ' ';
        }
        
        if (!text.trim()) {
          throw new Error('No text could be extracted from the PDF');
        }
        
        resolve(text.trim());
      } catch (error) {
        console.error('Error extracting PDF text:', error);
        reject(new Error('Failed to extract text from PDF. Please ensure the file is not corrupted.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the PDF file'));
    };

    reader.readAsArrayBuffer(file);
  });
};