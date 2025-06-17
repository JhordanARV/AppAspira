// src/data/mockApplicants.ts
import { Applicant } from '../types/applicant';

export const mockApplicants: Applicant[] = [
  {
    id: 'applicant-001',
    personalInformation: {
      id: 'pi-001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-1234',
      dateOfBirth: '1990-05-15',
      nationality: 'American',
      address: '123 Main St, Anytown, USA'
    },
    educationHistory: [
      {
        id: 'edu-001-1',
        degree: 'B.Sc. Computer Science',
        institution: 'State University',
        fieldOfStudy: 'Computer Science',
        graduationYear: 2012,
        gpa: 3.8
      }
    ],
    workExperience: [
      {
        id: 'work-001-1',
        company: 'Tech Solutions Inc.',
        role: 'Software Engineer',
        startDate: '2013-06-01',
        endDate: '2017-08-31',
        responsibilities: ['Developed web applications', 'Collaborated with cross-functional teams'],
        achievements: ['Led a team of 3 junior developers']
      },
      {
        id: 'work-001-2',
        company: 'Innovate Corp.',
        role: 'Senior Software Engineer',
        startDate: '2017-09-01',
        responsibilities: ['Designed system architecture', 'Mentored junior engineers'],
      }
    ],
    psychologicalAssessments: [
      {
        id: 'psych-001-1',
        assessmentDate: '2023-10-20',
        assessor: 'Dr. Jane Smith',
        assessmentType: 'Cognitive & Personality',
        summary: 'Strong analytical skills, good team fit.',
        recommendation: 'Recommended',
        scores: [
            { name: 'Problem Solving', value: 'Above Average' },
            { name: 'Teamwork', value: 'Excellent' }
        ]
      }
    ],
    applicationDate: '2023-10-01',
    status: 'Interviewing',
    source: 'LinkedIn',
    notes: 'Seems like a strong candidate for the senior role.'
  },
  {
    id: 'applicant-002',
    personalInformation: {
      id: 'pi-002',
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
      phone: '555-5678',
      dateOfBirth: '1995-02-20',
      nationality: 'Canadian'
    },
    educationHistory: [
      {
        id: 'edu-002-1',
        degree: 'M.Sc. Software Engineering',
        institution: 'Tech Institute of Canada',
        fieldOfStudy: 'Software Engineering',
        graduationYear: 2018,
        gpa: 3.9
      }
    ],
    workExperience: [
      {
        id: 'work-002-1',
        company: 'Web Wonders LLC',
        role: 'Frontend Developer',
        startDate: '2019-01-15',
        responsibilities: ['Developed responsive UI components', 'Worked with React and Vue.js'],
      }
    ],
    psychologicalAssessments: [
      {
        id: 'psych-002-1',
        assessmentDate: '2023-11-05',
        assessor: 'Dr. Emily White',
        assessmentType: 'Behavioral Interview Assessment',
        summary: 'Good communication skills, proactive attitude.',
        recommendation: 'Proceed with Caution',
        notes: 'While technically skilled, showed some hesitation in team-based problem solving scenarios. Recommend further probing in next interview.'
      }
    ],
    applicationDate: '2023-10-15',
    status: 'Under Review',
    source: 'Company Website Careers Page',
  }
];
