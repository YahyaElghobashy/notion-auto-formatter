import axios from 'axios';
import { config } from '../config';
import { getAuthHeaders } from './auth';
import { applyRateLimit, handleApiError, parseApiResponse, retry } from './utils';

// Create Axios instance for Notion API
const notionApi = axios.create({
  baseURL: config.notion.baseUrl,
});

// Add request interceptor for rate limiting and authentication
notionApi.interceptors.request.use(async (config) => {
  // Apply rate limiting before making the request
  await applyRateLimit();
  
  // Add authentication headers
  const headers = getAuthHeaders();
  config.headers = {
    ...config.headers,
    ...headers,
  };
  
  return config;
});

/**
 * Get current user and their workspaces
 * @returns {Promise<Object>} User data including workspaces
 */
export const getCurrentUser = async () => {
  try {
    const response = await retry(() => notionApi.get('/users/me'));
    return parseApiResponse(response.data);
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch current user');
  }
};

/**
 * Search for pages and databases
 * @param {Object} params - Search parameters
 * @returns {Promise<Object>} Search results
 */
export const searchNotionPages = async (params = {}) => {
  try {
    const response = await retry(() => notionApi.post('/search', params));
    return parseApiResponse(response.data);
  } catch (error) {
    throw handleApiError(error, 'Failed to search Notion pages');
  }
};

/**
 * Get a page by ID
 * @param {string} pageId - Notion page ID
 * @returns {Promise<Object>} Page data
 */
export const getPage = async (pageId) => {
  try {
    const response = await retry(() => notionApi.get(`/pages/${pageId}`));
    return parseApiResponse(response.data);
  } catch (error) {
    throw handleApiError(error, `Failed to fetch page ${pageId}`);
  }
};

/**
 * Create a new page
 * @param {Object} params - Page creation parameters
 * @returns {Promise<Object>} Created page data
 */
export const createPage = async (params) => {
  try {
    const response = await retry(() => notionApi.post('/pages', params));
    return parseApiResponse(response.data);
  } catch (error) {
    throw handleApiError(error, 'Failed to create page');
  }
};

/**
 * Update a page
 * @param {string} pageId - Notion page ID
 * @param {Object} params - Update parameters
 * @returns {Promise<Object>} Updated page data
 */
export const updatePage = async (pageId, params) => {
  try {
    const response = await retry(() => notionApi.patch(`/pages/${pageId}`, params));
    return parseApiResponse(response.data);
  } catch (error) {
    throw handleApiError(error, `Failed to update page ${pageId}`);
  }
};

/**
 * Get block children
 * @param {string} blockId - Block ID (can be a page ID)
 * @param {Object} params - Additional parameters like pagination
 * @returns {Promise<Object>} Block children data
 */
export const getBlockChildren = async (blockId, params = {}) => {
  try {
    const response = await retry(() => 
      notionApi.get(`/blocks/${blockId}/children`, { params })
    );
    return parseApiResponse(response.data);
  } catch (error) {
    throw handleApiError(error, `Failed to fetch children of block ${blockId}`);
  }
};

/**
 * Append blocks to a block
 * @param {string} blockId - Block ID (can be a page ID)
 * @param {Array} children - Array of block objects to append
 * @returns {Promise<Object>} Updated block data
 */
export const appendBlockChildren = async (blockId, children) => {
  try {
    const response = await retry(() => 
      notionApi.patch(`/blocks/${blockId}/children`, {
        children
      })
    );
    return parseApiResponse(response.data);
  } catch (error) {
    throw handleApiError(error, `Failed to append blocks to ${blockId}`);
  }
};

/**
 * Delete a block
 * @param {string} blockId - Block ID to delete
 * @returns {Promise<Object>} Deleted block data
 */
export const deleteBlock = async (blockId) => {
  try {
    const response = await retry(() => notionApi.delete(`/blocks/${blockId}`));
    return parseApiResponse(response.data);
  } catch (error) {
    throw handleApiError(error, `Failed to delete block ${blockId}`);
  }
};

/**
 * Export content to a Notion page
 * @param {string} pageId - Target page ID
 * @param {Array} blocks - Array of blocks to export
 * @returns {Promise<Object>} Result of the export operation
 */
export const exportToNotion = async (pageId, blocks) => {
  try {
    // First clear the page content by getting and deleting all blocks
    const existingContent = await getBlockChildren(pageId);
    
    if (existingContent && existingContent.data) {
      // Delete existing blocks in parallel with a limit
      const deletePromises = existingContent.data.map(block => 
        deleteBlock(block.id)
      );
      await Promise.all(deletePromises);
    }
    
    // Then append the new blocks
    return await appendBlockChildren(pageId, blocks);
  } catch (error) {
    throw handleApiError(error, `Failed to export content to page ${pageId}`);
  }
}; 