import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
            <span className="text-sm">{t('footer.made_with')}</span>
            <Heart className="w-4 h-4 text-red-500" />
            <a 
              href="https://credits-seven.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              {t('footer.codexcrew')}
            </a>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>© 2024 SkillSync. All rights reserved.</p>
            <p>Empowering careers through AI-powered insights</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;