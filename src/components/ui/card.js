import React from 'react';

const Card = ({ children, className, variant, ...props }) => {
  const baseClasses = "clay-card rounded-2xl";
  
  const variantClasses = {
    default: "p-6",
    compact: "p-4",
    spacious: "p-8"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className || ''}`;
  
  return (
    <div 
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div 
      className={`mb-4 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 
      className={`text-xl font-bold text-gray-800 ${className || ''}`}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardContent = ({ children, className, ...props }) => {
  return (
    <div 
      className={`${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent };