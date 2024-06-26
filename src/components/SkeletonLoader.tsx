import React from "react"; // Import the CSS file for skeleton styles

const SkeletonLoader = () => {
  return (
    <div className="xl:w-[24%] lg:w-[23%] md:w-[32%] w-full border p-4 rounded-[8px] space-y-2 shadow-sm animate-pulse">
      <div className="h-44 bg-gray-300"></div>
      <h1 className="text-lg font-bold bg-gray-300 h-6 w-3/4"></h1>
      <p className="text-sm bg-gray-300 h-4 w-full"></p>
      <p className="text-sm bg-gray-300 h-4 w-full"></p>
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold bg-gray-300 h-6 w-1/4"></p>
        <div className="h-8 w-20 bg-gray-300"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
