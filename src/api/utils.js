/**
 * API utility functions for Notion API
 */

// Track API request timestamps for rate limiting
let requestTimestamps = [];
const MAX_REQUESTS_PER_SECOND = 3;
const RATE_LIMIT_WINDOW_MS = 1000;

/**
 * Handles API errors by parsing the response and formatting error messages
 * @param {Error} error - The caught error
 * @param {string} defaultMessage - Default message to show if error can't be parsed
 * @returns {Object} Formatted error object
 */
export const handleApiError = (error, defaultMessage = 'An error occurred with the Notion API') => {
  const errorResponse = {
    message: defaultMessage,
    status: error.status || 500,
    details: null
  };

  try {
    if (error.response) {
      // Error with response from API
      const data = error.response.data || error.response;
      errorResponse.message = data.message || errorResponse.message;
      errorResponse.status = error.response.status || errorResponse.status;
      errorResponse.details = data;
    } else if (error.request) {
      // Request made but no response received
      errorResponse.message = 'No response received from Notion API';
      errorResponse.details = { request: error.request };
    }
  } catch (parseError) {
    // Error parsing the error itself
    console.error('Error parsing API error:', parseError);
  }

  return errorResponse;
};

/**
 * Rate limiter utility to throttle API requests
 * @returns {Promise} Resolves when a request can be made according to rate limits
 */
export const applyRateLimit = async () => {
  const now = Date.now();
  
  // Remove timestamps older than rate limit window
  requestTimestamps = requestTimestamps.filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  
  if (requestTimestamps.length >= MAX_REQUESTS_PER_SECOND) {
    const oldestTimestamp = requestTimestamps[0];
    const delayMs = RATE_LIMIT_WINDOW_MS - (now - oldestTimestamp);
    
    if (delayMs > 0) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      return applyRateLimit(); // Recursively check again after waiting
    }
  }
  
  requestTimestamps.push(Date.now());
  return Promise.resolve();
};

/**
 * Parse Notion API response to standardize data format
 * @param {Object} response - Raw API response data
 * @returns {Object} Cleaned and standardized response data
 */
export const parseApiResponse = (response) => {
  if (!response) return null;
  
  // Handle paginated results
  if (response.results && Array.isArray(response.results)) {
    return {
      data: response.results,
      pagination: {
        hasMore: response.has_more || false,
        nextCursor: response.next_cursor || null
      }
    };
  }
  
  // Handle single object responses
  return { data: response };
};

/**
 * Wait for a specified time (used in retries)
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Resolves after the specified time
 */
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Utility for retrying failed API requests
 * @param {Function} fn - Async function to retry
 * @param {number} retries - Number of retries
 * @param {number} delay - Delay between retries in ms
 * @param {Function} onRetry - Function to call before a retry
 * @returns {Promise} Result of the function or last error
 */
export const retry = async (fn, retries = 3, delay = 1000, onRetry = null) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    if (onRetry) onRetry(error, retries);
    
    await wait(delay);
    return retry(fn, retries - 1, delay * 1.5, onRetry);
  }
}; 