
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} WorkBD. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-1">Your next career move starts here.</p>
      </div>
    </footer>
  );
};

export default Footer;
