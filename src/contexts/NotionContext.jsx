import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNotionAPI } from '../hooks/useNotionAPI';

// LocalStorage keys
const PROFILES_STORAGE_KEY = 'notionflex_profiles';
const LAST_PROFILE_NAME_KEY = 'notionflex_last_profile_name';

// Create the Notion context
const NotionContext = createContext(null);

/**
 * Helper function to load profiles from localStorage
 */
const loadProfiles = () => {
  try {
    const storedProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
    return storedProfiles ? JSON.parse(storedProfiles) : [];
  } catch (error) {
    console.error("Error loading profiles from localStorage:", error);
    return [];
  }
};

/**
 * Helper function to save profiles to localStorage
 */
const saveProfiles = (profiles) => {
  try {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
  } catch (error) {
    console.error("Error saving profiles to localStorage:", error);
  }
};

/**
 * NotionProvider component for managing Notion API state and profiles
 */
export const NotionProvider = ({ children }) => {
  const notionAPI = useNotionAPI();
  const [profiles, setProfiles] = useState(loadProfiles());
  const [selectedProfileName, setSelectedProfileName] = useState(
    localStorage.getItem(LAST_PROFILE_NAME_KEY) || null
  );

  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Internal connect function
  const _connectWithKey = useCallback(async (key) => {
    const keySet = notionAPI.setIntegrationKey(key);
    if (!keySet) {
      setIsConnected(false);
      return false;
    }
    try {
      const userData = await notionAPI.fetchCurrentUser();
      if (userData && userData.data) {
        setIsConnected(true);
        // Fetch workspaces immediately after successful connection
        // Adjust based on how/when you want workspaces fetched
        if (userData.data.results) { // Assuming fetchCurrentUser returns searchable results for workspaces
            setWorkspaces(userData.data.results.filter(r => r.object === 'workspace'));
        }
        return true;
      }
      setIsConnected(false);
      return false;
    } catch (error) {
      console.error('Failed to connect to Notion:', error);
      setIsConnected(false);
      notionAPI.clearError(); // Clear error from failed connection attempt
      throw error; // Re-throw for the caller to handle UI feedback
    }
  }, [notionAPI]);

  // Attempt to connect with the selected profile on initial load
  useEffect(() => {
    const autoConnect = async () => {
      if (selectedProfileName) {
        const profile = profiles.find(p => p.name === selectedProfileName);
        if (profile) {
          try {
            await _connectWithKey(profile.key);
          } catch (error) {
            // Autoconnect failed, maybe key is invalid
            console.warn(`Autoconnect failed for profile '${selectedProfileName}':`, error.message);
            // Optionally deselect profile if key is invalid
            // setSelectedProfileName(null);
            // localStorage.removeItem(LAST_PROFILE_NAME_KEY);
          }
        } else {
          // Selected profile name exists but profile data doesn't - inconsistent state
          setSelectedProfileName(null);
          localStorage.removeItem(LAST_PROFILE_NAME_KEY);
        }
      }
    };
    autoConnect();
  // Only run autoconnect once on mount or when the selected profile name changes programmatically
  // Do not include profiles or _connectWithKey here to avoid loops if profiles/API hook update
  }, [selectedProfileName]);

  /**
   * Add or update a profile
   * @param {string} name - Profile name
   * @param {string} key - Integration key
   * @returns {Promise<boolean>} Whether connection was successful after adding/updating
   */
  const addOrUpdateProfile = async (name, key) => {
    if (!name || !key) {
      notionAPI.setError('Profile name and key cannot be empty.');
      return false;
    }

    notionAPI.clearError();
    let success = false;
    try {
      success = await _connectWithKey(key);
      if (success) {
        const updatedProfiles = profiles.filter(p => p.name !== name);
        const newProfile = { name, key };
        const newProfiles = [...updatedProfiles, newProfile];
        setProfiles(newProfiles); // Update state first
        saveProfiles(newProfiles); // Then save to localStorage
        setSelectedProfileName(name);
        localStorage.setItem(LAST_PROFILE_NAME_KEY, name);
      }
    } catch (error) {
      // Connection failed, don't save profile
      notionAPI.setError(error.message || 'Failed to connect with the provided key.');
      success = false;
    }
    return success;
  };

  /**
   * Select an existing profile to connect with
   * @param {string} name - Profile name
   * @returns {Promise<boolean>} Whether connection was successful
   */
  const selectProfile = async (name) => {
    const profile = profiles.find(p => p.name === name);
    if (!profile) {
      notionAPI.setError('Selected profile not found.');
      return false;
    }

    // If already connected with this profile, do nothing
    if (isConnected && selectedProfileName === name) {
        return true;
    }

    notionAPI.clearError();
    let success = false;
    try {
      success = await _connectWithKey(profile.key);
      if (success) {
        setSelectedProfileName(name);
        localStorage.setItem(LAST_PROFILE_NAME_KEY, name);
      } else {
        // Explicitly handle connection failure during selection
         setIsConnected(false);
         setSelectedProfileName(null); // Clear selection if connection fails
         localStorage.removeItem(LAST_PROFILE_NAME_KEY);
      }
    } catch (error) {
      notionAPI.setError(error.message || `Failed to connect with profile '${name}'.`);
      setIsConnected(false); // Ensure disconnected state if selection fails
      setSelectedProfileName(null); // Clear selection if connection fails
      localStorage.removeItem(LAST_PROFILE_NAME_KEY);
      success = false;
    }
    return success;
  };

  /**
   * Delete a profile
   * @param {string} name - Profile name
   */
  const deleteProfile = (name) => {
    const updatedProfiles = profiles.filter(p => p.name !== name);
    setProfiles(updatedProfiles);
    saveProfiles(updatedProfiles);

    // If the deleted profile was the selected one, disconnect
    if (selectedProfileName === name) {
      disconnect();
    }
  };

  /**
   * Disconnect and clear selected profile
   */
  const disconnect = () => {
    setIsConnected(false);
    notionAPI.setIntegrationKey(null); // Clear key in API hook
    setSelectedProfileName(null);
    localStorage.removeItem(LAST_PROFILE_NAME_KEY);
    // Clear workspace/page selections
    setWorkspaces([]);
    setSelectedWorkspace(null);
    setPages([]);
    setSelectedPage(null);
    notionAPI.clearError();
  };

  // --- Existing functions (modified slightly if needed) ---

  const fetchWorkspaces = useCallback(async () => {
    if (!isConnected) return [];
    try {
      // Assuming fetchCurrentUser provides workspace info or requires a separate call
      // This part might need adjustment based on useNotionAPI implementation
      const userDetails = await notionAPI.fetchCurrentUser(); // Re-fetch or use cached data if available
      if (userDetails && userDetails.data) {
           // Example: Extracting workspace info if available directly
           const workspacesData = Object.values(userDetails.data).filter(item => item?.type === 'workspace');
           setWorkspaces(workspacesData);
           return workspacesData;
      }
      // Fallback or alternative method if workspaces aren't in userDetails
      // const workspacesData = await notionAPI.listWorkspaces(); // Hypothetical API call
      // setWorkspaces(workspacesData);
      // return workspacesData;
      return [];
    } catch (error) {
      console.error('Failed to fetch workspaces:', error);
      disconnect(); // Disconnect if fetching workspaces fails (e.g., token expired)
      return [];
    }
  }, [isConnected, notionAPI]);

  const fetchPages = useCallback(async (query = '') => {
    if (!isConnected) return [];
     try {
      const searchParams = {
        query,
        filter: {
          value: 'page',
          property: 'object'
        },
        sort: {
          direction: 'descending',
          timestamp: 'last_edited_time'
        }
      };
      // Ensure Notion API hook handles pagination if necessary
      const result = await notionAPI.searchPages(searchParams);
      if (result && result.data?.results) {
        setPages(result.data.results);
        return result.data.results;
      }
      setPages([]); // Clear pages if search fails or returns no results
      return [];
    } catch (error) {
      console.error('Failed to fetch pages:', error);
      setPages([]);
      return [];
    }
  }, [isConnected, notionAPI]);

  const selectWorkspace = (workspace) => {
    // Simple selection for now
    setSelectedWorkspace(workspace);
    setPages([]); // Clear pages when workspace changes
    setSelectedPage(null);
  };

  const selectPage = (page) => {
    setSelectedPage(page);
  };

  const createNewPage = useCallback(async (title, parentId, blocks = []) => {
    if (!isConnected || !parentId) return null;
    try {
      const pageData = {
        parent: {
           // Determine if parentId is a page or database ID based on format
          type: parentId.includes('-') ? 'page_id' : 'database_id',
          [parentId.includes('-') ? 'page_id' : 'database_id']: parentId
        },
        properties: {
          // Assumes 'title' is the standard property name for page titles
          title: {
            title: [
              {
                text: {
                  content: title
                }
              }
            ]
          }
        },
        children: blocks // Initial blocks for the page
      };

      const result = await notionAPI.createPage(pageData);
      if (result && result.data) {
        await fetchPages(); // Refresh pages list after creation
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Failed to create page:', error);
      notionAPI.setError(error.message || 'Could not create the page.');
      return null;
    }
  }, [isConnected, notionAPI, fetchPages]);

  const exportToPage = useCallback(async (blocks) => {
    if (!isConnected || !selectedPage) return false;
    try {
      // Assuming export means appending blocks to the selected page
      const result = await notionAPI.appendBlockChildren(selectedPage.id, blocks);
      return !!result; // Check if append was successful
    } catch (error) {
      console.error('Failed to export content:', error);
      notionAPI.setError(error.message || 'Could not export content.');
      return false;
    }
  }, [isConnected, selectedPage, notionAPI]);

  // --- Context Value ---
  const value = {
    isConnected,
    loading: notionAPI.loading,
    error: notionAPI.error,
    profiles, // Expose profiles
    selectedProfileName, // Expose selected profile name
    workspaces,
    selectedWorkspace,
    pages,
    selectedPage,
    addOrUpdateProfile, // New function
    selectProfile, // New function
    deleteProfile, // New function
    disconnect, // New function
    fetchWorkspaces,
    fetchPages,
    selectWorkspace,
    selectPage,
    createNewPage,
    exportToPage,
    // Expose underlying API methods if needed directly
    getPage: notionAPI.getPage,
    getBlockChildren: notionAPI.getBlockChildren,
    clearError: notionAPI.clearError, // Expose clearError
  };

  return (
    <NotionContext.Provider value={value}>
      {children}
    </NotionContext.Provider>
  );
};

/**
 * Hook for using the Notion context
 */
export const useNotion = () => {
  const context = useContext(NotionContext);
  if (!context) {
    throw new Error('useNotion must be used within a NotionProvider');
  }
  return context;
}; 