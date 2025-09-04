import React, { useState } from 'react';
import { Search, Trash2, Copy, ExternalLink, Filter } from 'lucide-react';
import { UrlData, UrlStats } from '../types';

interface StatisticsTableProps {
  urls: UrlData[];
  stats: UrlStats | null;
  isLoading: boolean;
  onDelete: (id: string) => void;
  onCopy: (text: string, message: string) => void;
  onSearch: (search: string) => void;
  onFilterStatus: (status: string) => void;
  onSort: (sortBy: string, sortOrder: string) => void;
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({
  urls,
  stats,
  isLoading,
  onDelete,
  onCopy,
  onSearch,
  onFilterStatus,
  onSort,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStatusFilter(value);
    onFilterStatus(value);
  };

  const handleSort = (newSortBy: string) => {
    const newSortOrder = sortBy === newSortBy && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    onSort(newSortBy, newSortOrder);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      onCopy(text, 'URL copied to clipboard!');
    } catch (error) {
      onCopy('', 'Failed to copy URL');
    }
  };

  const truncateUrl = (url: string, maxLength: number = 40) => {
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-gray-500">Total URLs</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalUrls}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-gray-500">Active URLs</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.activeUrls}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-gray-500">Expired URLs</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">{stats.expiredUrls}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalClicks}</p>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search URLs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="pl-12 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* URLs Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading URLs...</p>
          </div>
        ) : urls.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No URLs found. Create your first short URL!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('originalUrl')}
                  >
                    Original URL
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('shortCode')}
                  >
                    Short URL
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('clicks')}
                  >
                    Clicks
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('createdAt')}
                  >
                    Created
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('expiresAt')}
                  >
                    Expires
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {urls.map((url) => (
                  <tr key={url.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span 
                          className="text-sm text-gray-900"
                          title={url.originalUrl}
                        >
                          {truncateUrl(url.originalUrl, 35)}
                        </span>
                        <button
                          onClick={() => handleCopy(url.originalUrl)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <a
                          href={`/${url.shortCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                        >
                          <span>{url.shortCode}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => handleCopy(`${window.location.origin}/${url.shortCode}`)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{url.clicks}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          url.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {url.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(url.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(url.expiresAt)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onDelete(url.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                        title="Delete URL"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsTable;