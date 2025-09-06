
import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import type { AppContextType } from '../../types';
import JobCard from '../JobCard';

const JobListPage: React.FC = () => {
  const { jobs } = useContext(AppContext) as AppContextType;
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    job.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-base-100 p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Your Next Role</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">No jobs found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default JobListPage;
