
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import type { AppContextType } from '../../types';
import JobCard from '../JobCard';

const HomePage: React.FC = () => {
  const { setView, jobs } = useContext(AppContext) as AppContextType;
  const featuredJobs = jobs.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center bg-base-100 rounded-lg shadow-lg p-12 mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Find Your Dream Job Today</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          WorkBD connects talented professionals with top companies in Bangladesh. Your next opportunity is just a click away.
        </p>
        <div className="space-x-4">
          <button 
            onClick={() => setView('jobs')} 
            className="bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105"
          >
            Find a Job
          </button>
          <button 
            onClick={() => setView('post-job')} 
            className="bg-secondary hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105"
          >
            Post a Job
          </button>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Featured Jobs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
