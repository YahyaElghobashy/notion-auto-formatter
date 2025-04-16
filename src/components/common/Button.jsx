import React from 'react';

/**
 * Button component for NotionFlex UI
 * @param {Object} props - Component props
 * @returns {JSX.Element} Button component
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  type = 'button',
  fullWidth = false,
  className = '',
  isLoading = false,
  icon = null,
  ...rest 
}) => {
  const variantClasses = {
    primary: 'bg-indigo-primary hover:bg-indigo-dark text-white border-transparent',
    secondary: 'bg-white hover:bg-slate-50 text-slate-primary border border-slate-200',
    outline: 'bg-transparent border border-indigo-primary text-indigo-primary hover:bg-indigo-light/10',
    danger: 'bg-coral-primary hover:bg-coral-dark text-white border-transparent',
    success: 'bg-mint-dark hover:bg-mint-dark/90 text-white border-transparent',
  };
  
  const sizeClasses = {
    small: 'py-1 px-3 text-sm',
    medium: 'py-2 px-4',
    large: 'py-2.5 px-5 text-base',
  };
  
  const baseClasses = 'rounded-nf font-medium transition-colors duration-200 shadow-nf-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-light';
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClass}
    ${disabledClass}
    ${className}
  `;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button; 