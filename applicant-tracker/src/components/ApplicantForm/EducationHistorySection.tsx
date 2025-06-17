// src/components/ApplicantForm/EducationHistorySection.tsx
import React from 'react';
import { Education } from '../../types/applicant'; // Adjust path as necessary

interface EducationHistorySectionProps {
  educationHistory: Array<Omit<Education, 'id'>>;
  onAddEducation: () => void;
  onEducationChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveEducation: (index: number) => void;
  inputClass: string; // Pass common input class
  buttonAddClass: string;
  buttonRemoveClass: string;
}

const EducationHistorySection: React.FC<EducationHistorySectionProps> = ({
  educationHistory,
  onAddEducation,
  onEducationChange,
  onRemoveEducation,
  inputClass,
  buttonAddClass,
  buttonRemoveClass
}) => {
  return (
    <section>
      <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Education History</h3>
      {educationHistory.map((edu, index) => (
        <div key={index} className="space-y-4 border p-4 rounded-md mb-4 relative bg-gray-50/50 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div className="sm:col-span-2">
              <label htmlFor={"degree"} className="block text-sm font-medium text-gray-700">Degree*</label>
              <input type="text" name="degree" id={"degree"} value={edu.degree} onChange={(e) => onEducationChange(index, e)} required className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={"institution"} className="block text-sm font-medium text-gray-700">Institution*</label>
              <input type="text" name="institution" id={"institution"} value={edu.institution} onChange={(e) => onEducationChange(index, e)} required className={inputClass} />
            </div>
            <div>
              <label htmlFor={"institution"} className="block text-sm font-medium text-gray-700">Field of Study</label>
              <input type="text" name="fieldOfStudy" id={"fieldOfStudy"} value={edu.fieldOfStudy || ''} onChange={(e) => onEducationChange(index, e)} className={inputClass} />
            </div>
            <div>
              <label htmlFor={"graduationYear"} className="block text-sm font-medium text-gray-700">Graduation Year</label>
              <input type="number" name="graduationYear" id={"graduationYear"} value={edu.graduationYear === undefined ? '' : edu.graduationYear} onChange={(e) => onEducationChange(index, e)} className={inputClass} placeholder="YYYY" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={"gpa"} className="block text-sm font-medium text-gray-700">GPA</label>
              <input type="number" step="0.01" name="gpa" id={"gpa"} value={edu.gpa === undefined ? '' : edu.gpa} onChange={(e) => onEducationChange(index, e)} className={inputClass} placeholder="e.g., 3.5" />
            </div>
          </div>
          <div className="text-right mt-2"> {/* Added mt-2 for spacing */}
            <button type="button" onClick={() => onRemoveEducation(index)} className={buttonRemoveClass}>Remove Education</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={onAddEducation} className={buttonAddClass}>+ Add Education Entry</button>
    </section>
  );
};

export default EducationHistorySection;
