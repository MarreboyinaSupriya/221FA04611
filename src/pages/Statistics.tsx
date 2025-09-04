import React, { useState, useEffect } from 'react';
import StatisticsTable from '../components/StatisticsTable';
import { apiService } from '../services/api';
import { UrlData, UrlStats } from '../types';

interface StatisticsProps {
  onShowToast: (type: 'success' | 'error', message: string) => void;
}

const Statistics: React.FC<StatisticsProps> = ({ onShowToast }) => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [stats, setStats] = useState<UrlStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUrls = async (params?: any) => {
    setIsLoading(true);
    try {
      const response = await apiService.getUrls(params);
      if (response.success && response.data) {
        setUrls(response.data);
      }
    } catch (error: any) {
      onShowToast('error', 'Failed to fetch URLs');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await apiService.getUrlStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error: any) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    fetchUrls();
    fetchStats();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this URL? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await apiService.deleteUrl(id);
      if (response.success) {
        setUrls(urls.filter(url => url.id !== id));
        onShowToast('success', 'URL deleted successfully');
        fetchStats(); // Refresh stats
      } else {
        onShowToast('error', response.error || 'Failed to delete URL');
      }
    } catch (error: any) {
      onShowToast('error', 'Failed to delete URL');
    }
  };

  const handleSearch = (search: string) => {
    fetchUrls({ search });
  };

  const handleFilterStatus = (status: string) => {
    fetchUrls({ status });
  };

  const handleSort = (sortBy: string, sortOrder: string) => {
    fetchUrls({ sortBy, sortOrder });
  };

  const handleCopy = (text: string, message: string) => {
    if (message) {
      onShowToast('success', message);
    } else {
      onShowToast('error', 'Failed to copy to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">URL Statistics</h1>
          <p className="text-xl text-gray-600">
            Monitor performance and manage your shortened URLs
          </p>
        </div>

        <StatisticsTable
          urls={urls}
          stats={stats}
          isLoading={isLoading}
          onDelete={handleDelete}
          onCopy={handleCopy}
          onSearch={handleSearch}
          onFilterStatus={handleFilterStatus}
          onSort={handleSort}
        />
      </div>
    </div>
  );
};

export default Statistics;