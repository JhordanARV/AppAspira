// src/pages/ApplicantsPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Applicant } from '../types/applicant';
import { getApplicants } from '../services/applicantService';

const ApplicantsPage: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const data = await getApplicants();
        setApplicants(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch applicants.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-lg shadow animate-pulse">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Loading Applicants...</h2>
        <div className="space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Applicant List</h2>
        <Link
          to="/add-applicant"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out w-full sm:w-auto mt-3 sm:mt-0"
        >
          Add New Applicant
        </Link>
      </div>

      {applicants.length === 0 ? (
        <p className="text-gray-600">No applicants found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Application Date
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {applicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-900">
                    {applicant.personalInformation.firstName} {applicant.personalInformation.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-900">
                    {applicant.personalInformation.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${applicant.status === 'Interviewing' ? 'bg-yellow-100 text-yellow-800' :
                        applicant.status === 'Hired' ? 'bg-green-100 text-green-800' :
                        applicant.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-900">
                    {new Date(applicant.applicationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm font-medium">
                    <Link
                      to={`/applicants/${applicant.id}`} // Placeholder, actual detail page to be created
                      className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApplicantsPage;
