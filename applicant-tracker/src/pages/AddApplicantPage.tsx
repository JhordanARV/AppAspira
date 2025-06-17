// src/pages/AddApplicantPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Assuming PersonalInformation might be too broad, let's define a simpler type for the form state initially
// or import specific fields if needed. For now, let's manage fields directly.

interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // Optional, so handled in initial state
  // Add more fields from PersonalInformation as needed
}

const AddApplicantPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // For feedback

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form Data Submitted:', formData);
    // Here you would typically call a service to save the applicant
    // For now, simulate a delay and then navigate or show a message
    try {
      // Example: await addApplicantServiceFunction(formData);
      // For now, just log and navigate
      alert('Applicant data (mock) submitted! Check console.');
      // Reset form if staying on page, or navigate
      // setFormData({ firstName: '', lastName: '', email: '', phone: '' });
      navigate('/applicants'); // Navigate back to the list after "submission"
    } catch (error) {
      console.error("Failed to submit form:", error);
      alert("Failed to submit applicant data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Applicant</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Add more fields for PersonalInformation as desired here */}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/applicants')}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Save Applicant'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddApplicantPage;
