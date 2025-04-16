import { useState, useCallback } from 'react';
import * as notionApi from '../api/notion';
import { hasValidIntegrationKey, storeIntegrationKey } from '../api/auth';

/**
 * Hook for interacting with the Notion API
 * @returns {Object} Notion API methods and state
 */
export const useNotionAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  /**
   * Set the integration key for the Notion API
   * @param {string} key - The integration key
   * @returns {boolean} Whether the key was set successfully
   */
  const setIntegrationKey = useCallback((key) => {
    if (!key) {
      setError('Integration key is required');
      return false;
    }
    
    try {
      storeIntegrationKey(key);
      return true;
    } catch (err) {
      setError('Failed to store integration key');
      return false;
    }
  }, []);
  
  /**
   * Check if the integration key is valid
   * @returns {boolean} Whether the integration key is valid
   */
  const isConfigured = useCallback(() => {
    return hasValidIntegrationKey();
  }, []);
  
  /**
   * Fetch the current user and their workspaces
   * @returns {Promise<Object>} User data
   */
  const fetchCurrentUser = useCallback(async () => {
    if (!isConfigured()) {
      setError('Notion API is not configured with a valid integration key');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await notionApi.getCurrentUser();
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch current user');
      return null;
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);
  
  /**
   * Search for pages in Notion
   * @param {Object} params - Search parameters
   * @returns {Promise<Object>} Search results
   */
  const searchPages = useCallback(async (params = {}) => {
    if (!isConfigured()) {
      setError('Notion API is not configured with a valid integration key');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await notionApi.searchNotionPages(params);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to search pages');
      return null;
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);
  
  /**
   * Get a page by ID
   * @param {string} pageId - Page ID
   * @returns {Promise<Object>} Page data
   */
  const getPage = useCallback(async (pageId) => {
    if (!pageId) {
      setError('Page ID is required');
      return null;
    }
    
    if (!isConfigured()) {
      setError('Notion API is not configured with a valid integration key');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await notionApi.getPage(pageId);
      return result;
    } catch (err) {
      setError(err.message || `Failed to get page ${pageId}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);
  
  /**
   * Create a new page
   * @param {Object} pageData - Page data
   * @returns {Promise<Object>} Created page
   */
  const createPage = useCallback(async (pageData) => {
    if (!pageData || !pageData.parent) {
      setError('Page data with parent is required');
      return null;
    }
    
    if (!isConfigured()) {
      setError('Notion API is not configured with a valid integration key');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await notionApi.createPage(pageData);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to create page');
      return null;
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);
  
  /**
   * Export formatted content to a Notion page
   * @param {string} pageId - Target page ID
   * @param {Array} blocks - Array of formatted blocks
   * @returns {Promise<Object>} Export result
   */
  const exportContent = useCallback(async (pageId, blocks) => {
    if (!pageId) {
      setError('Page ID is required');
      return null;
    }
    
    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
      setError('Blocks are required for export');
      return null;
    }
    
    if (!isConfigured()) {
      setError('Notion API is not configured with a valid integration key');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await notionApi.exportToNotion(pageId, blocks);
      return result;
    } catch (err) {
      setError(err.message || `Failed to export content to page ${pageId}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);
  
  /**
   * Get the children blocks of a block (including page)
   * @param {string} blockId - Block ID
   * @returns {Promise<Object>} Block children
   */
  const getBlockChildren = useCallback(async (blockId) => {
    if (!blockId) {
      setError('Block ID is required');
      return null;
    }
    
    if (!isConfigured()) {
      setError('Notion API is not configured with a valid integration key');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await notionApi.getBlockChildren(blockId);
      return result;
    } catch (err) {
      setError(err.message || `Failed to get children of block ${blockId}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);
  
  return {
    loading,
    error,
    setIntegrationKey,
    isConfigured,
    fetchCurrentUser,
    searchPages,
    getPage,
    createPage,
    exportContent,
    getBlockChildren,
  };
}; 