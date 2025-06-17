// src/services/applicantService.ts
import { Applicant, PersonalInformation, Education, WorkExperience, PsychologicalAssessment } from '../types/applicant';
import { mockApplicants } from '../data/mockApplicants';

// Simulate API call delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getApplicants = async (): Promise<Applicant[]> => {
  await delay(500); // Simulate network latency
  return mockApplicants;
};

export const getApplicantById = async (id: string): Promise<Applicant | undefined> => {
  await delay(300); // Simulate network latency
  return mockApplicants.find(applicant => applicant.id === id);
};

// Optional: Add a basic addApplicant function (no persistence, just adds to the in-memory array)
export const addApplicant = async (applicantData: Omit<Applicant, 'id' | 'personalInformation' | 'educationHistory' | 'workExperience' | 'psychologicalAssessments'> & { personalInformation: Omit<PersonalInformation, 'id'>, educationHistory: Array<Omit<Education, 'id'>>, workExperience: Array<Omit<WorkExperience, 'id'>>, psychologicalAssessments: Array<Omit<PsychologicalAssessment, 'id'>> }): Promise<Applicant> => {
  await delay(400);
  const newId = `applicant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const newPersonalInformationId = `pi-${Date.now()}`;
  // Simplified ID generation for sub-records for this mock service
  const newApplicant: Applicant = {
    ...applicantData,
    id: newId,
    personalInformation: { ...applicantData.personalInformation, id: newPersonalInformationId },
    educationHistory: applicantData.educationHistory.map((edu, index) => ({ ...edu, id: `edu-${newId}-${index}`})),
    workExperience: applicantData.workExperience.map((work, index) => ({ ...work, id: `work-${newId}-${index}`})),
    psychologicalAssessments: applicantData.psychologicalAssessments.map((psych, index) => ({ ...psych, id: `psych-${newId}-${index}`})),
  };
  mockApplicants.push(newApplicant); // This modifies the in-memory array
  return newApplicant;
};
