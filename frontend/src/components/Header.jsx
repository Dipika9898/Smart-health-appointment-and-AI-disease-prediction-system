import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom' // 1. Import useNavigate

const Header = () => {
  const navigate = useNavigate() // 2. Initialize navigate

  // 3. Create the scroll-to-top navigation function
  const goToHome = () => {
    navigate('/')
    window.scrollTo({
      top: 0,
      behavior: 'instant' 
    })
  }

  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-linear-to-r from-blue-700 via-blue-600 to-indigo-600 rounded-3xl px-6 md:px-10 lg:px-20 relative overflow-hidden shadow-2xl'>
      
      {/* Decorative Circles */}
      <div className='absolute -top-12.5 -left-12.5 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl'></div>
      <div className='absolute -bottom-5 right-[10%] w-40 h-40 bg-blue-300 opacity-10 rounded-full blur-2xl'></div>

      {/*--------- Left Side ------------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 md:py-[8vw] z-10'>
        
        {/* Clinic Status Tag */}
        <div className='bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full flex items-center gap-2 mb-2'>
          <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
          <span className='text-white text-[10px] md:text-xs font-medium tracking-wide uppercase'>24/7 Smart Care Active</span>
        </div>

        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white font-extrabold leading-[1.2] md:leading-[1.1] tracking-tight'>
          Schedule an <br className='hidden sm:block'/> 
          <span className='text-blue-200 underline decoration-blue-400/50 underline-offset-8'>Appointment</span> 
          <br className='hidden sm:block'/> with Trusted Doctors
        </h1>

        {/* AI Assistant Callout */}
        <div className='flex flex-row items-center gap-4 sm:gap-5 p-3 sm:p-4 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl text-white text-xs sm:text-sm shadow-xl w-full sm:w-auto'>
          <div className='bg-white p-1.5 rounded-lg sm:rounded-xl shadow-lg shrink-0'>
            <img 
              className='w-10 h-10 sm:w-12 md:w-14 sm:h-12 md:h-14 object-contain' 
              src={assets.chatbot_icon1} 
              alt="DocBuddy AI"
            />
          </div>
          <p className='leading-relaxed opacity-95'>
            Not feeling well? <span className='font-bold text-blue-200 italic'>DocBuddy is here.</span><br className='hidden sm:block'/>
            Input symptoms for <span className='sm:hidden'>AI guidance</span> <span className='hidden sm:inline'>instant AI guidance</span> and 
            matching doctors.
          </p>
        </div>

        {/* Enhanced Button */}
        <a 
          href="#speciality" 
          className='group flex items-center gap-3 bg-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-blue-700 font-bold text-sm sm:text-base shadow-lg hover:bg-blue-50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 active:scale-95'
        >
          Find Your Doctor 
          <img className='w-3 sm:w-4 group-hover:translate-x-2 transition-transform duration-300' src={assets.arrow_icon} alt="Arrow"/>
        </a>
      </div>

      {/*--------- Right Side ------------- */}
      <div className='md:w-1/2 relative flex items-end justify-center'>
        <div className='relative w-full max-w-lg lg:max-w-xl'>
          <div className='absolute inset-0 bg-blue-400/20 rounded-full blur-[80px] z-0'></div>
          <img 
            className='w-full relative z-10 h-auto rounded-b-lg drop-shadow-[0_25px_40px_rgba(0,0,0,0.4)]' 
            src={assets.header_img} 
            alt='Trusted Specialists at PulseLife'
          />
        </div>
      </div>
    </div>
  )
}

export default Header