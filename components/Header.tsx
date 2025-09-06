
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../types';

const Header: React.FC = () => {
  const { setView } = useContext(AppContext) as AppContextType;

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="text-2xl font-bold text-primary cursor-pointer"
          onClick={() => setView('home')}
        >
          Work<span className="text-secondary">BD</span>
        </div>
        <div className="flex items-center space-x-6 text-gray-600">
          <button onClick={() => setView('home')} className="hover:text-primary transition-colors">Home</button>
          <button onClick={() => setView('jobs')} className="hover:text-primary transition-colors">Find Jobs</button>
          <button onClick={() => setView('dashboard')} className="hover:text-primary transition-colors">Recruiter Dashboard</button>
          <button 
            onClick={() => setView('post-job')} 
            className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Post a Job
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
