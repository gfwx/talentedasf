"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-40 z-50 backdrop-blur-sm">
      <div className="dark:bg-gray-800 p-6 rounded-lg flex flex-col items-center">
        <div className="flex space-x-2 justify-center items-center">
          <div className="h-4 w-4 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-4 w-4 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-4 w-4 bg-primary rounded-full animate-bounce"></div>
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    </div>
  );
}
