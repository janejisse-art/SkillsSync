interface AnalysisResult {
  overall_rating: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  raw_analysis: string;
}

export const analyzeResumeWithAI = async (resumeText: string): Promise<AnalysisResult> => {
  const apiKey = "AIzaSyBpl2jIVgdaKfHM6Hzniwr_HTVhX2_bD5A";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const promptText = `You are a professional resume expert.  
Analyze the following resume carefully and respond with a JSON object ONLY (no additional commentary or text).  

The JSON must strictly follow this structure:  

{
  "overall_rating": number,         // 0–10 (can be decimal, e.g., 7.5)
  "strengths": [
    "Strong in <skill/area>",
    "Strong in <another skill>"
  ],
  "weaknesses": [
    "Weak in <skill/area>",
    "Needs improvement in <another skill>"
  ],
  "suggestions": [
    "Suggest adding <thing>",
    "Suggest improving <thing>"
  ],
  "raw_analysis": "Provide a detailed plain-text analysis here if needed."
}

Rules:  
- Do NOT output anything outside the JSON object.  
- Each bullet point in strengths, weaknesses, and suggestions MUST start with proper formatting.  
- Ensure clean spacing between strengths, weaknesses, and suggestions blocks.  
- "raw_analysis" should be a plain, unformatted text (no bullet points, no special characters).  

Based on the resume, recommend skills from these high-demand areas: Node.js, Express, PostgreSQL, Docker, React, TypeScript, TailwindCSS, REST APIs, MERN Stack, GitHub Actions, Git, AWS, Kubernetes, CI/CD, Jenkins, Linux, Flutter, Firebase, Dart, Python, NLP, Transformers, FastAPI, OpenCV, TensorFlow, Deep Learning, SQL, ETL, Apache Spark, SIEM Tools, Threat Analysis, Networking, Burp Suite, OWASP, Solidity, Ethereum, Web3.js, Smart Contracts

Resume:
${resumeText}`;

  const requestBody = {
    contents: [{ parts: [{ text: promptText }] }]
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`AI API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      throw new Error('No response from AI service');
    }

    // Try to parse JSON directly; if that fails, try to extract a JSON substring
    let parsed = null;
    try {
      parsed = JSON.parse(aiText);
    } catch (e) {
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try { 
          parsed = JSON.parse(jsonMatch[0]); 
        } catch (e2) { 
          throw new Error('Failed to parse AI response as JSON');
        }
      } else {
        throw new Error('No valid JSON found in AI response');
      }
    }

    // Validate the parsed response structure
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid AI response structure');
    }

    return {
      overall_rating: typeof parsed.overall_rating === 'number' ? parsed.overall_rating : parseFloat(parsed.overall_rating) || 5,
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      raw_analysis: parsed.raw_analysis || ''
    };

  } catch (error) {
    console.error('Error analyzing resume with AI:', error);
    throw new Error('Failed to analyze resume. Please try again.');
  }
};