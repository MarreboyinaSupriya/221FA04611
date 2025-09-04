import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlDisplay from '../components/UrlDisplay';
import { apiService } from '../services/api';
import { CreateUrlRequest, UrlData } from '../types';

interface HomeProps {
  onShowToast: (type: 'success' | 'error', message: string) => void;
}

const Home: React.FC<HomeProps> = ({ onShowToast }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [urlData, setUrlData] = useState<UrlData | null>(null);

  const handleSubmit = async (data: CreateUrlRequest) => {
    setIsLoading(true);
    try {
      const response = await apiService.createShortUrl(data);
      if (response.success && response.data) {
        setUrlData(response.data);
        onShowToast('success', 'Short URL created successfully!');
      } else {
        onShowToast('error', response.error || 'Failed to create short URL');
      }
    } catch (error: any) {
      onShowToast('error', error.message || 'Failed to create short URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, message: string) => {
    if (message) {
      onShowToast('success', message);
    } else {
      onShowToast('error', 'Failed to copy to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Shorten URLs with Style
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your long URLs into beautiful, shareable links. Track clicks, 
            set expiry dates, and customize domains.
          </p>
        </div>

        <UrlForm onSubmit={handleSubmit} isLoading={isLoading} />
        
        {urlData && <UrlDisplay urlData={urlData} onCopy={handleCopy} />}
      </div>
    </div>
  );
};

export default Home;