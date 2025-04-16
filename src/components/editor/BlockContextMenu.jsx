import React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BlockContextMenu component for block operations
 * Using Radix UI for accessibility and Framer Motion for animations
 */
const BlockContextMenu = ({ 
  children, 
  onDuplicate, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  onAddAfter,
  disableMoveUp = false,
  disableMoveDown = false
}) => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="block w-full">
        {/* This wraps around the actual block component */}
        <div className="group relative hover:bg-slate-50 rounded-nf transition-colors duration-150">
          {children}
        </div>
      </ContextMenu.Trigger>
      
      <AnimatePresence>
        <ContextMenu.Portal>
          <ContextMenu.Content
            className="min-w-[220px] bg-white rounded-nf p-1 shadow-nf-lg border border-slate-200 z-50"
            asChild
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <ContextMenu.Item
                className="flex items-center px-2 py-2 text-sm text-slate-primary hover:bg-indigo-primary 
                          hover:text-white rounded-nf cursor-pointer outline-none"
                onSelect={onDuplicate}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Duplicate
              </ContextMenu.Item>
              
              <ContextMenu.Item
                className={`flex items-center px-2 py-2 text-sm 
                          ${disableMoveUp 
                            ? 'text-slate-300 cursor-not-allowed' 
                            : 'text-slate-primary hover:bg-indigo-primary hover:text-white cursor-pointer'} 
                          rounded-nf outline-none`}
                onSelect={disableMoveUp ? undefined : onMoveUp}
                disabled={disableMoveUp}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Move Up
              </ContextMenu.Item>
              
              <ContextMenu.Item
                className={`flex items-center px-2 py-2 text-sm 
                          ${disableMoveDown 
                            ? 'text-slate-300 cursor-not-allowed' 
                            : 'text-slate-primary hover:bg-indigo-primary hover:text-white cursor-pointer'} 
                          rounded-nf outline-none`}
                onSelect={disableMoveDown ? undefined : onMoveDown}
                disabled={disableMoveDown}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Move Down
              </ContextMenu.Item>
              
              <ContextMenu.Item
                className="flex items-center px-2 py-2 text-sm text-slate-primary hover:bg-indigo-primary 
                          hover:text-white rounded-nf cursor-pointer outline-none"
                onSelect={onAddAfter}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Below
              </ContextMenu.Item>
              
              <ContextMenu.Separator className="h-px my-1 bg-slate-200" />
              
              <ContextMenu.Item
                className="flex items-center px-2 py-2 text-sm text-coral-primary hover:bg-coral-primary 
                          hover:text-white rounded-nf cursor-pointer outline-none"
                onSelect={onDelete}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </ContextMenu.Item>
            </motion.div>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </AnimatePresence>
    </ContextMenu.Root>
  );
};

export default BlockContextMenu; 