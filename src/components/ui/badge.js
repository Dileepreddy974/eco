import React from 'react';

const Badge = ({ children, className, variant, ...props }) => {
  const baseClasses = "inline-flex items-center rounded-full text-sm font-medium";
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1",
    lg: "px-4 py-1.5 text-base"
  };
  
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    secondary: "bg-purple-100 text-purple-800"
  };
  
  const classes = `${baseClasses} ${sizeClasses.md} ${variantClasses[variant] || variantClasses.default} ${className || ''}`;
  
  return (
    <span 
      className={classes}
      {...props}
    >
      {children}
    </span>
  );
};

export { Badge };