import React, { useState } from 'react';
import { FiSettings, FiDatabase, FiServer, FiX } from 'react-icons/fi';
import { isMockApiModeEnabled, toggleMockApiMode } from '../api/providerService';

/**
 * Development Tools Component
 * Shows a panel with development options like toggling mock API
 * Only displayed in development mode (process.env.NODE_ENV === 'development')
 */
const DevTools = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mockEnabled, setMockEnabled] = useState(isMockApiModeEnabled());

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const handleToggleMock = () => {
    const newState = !mockEnabled;
    setMockEnabled(newState);
    toggleMockApiMode(newState);
    // Force reload to apply changes
    window.location.reload();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        title="Development Tools"
      >
        {isOpen ? <FiX size={18} /> : <FiSettings size={18} />}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
          <div className="p-3 bg-gray-800 text-white">
            <h3 className="text-sm font-semibold flex items-center">
              <FiServer className="mr-2" /> Development Tools
            </h3>
          </div>
          
          <div className="p-3">
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiDatabase className="text-gray-500 mr-2" />
                  <span className="text-sm font-medium">Use Mock API</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={mockEnabled}
                    onChange={handleToggleMock}
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-6">
                {mockEnabled ? "Using mock data instead of real API calls" : "Using real API endpoints"}
              </p>
            </div>
            
            <div className="text-xs text-gray-500 border-t border-gray-100 pt-2 mt-2">
              <p>Environment: {process.env.NODE_ENV}</p>
              <p>API URL: {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DevTools;