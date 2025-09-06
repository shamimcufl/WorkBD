
import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import JobListPage from './components/pages/JobListPage';
import JobDetailsPage from './components/pages/JobDetailsPage';
import PostJobPage from './components/pages/PostJobPage';
import RecruiterDashboardPage from './components/pages/RecruiterDashboardPage';
import ManageApplicantsPage from './components/pages/ManageApplicantsPage';
import type { AppContextType } from './types';

const AppContent: React.FC = () => {
    const context = useContext(AppContext);

    if (!context) {
        return <div>Loading...</div>;
    }
    const { view } = context;

    const renderView = () => {
        if (typeof view === 'object') {
            if (view.type === 'job-details') {
                return <JobDetailsPage jobId={view.id} />;
            }
            if (view.type === 'manage-applicants') {
                return <ManageApplicantsPage jobId={view.id} />;
            }
        }
        
        switch (view) {
            case 'home':
                return <HomePage />;
            case 'jobs':
                return <JobListPage />;
            case 'post-job':
                return <PostJobPage />;
            case 'dashboard':
                return <RecruiterDashboardPage />;
            default:
                return <HomePage />;
        }
    };
    
    return (
        <div className="flex flex-col min-h-screen bg-neutral">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                {renderView()}
            </main>
            <Footer />
        </div>
    );
};


const App: React.FC = () => {
  return (
    <AppProvider>
        <AppContent />
    </AppProvider>
  );
};

export default App;
