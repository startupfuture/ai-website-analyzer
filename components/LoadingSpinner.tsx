
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-sky-400"></div>
      <p className="ml-3 text-sky-300 text-lg">Analyzing, please wait...</p>
    </div>
  );
};

export default LoadingSpinner;
