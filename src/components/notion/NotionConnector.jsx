import React, { useState } from 'react';
import { useNotion } from '../../contexts/NotionContext';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Tooltip from '../common/Tooltip';

/**
 * NotionConnector component for managing Notion API connection and profiles
 * @returns {JSX.Element} NotionConnector component
 */
const NotionConnector = () => {
  const {
    isConnected,
    connectToNotion,
    loading,
    error,
    profiles,
    selectedProfile,
    addOrUpdateProfile,
    selectProfile,
    deleteProfile,
    disconnect
  } = useNotion();

  const [showModal, setShowModal] = useState(false);
  const [integrationKey, setIntegrationKey] = useState('');
  const [profileName, setProfileName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);
  
  const handleConnect = async () => {
    if (!profileName.trim()) {
      // Use the key itself as profile name if none provided
      setProfileName(integrationKey.slice(0, 8) + '...');
    }
    
    const success = await addOrUpdateProfile(profileName.trim() || `Profile ${profiles.length + 1}`, integrationKey);
    if (success) {
      setShowModal(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setIntegrationKey('');
    setProfileName('');
  };
  
  const openModal = () => {
    setShowModal(true);
    resetForm();
  };
  
  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleDeleteClick = (profile) => {
    setProfileToDelete(profile);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (profileToDelete) {
      deleteProfile(profileToDelete.name);
    }
    setShowDeleteConfirm(false);
    setProfileToDelete(null);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        {isConnected ? (
          <div className="flex items-center space-x-2">
            <span className="text-green-600 flex items-center">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Connected as {selectedProfile?.name}
            </span>
            <Button
              variant="outline"
              size="small"
              onClick={() => disconnect()}
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <Tooltip content="Connect to Notion to enable export functionality">
            <Button onClick={openModal}>Connect to Notion</Button>
          </Tooltip>
        )}
      </div>

      {profiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Saved Profiles</h3>
          <div className="space-y-2">
            {profiles.map((profile) => (
              <div
                key={profile.name}
                className={`flex items-center justify-between p-2 rounded-md ${
                  selectedProfile?.name === profile.name
                    ? 'bg-primary-50 border border-primary-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-sm font-medium">{profile.name}</span>
                <div className="flex items-center space-x-2">
                  {selectedProfile?.name !== profile.name && (
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => selectProfile(profile.name)}
                    >
                      Select
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDeleteClick(profile)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title="Connect to Notion"
        footer={
          <Modal.Footer
            onCancel={closeModal}
            onConfirm={handleConnect}
            confirmText="Connect"
            confirmDisabled={!integrationKey || loading}
          />
        }
      >
        <div className="space-y-4">
          <p>
            Enter your Notion integration key and a profile name to save your connection.
          </p>
          
          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-1">
              Profile Name (optional)
            </label>
            <input
              id="profile-name"
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="My Notion Profile"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="integration-key" className="block text-sm font-medium text-gray-700 mb-1">
              Integration Key
            </label>
            <input
              id="integration-key"
              type="text"
              value={integrationKey}
              onChange={(e) => setIntegrationKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="ntn_xxxxxxxxxxxxxxxxxxxxxxx"
              disabled={loading}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
          
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">How to get your integration key:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Go to <a href="https://www.notion.so/my-integrations" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Notion Integrations</a></li>
              <li>Click "Create new integration"</li>
              <li>Name your integration and select the workspace</li>
              <li>Copy the "Internal Integration Secret" value</li>
              <li>Paste it in the field above</li>
            </ol>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete Profile"
        footer={
          <Modal.Footer
            onCancel={() => setShowDeleteConfirm(false)}
            onConfirm={handleConfirmDelete}
            confirmText="Delete"
            confirmVariant="danger"
          />
        }
      >
        <p>
          Are you sure you want to delete the profile "{profileToDelete?.name}"? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default NotionConnector; 