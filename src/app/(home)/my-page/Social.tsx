import React from "react";

const SocialCard = () => {
  return (
    <div className="relative w-52 h-52 bg-gray-300 rounded-3xl overflow-hidden shadow-lg border-2 border-white transition-all duration-1000 ease-in-out">
      <div className="absolute inset-0 bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70]"></div>

      <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 text-white font-semibold text-lg tracking-widest transition-all duration-500">
        Socials
      </div>

      <div className="absolute inset-0 flex justify-center items-center gap-4">
        <a title="social" href="#" className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-lg transition-transform hover:scale-110">
          <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-white">
            <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
          </svg>
        </a>

        <a title="social" href="##" className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-lg transition-transform hover:scale-110">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-white">
            <path d="M459.37 151.716c.325 4.548..."></path>
          </svg>
        </a>

        <a title="social" href="###" className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-lg transition-transform hover:scale-110">
          <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-white">
            <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-0.7..."></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SocialCard;
