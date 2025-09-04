import React, { useState } from 'react';
import { Copy, ExternalLink, Clock, MousePointer } from 'lucide-react';
import { UrlData } from '../types';

interface UrlDisplayProps {
  urlData: UrlData | null;
  onCopy: (text: string, message: string) => void;
}

const UrlDisplay: React.FC<UrlDisplayProps> = ({ urlData, onCopy }) => {
  const [copied, setCopied] = useState(false);

  if (!urlData) return null;

  const handleCopy = async () => {
    try {
      const shortUrl = `${window.location.origin}/${urlData.shortCode}`;
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      onCopy(shortUrl, 'Short URL copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      onCopy('', 'Failed to copy URL');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Short URL is Ready!</h3>
        <p className="text-gray-600">Share this link anywhere</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 mr-4">
            <p className="text-sm text-gray-500 mb-1">Shortened URL:</p>
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <a
                href={urlData.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
              >
                <span>{urlData.shortUrl}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        <div className="text-sm text-gray-600">
          <p className="mb-1">
            <span className="font-medium">Original:</span> {urlData.originalUrl}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <MousePointer className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-600">{urlData.clicks}</p>
          <p className="text-sm text-gray-600">Clicks</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className={`w-6 h-6 mx-auto mb-2 rounded-full ${
            urlData.status === 'active' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <p className="text-sm font-bold text-gray-800 capitalize">{urlData.status}</p>
          <p className="text-sm text-gray-600">Status</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-sm font-bold text-gray-800">{formatDate(urlData.createdAt)}</p>
          <p className="text-sm text-gray-600">Created</p>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <p className="text-sm font-bold text-gray-800">{formatDate(urlData.expiresAt)}</p>
          <p className="text-sm text-gray-600">Expires</p>
        </div>
      </div>
    </div>
  );
};

export default UrlDisplay;