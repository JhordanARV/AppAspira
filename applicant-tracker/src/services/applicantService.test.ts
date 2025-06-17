// applicant-tracker/src/services/applicantService.test.ts
import { describe, it, expect, vi } from 'vitest';
import { getApplicants, getApplicantById } from './applicantService'; // Ensure path is correct if this file is in src/services
import { mockApplicants } from '../data/mockApplicants';

describe('applicantService', () => {
  it('getApplicants should return mock applicants', async () => {
    const applicants = await getApplicants();
    expect(applicants).toEqual(mockApplicants);
    expect(applicants.length).toBeGreaterThan(0);
  });

  it('getApplicantById should return a specific applicant or undefined', async () => {
     const existingId = mockApplicants[0].id;
     const applicant = await getApplicantById(existingId);
     expect(applicant).toEqual(mockApplicants[0]);

     const nonExistingId = 'non-existent-id';
     const notFoundApplicant = await getApplicantById(nonExistingId);
     expect(notFoundApplicant).toBeUndefined();
  });
});
