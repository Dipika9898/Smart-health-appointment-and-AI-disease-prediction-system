import React from "react";
import { assets } from "../../assets/assets";
import { FaCommentMedical } from 'react-icons/fa';

const ChatbotButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end group">
      
      {/* --- Hover Tooltip --- */}
      <div className="mb-3 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none">
        AI Symptom Checker
      </div>

      <button
        onClick={onClick}
        className="relative flex items-center justify-center w-20 h-20 rounded-4xl bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-blue-200 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden group"
      >
        {/* --- Animated Background Pulse --- */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* --- Visual "Ping" Animation (Signifies AI is active) --- */}
        <span className="absolute top-4 right-4 flex h-3 w-3 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border-2 border-white"></span>
        </span>

        {/* --- Chatbot Icon --- */}
        <img 
          className="relative z-10 w-12 h-12 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
          src={assets.chatbot_icon1}
          alt="AI Chatbot"
        />

        {/* --- Decorative Medical Glow --- */}
        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-400/20 blur-xl group-hover:bg-white/20"></div>
      </button>

      {/* --- Mobile Label (Optional) --- */}
      <p className="mt-2 text-[10px] font-bold text-slate-400 md:hidden uppercase tracking-widest">Help</p>
    </div>
  );
};

export default ChatbotButton;

