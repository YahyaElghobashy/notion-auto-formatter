import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotionProvider } from './contexts/NotionContext';
import Layout from './components/common/Layout';
import NotionConnector from './components/notion/NotionConnector';
import WorkspaceSelector from './components/notion/WorkspaceSelector';
import PageSelector from './components/notion/PageSelector';
import EditorToolbar from './components/editor/EditorToolbar';
import PreviewPanel from './components/preview/PreviewPanel';

// Sample data for demo purposes
const sampleFormatOptions = [
  { id: 'bold', label: 'Bold', icon: <span className="font-bold">B</span>, shortcut: '⌘B' },
  { id: 'italic', label: 'Italic', icon: <span className="italic">I</span>, shortcut: '⌘I' },
  { id: 'underline', label: 'Underline', icon: <span className="underline">U</span>, shortcut: '⌘U' },
  { id: 'strikethrough', label: 'Strikethrough', icon: <span className="line-through">S</span> },
  { id: 'code', label: 'Code', icon: <span className="font-mono">{`<>`}</span>, shortcut: '⌘E' },
];

const sampleBlockTypes = [
  { id: 'paragraph', label: 'Paragraph', icon: <span>¶</span> },
  { id: 'heading1', label: 'Heading 1', icon: <span className="font-bold">H1</span> },
  { id: 'heading2', label: 'Heading 2', icon: <span className="font-bold">H2</span> },
  { id: 'heading3', label: 'Heading 3', icon: <span className="font-bold">H3</span> },
  { id: 'bulletList', label: 'Bullet List', icon: <span>•</span> },
  { id: 'numberedList', label: 'Numbered List', icon: <span>1.</span> },
  { id: 'code', label: 'Code Block', icon: <span className="font-mono">{`{}`}</span> },
  { id: 'quote', label: 'Quote', icon: <span>"</span> },
];

const App = () => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = () => {
    setIsSaving(true);
    // Simulating API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };
  
  const handlePreview = () => {
    setIsPreviewVisible(true);
  };
  
  const handleExport = () => {
    console.log('Exporting content to Notion');
  };
  
  const handleAddBlock = () => {
    console.log('Adding a new block');
  };
  
  const handleFormatSelect = (formatId) => {
    console.log('Selected format:', formatId);
  };
  
  const handleBlockTypeSelect = (blockTypeId) => {
    console.log('Selected block type:', blockTypeId);
  };
  
  // Sample preview content
  const previewContent = (
    <div>
      <h1 className="text-3xl font-bold mb-4">Sample Notion Page</h1>
      <p className="mb-4">This is a preview of how your content will look in Notion. NotionFlex helps you create perfectly formatted pages without the hassle of manual formatting.</p>
      <h2 className="text-2xl font-semibold mb-3 mt-6">Key Features</h2>
      <ul className="list-disc pl-5 mb-4 space-y-2">
        <li>Visual editing with real-time preview</li>
        <li>Drag and drop blocks to rearrange</li>
        <li>Direct export to Notion</li>
        <li>Save templates for reuse</li>
      </ul>
      <blockquote className="border-l-4 border-indigo-primary pl-4 italic my-6">
        NotionFlex transforms your content into perfectly formatted Notion pages in seconds, eliminating manual formatting entirely.
      </blockquote>
    </div>
  );

  return (
    <Router>
      <NotionProvider>
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={
                <div>
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-primary mb-2">NotionFlex Editor</h1>
                    <p className="text-slate-light">Create beautifully formatted Notion pages without manual formatting</p>
                  </div>
                  
                  <div className="flex mb-4 items-center space-x-4">
                    <NotionConnector />
                    <div className="w-px h-8 bg-slate-200"></div>
                    <WorkspaceSelector />
                    <div className="w-px h-8 bg-slate-200"></div>
                    <PageSelector />
                  </div>
                  
                  <div className="bg-white rounded-nf shadow-nf-md border border-slate-200 p-6">
                    <EditorToolbar 
                      onAddBlock={handleAddBlock}
                      onSave={handleSave}
                      onPreview={handlePreview}
                      onExport={handleExport}
                      isSaving={isSaving}
                      formatOptions={sampleFormatOptions}
                      onFormatSelect={handleFormatSelect}
                      blockTypeOptions={sampleBlockTypes}
                      onBlockTypeSelect={handleBlockTypeSelect}
                    />
                    
                    <div className="min-h-[400px] bg-slate-50 rounded-nf p-4 border border-dashed border-slate-200 flex items-center justify-center">
                      <div className="text-center text-slate-400">
                        <p className="mb-2">Your editor content will appear here</p>
                        <button 
                          className="text-indigo-primary hover:underline focus:outline-none"
                          onClick={handleAddBlock}
                        >
                          Add your first block
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview Panel */}
                  <PreviewPanel 
                    isVisible={isPreviewVisible}
                    onClose={() => setIsPreviewVisible(false)}
                    onExport={handleExport}
                    content={previewContent}
                  />
                </div>
              } 
            />
            
            <Route path="/templates" element={<div className="text-center py-12">Templates Page Coming Soon</div>} />
            <Route path="/settings" element={<div className="text-center py-12">Settings Page Coming Soon</div>} />
          </Routes>
        </Layout>
      </NotionProvider>
    </Router>
  );
};

export default App; 