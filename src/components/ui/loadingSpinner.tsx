// import React from "react";

// const LoadingSpinner: React.FC = () => (
//     <h1 className="text-center text-gray-500 text-xl">
//       Loading...
//     </h1>
//   );
//   export default LoadingSpinner;
  // components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;