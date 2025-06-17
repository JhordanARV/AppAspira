// src/pages/ApplicantDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getApplicantById } from '../../services/applicantService';
import { Applicant, PersonalInformation, Education, WorkExperience, PsychologicalAssessment } from '../../types/applicant';
import DetailSection from '../../components/Details/DetailSection'; // <-- IMPORT ADDED HERE

// DetailSection component is now imported, so its definition is removed from here.

const ApplicantDetailPage: React.FC = () => {
  const { applicantId } = useParams<{ applicantId: string }>();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!applicantId) {
      setError("Applicant ID is missing.");
      setLoading(false);
      return;
    }

    const fetchApplicant = async () => {
      setLoading(true);
      try {
        const data = await getApplicantById(applicantId);
        if (data) {
          setApplicant(data);
          setError(null);
        } else {
          setApplicant(null);
          setError("Applicant not found.");
        }
      } catch (err) {
        console.error("Error fetching applicant:", err);
        setError("Failed to fetch applicant details. Please try again later.");
        setApplicant(null);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicant();
  }, [applicantId]);

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-lg shadow max-w-4xl mx-auto animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-3"></div>
              <div className="bg-gray-200 p-4 rounded-md space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-lg shadow max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <Link to="/applicants" className="text-indigo-600 hover:text-indigo-800">&larr; Back to Applicants</Link>
        </div>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="bg-white p-8 rounded-lg shadow max-w-4xl mx-auto">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Applicant Not Found</h2>
            <Link to="/applicants" className="text-indigo-600 hover:text-indigo-800">&larr; Back to Applicants</Link>
        </div>
        <p>The applicant you are looking for does not exist or could not be loaded.</p>
      </div>
    );
  }

  const { personalInformation, educationHistory, workExperience, psychologicalAssessments, applicationDate, status, source, notes } = applicant;

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 pb-4 border-b">
        <div>
            <h2 className="text-3xl font-bold text-gray-800">
            {personalInformation.firstName} {personalInformation.lastName}
            </h2>
            <p className="text-md text-indigo-600">{personalInformation.email}</p>
        </div>
        <Link
          to="/applicants"
          className="mt-4 md:mt-0 text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out self-start md:self-center"
        >
          &larr; Back to Applicants List
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6 text-sm">
        <p><strong>Phone:</strong> {personalInformation.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {personalInformation.address || 'N/A'}</p>
        <p><strong>Date of Birth:</strong> {personalInformation.dateOfBirth ? new Date(personalInformation.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Nationality:</strong> {personalInformation.nationality || 'N/A'}</p>
        <p><strong>Application Date:</strong> {new Date(applicationDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${status === 'Interviewing' ? 'bg-yellow-100 text-yellow-800' : status === 'Hired' ? 'bg-green-100 text-green-800' : status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{status}</span></p>
        <p><strong>Source:</strong> {source || 'N/A'}</p>
      </div>
        {notes && <DetailSection title="General Notes"><p className="whitespace-pre-wrap text-sm text-gray-700">{notes}</p></DetailSection>}

      <div className="space-y-8 mt-8">
        <DetailSection title="Education History">
          {educationHistory.length > 0 ? (
            <ul className="space-y-4">
              {educationHistory.map((edu) => (
                <li key={edu.id} className="p-3 bg-white border rounded-md shadow-sm">
                  <h4 className="font-semibold text-md text-indigo-700">{edu.degree}</h4>
                  <p className="text-sm text-gray-700">{edu.institution} {edu.fieldOfStudy ? `(${edu.fieldOfStudy})` : ''}</p>
                  {edu.graduationYear && <p className="text-xs text-gray-500">Graduated: {edu.graduationYear}</p>}
                  {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                </li>
              ))}
            </ul>
          ) : <p className="text-sm text-gray-500">No education history provided.</p>}
        </DetailSection>

        <DetailSection title="Work Experience">
          {workExperience.length > 0 ? (
            <ul className="space-y-4">
              {workExperience.map((work) => (
                <li key={work.id} className="p-3 bg-white border rounded-md shadow-sm">
                  <h4 className="font-semibold text-md text-indigo-700">{work.role} at {work.company}</h4>
                  <p className="text-xs text-gray-500">
                    {new Date(work.startDate).toLocaleDateString()} - {work.endDate ? new Date(work.endDate).toLocaleDateString() : 'Present'}
                  </p>
                  {work.responsibilities && work.responsibilities.length > 0 && (
                    <div className="mt-2">
                      <h5 className="text-xs font-semibold text-gray-600">Responsibilities:</h5>
                      <ul className="list-disc list-inside text-xs text-gray-500 pl-2">
                        {work.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                      </ul>
                    </div>
                  )}
                   {work.achievements && work.achievements.length > 0 && (
                    <div className="mt-2">
                      <h5 className="text-xs font-semibold text-gray-600">Achievements:</h5>
                      <ul className="list-disc list-inside text-xs text-gray-500 pl-2">
                        {work.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : <p className="text-sm text-gray-500">No work experience provided.</p>}
        </DetailSection>

        <DetailSection title="Psychological Assessments">
          {psychologicalAssessments.length > 0 ? (
            <ul className="space-y-4">
              {psychologicalAssessments.map((assess) => (
                <li key={assess.id} className="p-3 bg-white border rounded-md shadow-sm">
                  <h4 className="font-semibold text-md text-indigo-700">{assess.assessmentType}</h4>
                  <p className="text-xs text-gray-500">Assessed by: {assess.assessor} on {new Date(assess.assessmentDate).toLocaleDateString()}</p>
                  {assess.summary && <p className="text-sm text-gray-600 mt-1">Summary: {assess.summary}</p>}
                  {assess.recommendation && <p className="text-sm font-medium mt-1">Recommendation: <span className="font-normal">{assess.recommendation}</span></p>}
                  {assess.scores && assess.scores.length > 0 && (
                    <div className="mt-2">
                      <h5 className="text-xs font-semibold text-gray-600">Scores/Observations:</h5>
                       <ul className="list-disc list-inside text-xs text-gray-500 pl-2">
                        {assess.scores.map((score, i) => <li key={i}>{score.name}: {score.value} {score.notes ? `(${score.notes})` : ''}</li>)}
                      </ul>
                    </div>
                  )}
                  {assess.notes && <p className="text-xs text-gray-500 mt-1">Notes: {assess.notes}</p>}
                  {assess.detailedReportLink && <a href={assess.detailedReportLink} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-500 hover:underline mt-1 block">View Detailed Report</a>}
                </li>
              ))}
            </ul>
          ) : <p className="text-sm text-gray-500">No psychological assessments recorded.</p>}
        </DetailSection>
      </div>
    </div>
  );
};
export default ApplicantDetailPage;
