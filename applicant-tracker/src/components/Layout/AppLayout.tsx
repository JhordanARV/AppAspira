import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom'; // Added Link import

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Applicant Tracker</h1>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (Optional Placeholder) */}
        <aside className="w-64 bg-gray-800 text-white p-4 space-y-2 hidden md:block">
          <nav>
            {/* Updated to use Link */}
            <Link to="/" className="block py-2 px-3 rounded hover:bg-gray-700">Dashboard</Link>
            <Link to="/applicants" className="block py-2 px-3 rounded hover:bg-gray-700">Applicants</Link>
            <Link to="/add-applicant" className="block py-2 px-3 rounded hover:bg-gray-700">Add Applicant</Link>
            {/* Add more links as needed */}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>

      {/* Footer (Optional) */}
      <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600">
        © 2023 Applicant Tracker
      </footer>
    </div>
  );
};

export default AppLayout;
