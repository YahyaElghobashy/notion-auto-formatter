import React, { useEffect, useState } from 'react';
import { useNotion } from '../../contexts/NotionContext';
import Dropdown from '../common/Dropdown';
import Button from '../common/Button';

/**
 * PageSelector component for selecting a Notion page
 * @returns {JSX.Element} PageSelector component
 */
const PageSelector = () => {
  const { 
    isConnected, 
    loading, 
    error, 
    pages, 
    selectedWorkspace, 
    selectedPage, 
    fetchPages, 
    selectPage 
  } = useNotion();
  
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    if (isConnected && selectedWorkspace && pages.length === 0) {
      loadPages();
    }
  }, [isConnected, selectedWorkspace, pages.length]);
  
  const loadPages = async () => {
    if (!selectedWorkspace) return;
    
    setIsLoading(true);
    await fetchPages(searchQuery);
    setIsLoading(false);
  };
  
  const handleSearch = async (e) => {
    e.preventDefault();
    await loadPages();
  };
  
  const handlePageChange = (pageId) => {
    const page = pages.find(p => p.id === pageId);
    if (page) {
      selectPage(page);
    }
  };
  
  if (!isConnected) {
    return (
      <div className="p-4 bg-gray-50 rounded-md text-gray-500 text-center">
        Connect to Notion to select a page
      </div>
    );
  }
  
  if (!selectedWorkspace) {
    return (
      <div className="p-4 bg-gray-50 rounded-md text-gray-500 text-center">
        Select a workspace first
      </div>
    );
  }
  
  // Convert pages to dropdown options
  const pageOptions = pages.map(page => {
    // Extract title from properties
    let title = 'Untitled';
    try {
      if (page.properties && page.properties.title) {
        const titleContent = page.properties.title.title;
        if (titleContent && titleContent.length > 0) {
          title = titleContent.map(t => t.plain_text || t.text?.content || '').join('');
        }
      }
    } catch (err) {
      console.error('Error parsing page title:', err);
    }
    
    return {
      value: page.id,
      label: title || 'Untitled Page',
    };
  });
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Notion Page</h3>
        <Button 
          variant="outline" 
          size="small" 
          onClick={loadPages} 
          disabled={isLoading || loading}
        >
          Refresh
        </Button>
      </div>
      
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search pages..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          disabled={isLoading || loading}
        />
        <Button 
          type="submit" 
          variant="secondary" 
          disabled={isLoading || loading}
        >
          Search
        </Button>
      </form>
      
      {isLoading || loading ? (
        <div className="flex items-center justify-center py-4">
          <svg 
            className="animate-spin h-5 w-5 text-primary-600" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="ml-2">Loading pages...</span>
        </div>
      ) : (
        <>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          
          {pageOptions.length === 0 ? (
            <div className="p-4 bg-gray-50 rounded-md text-gray-500 text-center">
              No pages found. Try adjusting your search or selecting a different workspace.
            </div>
          ) : (
            <Dropdown
              options={pageOptions}
              value={selectedPage?.id}
              onChange={handlePageChange}
              placeholder="Select a page"
              fullWidth
            />
          )}
        </>
      )}
    </div>
  );
};

export default PageSelector; 