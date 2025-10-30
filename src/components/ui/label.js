import React from 'react';

const Label = ({ children, className, required, ...props }) => {
  return (
    <label 
      className={`block text-sm font-medium text-gray-700 mb-1 ${className || ''}`}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export { Label };