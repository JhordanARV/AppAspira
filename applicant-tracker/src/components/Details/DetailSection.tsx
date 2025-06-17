import React from 'react';

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">{title}</h3>
    <div className="bg-gray-50 p-4 rounded-md shadow-sm">
      {children}
    </div>
  </div>
);
export default DetailSection;
