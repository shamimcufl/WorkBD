
import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { ApplicantStatus } from '../../types';
import type { AppContextType, Applicant } from '../../types';

interface ManageApplicantsPageProps {
  jobId: string;
}

const statusColors: { [key in ApplicantStatus]: string } = {
    [ApplicantStatus.New]: 'bg-blue-100 text-blue-800',
    [ApplicantStatus.Shortlisted]: 'bg-yellow-100 text-yellow-800',
    [ApplicantStatus.Interviewing]: 'bg-purple-100 text-purple-800',
    [ApplicantStatus.Hired]: 'bg-green-100 text-green-800',
    [ApplicantStatus.Rejected]: 'bg-red-100 text-red-800',
};

const ManageApplicantsPage: React.FC<ManageApplicantsPageProps> = ({ jobId }) => {
  const { jobs, getApplicantsForJob, updateApplicantStatus, setView } = useContext(AppContext) as AppContextType;
  const job = jobs.find(j => j.id === jobId);
  const applicants = useMemo(() => getApplicantsForJob(jobId), [getApplicantsForJob, jobId]);

  if (!job) {
    return <div className="text-center text-red-500">Job not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <button onClick={() => setView('dashboard')} className="text-primary hover:underline mb-6">&larr; Back to Dashboard</button>
      <h1 className="text-3xl font-bold text-gray-800">Manage Applicants</h1>
      <p className="text-lg text-gray-600 mb-8">{job.title} at {job.company}</p>

      <div className="bg-base-100 rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Change Status</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applicants.length > 0 ? applicants.map(applicant => (
              <tr key={applicant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                  <div className="text-sm text-gray-500">{applicant.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {applicant.appliedDate.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                    {applicant.cv && <a href="#" className="hover:underline">CV</a>}
                    {applicant.coverLetter && <a href="#" className="ml-2 hover:underline">Cover Letter</a>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[applicant.status]}`}>
                    {applicant.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <select 
                    value={applicant.status} 
                    onChange={(e) => updateApplicantStatus(applicant.id, e.target.value as ApplicantStatus)}
                    className="p-1 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                   >
                    {Object.values(ApplicantStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            )) : (
                <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">No applicants for this job yet.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageApplicantsPage;
