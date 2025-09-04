import { CreateUrlRequest, UrlData, ApiResponse, UrlStats } from '../types';
import { generateShortCode, isValidShortCode } from '../utils/generateShortCode';
import { isValidUrl, normalizeUrl } from '../utils/validateUrl';

const STORAGE_KEY = 'linkShrink_urls';

class LocalStorageApiService {
  private getStoredUrls(): UrlData[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  private saveUrls(urls: UrlData[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw new Error('Failed to save data');
    }
  }

  private updateExpiredUrls(urls: UrlData[]): UrlData[] {
    const now = new Date();
    return urls.map(url => ({
      ...url,
      status: new Date(url.expiresAt) < now ? 'expired' : 'active'
    }));
  }

  async createShortUrl(urlData: CreateUrlRequest): Promise<ApiResponse<UrlData>> {
    try {
      // Validate URL
      if (!isValidUrl(urlData.originalUrl)) {
        throw new Error('Please provide a valid URL');
      }

      const normalizedUrl = normalizeUrl(urlData.originalUrl);
      const urls = this.getStoredUrls();

      let shortCode: string;

      // Handle custom alias
      if (urlData.customAlias) {
        if (!isValidShortCode(urlData.customAlias)) {
          throw new Error('Custom alias must be 3-20 characters long and contain only letters, numbers, hyphens, and underscores');
        }

        // Check if custom alias already exists
        const existingUrl = urls.find(url => url.shortCode === urlData.customAlias);
        if (existingUrl) {
          throw new Error('This custom alias is already taken');
        }

        shortCode = urlData.customAlias;
      } else {
        // Generate unique short code
        do {
          shortCode = generateShortCode();
        } while (urls.some(url => url.shortCode === shortCode));
      }

      // Set expiry date
      const expiryDays = urlData.expiryDays || 30;
      const expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);

      const newUrl: UrlData = {
        id: Date.now().toString(),
        originalUrl: normalizedUrl,
        shortCode,
        shortUrl: `${window.location.origin}/${shortCode}`,
        clicks: 0,
        status: 'active',
        expiresAt: expiresAt.toISOString(),
        createdAt: new Date().toISOString(),
      };

      const updatedUrls = [...urls, newUrl];
      this.saveUrls(updatedUrls);

      return {
        success: true,
        data: newUrl
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getUrls(params?: {
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<ApiResponse<UrlData[]>> {
    try {
      let urls = this.getStoredUrls();
      
      // Update expired URLs
      urls = this.updateExpiredUrls(urls);
      this.saveUrls(urls);

      // Apply search filter
      if (params?.search) {
        const searchTerm = params.search.toLowerCase();
        urls = urls.filter(url => 
          url.originalUrl.toLowerCase().includes(searchTerm) ||
          url.shortCode.toLowerCase().includes(searchTerm)
        );
      }

      // Apply status filter
      if (params?.status && params.status !== 'all') {
        urls = urls.filter(url => url.status === params.status);
      }

      // Apply sorting
      const sortBy = params?.sortBy || 'createdAt';
      const sortOrder = params?.sortOrder || 'desc';
      
      urls.sort((a, b) => {
        let aValue: any = a[sortBy as keyof UrlData];
        let bValue: any = b[sortBy as keyof UrlData];

        // Handle date strings
        if (sortBy === 'createdAt' || sortBy === 'expiresAt') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }

        // Handle numbers
        if (sortBy === 'clicks') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        }

        if (sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        } else {
          return aValue > bValue ? 1 : -1;
        }
      });

      return {
        success: true,
        data: urls
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteUrl(id: string): Promise<ApiResponse<null>> {
    try {
      const urls = this.getStoredUrls();
      const filteredUrls = urls.filter(url => url.id !== id);
      
      if (urls.length === filteredUrls.length) {
        throw new Error('URL not found');
      }

      this.saveUrls(filteredUrls);

      return {
        success: true,
        data: null
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getUrlStats(): Promise<ApiResponse<UrlStats>> {
    try {
      let urls = this.getStoredUrls();
      urls = this.updateExpiredUrls(urls);

      const stats: UrlStats = {
        totalUrls: urls.length,
        activeUrls: urls.filter(url => url.status === 'active').length,
        expiredUrls: urls.filter(url => url.status === 'expired').length,
        totalClicks: urls.reduce((total, url) => total + url.clicks, 0)
      };

      return {
        success: true,
        data: stats
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async handleRedirect(shortCode: string): Promise<string | null> {
    try {
      const urls = this.getStoredUrls();
      const urlRecord = urls.find(url => url.shortCode === shortCode);

      if (!urlRecord) {
        return null;
      }

      // Check if expired
      if (new Date(urlRecord.expiresAt) < new Date()) {
        urlRecord.status = 'expired';
        this.saveUrls(urls);
        return null;
      }

      // Update click count
      urlRecord.clicks += 1;
      this.saveUrls(urls);

      return urlRecord.originalUrl;
    } catch (error) {
      console.error('Error handling redirect:', error);
      return null;
    }
  }
}

export const apiService = new LocalStorageApiService();