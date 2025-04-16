import { config } from '../config';

/**
 * Get authentication headers for Notion API requests
 * @returns {Object} Headers object with authentication token
 */
export const getAuthHeaders = () => {
  return {
    'Authorization': `Bearer ${config.notion.integrationKey}`,
    'Content-Type': 'application/json',
    'Notion-Version': config.notion.apiVersion
  };
};

/**
 * Check if the integration key is valid
 * @returns {boolean} Whether the integration key is present
 */
export const hasValidIntegrationKey = () => {
  return !!config.notion.integrationKey;
};

/**
 * Store integration key in localStorage (for development purposes only)
 * In production, this should be securely stored
 * @param {string} key - The Notion integration key
 */
export const storeIntegrationKey = (key) => {
  localStorage.setItem('notion_integration_key', key);
};

/**
 * Retrieve integration key from localStorage
 * @returns {string|null} The stored integration key or null
 */
export const retrieveIntegrationKey = () => {
  return localStorage.getItem('notion_integration_key');
};

/**
 * Clear stored integration key
 */
export const clearIntegrationKey = () => {
  localStorage.removeItem('notion_integration_key');
}; 