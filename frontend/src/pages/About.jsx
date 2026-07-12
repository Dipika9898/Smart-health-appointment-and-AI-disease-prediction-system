import React from "react";
import { assets } from "../assets/assets";
import { FaRobot, FaCalendarCheck, FaUserShield, FaChartLine } from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      {/* --- Section Header --- */}
      <div className="text-center space-y-4 mb-20">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
          Improving <span className="text-blue-600">Healthcare</span>
        </h1>
        <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full"></div>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          At PulseLife, we use AI to analyze symptoms and suggest the right doctors. This helps make healthcare simple and easy for every patient.
        </p>
      </div>

      {/* --- Main Story Section --- */}
      <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
        
        {/* Decorative Image Wrapper */}
        <div className="relative group w-full lg:w-1/2">
          <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] -rotate-6 group-hover:rotate-0 transition-transform duration-700"></div>
          <img
            className="relative z-10 w-full rounded-[3rem] shadow-2xl border-8 border-white object-cover aspect-4/3"
            src={assets.about_image}
            alt="Healthcare Technology"
          />
          {/* AI Floating Badge */}
          <div className="absolute -bottom-6 -right-6 z-20 bg-slate-900 text-white p-6 rounded-3xl shadow-2xl hidden md:flex items-center gap-4 border border-white/10">
             <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <FaRobot size={24} />
             </div>
             <div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Core Tech</p>
                <p className="text-lg font-bold">AI Diagnostics</p>
             </div>
          </div>
        </div>

        {/* Narrative Text */}
        <div className="flex-1 space-y-8">
          <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
            <p>
              <span className="text-blue-600 font-black">PulseLife</span> is a smart healthcare system from Kathmandu. It helps connect patients and doctors easily by removing delays and difficulties. We believe healthcare should be fast and easy to access like other modern services.
            </p>
            <p>
              By utilizing advanced <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-bold">MERN-stack architecture</span> and Python-based Logistic Regression, our platform doesn't just book appointments—it analyzes symptoms to predict possible diseases.
            </p>
          </div>

          {/* Vision Box - Upgraded to a "Glass Card" */}
          <div className="relative bg-linear-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 overflow-hidden">
            <FaChartLine className="absolute -bottom-4 -right-4 text-white/10 text-9xl" />
            <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
               <FaUserShield className="text-blue-300" /> Our Vision
            </h3>
            <p className="text-blue-50/90 leading-relaxed font-medium">
              We aim to make healthcare simple, smart, and proactive. By using technology, we help people in Nepal understand their health early and make better decisions before visiting a doctor.
            </p>
          </div>
        </div>
      </div>

      {/* --- Why Choose Us Section --- */}
      <div className="text-center mb-12">
         <h2 className="text-3xl font-black text-slate-800 uppercase tracking-widest">Why Choose <span className="text-blue-600">PulseLife</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">

        {/* Card 1: AI */}
        <div className="group bg-white border border-slate-100 p-10 rounded-[2.5rem] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-500 cursor-pointer text-left">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
            <FaRobot size={24} />
          </div>
          <h4 className="text-xl font-black text-slate-800 mb-4 tracking-tight leading-tight">AI-Powered Predictions</h4>
          <p className="text-slate-500 text-sm leading-relaxed">
            Our system uses smart algorithms to check your symptoms and reports and then suggests the right specialist, so you can see the right doctor from the start.
          </p>
        </div>

        {/* Card 2: Booking */}
        <div className="group bg-white border border-slate-100 p-10 rounded-[2.5rem] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-500 cursor-pointer text-left">
          <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-500">
            <FaCalendarCheck size={24} />
          </div>
          <h4 className="text-xl font-black text-slate-800 mb-4 tracking-tight leading-tight">Instant Booking System</h4>
          <p className="text-slate-500 text-sm leading-relaxed">
            Skip long hospital queues. Check doctor availability in real time and book your appointment in less than a minute with instant confirmation.
          </p>
        </div>

        {/* Card 3: Efficiency */}
        <div className="group bg-white border border-slate-100 p-10 rounded-[2.5rem] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-500 cursor-pointer text-left">
          <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-500">
            <FaUserShield size={24} />
          </div>
          <h4 className="text-xl font-black text-slate-800 mb-4 tracking-tight leading-tight">Trusted Patient Data</h4>
          <p className="text-slate-500 text-sm leading-relaxed">
            Your medical history and personal information are safely protected with strong encryption, giving you a secure and personalized healthcare experience.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
