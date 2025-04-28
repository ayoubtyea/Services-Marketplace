// utils/errorHandlers.js
exports.handleEmptyCollection = async (promise, defaultValue = []) => {
    try {
      const result = await promise;
      return result || defaultValue;
    } catch (error) {
      console.error('Database operation error:', error);
      return defaultValue;
    }
  };