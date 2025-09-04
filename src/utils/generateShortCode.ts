export const generateShortCode = (length: number = 6): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const isValidShortCode = (shortCode: string): boolean => {
  const urlSafeRegex = /^[A-Za-z0-9_-]+$/;
  return urlSafeRegex.test(shortCode) && shortCode.length >= 3 && shortCode.length <= 20;
};