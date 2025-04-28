import React from 'react';

const ErrorDisplay = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg">
      <div className="flex items-center">
        <span className="text-xl mr-2">⚠️</span>
        <span className="font-semibold">Error:</span>
        <p className="ml-2">{message}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;
