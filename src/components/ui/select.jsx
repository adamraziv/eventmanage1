import React from 'react';

export const Select = ({ children, className, ...props }) => (
  <select className={`px-3 py-2 border border-gray-300 rounded-md ${className}`} {...props}>
    {children}
  </select>
);