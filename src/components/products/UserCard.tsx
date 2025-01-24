import React from 'react';

const UserCard: React.FC = () => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-md">
      <div className="relative h-40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 540 450"
          fill="none"
        >
          <defs>
            <linearGradient id="a" x1="0" x2="0" y1="0" y2="100%" gradientTransform="rotate(222,648,379)">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#FC726E" />
            </linearGradient>
          </defs>
          <rect width="540" height="450" fill="url(#a)" />
        </svg>
      </div>
      <div className="flex justify-center -mt-16">
        <svg
          className="w-32 h-32 rounded-full border-4 border-white"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="64" cy="64" fill="#ff8475" r="60" />
          <circle cx="64" cy="64" fill="#f85565" opacity=".4" r="48" />
          <path d="M64 14a32 32 0 0 1 32 32v41a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6V46a32 32 0 0 1 32-32z" fill="#7f3838" />
        </svg>
      </div>
      <div className="text-center mt-2">
        <h2 className="text-lg font-semibold text-gray-900">John Doe</h2>
        <p className="text-gray-600">Software Developer</p>
      </div>
      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-700">
          Follow
        </button>
      </div>
    </div>
  );
};

export default UserCard;
