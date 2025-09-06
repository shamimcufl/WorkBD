
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import type { AppContextType } from '../../types';

const UsersIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-3-5.197m0 0A4 4 0 1012 4.354m0 5.292a4 4 0 100-5.292" />
    </svg>
);


const RecruiterDashboardPage: React.FC = () => {
  const { jobs, getApplicantsForJob, setView } = useContext(AppContext) as AppContextType;
  // In a real app, this would be filtered by the logged-in recruiter
  const myJobs = jobs; 

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Recruiter Dashboard</h1>
        <button 
          onClick={() => setView('post-job')} 
          className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg"
        >
          + Post New Job
        </button>
      </div>

      <div className="bg-base-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">My Job Postings</h2>
        <div className="space-y-4">
          {myJobs.length > 0 ? myJobs.map(job => {
            const applicantCount = getApplicantsForJob(job.id).length;
            return (
              <div key={job.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-neutral transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-primary">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company} - {job.location}</p>
                  <p className="text-xs text-gray-500 mt-1">Deadline: {job.deadline}</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-700">
                        <UsersIcon className="w-5 h-5 mr-2" />
                        <span className="font-semibold">{applicantCount}</span>
                        <span className="ml-1">Applicant(s)</span>
                    </div>
                    <button 
                        onClick={() => setView({type: 'manage-applicants', id: job.id})}
                        className="bg-secondary hover:bg-opacity-90 text-white text-sm font-semibold py-2 px-4 rounded-full transition-all duration-300"
                    >
                        Manage
                    </button>
                </div>
              </div>
            );
          }) : (
            <p className="text-center text-gray-500 py-8">You haven't posted any jobs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboardPage;
