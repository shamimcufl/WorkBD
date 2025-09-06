
import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import type { AppContextType } from '../../types';
import ApplicationForm from '../ApplicationForm';

interface JobDetailsPageProps {
  jobId: string;
}

const ShareIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12" />
    </svg>
);

const QRCodeModal: React.FC<{ jobTitle: string, url: string, onClose: () => void }> = ({ jobTitle, url, onClose }) => {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-base-100 rounded-lg shadow-2xl p-8 text-center max-w-sm w-full" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-gray-800">Share Job Posting</h3>
                <p className="text-gray-600 mt-1 mb-4">{jobTitle}</p>
                <img src={qrCodeUrl} alt={`QR Code for ${jobTitle}`} className="mx-auto rounded-md" />
                <p className="text-sm text-gray-500 mt-4">Scan this code to view the job details.</p>
                <button
                    onClick={onClose}
                    className="mt-6 bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all"
                >
                    Close
                </button>
            </div>
        </div>
    );
};


const JobDetailsPage: React.FC<JobDetailsPageProps> = ({ jobId }) => {
  const { jobs, setView } = useContext(AppContext) as AppContextType;
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const job = jobs.find(j => j.id === jobId);

  if (!job) {
    return <div className="text-center text-red-500">Job not found.</div>;
  }
  
  // In a real app, this would be the actual public URL.
  // For this simulation, we'll construct a plausible one.
  const jobUrl = `${window.location.origin}?view=job-details&id=${job.id}`;

  return (
    <>
      {isShareModalOpen && <QRCodeModal jobTitle={job.title} url={jobUrl} onClose={() => setIsShareModalOpen(false)} />}
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 bg-base-100 p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <button onClick={() => setView('jobs')} className="text-primary hover:underline mb-6">&larr; Back to all jobs</button>
            <button 
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center space-x-2 text-sm bg-neutral py-2 px-4 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
                title="Share Job"
            >
                <ShareIcon className="w-4 h-4" />
                <span>Share</span>
            </button>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800">{job.title}</h1>
          <p className="text-xl text-gray-600 mt-1">{job.company}</p>
          <p className="text-md text-gray-500 mt-1 mb-6">{job.location}</p>

          <div className="space-y-6 text-gray-700 whitespace-pre-wrap">
            <h2 className="text-2xl font-semibold border-b pb-2 text-gray-800">Job Description</h2>
            <p>{job.description}</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
              <div className="bg-neutral p-4 rounded-lg">
                  <h4 className="font-bold text-gray-700">Experience</h4>
                  <p className="text-gray-600">{job.experience}</p>
              </div>
              <div className="bg-neutral p-4 rounded-lg">
                  <h4 className="font-bold text-gray-700">Age Requirement</h4>
                  <p className="text-gray-600">{job.ageRequirement}</p>
              </div>
              <div className="bg-neutral p-4 rounded-lg">
                  <h4 className="font-bold text-gray-700">Posted On</h4>
                  <p className="text-gray-600">{job.postedDate}</p>
              </div>
              <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                  <h4 className="font-bold">Deadline</h4>
                  <p>{job.deadline}</p>
              </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <ApplicationForm job={job} />
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;