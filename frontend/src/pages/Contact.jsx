import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaExternalLinkAlt } from 'react-icons/fa'

const Contact = () => { 
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* --- Section Header --- */}
      <div className='text-center space-y-4 mb-16'>
        <h1 className='text-4xl md:text-5xl font-black text-slate-900 tracking-tight'>
          Get in <span className='text-blue-600'>Touch</span>
        </h1>
        <div className='w-24 h-1.5 bg-blue-600 mx-auto rounded-full'></div>
        <p className='text-slate-500 max-w-xl mx-auto text-base md:text-lg'>
          Our medical support team is available all the time to help you with appointments and any health questions.
        </p>
      </div>

      {/* --- Main Contact Container --- */}
      <div className='grid lg:grid-cols-2 gap-12 items-stretch mb-28'>

        {/* Left Side: Professional Image & Visual Branding */}
        <div className='relative group h-100 lg:h-auto'>
          <div className='absolute inset-0 bg-blue-600/10 rounded-[2.5rem] -rotate-3 group-hover:rotate-0 transition-transform duration-500'></div>
          <img
            className='relative w-full h-full object-cover rounded-[2.5rem] shadow-2xl z-10 border-8 border-white'
            src={assets.contact_image}
            alt="PulseLife Hospital Administration"
          />
          {/* Floating Status Badge */}
          <div className='absolute bottom-8 left-8 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-blue-50'>
             <div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200'>
                <FaClock size={20} />
             </div>
             <div>
                <p className='text-[10px] font-black text-blue-600 uppercase tracking-widest'>Emergency Response</p>
                <p className='text-slate-800 font-bold text-sm'>Available 24 Hours</p>
             </div>
          </div>
        </div>

        {/* Right Side: Information Cards */}
        <div className='flex flex-col justify-between gap-8 py-4'>
          
          {/* Information Grid */}
          <div className='grid sm:grid-cols-2 gap-6'>
            {/* Address Card */}
            <div className='bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-10 h-10 bg-slate-50 text-blue-600 rounded-full flex items-center justify-center mb-4'>
                <FaMapMarkerAlt />
              </div>
              <h3 className='font-bold text-slate-800 mb-2'>Our Location</h3>
              <p className='text-slate-500 text-sm leading-relaxed'>
                Koteshwor - 32,<br />
                Kathmandu, Nepal <br />
                <span className='text-blue-600 font-medium text-[11px] flex items-center gap-1 mt-2 cursor-pointer hover:underline'>
                  View on Google Maps <FaExternalLinkAlt size={8}/>
                </span>
              </p>
            </div>

            {/* Hours Card */}
            <div className='bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-10 h-10 bg-slate-50 text-blue-600 rounded-full flex items-center justify-center mb-4'>
                <FaClock />
              </div>
              <h3 className='font-bold text-slate-800 mb-2'>Reception Hours</h3>
              <p className='text-slate-500 text-sm'>
                Mon - Fri: 8am - 8pm <br />
                Sat - Sun: 10am - 4pm <br />
                <span className='text-green-600 font-bold text-[10px] uppercase tracking-tighter mt-2 inline-block'>Currently Open</span>
              </p>
            </div>
          </div>

          {/* Contact Methods (Phone/Email) */}
          <div className='bg-slate-900 rounded-4xl p-8 text-white relative overflow-hidden shadow-2xl'>
            <div className='relative z-10 space-y-6'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm'>
                  <FaPhoneAlt className='text-blue-400' />
                </div>
                <div>
                  <p className='text-slate-400 text-xs font-bold uppercase tracking-widest'>Direct Line</p>
                  <p className='text-xl font-bold'>+977-01-4600774</p>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm'>
                  <FaEnvelope className='text-blue-400' />
                </div>
                <div>
                  <p className='text-slate-400 text-xs font-bold uppercase tracking-widest'>Support Email</p>
                  <p className='text-xl font-bold'>support@pulselife.com</p>
                </div>
              </div>
            </div>
            {/* Subtle UI Pattern */}
            <div className='absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl'></div>
          </div>

          {/* Call to Action */}
          <div className='bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center justify-between gap-4'>
             <div className='max-w-50'>
                <h4 className='text-blue-900 font-bold text-sm'>Want to join us?</h4>
                <p className='text-blue-700/70 text-xs mt-1'>Explore careers and our mission in healthcare.</p>
             </div>
             <button
              onClick={() => { navigate('/about'); window.scrollTo(0, 0) }}
              className='bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer'
            >
              Learn More
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
