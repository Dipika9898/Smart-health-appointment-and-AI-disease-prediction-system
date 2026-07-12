import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const Footer = () => {
  const navigate = useNavigate()

  // Helper function to handle navigation and scroll
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'instant' // 'instant' is better for route changes than 'smooth'
    });
  }

  return (
    <footer className='bg-slate-50 border-t border-slate-200 mt-20'>
      <div className='md:mx-10 px-6 py-16'>
        
        {/* Main Footer Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-sm'>
          
          {/* ------- Brand & Mission ------- */}
          <div className='col-span-1 lg:col-span-1'>
            <img className='mb-6 w-44 filter grayscale-0' src={assets.logo} alt="PulseLife Logo" />
            <p className='text-slate-600 leading-7'>
              PulseLife is a digital healthcare platform in Nepal that connects patients with specialist doctors. It uses AI to help with health insights and makes booking appointments easy.
            </p>
            <div className='flex gap-4 mt-6'>
               <a href="#" className='p-2 bg-white rounded-full shadow-sm text-blue-600 hover:bg-blue-600 hover:text-white transition-all'><FaFacebook size={16}/></a>
               <a href="#" className='p-2 bg-white rounded-full shadow-sm text-pink-500 hover:bg-pink-500 hover:text-white transition-all'><FaInstagram size={16}/></a>
            </div>
          </div>

          {/* ------- Quick Navigation ------- */}
          <div>
            <p className='text-slate-900 font-bold text-lg mb-6'>Hospital</p>
            <ul className='flex flex-col gap-3 text-slate-600'>
              <li onClick={() => handleNavigation('/')} className='hover:text-blue-600 cursor-pointer transition-colors'>Home</li>
              <li onClick={() => handleNavigation('/about')} className='hover:text-blue-600 cursor-pointer transition-colors'>About Our Clinic</li>
              <li onClick={() => handleNavigation('/doctors')} className='hover:text-blue-600 cursor-pointer transition-colors'>Find a Specialist</li>
              <li className='hover:text-blue-600 cursor-pointer transition-colors'>Privacy Policy</li>
              <li className='hover:text-blue-600 cursor-pointer transition-colors'>Terms of Service</li>
            </ul>
          </div>

          {/* ------- Working Hours ------- */}
          <div>
            <p className='text-slate-900 font-bold text-lg mb-6'>Working Hours</p>
            <ul className='flex flex-col gap-4 text-slate-600'>
              <li className='flex items-start gap-3'>
                <FaClock className='text-blue-500 mt-1' />
                <div>
                  <p className='font-medium text-slate-800'>Mon — Fri</p>
                  <p className='text-xs'>08:00 AM - 08:00 PM</p>
                </div>
              </li>
              <li className='flex items-start gap-3'>
                <FaClock className='text-blue-500 mt-1' />
                <div>
                  <p className='font-medium text-slate-800'>Sat — Sun</p>
                  <p className='text-xs'>10:00 AM - 04:00 PM</p>
                </div>
              </li>
              <p className='text-[11px] text-red-500 font-medium mt-2 italic'>* Emergency services 24/7</p>
            </ul>
          </div>

          {/* ------- Contact Info ------- */}
          <div>
            <p className='text-slate-900 font-bold text-lg mb-6'>Get in Touch</p>
            <ul className='flex flex-col gap-4 text-slate-600'>
              <li className='flex items-center gap-3'>
                <div className='bg-blue-100 p-2 rounded-lg text-blue-600'>
                  <FaPhoneAlt size={14} />
                </div>
                <span className='font-medium'>01-4600774</span>
              </li>
              <li className='flex items-center gap-3'>
                <div className='bg-blue-100 p-2 rounded-lg text-blue-600'>
                  <FaEnvelope size={14} />
                </div>
                <span>pulselife01@gmail.com</span>
              </li>
              <li className='flex items-start gap-3'>
                <div className='bg-blue-100 p-2 rounded-lg text-blue-600'>
                  <FaMapMarkerAlt size={14} />
                </div>
                <span>Koteshwor - 32,<br />Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>

        </div>

        {/* ------ Bottom Copyright ------ */}
        <div className='mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-slate-500 text-xs'>
            © 2026 PulseLife Smart Healthcare. All Rights Reserved.
          </p>
          <p className='text-slate-400 text-[11px]'>
            Designed for Excellence in Medical Care.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
