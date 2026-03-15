"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-400 mb-8">
          An unexpected error occurred. Please try again or return to the
          homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#ff6b35] text-white font-semibold rounded-lg hover:bg-[#e55a2b] transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:border-gray-500 hover:text-white transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
