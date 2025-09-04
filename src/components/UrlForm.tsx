import React, { useState } from 'react';
import { Link2, Settings } from 'lucide-react';
import { CreateUrlRequest } from '../types';

interface UrlFormProps {
  onSubmit: (data: CreateUrlRequest) => void;
  isLoading: boolean;
}

const UrlForm: React.FC<UrlFormProps> = ({ onSubmit, isLoading }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [expiryDays, setExpiryDays] = useState('30');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;

    const data: CreateUrlRequest = {
      originalUrl: originalUrl.trim(),
    };

    if (customAlias.trim()) {
      data.customAlias = customAlias.trim();
    }

    if (customDomain.trim()) {
      data.customDomain = customDomain.trim();
    }

    if (expiryDays && parseInt(expiryDays) > 0) {
      data.expiryDays = parseInt(expiryDays);
    }

    onSubmit(data);
  };

  const resetForm = () => {
    setOriginalUrl('');
    setCustomAlias('');
    setCustomDomain('');
    setExpiryDays('30');
    setShowAdvanced(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Shorten Your URL</h2>
        <p className="text-gray-600">Transform long links into clean, shareable URLs</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your long URL
          </label>
          <div className="relative">
            <Link2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="url"
              id="originalUrl"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/very/long/url/path"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">
              {showAdvanced ? 'Hide' : 'Show'} Advanced Options
            </span>
          </button>
        </div>

        {showAdvanced && (
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <label htmlFor="customAlias" className="block text-sm font-medium text-gray-700 mb-2">
                Custom Alias (Optional)
              </label>
              <input
                type="text"
                id="customAlias"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="my-custom-link"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                3-20 characters, letters, numbers, hyphens, and underscores only
              </p>
            </div>

            <div>
              <label htmlFor="customDomain" className="block text-sm font-medium text-gray-700 mb-2">
                Custom Domain (Optional)
              </label>
              <input
                type="text"
                id="customDomain"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="yourdomain.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="expiryDays" className="block text-sm font-medium text-gray-700 mb-2">
                Expires After (Days)
              </label>
              <select
                id="expiryDays"
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1">1 Day</option>
                <option value="7">1 Week</option>
                <option value="30">1 Month</option>
                <option value="90">3 Months</option>
                <option value="365">1 Year</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading || !originalUrl.trim()}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Shortening...</span>
              </div>
            ) : (
              'Shorten URL'
            )}
          </button>
          
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default UrlForm;