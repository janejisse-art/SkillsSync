import { Internship } from '../services/internshipService';

export interface MatchedInternship extends Internship {
  matchedSkills: string[];
  matchCount: number;
  totalSkills: number;
  matchPercentage: number;
}

export interface SkillGap {
  skill: string;
  count: number;
  opportunities: number;
}

export const matchInternships = (resumeText: string, internships: Internship[]) => {
  const resumeLower = resumeText.toLowerCase();
  const userSkills = new Set<string>();

  // Calculate skill matches for each internship
  const matchedInternships: MatchedInternship[] = internships.map(intern => {
    const requiredSkills = Array.isArray(intern.skills_required) ? intern.skills_required : [];
    const matchedSkills: string[] = [];
    
    requiredSkills.forEach(skill => {
      if (typeof skill === 'string' && resumeLower.includes(skill.toLowerCase())) {
        matchedSkills.push(skill);
        userSkills.add(skill);
      }
    });

    const matchCount = matchedSkills.length;
    const totalSkills = requiredSkills.length;
    const matchPercentage = totalSkills > 0 ? (matchCount / totalSkills) * 100 : 0;

    return {
      ...intern,
      matchedSkills,
      matchCount,
      totalSkills,
      matchPercentage
    };
  });

  // Filter and sort internships with matches
  const filteredInternships = matchedInternships
    .filter(intern => intern.matchCount > 0)
    .sort((a, b) => {
      // Primary sort: by match count (descending)
      if (b.matchCount !== a.matchCount) {
        return b.matchCount - a.matchCount;
      }
      // Secondary sort: by match percentage (descending)
      return b.matchPercentage - a.matchPercentage;
    });

  // Calculate skills to gain
  const skillCounts: Record<string, number> = {};
  
  internships.forEach(intern => {
    const requiredSkills = Array.isArray(intern.skills_required) ? intern.skills_required : [];
    requiredSkills.forEach(skill => {
      if (typeof skill === 'string') {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      }
    });
  });

  const skillsToGain: SkillGap[] = Object.entries(skillCounts)
    .filter(([skill, count]) => !userSkills.has(skill))
    .map(([skill, count]) => ({
      skill,
      count,
      opportunities: count
    }))
    .sort((a, b) => b.count - a.count);

  return {
    matchedInternships: filteredInternships,
    skillsToGain
  };
};