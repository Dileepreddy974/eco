import React from 'react';

const Input = ({ className, variant, ...props }) => {
  const baseClasses = "clay-card px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200";
  
  const variantClasses = {
    default: "",
    error: "border-red-500 focus:ring-red-500",
    success: "border-green-500 focus:ring-green-500"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className || ''}`;
  
  return (
    <input 
      className={classes}
      {...props}
    />
  );
};

export { Input };