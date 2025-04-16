import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';

/**
 * PreviewPanel component for displaying the formatted preview
 * Uses Framer Motion for smooth transitions
 */
const PreviewPanel = ({ 
  isVisible, 
  onClose, 
  content,
  title = 'Preview',
  onExport
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900 bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/2 bg-white shadow-nf-lg z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-nf-sm z-10">
              <h2 className="text-lg font-semibold text-slate-primary">{title}</h2>
              <div className="flex items-center space-x-2">
                {onExport && (
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={onExport}
                  >
                    Export to Notion
                  </Button>
                )}
                
                <Button
                  variant="secondary"
                  size="small"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-white rounded-nf border border-slate-200 p-6 shadow-nf-sm min-h-[60vh] prose prose-slate max-w-none">
                {content}
              </div>
              
              <div className="mt-6 text-center text-sm text-slate-400">
                This is a preview of how your content will appear in Notion
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PreviewPanel; 