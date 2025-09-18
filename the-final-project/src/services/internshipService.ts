export interface Internship {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  skills_required: string[];
}

export const getInternships = async (): Promise<Internship[]> => {
  try {
    const response = await fetch('/thing.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch internships: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error loading internships:', error);
    // Return empty array if file doesn't exist or can't be loaded
    return [];
  }
};