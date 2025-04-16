import React, { useEffect, useState } from 'react';
import { useNotion } from '../../contexts/NotionContext';
import Dropdown from '../common/Dropdown';
import Button from '../common/Button';

/**
 * WorkspaceSelector component for selecting a Notion workspace
 * @returns {JSX.Element} WorkspaceSelector component
 */
const WorkspaceSelector = () => {
  const { 
    isConnected, 
    loading, 
    error, 
    workspaces, 
    selectedWorkspace, 
    fetchWorkspaces, 
    selectWorkspace 
  } = useNotion();
  
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (isConnected && workspaces.length === 0) {
      loadWorkspaces();
    }
  }, [isConnected, workspaces.length]);
  
  const loadWorkspaces = async () => {
    setIsLoading(true);
    await fetchWorkspaces();
    setIsLoading(false);
  };
  
  const handleWorkspaceChange = (workspaceId) => {
    const workspace = workspaces.find(ws => ws.id === workspaceId);
    if (workspace) {
      selectWorkspace(workspace);
    }
  };
  
  if (!isConnected) {
    return (
      <div className="p-4 bg-gray-50 rounded-md text-gray-500 text-center">
        Connect to Notion to select a workspace
      </div>
    );
  }
  
  // Convert workspaces to dropdown options
  const workspaceOptions = workspaces.map(workspace => ({
    value: workspace.id,
    label: workspace.name || 'Unnamed Workspace',
  }));
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Notion Workspace</h3>
        <Button 
          variant="outline" 
          size="small" 
          onClick={loadWorkspaces} 
          disabled={isLoading || loading}
        >
          Refresh
        </Button>
      </div>
      
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
          <span className="ml-2">Loading workspaces...</span>
        </div>
      ) : (
        <>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          
          {workspaceOptions.length === 0 ? (
            <div className="p-4 bg-gray-50 rounded-md text-gray-500 text-center">
              No workspaces found
            </div>
          ) : (
            <Dropdown
              options={workspaceOptions}
              value={selectedWorkspace?.id}
              onChange={handleWorkspaceChange}
              placeholder="Select a workspace"
              fullWidth
            />
          )}
        </>
      )}
    </div>
  );
};

export default WorkspaceSelector; 