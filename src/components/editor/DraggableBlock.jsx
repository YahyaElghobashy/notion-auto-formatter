import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import BlockContextMenu from './BlockContextMenu';

/**
 * DraggableBlock component for block manipulation
 * Uses Framer Motion for fluid animations and drag & drop
 */
const DraggableBlock = ({ 
  id, 
  children, 
  onReorder,
  onDuplicate,
  onDelete,
  onAddAfter,
  isFirst = false,
  isLast = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const y = useMotionValue(0);
  const scale = useTransform(y, [-100, 0, 100], [0.95, 1, 0.95]);
  const boxShadow = useTransform(
    y,
    [-100, 0, 100],
    [
      '0 -8px 20px rgba(0,0,0,0.1)',
      '0 0 0 rgba(0,0,0,0)',
      '0 8px 20px rgba(0,0,0,0.1)'
    ]
  );
  
  const handleMoveUp = () => {
    onReorder(id, 'up');
  };
  
  const handleMoveDown = () => {
    onReorder(id, 'down');
  };
  
  return (
    <BlockContextMenu
      onDuplicate={() => onDuplicate(id)}
      onDelete={() => onDelete(id)}
      onMoveUp={handleMoveUp}
      onMoveDown={handleMoveDown}
      onAddAfter={() => onAddAfter(id)}
      disableMoveUp={isFirst}
      disableMoveDown={isLast}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: isDragging ? 1.02 : 1,
          boxShadow: isDragging ? '0 10px 25px rgba(0,0,0,0.1)' : '0 0 0 rgba(0,0,0,0)',
          zIndex: isDragging ? 10 : 0
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ 
          type: 'spring', 
          stiffness: 500, 
          damping: 30,
          opacity: { duration: 0.2 }
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        style={{ y, scale, boxShadow }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(e, info) => {
          setIsDragging(false);
          if (Math.abs(info.offset.y) > 50) {
            const direction = info.offset.y > 0 ? 'down' : 'up';
            onReorder(id, direction);
          }
        }}
        className={`bg-white border rounded-nf p-4 mb-3 ${
          isDragging ? 'border-indigo-primary cursor-grabbing' : 'border-slate-200 cursor-grab'
        } hover:border-indigo-light`}
      >
        <div className="group-hover:opacity-100 opacity-0 absolute -left-10 top-1/2 transform -translate-y-1/2 transition-opacity">
          <div className="w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-nf-sm cursor-grab">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </div>
        </div>

        {children}
      </motion.div>
    </BlockContextMenu>
  );
};

export default DraggableBlock; 