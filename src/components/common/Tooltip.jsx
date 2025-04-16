import React, { useState, useRef, useEffect } from 'react';

/**
 * Tooltip component for displaying additional information on hover
 * @param {Object} props - Component props
 * @returns {JSX.Element} Tooltip component
 */
const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 300,
  className = '',
  maxWidth = '200px',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);
  
  const showTooltip = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };
  
  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };
  
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  
  // Set position styles based on the position prop
  const positionStyles = {
    top: {
      tooltip: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      arrow: 'top-full left-1/2 transform -translate-x-1/2 border-t-black',
    },
    bottom: {
      tooltip: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      arrow: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-black',
    },
    left: {
      tooltip: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      arrow: 'left-full top-1/2 transform -translate-y-1/2 border-l-black',
    },
    right: {
      tooltip: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
      arrow: 'right-full top-1/2 transform -translate-y-1/2 border-r-black',
    },
  };
  
  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      ref={tooltipRef}
    >
      {children}
      
      {isVisible && (
        <div
          className={`absolute z-50 ${positionStyles[position].tooltip}`}
          style={{ maxWidth }}
        >
          <div className="bg-black text-white text-sm rounded py-1 px-2 whitespace-normal">
            {content}
          </div>
          <div
            className={`absolute w-0 h-0 border-4 border-transparent ${positionStyles[position].arrow}`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip; 