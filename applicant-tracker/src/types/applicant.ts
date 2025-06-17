export interface PersonalInformation {
  id: string; // Assuming ID is part of personal info for direct use or linking
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string; // ISO string format e.g., "1990-01-01"
  nationality?: string;
}

export interface Education {
  id: string; // Unique ID for each education entry
  degree: string;
  institution: string;
  fieldOfStudy?: string;
  graduationYear?: number;
  gpa?: number; // Optional
}

export interface WorkExperience {
  id: string; // Unique ID for each work experience entry
  company: string;
  role: string;
  startDate: string; // ISO string format
  endDate?: string; // ISO string format, optional if current
  responsibilities?: string[];
  achievements?: string[]; // Optional
}

export interface PsychologicalAssessment {
  id:string; // Unique ID for each assessment
  assessmentDate: string; // ISO string format
  assessor: string;
  assessmentType: string; // e.g., "Cognitive", "Personality", "Behavioral"
  summary?: string;
  detailedReportLink?: string; // Link to a more detailed PDF or document
  scores?: Array<{ name: string; value: string | number; notes?: string }>; // Flexible score tracking
  recommendation?: 'Recommended' | 'Not Recommended' | 'Proceed with Caution' | 'Further Assessment Needed';
  notes?: string;
}

export interface Applicant {
  id: string; // Main unique ID for the applicant
  personalInformation: PersonalInformation;
  educationHistory: Education[];
  workExperience: WorkExperience[];
  psychologicalAssessments: PsychologicalAssessment[];
  applicationDate: string; // ISO string format
  status: 'Pending' | 'Under Review' | 'Interviewing' | 'Offer Extended' | 'Hired' | 'Rejected' | 'Withdrawn';
  source?: string; // How the applicant was found e.g., "LinkedIn", "Referral", "Job Board"
  notes?: string; // General notes about the applicant
  // Consider adding fields like resumeLink, coverLetterLink, etc.
}
