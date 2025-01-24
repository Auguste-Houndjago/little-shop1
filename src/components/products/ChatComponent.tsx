"use client"
import React, { useState } from 'react';

const ChatBotComponent = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col max-w-[260px] w-full">
      <div className="relative flex 
        bg-gradient-to-br from-gray-100/50 via-gray-200/40 to-gray-300/30 
        backdrop-blur-xl 
        border border-white/20 
        rounded-2xl p-[1.5px] 
        shadow-2xl 
        overflow-hidden">
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-50"></div>
        
        <div className="flex flex-col 
          bg-white/10 
          backdrop-blur-lg 
          rounded-2xl 
          w-full 
          overflow-hidden 
          relative 
          border-[0.5px] border-white/20 
          shadow-inner">
          
          <div className="relative flex">
            <textarea 
              placeholder="Imagine Something...✦˚" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-transparent 
                border-none 
                w-full 
                h-12 
                text-gray-800 
                text-xs 
                p-2.5 
                resize-none 
                outline-none 
                placeholder-gray-500/70 
                focus:placeholder-gray-300 
                transition-colors 
                duration-300"
            />
          </div>
          
          <div className="flex justify-between items-end p-2.5">
            {/* Additional buttons */}
            <div className="flex gap-2">
              {[
                <svg key="1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-gray-600 hover:text-gray-800">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8"/>
                </svg>,
                <svg key="2" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg" className="text-gray-600 hover:text-gray-800">
                  <path strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" fill="none" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm0 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm0-8h6m-3-3v6"/>
                </svg>,
                <svg key="3" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg" className="text-gray-600 hover:text-gray-800">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.01 8.01 0 0 0 5.648 6.667M10.03 13c.151 2.439.848 4.73 1.97 6.752A15.9 15.9 0 0 0 13.97 13zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.01 8.01 0 0 0 19.938 13M4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333A8.01 8.01 0 0 0 4.062 11m5.969 0h3.938A15.9 15.9 0 0 0 12 4.248A15.9 15.9 0 0 0 10.03 11m4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.01 8.01 0 0 0-5.648-6.667" fill="currentColor"/>
                </svg>
              ].map((icon, index) => (
                <button 
                  key={index} 
                  className="flex opacity-50 hover:opacity-100 hover:translate-y-[-5px] transition-all duration-300"
                >
                  {icon}
                </button>
              ))}
            </div>
            
            {/* Submit button */}
            <button className="flex p-0.5 
              bg-white/20 
              backdrop-blur-md 
              rounded-lg 
              border border-white/30 
              shadow-md
              hover:bg-white/40 
              active:scale-90 
              transition-all 
              duration-150">
              <i className="w-[30px] h-[30px] p-1.5 
                bg-white/10 
                rounded-lg 
                backdrop-blur-sm 
                text-gray-700
                hover:text-black 
                hover:bg-white/30">
                <svg viewBox="0 0 512 512">
                  <path fill="currentColor" d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05"/>
                </svg>
              </i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Tags */}
      <div className="flex gap-1 py-3.5 text-gray-700 text-[10px]">
        {['Create An Image', 'Analyse Data', 'More'].map((tag, index) => (
          <span 
            key={index} 
            className="px-2 py-1 
              bg-white/10 
              backdrop-blur-sm 
              border border-white/30 
              rounded-lg 
              cursor-pointer 
              hover:bg-white/20 
              transition-all 
dark:border-[#363636]
              dark:bg-[#1b1b1b]
              duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ChatBotComponent;