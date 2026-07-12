import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()

  return (
    <div className='relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-20 my-20 md:mx-10 shadow-2xl'>
        
        {/* Decorative Background Element (Optional - for medical "tech" feel) */}
        <div className='absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-[-10%] right-[20%] w-40 h-40 bg-blue-300/20 rounded-full blur-2xl'></div>

        <div className='flex flex-col md:flex-row items-center justify-between'>
            
            {/*----Left side-------*/}
            <div className='flex-1 py-12 sm:py-16 md:py-24 lg:py-32 z-10'>
                <div className='space-y-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight'>
                    <p className='opacity-90 font-medium text-lg sm:text-xl md:text-2xl mb-2 text-blue-100 uppercase tracking-widest'>
                        Your Health, Our Priority
                    </p>
                    <p>Book Appointment</p>
                    <p className='text-blue-200'>With Our Trusted Doctors</p>
                </div>
                
                <p className='text-blue-50 mt-6 max-w-md text-sm sm:text-base leading-relaxed opacity-80'>
                    Connect with verified specialists across different departments. Quality healthcare is now just a click away.
                </p>

                <div className='flex flex-wrap gap-4 mt-10'>
                    <button 
                        onClick={()=>{navigate('/login'); window.scrollTo(0,0)}} 
                        className='bg-white text-blue-600 font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer active:scale-95 flex items-center gap-2'
                    >
                        Get Started
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/*----Right side-------*/}
            <div className='hidden md:block md:w-1/2 lg:w-[45%] relative self-end'>
                <div className='relative z-10'>
                    <img 
                        className='w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
                        src={assets.appointment_img} 
                        alt="Hospital Doctor Appointment"
                    />
                </div>
                {/* Visual Accent behind doctor */}
                <div className='absolute bottom-0 right-0 w-[80%] h-[80%] bg-white/10 rounded-t-full z-0 blur-sm'></div>
            </div>
        </div>
    </div>
  )
}

export default Banner