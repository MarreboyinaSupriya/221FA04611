export interface UrlData {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  status: 'active' | 'expired';
  expiresAt: string;
  createdAt: string;
  lastAccessed?: string;
}

export interface CreateUrlRequest {
  originalUrl: string;
  customAlias?: string;
  customDomain?: string;
  expiryDays?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface UrlStats {
  totalUrls: number;
  activeUrls: number;
  expiredUrls: number;
  totalClicks: number;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}