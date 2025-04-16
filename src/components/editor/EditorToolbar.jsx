import React from 'react';
import Button from '../common/Button';
import FormatMenu from './FormatMenu';

/**
 * EditorToolbar component for the editor interface
 * Combines various UI elements for document editing
 */
const EditorToolbar = ({ 
  onAddBlock, 
  onSave, 
  onPreview, 
  onExport,
  isSaving = false,
  formatOptions = [],
  onFormatSelect,
  blockTypeOptions = [],
  onBlockTypeSelect
}) => {
  // Icons for the toolbar buttons
  const AddIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
  
  const PreviewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
  
  const ExportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  );

  return (
    <div className="bg-white border border-slate-200 rounded-nf p-3 mb-4 shadow-nf-sm flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button 
          variant="primary" 
          size="small"
          onClick={onAddBlock}
          icon={<AddIcon />}
        >
          Add Block
        </Button>
        
        <div className="h-6 w-px bg-slate-200 mx-2" />
        
        <FormatMenu 
          options={blockTypeOptions}
          onSelect={onBlockTypeSelect}
          label="Block Type"
        />
        
        <FormatMenu 
          options={formatOptions}
          onSelect={onFormatSelect}
          label="Format"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="secondary" 
          size="small"
          onClick={onPreview}
          icon={<PreviewIcon />}
        >
          Preview
        </Button>
        
        <Button 
          variant="secondary" 
          size="small"
          onClick={onExport}
          icon={<ExportIcon />}
        >
          Export
        </Button>
        
        <Button 
          variant="primary" 
          size="small"
          onClick={onSave}
          isLoading={isSaving}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar; 