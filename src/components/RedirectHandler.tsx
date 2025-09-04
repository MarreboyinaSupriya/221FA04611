import React, { useEffect } from 'react';
import { apiService } from '../services/api';

interface RedirectHandlerProps {
  shortCode: string;
}

const RedirectHandler: React.FC<RedirectHandlerProps> = ({ shortCode }) => {
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const originalUrl = await apiService.handleRedirect(shortCode);
        if (originalUrl) {
          window.location.href = originalUrl;
        } else {
          // Show 404 page or redirect to home
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Redirect error:', error);
        window.location.href = '/';
      }
    };

    handleRedirect();
  }, [shortCode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Redirecting...</h2>
        <p className="text-gray-600">Please wait while we redirect you to your destination.</p>
      </div>
    </div>
  );
};

export default RedirectHandler;