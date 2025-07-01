import React from "react";

export const SocialLoader = () => {
  return (
    <div
      role="status"
      className="hidden lg:flex animate-pulse w-full h-full items-center flex-col"
    >
      <div className="h-10 w-full flex items-center space-x-4 justify-end">
        <div className="h-4 w-4 bg-gray-300 rounded-full" />
        <div className="h-4 w-4 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};
