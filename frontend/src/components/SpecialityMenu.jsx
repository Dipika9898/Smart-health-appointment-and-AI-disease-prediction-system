import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-6 py-24 text-slate-800 bg-white"
      id="speciality"
    >
      {/* --- Section Header --- */}
      <div className="text-center space-y-3 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Explore by <span className="text-blue-600">Speciality</span>
        </h2>
        <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        <p className="sm:w-2/3 lg:w-1/2 mx-auto text-slate-500 text-sm md:text-base leading-relaxed mt-4">
          Choose a department to find the right specialist. Our doctors are well-trained to give you the care you need.
        </p>
      </div>

      {/* --- Speciality Grid --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-10 pt-12 w-full max-w-7xl px-6">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            onClick={() => window.scrollTo(0, 0)}
            to={`/doctors/${item.speciality}`}
            className="group flex flex-col items-center cursor-pointer transition-all duration-500"
          >
            {/* Icon Container with Glass Effect */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-slate-50 border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] group-hover:border-blue-100 group-hover:-translate-y-3">
                
                {/* Subtle Background Glow on Hover */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/10 transition-all duration-500"></div>
                
                <img
                  className="w-12 sm:w-14 md:w-16 h-auto z-10 transition-transform duration-500 group-hover:scale-110"
                  src={item.image}
                  alt={item.speciality}
                />
              </div>

              {/* Decorative Ring (Visible on Hover) */}
              <div className="absolute -inset-1 rounded-full border-2 border-blue-400 opacity-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700"></div>
            </div>

            {/* Specialty Label */}
            <p className="mt-4 text-xs sm:text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors tracking-wide uppercase">
              {item.speciality}
            </p>
            
            {/* Bottom Indicator Dot */}
            <div className="w-1 h-1 bg-blue-600 rounded-full mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </Link>
        ))}
      </div>

      {/* --- Professional Footer Note --- */}
      <div className="mt-10 px-6 py-3 bg-blue-50 rounded-full">
        <p className="text-[10px] md:text-xs text-blue-700 font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
          All departments are currently accepting new patients
        </p>
      </div>
    </div>
  )
}

export default SpecialityMenu
