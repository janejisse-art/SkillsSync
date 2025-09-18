import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'header.title': 'SkillSync',
    'header.subtitle': 'AI-Based Internship Recommendation Engine for PM Internship Scheme',
    'header.resume_analysis': 'Resume Analysis',
    'header.smart_matching': 'Smart Matching',
    
    // Upload
    'upload.title': 'Unlock Your Career Potential',
    'upload.subtitle': 'Get AI-powered insights on your resume and discover internships perfectly matched to your skills',
    'upload.drag_drop': 'Upload your resume',
    'upload.drag_active': 'Drop your resume here',
    'upload.description': 'Drag and drop your PDF resume, or click to browse',
    'upload.file_info': 'PDF only • Max 10MB • Secure & Private',
    'upload.processing': 'Processing your resume...',
    
    // Features
    'features.ai_analysis': 'AI Analysis',
    'features.ai_description': 'Get detailed feedback on your resume with AI-powered insights',
    'features.smart_matching': 'Smart Matching',
    'features.smart_description': 'Find internships that perfectly match your skills and experience',
    'features.skill_development': 'Skill Development',
    'features.skill_description': 'Discover which skills to learn next to unlock more opportunities',
    
    // Analysis
    'analysis.resume_score': 'Resume Score',
    'analysis.score_subtitle': 'AI-powered analysis of your resume quality',
    'analysis.excellent': 'Excellent Resume!',
    'analysis.good': 'Good Resume',
    'analysis.needs_improvement': 'Needs Improvement',
    'analysis.major_updates': 'Requires Major Updates',
    'analysis.strengths': 'Top Strengths',
    'analysis.improvements': 'Areas for Improvement',
    'analysis.detailed_analysis': 'Detailed Analysis',
    'analysis.recommendations': 'Recommendations',
    
    // Internships
    'internships.title': 'Recommended Internships',
    'internships.subtitle': 'Based on your skills and experience',
    'internships.match': 'match',
    'internships.matching_skills': 'Your Matching Skills:',
    'internships.skills_to_develop': 'Skills to Develop:',
    
    // Skills
    'skills.title': 'Skills to Develop',
    'skills.subtitle': 'Unlock more internship opportunities',
    'skills.high_priority': 'High Priority',
    'skills.medium_priority': 'Medium Priority',
    'skills.low_priority': 'Low Priority',
    'skills.opportunities': 'opportunities',
    'skills.tip': '💡 Pro Tip',
    'skills.tip_description': 'Focus on learning the top 3-5 skills from this list to significantly increase your internship opportunities.',
    
    // Common
    'common.start_over': 'Start Over',
    'common.try_again': 'Try Again',
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.remote': 'Remote',
    'common.out_of': 'out of',
    
    // Footer
    'footer.made_with': 'Made with TeamWork by',
    'footer.codexcrew': 'COdexCrew'
  },
  hi: {
    // Header
    'header.title': 'स्किलसिंक',
    'header.subtitle': 'पीएम इंटर्नशिप योजना के लिए एआई-आधारित इंटर्नशिप सिफारिश इंजन',
    'header.resume_analysis': 'रिज्यूमे विश्लेषण',
    'header.smart_matching': 'स्मार्ट मैचिंग',
    
    // Upload
    'upload.title': 'अपनी करियर क्षमता को अनलॉक करें',
    'upload.subtitle': 'अपने रिज्यूमे पर एआई-संचालित अंतर्दृष्टि प्राप्त करें और अपने कौशल से मेल खाने वाली इंटर्नशिप खोजें',
    'upload.drag_drop': 'अपना रिज्यूमे अपलोड करें',
    'upload.drag_active': 'अपना रिज्यूमे यहाँ छोड़ें',
    'upload.description': 'अपना पीडीएफ रिज्यूमे खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें',
    'upload.file_info': 'केवल पीडीएफ • अधिकतम 10एमबी • सुरक्षित और निजी',
    'upload.processing': 'आपका रिज्यूमे प्रोसेस हो रहा है...',
    
    // Features
    'features.ai_analysis': 'एआई विश्लेषण',
    'features.ai_description': 'एआई-संचालित अंतर्दृष्टि के साथ अपने रिज्यूमे पर विस्तृत फीडबैक प्राप्त करें',
    'features.smart_matching': 'स्मार्ट मैचिंग',
    'features.smart_description': 'ऐसी इंटर्नशिप खोजें जो आपके कौशल और अनुभव से पूरी तरह मेल खाती हों',
    'features.skill_development': 'कौशल विकास',
    'features.skill_description': 'जानें कि अधिक अवसर अनलॉक करने के लिए आगे कौन से कौशल सीखने हैं',
    
    // Analysis
    'analysis.resume_score': 'रिज्यूमे स्कोर',
    'analysis.score_subtitle': 'आपके रिज्यूमे की गुणवत्ता का एआई-संचालित विश्लेषण',
    'analysis.excellent': 'उत्कृष्ट रिज्यूमे!',
    'analysis.good': 'अच्छा रिज्यूमे',
    'analysis.needs_improvement': 'सुधार की आवश्यकता',
    'analysis.major_updates': 'प्रमुख अपडेट की आवश्यकता',
    'analysis.strengths': 'मुख्य शक्तियां',
    'analysis.improvements': 'सुधार के क्षेत्र',
    'analysis.detailed_analysis': 'विस्तृत विश्लेषण',
    'analysis.recommendations': 'सिफारिशें',
    
    // Internships
    'internships.title': 'अनुशंसित इंटर्नशिप',
    'internships.subtitle': 'आपके कौशल और अनुभव के आधार पर',
    'internships.match': 'मैच',
    'internships.matching_skills': 'आपके मैचिंग कौशल:',
    'internships.skills_to_develop': 'विकसित करने वाले कौशल:',
    
    // Skills
    'skills.title': 'विकसित करने वाले कौशल',
    'skills.subtitle': 'अधिक इंटर्नशिप अवसर अनलॉक करें',
    'skills.high_priority': 'उच्च प्राथमिकता',
    'skills.medium_priority': 'मध्यम प्राथमिकता',
    'skills.low_priority': 'कम प्राथमिकता',
    'skills.opportunities': 'अवसर',
    'skills.tip': '💡 प्रो टिप',
    'skills.tip_description': 'अपने इंटर्नशिप अवसरों को काफी बढ़ाने के लिए इस सूची से शीर्ष 3-5 कौशल सीखने पर ध्यान दें।',
    
    // Common
    'common.start_over': 'फिर से शुरू करें',
    'common.try_again': 'फिर कोशिश करें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि हुई',
    'common.remote': 'रिमोट',
    'common.out_of': 'में से',
    
    // Footer
    'footer.made_with': 'टीमवर्क के साथ बनाया गया',
    'footer.codexcrew': 'COdexCrew'
  },
  ta: {
    // Header
    'header.title': 'ஸ்கில்சிங்க்',
    'header.subtitle': 'பிஎம் இன்டர்ன்ஷிப் திட்டத்திற்கான AI-அடிப்படையிலான இன்டர்ன்ஷிப் பரிந்துரை இயந்திரம்',
    'header.resume_analysis': 'ரெஸ்யூம் பகுப்பாய்வு',
    'header.smart_matching': 'ஸ்மார்ட் மேட்சிங்',
    
    // Upload
    'upload.title': 'உங்கள் தொழில் திறனை திறக்கவும்',
    'upload.subtitle': 'உங்கள் ரெஸ்யூமில் AI-இயங்கும் நுண்ணறிவுகளைப் பெறுங்கள் மற்றும் உங்கள் திறன்களுக்கு ஏற்ற இன்டர்ன்ஷிப்களைக் கண்டறியுங்கள்',
    'upload.drag_drop': 'உங்கள் ரெஸ்யூமை பதிவேற்றவும்',
    'upload.drag_active': 'உங்கள் ரெஸ்யூமை இங்கே விடவும்',
    'upload.description': 'உங்கள் PDF ரெஸ்யூமை இழுத்து விடவும், அல்லது உலாவ கிளிக் செய்யவும்',
    'upload.file_info': 'PDF மட்டும் • அதிகபட்சம் 10MB • பாதுகாப்பான மற்றும் தனிப்பட்ட',
    'upload.processing': 'உங்கள் ரெஸ்யூம் செயலாக்கப்படுகிறது...',
    
    // Features
    'features.ai_analysis': 'AI பகுப்பாய்வு',
    'features.ai_description': 'AI-இயங்கும் நுண்ணறிவுகளுடன் உங்கள் ரெஸ்யூமில் விரிவான கருத்துக்களைப் பெறுங்கள்',
    'features.smart_matching': 'ஸ்மார்ட் மேட்சிங்',
    'features.smart_description': 'உங்கள் திறன்கள் மற்றும் அனுபவத்துடன் சரியாக பொருந்தும் இன்டர்ன்ஷிப்களைக் கண்டறியுங்கள்',
    'features.skill_development': 'திறன் மேம்பாடு',
    'features.skill_description': 'அதிக வாய்ப்புகளை திறக்க அடுத்து எந்த திறன்களைக் கற்றுக்கொள்ள வேண்டும் என்பதைக் கண்டறியுங்கள்',
    
    // Analysis
    'analysis.resume_score': 'ரெஸ்யூம் மதிப்பெண்',
    'analysis.score_subtitle': 'உங்கள் ரெஸ்யூம் தரத்தின் AI-இயங்கும் பகுப்பாய்வு',
    'analysis.excellent': 'சிறந்த ரெஸ்யூம்!',
    'analysis.good': 'நல்ல ரெஸ்யூம்',
    'analysis.needs_improvement': 'மேம்பாடு தேவை',
    'analysis.major_updates': 'முக்கிய புதுப்பிப்புகள் தேவை',
    'analysis.strengths': 'முக்கிய பலங்கள்',
    'analysis.improvements': 'மேம்பாட்டுக்கான பகுதிகள்',
    'analysis.detailed_analysis': 'விரிவான பகுப்பாய்வு',
    'analysis.recommendations': 'பரிந்துரைகள்',
    
    // Internships
    'internships.title': 'பரிந்துரைக்கப்பட்ட இன்டர்ன்ஷிப்கள்',
    'internships.subtitle': 'உங்கள் திறன்கள் மற்றும் அனுபவத்தின் அடிப்படையில்',
    'internships.match': 'பொருத்தம்',
    'internships.matching_skills': 'உங்கள் பொருந்தும் திறன்கள்:',
    'internships.skills_to_develop': 'மேம்படுத்த வேண்டிய திறன்கள்:',
    
    // Skills
    'skills.title': 'மேம்படுத்த வேண்டிய திறன்கள்',
    'skills.subtitle': 'அதிக இன்டர்ன்ஷிப் வாய்ப்புகளை திறக்கவும்',
    'skills.high_priority': 'உயர் முன்னுரிமை',
    'skills.medium_priority': 'நடுத்தர முன்னுரிமை',
    'skills.low_priority': 'குறைந்த முன்னுரிமை',
    'skills.opportunities': 'வாய்ப்புகள்',
    'skills.tip': '💡 புரோ டிப்',
    'skills.tip_description': 'உங்கள் இன்டர்ன்ஷிப் வாய்ப்புகளை கணிசமாக அதிகரிக்க இந்த பட்டியலில் இருந்து முதல் 3-5 திறன்களைக் கற்றுக்கொள்வதில் கவனம் செலுத்துங்கள்।',
    
    // Common
    'common.start_over': 'மீண்டும் தொடங்கவும்',
    'common.try_again': 'மீண்டும் முயற்சிக்கவும்',
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை ஏற்பட்டது',
    'common.remote': 'ரிமோட்',
    'common.out_of': 'இல்',
    
    // Footer
    'footer.made_with': 'டீம்வொர்க்குடன் உருவாக்கப்பட்டது',
    'footer.codexcrew': 'COdexCrew'
  },
  te: {
    // Header
    'header.title': 'స్కిల్‌సింక్',
    'header.subtitle': 'PM ఇంటర్న్‌షిప్ స్కీమ్ కోసం AI-ఆధారిత ఇంటర్న్‌షిప్ సిఫార్సు ఇంజిన్',
    'header.resume_analysis': 'రెజ్యూమ్ విశ్లేషణ',
    'header.smart_matching': 'స్మార్ట్ మ్యాచింగ్',
    
    // Upload
    'upload.title': 'మీ కెరీర్ సామర్థ్యాన్ని అన్‌లాక్ చేయండి',
    'upload.subtitle': 'మీ రెజ్యూమ్‌పై AI-శక్తితో కూడిన అంతర్దృష్టులను పొందండి మరియు మీ నైపుణ్యాలకు సరిగ్గా సరిపోయే ఇంటర్న్‌షిప్‌లను కనుగొనండి',
    'upload.drag_drop': 'మీ రెజ్యూమ్‌ను అప్‌లోడ్ చేయండి',
    'upload.drag_active': 'మీ రెజ్యూమ్‌ను ఇక్కడ వదలండి',
    'upload.description': 'మీ PDF రెజ్యూమ్‌ను లాగి వదలండి, లేదా బ్రౌజ్ చేయడానికి క్లిక్ చేయండి',
    'upload.file_info': 'PDF మాత్రమే • గరిష్టంగా 10MB • సురక్షితం మరియు ప్రైవేట్',
    'upload.processing': 'మీ రెజ్యూమ్ ప్రాసెస్ అవుతోంది...',
    
    // Features
    'features.ai_analysis': 'AI విశ్లేషణ',
    'features.ai_description': 'AI-శక్తితో కూడిన అంతర్దృష్టులతో మీ రెజ్యూమ్‌పై వివరణాత్మక ఫీడ్‌బ్యాక్ పొందండి',
    'features.smart_matching': 'స్మార్ట్ మ్యాచింగ్',
    'features.smart_description': 'మీ నైపుణ్యాలు మరియు అనుభవంతో సరిగ్గా సరిపోయే ఇంటర్న్‌షిప్‌లను కనుగొనండి',
    'features.skill_development': 'నైపుణ్య అభివృద్ధి',
    'features.skill_description': 'మరిన్ని అవకాశాలను అన్‌లాక్ చేయడానికి తదుపరి ఏ నైపుణ్యాలను నేర్చుకోవాలో కనుగొనండి',
    
    // Analysis
    'analysis.resume_score': 'రెజ్యూమ్ స్కోర్',
    'analysis.score_subtitle': 'మీ రెజ్యూమ్ నాణ్యత యొక్క AI-శక్తితో కూడిన విశ్లేషణ',
    'analysis.excellent': 'అద్భుతమైన రెజ్యూమ్!',
    'analysis.good': 'మంచి రెజ్యూమ్',
    'analysis.needs_improvement': 'మెరుగుదల అవసరం',
    'analysis.major_updates': 'ప్రధాన అప్‌డేట్‌లు అవసరం',
    'analysis.strengths': 'ప్రధాన బలాలు',
    'analysis.improvements': 'మెరుగుదల కోసం ప్రాంతాలు',
    'analysis.detailed_analysis': 'వివరణాత్మక విశ్లేషణ',
    'analysis.recommendations': 'సిఫార్సులు',
    
    // Internships
    'internships.title': 'సిఫార్సు చేయబడిన ఇంటర్న్‌షిప్‌లు',
    'internships.subtitle': 'మీ నైపుణ్యాలు మరియు అనుభవం ఆధారంగా',
    'internships.match': 'మ్యాచ్',
    'internships.matching_skills': 'మీ మ్యాచింగ్ నైపుణ్యాలు:',
    'internships.skills_to_develop': 'అభివృద్ధి చేయవలసిన నైపుణ్యాలు:',
    
    // Skills
    'skills.title': 'అభివృద్ధి చేయవలసిన నైపుణ్యాలు',
    'skills.subtitle': 'మరిన్ని ఇంటర్న్‌షిప్ అవకాశాలను అన్‌లాక్ చేయండి',
    'skills.high_priority': 'అధిక ప్రాధాన్యత',
    'skills.medium_priority': 'మధ్యస్థ ప్రాధాన్యత',
    'skills.low_priority': 'తక్కువ ప్రాధాన్యత',
    'skills.opportunities': 'అవకాశాలు',
    'skills.tip': '💡 ప్రో టిప్',
    'skills.tip_description': 'మీ ఇంటర్న్‌షిప్ అవకాశాలను గణనీయంగా పెంచడానికి ఈ జాబితా నుండి టాప్ 3-5 నైపుణ్యాలను నేర్చుకోవడంపై దృష్టి పెట్టండి।',
    
    // Common
    'common.start_over': 'మళ్లీ ప్రారంభించండి',
    'common.try_again': 'మళ్లీ ప్రయత్నించండి',
    'common.loading': 'లోడ్ అవుతోంది...',
    'common.error': 'లోపం సంభవించింది',
    'common.remote': 'రిమోట్',
    'common.out_of': 'లో',
    
    // Footer
    'footer.made_with': 'టీమ్‌వర్క్‌తో తయారు చేయబడింది',
    'footer.codexcrew': 'COdexCrew'
  },
  bn: {
    // Header
    'header.title': 'স্কিলসিঙ্ক',
    'header.subtitle': 'পিএম ইন্টার্নশিপ স্কিমের জন্য AI-ভিত্তিক ইন্টার্নশিপ সুপারিশ ইঞ্জিন',
    'header.resume_analysis': 'রিজিউমে বিশ্লেষণ',
    'header.smart_matching': 'স্মার্ট ম্যাচিং',
    
    // Upload
    'upload.title': 'আপনার ক্যারিয়ার সম্ভাবনা আনলক করুন',
    'upload.subtitle': 'আপনার রিজিউমেতে AI-চালিত অন্তর্দৃষ্টি পান এবং আপনার দক্ষতার সাথে নিখুঁতভাবে মিলে যাওয়া ইন্টার্নশিপ আবিষ্কার করুন',
    'upload.drag_drop': 'আপনার রিজিউমে আপলোড করুন',
    'upload.drag_active': 'আপনার রিজিউমে এখানে ছেড়ে দিন',
    'upload.description': 'আপনার PDF রিজিউমে টেনে এনে ছেড়ে দিন, অথবা ব্রাউজ করতে ক্লিক করুন',
    'upload.file_info': 'শুধুমাত্র PDF • সর্বোচ্চ 10MB • নিরাপদ এবং ব্যক্তিগত',
    'upload.processing': 'আপনার রিজিউমে প্রক্রিয়া করা হচ্ছে...',
    
    // Features
    'features.ai_analysis': 'AI বিশ্লেষণ',
    'features.ai_description': 'AI-চালিত অন্তর্দৃষ্টি সহ আপনার রিজিউমেতে বিস্তারিত প্রতিক্রিয়া পান',
    'features.smart_matching': 'স্মার্ট ম্যাচিং',
    'features.smart_description': 'আপনার দক্ষতা এবং অভিজ্ঞতার সাথে নিখুঁতভাবে মিলে যাওয়া ইন্টার্নশিপ খুঁজুন',
    'features.skill_development': 'দক্ষতা উন্নয়ন',
    'features.skill_description': 'আরও সুযোগ আনলক করতে পরবর্তী কোন দক্ষতা শিখতে হবে তা আবিষ্কার করুন',
    
    // Analysis
    'analysis.resume_score': 'রিজিউমে স্কোর',
    'analysis.score_subtitle': 'আপনার রিজিউমে গুণমানের AI-চালিত বিশ্লেষণ',
    'analysis.excellent': 'চমৎকার রিজিউমে!',
    'analysis.good': 'ভাল রিজিউমে',
    'analysis.needs_improvement': 'উন্নতি প্রয়োজন',
    'analysis.major_updates': 'প্রধান আপডেট প্রয়োজন',
    'analysis.strengths': 'প্রধান শক্তি',
    'analysis.improvements': 'উন্নতির ক্ষেত্র',
    'analysis.detailed_analysis': 'বিস্তারিত বিশ্লেষণ',
    'analysis.recommendations': 'সুপারিশ',
    
    // Internships
    'internships.title': 'প্রস্তাবিত ইন্টার্নশিপ',
    'internships.subtitle': 'আপনার দক্ষতা এবং অভিজ্ঞতার ভিত্তিতে',
    'internships.match': 'মিল',
    'internships.matching_skills': 'আপনার মিলে যাওয়া দক্ষতা:',
    'internships.skills_to_develop': 'উন্নত করার দক্ষতা:',
    
    // Skills
    'skills.title': 'উন্নত করার দক্ষতা',
    'skills.subtitle': 'আরও ইন্টার্নশিপ সুযোগ আনলক করুন',
    'skills.high_priority': 'উচ্চ অগ্রাধিকার',
    'skills.medium_priority': 'মধ্যম অগ্রাধিকার',
    'skills.low_priority': 'কম অগ্রাধিকার',
    'skills.opportunities': 'সুযোগ',
    'skills.tip': '💡 প্রো টিপ',
    'skills.tip_description': 'আপনার ইন্টার্নশিপ সুযোগ উল্লেখযোগ্যভাবে বৃদ্ধি করতে এই তালিকা থেকে শীর্ষ 3-5 দক্ষতা শেখার উপর ফোকাস করুন।',
    
    // Common
    'common.start_over': 'আবার শুরু করুন',
    'common.try_again': 'আবার চেষ্টা করুন',
    'common.loading': 'লোড হচ্ছে...',
    'common.error': 'ত্রুটি ঘটেছে',
    'common.remote': 'রিমোট',
    'common.out_of': 'এর মধ্যে',
    
    // Footer
    'footer.made_with': 'টিমওয়ার্ক দিয়ে তৈরি',
    'footer.codexcrew': 'COdexCrew'
  },
  mr: {
    // Header
    'header.title': 'स्किलसिंक',
    'header.subtitle': 'पीएम इंटर्नशिप योजनेसाठी AI-आधारित इंटर्नशिप शिफारस इंजिन',
    'header.resume_analysis': 'रिझ्यूमे विश्लेषण',
    'header.smart_matching': 'स्मार्ट मॅचिंग',
    
    // Upload
    'upload.title': 'तुमची करिअर क्षमता अनलॉक करा',
    'upload.subtitle': 'तुमच्या रिझ्यूमेवर AI-चालित अंतर्दृष्टी मिळवा आणि तुमच्या कौशल्यांशी परिपूर्ण जुळणाऱ्या इंटर्नशिप शोधा',
    'upload.drag_drop': 'तुमचा रिझ्यूमे अपलोड करा',
    'upload.drag_active': 'तुमचा रिझ्यूमे येथे सोडा',
    'upload.description': 'तुमचा PDF रिझ्यूमे ड्रॅग आणि ड्रॉप करा, किंवा ब्राउझ करण्यासाठी क्लिक करा',
    'upload.file_info': 'फक्त PDF • कमाल 10MB • सुरक्षित आणि खाजगी',
    'upload.processing': 'तुमचा रिझ्यूमे प्रक्रिया केली जात आहे...',
    
    // Features
    'features.ai_analysis': 'AI विश्लेषण',
    'features.ai_description': 'AI-चालित अंतर्दृष्टीसह तुमच्या रिझ्यूमेवर तपशीलवार फीडबॅक मिळवा',
    'features.smart_matching': 'स्मार्ट मॅचिंग',
    'features.smart_description': 'तुमच्या कौशल्यांशी आणि अनुभवाशी परिपूर्ण जुळणाऱ्या इंटर्नशिप शोधा',
    'features.skill_development': 'कौशल्य विकास',
    'features.skill_description': 'अधिक संधी अनलॉक करण्यासाठी पुढे कोणती कौशल्ये शिकायची ते शोधा',
    
    // Analysis
    'analysis.resume_score': 'रिझ्यूमे स्कोअर',
    'analysis.score_subtitle': 'तुमच्या रिझ्यूमे गुणवत्तेचे AI-चालित विश्लेषण',
    'analysis.excellent': 'उत्कृष्ट रिझ्यूमे!',
    'analysis.good': 'चांगला रिझ्यूमे',
    'analysis.needs_improvement': 'सुधारणा आवश्यक',
    'analysis.major_updates': 'मुख्य अपडेट आवश्यक',
    'analysis.strengths': 'मुख्य सामर्थ्य',
    'analysis.improvements': 'सुधारणेचे क्षेत्र',
    'analysis.detailed_analysis': 'तपशीलवार विश्लेषण',
    'analysis.recommendations': 'शिफारसी',
    
    // Internships
    'internships.title': 'शिफारस केलेल्या इंटर्नशिप',
    'internships.subtitle': 'तुमच्या कौशल्यांवर आणि अनुभवावर आधारित',
    'internships.match': 'जुळणी',
    'internships.matching_skills': 'तुमची जुळणारी कौशल्ये:',
    'internships.skills_to_develop': 'विकसित करण्याची कौशल्ये:',
    
    // Skills
    'skills.title': 'विकसित करण्याची कौशल्ये',
    'skills.subtitle': 'अधिक इंटर्नशिप संधी अनलॉक करा',
    'skills.high_priority': 'उच्च प्राधान्य',
    'skills.medium_priority': 'मध्यम प्राधान्य',
    'skills.low_priority': 'कमी प्राधान्य',
    'skills.opportunities': 'संधी',
    'skills.tip': '💡 प्रो टिप',
    'skills.tip_description': 'तुमच्या इंटर्नशिप संधी लक्षणीयरीत्या वाढवण्यासाठी या यादीतील टॉप 3-5 कौशल्ये शिकण्यावर लक्ष केंद्रित करा।',
    
    // Common
    'common.start_over': 'पुन्हा सुरू करा',
    'common.try_again': 'पुन्हा प्रयत्न करा',
    'common.loading': 'लोड होत आहे...',
    'common.error': 'त्रुटी आली',
    'common.remote': 'रिमोट',
    'common.out_of': 'पैकी',
    
    // Footer
    'footer.made_with': 'टीमवर्कसह बनवले',
    'footer.codexcrew': 'COdexCrew'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};