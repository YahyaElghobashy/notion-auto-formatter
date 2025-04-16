import React, { useState } from 'react';
import { useNotion } from '../../contexts/NotionContext';
import Button from '../common/Button';
import Modal from '../common/Modal';

/**
 * PageCreator component for creating new Notion pages
 * @returns {JSX.Element} PageCreator component
 */
const PageCreator = ({ onPageCreated }) => {
  const { 
    isConnected, 
    loading, 
    error, 
    selectedWorkspace, 
    selectedPage,
    createNewPage 
  } = useNotion();
  
  const [showModal, setShowModal] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  
  const openModal = () => {
    setShowModal(true);
    setPageTitle('');
    setCreateError('');
  };
  
  const closeModal = () => {
    setShowModal(false);
    setPageTitle('');
    setCreateError('');
  };
  
  const handleCreatePage = async () => {
    if (!pageTitle.trim()) {
      setCreateError('Page title is required');
      return;
    }
    
    setIsCreating(true);
    setCreateError('');
    
    try {
      // Create page as a subpage of the selected page or workspace
      const parentId = selectedPage?.id;
      
      if (!parentId) {
        setCreateError('No parent page selected');
        setIsCreating(false);
        return;
      }
      
      const newPage = await createNewPage(pageTitle, parentId);
      
      if (newPage) {
        closeModal();
        if (onPageCreated) onPageCreated(newPage);
      } else {
        setCreateError('Failed to create page');
      }
    } catch (err) {
      console.error('Error creating page:', err);
      setCreateError(err.message || 'An error occurred while creating the page');
    } finally {
      setIsCreating(false);
    }
  };
  
  if (!isConnected || !selectedWorkspace) {
    return null;
  }
  
  return (
    <>
      <Button 
        onClick={openModal} 
        variant="outline"
        disabled={!selectedPage}
      >
        Create New Page
      </Button>
      
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title="Create New Notion Page"
        footer={
          <Modal.Footer
            onCancel={closeModal}
            onConfirm={handleCreatePage}
            confirmText="Create"
            confirmDisabled={!pageTitle.trim() || isCreating || loading}
          />
        }
      >
        <div className="space-y-4">
          <p>
            Create a new page as a subpage of the currently selected page.
          </p>
          
          <div>
            <label htmlFor="page-title" className="block text-sm font-medium text-gray-700 mb-1">
              Page Title
            </label>
            <input
              id="page-title"
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter page title"
              disabled={isCreating || loading}
            />
            {createError && <p className="mt-1 text-sm text-red-600">{createError}</p>}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
          
          <div className="text-sm text-gray-600">
            <p>
              Parent page: <span className="font-medium">{selectedPage ? getPageTitle(selectedPage) : 'None selected'}</span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

/**
 * Extract title from Notion page object
 * @param {Object} page - Notion page object
 * @returns {string} Page title
 */
const getPageTitle = (page) => {
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
  return title || 'Untitled Page';
};

export default PageCreator; 