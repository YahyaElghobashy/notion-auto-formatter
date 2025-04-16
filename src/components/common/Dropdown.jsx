import React, { useRef, useState, useEffect } from 'react';

/**
 * Dropdown component for selecting from a list of options
 * @param {Object} props - Component props
 * @returns {JSX.Element} Dropdown component
 */
const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  label,
  error,
  fullWidth = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const selectedOption = options.find(option => option.value === value);
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);
  
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  
  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <div className={`relative ${widthClass} ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div
        className={`${widthClass} ${disabledClass} flex items-center justify-between px-4 py-2 border rounded-md bg-white ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${
          isOpen ? 'ring-2 ring-primary-500 border-primary-500' : ''
        }`}
        onClick={handleToggle}
      >
        <span className={`block truncate ${!selectedOption ? 'text-gray-500' : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      
      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  option.value === value ? 'bg-primary-50 text-primary-700' : 'text-gray-900'
                }`}
              >
                {option.label}
              </li>
            ))}
            {options.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-500">No options available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown; 