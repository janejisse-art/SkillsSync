import React from 'react';
import { MapPin, Building, Star, TrendingUp } from 'lucide-react';

interface Internship {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  skills_required: string[];
  matchedSkills: string[];
  matchCount: number;
  totalSkills: number;
}

interface InternshipRecommendationsProps {
  recommendations: Internship[];
}

const InternshipRecommendations: React.FC<InternshipRecommendationsProps> = ({ recommendations }) => {
  const getMatchPercentage = (internship: Internship) => {
    return internship.totalSkills > 0 ? Math.round((internship.matchCount / internship.totalSkills) * 100) : 0;
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-600 bg-emerald-100';
    if (percentage >= 60) return 'text-blue-600 bg-blue-100';
    if (percentage >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Recommended Internships</h3>
          <p className="text-gray-600 text-sm">Based on your skills and experience</p>
        </div>
        <TrendingUp className="w-6 h-6 text-gray-400" />
      </div>

      <div className="space-y-4">
        {recommendations.map((internship, index) => {
          const matchPercentage = getMatchPercentage(internship);
          
          return (
            <div key={index} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">{internship.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <Building className="w-4 h-4" />
                      <span>{internship.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{internship.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(matchPercentage)}`}>
                    {matchPercentage}% match
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Star className="w-4 h-4" />
                    <span>{internship.matchCount}/{internship.totalSkills}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-2">{internship.description}</p>

              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Your Matching Skills:</h5>
                  <div className="flex flex-wrap gap-2">
                    {internship.matchedSkills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {internship.skills_required.length > internship.matchedSkills.length && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Skills to Develop:</h5>
                    <div className="flex flex-wrap gap-2">
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

              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {internship.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InternshipRecommendations;