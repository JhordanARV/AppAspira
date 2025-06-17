// src/components/ApplicantForm/WorkExperienceSection.tsx
import React from 'react';
import { WorkExperience } from '../../types/applicant'; // Adjust path as necessary

interface WorkExperienceSectionProps {
  workExperience: Array<Omit<WorkExperience, 'id'>>;
  onAddWorkExperience: () => void;
  onWorkExperienceChange: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onRemoveWorkExperience: (index: number) => void;
  inputClass: string;
  textAreaClass: string;
  buttonAddClass: string;
  buttonRemoveClass: string;
}

const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = ({
  workExperience,
  onAddWorkExperience,
  onWorkExperienceChange,
  onRemoveWorkExperience,
  inputClass,
  textAreaClass,
  buttonAddClass,
  buttonRemoveClass
}) => {
  return (
    <section>
      <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Work Experience</h3>
      {workExperience.map((work, index) => (
        <div key={index} className="space-y-4 border p-4 rounded-md mb-4 relative bg-gray-50/50 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div className="sm:col-span-1">
              <label htmlFor={} className="block text-sm font-medium text-gray-700">Company*</label>
              <input type="text" name="company" id={} value={work.company} onChange={(e) => onWorkExperienceChange(index, e)} required className={inputClass} />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor={} className="block text-sm font-medium text-gray-700">Role/Title*</label>
              <input type="text" name="role" id={} value={work.role} onChange={(e) => onWorkExperienceChange(index, e)} required className={inputClass} />
            </div>
            <div>
              <label htmlFor={} className="block text-sm font-medium text-gray-700">Start Date*</label>
              <input type="date" name="startDate" id={} value={work.startDate} onChange={(e) => onWorkExperienceChange(index, e)} required className={inputClass} />
            </div>
            <div>
              <label htmlFor={} className="block text-sm font-medium text-gray-700">End Date</label>
              <input type="date" name="endDate" id={} value={work.endDate || ''} onChange={(e) => onWorkExperienceChange(index, e)} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={} className="block text-sm font-medium text-gray-700">Responsibilities (one per line)</label>
              <textarea name="responsibilities" id={} value={work.responsibilities.join('\n')} onChange={(e) => onWorkExperienceChange(index, e)} className={textAreaClass} rows={3}></textarea>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={} className="block text-sm font-medium text-gray-700">Achievements (one per line)</label>
              <textarea name="achievements" id={} value={work.achievements.join('\n')} onChange={(e) => onWorkExperienceChange(index, e)} className={textAreaClass} rows={3}></textarea>
            </div>
          </div>
          <div className="text-right mt-2"> {/* Added mt-2 for spacing */}
            <button type="button" onClick={() => onRemoveWorkExperience(index)} className={buttonRemoveClass}>Remove Work Experience</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={onAddWorkExperience} className={buttonAddClass}>+ Add Work Experience</button>
    </section>
  );
};

export default WorkExperienceSection;
