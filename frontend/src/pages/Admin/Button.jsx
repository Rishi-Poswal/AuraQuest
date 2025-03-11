// Button.jsx
import React from 'react';

export const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
