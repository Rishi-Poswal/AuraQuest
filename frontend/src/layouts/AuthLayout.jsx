import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-800">
       <style>
        {`
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: #1a202c;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #4a5568;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #718096;
          }
        `}
      </style>
      <div className="w-full max-w-lg overflow-y-auto p-6 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;


// src/components/AuthLayout.js
// import React from 'react';

// const AuthLayout = ({ children }) => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;
