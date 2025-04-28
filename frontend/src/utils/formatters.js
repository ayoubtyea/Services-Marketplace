/**
 * Format date to a readable string
 * @param {string|Date} date - The date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
    if (!date) return '';
    
    const defaultOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      ...options
    };
    
    try {
      return new Date(date).toLocaleDateString(undefined, defaultOptions);
    } catch (error) {
      console.error('Date formatting error:', error);
      return String(date);
    }
  };
  
  /**
   * Format currency value
   * @param {number} amount - The amount to format
   * @param {string} currencyCode - Currency code (default: USD)
   * @returns {string} Formatted currency string
   */
  export const formatCurrency = (amount, currencyCode = 'USD') => {
    if (amount === undefined || amount === null) return '';
    
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch (error) {
      console.error('Currency formatting error:', error);
      return `${currencyCode} ${amount}`;
    }
  };
  
  /**
   * Format a phone number
   * @param {string} phone - The phone number to format
   * @returns {string} Formatted phone number
   */
  export const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format based on length
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    
    // Return original if can't format
    return phone;
  };
  
  /**
   * Truncate text if it exceeds maximum length
   * @param {string} text - The text to truncate
   * @param {number} maxLength - Maximum length before truncating
   * @returns {string} Truncated text
   */
  export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    
    return text.slice(0, maxLength) + '...';
  };
  
  /**
   * Format file size
   * @param {number} bytes - Size in bytes
   * @returns {string} Formatted file size
   */
  export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };