import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="animate-spin rounded-full border-t-4 border-blue-600 w-12 h-12 border-solid"></div>
      <span className="text-gray-500">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
