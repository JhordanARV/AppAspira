// src/pages/AddApplicantPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addApplicant } from '../../services/applicantService'; // Path updated
import { PersonalInformation, Education, WorkExperience, PsychologicalAssessment, Applicant } from '../../types/applicant'; // Path updated
import EducationHistorySection from '../../components/ApplicantForm/EducationHistorySection'; // Path updated
import WorkExperienceSection from '../../components/ApplicantForm/WorkExperienceSection'; // Path updated

interface ApplicantFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  dateOfBirth?: string;
  nationality?: string;
  educationHistory: Array<Omit<Education, 'id'>>;
  workExperience: Array<Omit<WorkExperience, 'id'>>;
  psychologicalAssessment: Omit<PsychologicalAssessment, 'id'>;
}

const AddApplicantPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ApplicantFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    nationality: '',
    educationHistory: [],
    workExperience: [],
    psychologicalAssessment: {
      assessmentDate: '',
      assessor: '',
      assessmentType: '',
      summary: '',
      recommendation: undefined,
      scores: [],
      notes: '',
      detailedReportLink: ''
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddEducation = () => setFormData(prev => ({ ...prev, educationHistory: [...prev.educationHistory, { degree: '', institution: '', fieldOfStudy: '', graduationYear: undefined, gpa: undefined }] }));
  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedEducationHistory = formData.educationHistory.map((edu, i) => i === index ? { ...edu, [name]: name === 'graduationYear' || name === 'gpa' ? (value === '' ? undefined : Number(value)) : value } : edu);
    setFormData(prev => ({ ...prev, educationHistory: updatedEducationHistory }));
  };
  const handleRemoveEducation = (index: number) => setFormData(prev => ({ ...prev, educationHistory: prev.educationHistory.filter((_, i) => i !== index) }));

  const handleAddWorkExperience = () => setFormData(prev => ({ ...prev, workExperience: [...prev.workExperience, { company: '', role: '', startDate: '', endDate: '', responsibilities: [], achievements: [] }] }));
  const handleWorkExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedWorkExperience = formData.workExperience.map((work, i) => i === index ? (name === 'responsibilities' || name === 'achievements' ? { ...work, [name]: value.split('\n') } : { ...work, [name]: value }) : work);
    setFormData(prev => ({ ...prev, workExperience: updatedWorkExperience }));
  };
  const handleRemoveWorkExperience = (index: number) => setFormData(prev => ({ ...prev, workExperience: prev.workExperience.filter((_, i) => i !== index) }));

  const handlePsychologicalAssessmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, psychologicalAssessment: { ...prev.psychologicalAssessment, [name]: name === 'recommendation' && value === '' ? undefined : value } }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const personalInfoForService: Omit<PersonalInformation, 'id'> = { firstName: formData.firstName, lastName: formData.lastName, email: formData.email, phone: formData.phone || undefined, address: formData.address || undefined, dateOfBirth: formData.dateOfBirth || undefined, nationality: formData.nationality || undefined };
    const assessmentToSubmit = formData.psychologicalAssessment;
    const psychologicalAssessmentsForService = assessmentToSubmit.assessmentDate ? [assessmentToSubmit] : [];
    const newApplicantData = { personalInformation: personalInfoForService, educationHistory: formData.educationHistory, workExperience: formData.workExperience, psychologicalAssessments: psychologicalAssessmentsForService, applicationDate: new Date().toISOString(), status: 'Pending' as 'Pending' }; // Explicitly cast status
    try {
      const savedApplicant = await addApplicant(newApplicantData);
      console.log('Applicant saved:', savedApplicant);
      alert('Applicant successfully added!');
      navigate('/applicants');
    } catch (error) {
      console.error("Failed to add applicant:", error);
      alert('Error adding applicant. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const textAreaClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm min-h-[60px]";
  const buttonAddClass = "mt-2 px-3 py-1.5 border border-dashed border-gray-400 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors";
  const buttonRemoveClass = "text-sm font-medium text-red-600 hover:text-red-800 transition-colors";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-4xl mx-auto my-8"> {/* Increased shadow, max-width, margin */}
      <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Add New Applicant</h2> {/* Larger, centered title */}
      <form onSubmit={handleSubmit} className="space-y-10"> {/* Increased spacing */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Personal Information</h3> {/* Enhanced section title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"> {/* md breakpoint for grid, adjusted gap */}
            <div><label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name*</label><input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handlePersonalInfoChange} required className={inputClass} /></div>
            <div><label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name*</label><input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handlePersonalInfoChange} required className={inputClass} /></div>
            <div className="md:col-span-2"><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address*</label><input type="email" name="email" id="email" value={formData.email} onChange={handlePersonalInfoChange} required className={inputClass} /></div>
            <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label><input type="tel" name="phone" id="phone" value={formData.phone} onChange={handlePersonalInfoChange} className={inputClass} /></div>
            <div className="md:col-span-2"><label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label><input type="text" name="address" id="address" value={formData.address} onChange={handlePersonalInfoChange} className={inputClass} /></div>
            <div><label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label><input type="date" name="dateOfBirth" id="dateOfBirth" value={formData.dateOfBirth} onChange={handlePersonalInfoChange} className={inputClass} /></div>
            <div><label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality</label><input type="text" name="nationality" id="nationality" value={formData.nationality} onChange={handlePersonalInfoChange} className={inputClass} /></div>
          </div>
        </section>

        <EducationHistorySection
          educationHistory={formData.educationHistory}
          onAddEducation={handleAddEducation}
          onEducationChange={handleEducationChange}
          onRemoveEducation={handleRemoveEducation}
          inputClass={inputClass}
          buttonAddClass={buttonAddClass}
          buttonRemoveClass={buttonRemoveClass}
        />

        <WorkExperienceSection
          workExperience={formData.workExperience}
          onAddWorkExperience={handleAddWorkExperience}
          onWorkExperienceChange={handleWorkExperienceChange}
          onRemoveWorkExperience={handleRemoveWorkExperience}
          inputClass={inputClass}
          textAreaClass={textAreaClass}
          buttonAddClass={buttonAddClass}
          buttonRemoveClass={buttonRemoveClass}
        />

        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Psychological Assessment</h3> {/* Enhanced section title */}
          <div className="space-y-4 border p-4 rounded-md bg-gray-50/50 shadow-sm"> {/* Added shadow-sm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"> {/* md breakpoint, adjusted gap */}
              <div><label htmlFor="psych_assessmentDate" className="block text-sm font-medium text-gray-700">Assessment Date</label><input type="date" name="assessmentDate" id="psych_assessmentDate" value={formData.psychologicalAssessment.assessmentDate} onChange={handlePsychologicalAssessmentChange} className={inputClass} /></div>
              <div><label htmlFor="psych_assessor" className="block text-sm font-medium text-gray-700">Assessor</label><input type="text" name="assessor" id="psych_assessor" value={formData.psychologicalAssessment.assessor} onChange={handlePsychologicalAssessmentChange} className={inputClass} /></div>
              <div className="md:col-span-1"><label htmlFor="psych_assessmentType" className="block text-sm font-medium text-gray-700">Assessment Type</label><input type="text" name="assessmentType" id="psych_assessmentType" value={formData.psychologicalAssessment.assessmentType} onChange={handlePsychologicalAssessmentChange} className={inputClass} /></div>
              <div className="md:col-span-1">
                <label htmlFor="psych_recommendation" className="block text-sm font-medium text-gray-700">Recommendation</label>
                <select name="recommendation" id="psych_recommendation" value={formData.psychologicalAssessment.recommendation || ''} onChange={handlePsychologicalAssessmentChange} className={inputClass}>
                  <option value="">Select Recommendation</option>
                  <option value="Recommended">Recommended</option><option value="Not Recommended">Not Recommended</option><option value="Proceed with Caution">Proceed with Caution</option><option value="Further Assessment Needed">Further Assessment Needed</option>
                </select>
              </div>
              <div className="md:col-span-2"><label htmlFor="psych_summary" className="block text-sm font-medium text-gray-700">Summary</label><textarea name="summary" id="psych_summary" value={formData.psychologicalAssessment.summary} onChange={handlePsychologicalAssessmentChange} className={textAreaClass} rows={2}></textarea></div>
              <div className="md:col-span-2"><label htmlFor="psych_notes" className="block text-sm font-medium text-gray-700">Notes/Observations</label><textarea name="notes" id="psych_notes" value={formData.psychologicalAssessment.notes} onChange={handlePsychologicalAssessmentChange} className={textAreaClass} rows={3}></textarea></div>
              <div className="md:col-span-2"><label htmlFor="psych_detailedReportLink" className="block text-sm font-medium text-gray-700">Detailed Report Link (URL)</label><input type="url" name="detailedReportLink" id="psych_detailedReportLink" value={formData.psychologicalAssessment.detailedReportLink} onChange={handlePsychologicalAssessmentChange} className={inputClass} placeholder="https://example.com/report.pdf" /></div>
            </div>
          </div>
        </section>

        <div className="flex justify-end space-x-4 pt-10 border-t mt-10"> {/* Increased padding and margin */}
          <button type="button" onClick={() => navigate('/applicants')} disabled={isSubmitting} className="px-6 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60">Cancel</button> {/* Adjusted padding */}
          <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60">{isSubmitting ? 'Saving...' : 'Save Applicant'}</button> {/* Adjusted padding */}
        </div>
      </form>
    </div>
  );
};
export default AddApplicantPage;
