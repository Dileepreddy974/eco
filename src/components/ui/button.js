import React from 'react';

const Button = ({ children, className, variant, size, ...props }) => {
  const baseClasses = "clay-button font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 rounded-lg",
    lg: "px-6 py-3 rounded-xl text-lg"
  };
  
  const variantClasses = {
    default: "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-md hover:shadow-lg",
    outline: "border-2 border-green-500 text-green-600 hover:bg-green-50 shadow-sm",
    secondary: "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 shadow-md hover:shadow-lg",
    ghost: "text-gray-700 hover:bg-gray-100"
  };
  
  const classes = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.default} ${className || ''}`;
  
  return (
    <button 
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };