
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { Job, AppContextType } from '../types';

interface JobCardProps {
  job: Job;
}

const BriefcaseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const LocationIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { setView } = useContext(AppContext) as AppContextType;

  return (
    <div 
      className="bg-base-100 rounded-lg shadow-md p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={() => setView({ type: 'job-details', id: job.id })}
    >
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
        <p className="text-md text-gray-600 mb-2">{job.company}</p>
        <div className="flex items-center text-sm text-gray-500 mb-1">
            <BriefcaseIcon className="w-4 h-4 mr-2" />
            <span>{job.experience}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
            <LocationIcon className="w-4 h-4 mr-2" />
            <span>{job.location}</span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-3">
          {job.description}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
        <span className="text-xs text-gray-500">Posted: {job.postedDate}</span>
        <span className="text-xs font-semibold text-red-500">Deadline: {job.deadline}</span>
      </div>
    </div>
  );
};

export default JobCard;
