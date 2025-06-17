import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ApplicantsPage from './pages/ApplicantsPage';
import AddApplicantPage from './pages/AddApplicantPage';
import ApplicantDetailPage from './pages/ApplicantDetailPage'; // <-- Added import
// Ensure App.css or any other global CSS is imported if needed
// import './App.css';

function App() {
  return (
    <Router>
      <AppLayout>
        {/* Update sidebar links in AppLayout.tsx to use Link component */}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/applicants" element={<ApplicantsPage />} />
          <Route path="/add-applicant" element={<AddApplicantPage />} />
          <Route path="/applicants/:applicantId" element={<ApplicantDetailPage />} />
          {/* Define other routes here */}
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
