import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-blue-500 rounded-lg px-6 md:px-10 lg:px-20'>
        {/*---------Left Side -------------  */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:-mb-8'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                Schedule an Appointment  <br/> with our Trusted Doctors
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font'>
                <img className='w-30' src={assets.chatbot_icon1} alt=""/>
                <p>Not feeling well? <br className='hidden sm:block'/> Let our AI Chatbot help.<br/> Enter your symptoms to understand possible conditions and get matched with the right doctor for treatment.</p>
            </div>
            <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-800 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 '>
                Find Doctors <img className='w-3' src={assets.arrow_icon} alt=""/>
            </a>
        </div>
        {/*---------Right Side -------------  */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt=''/>

        </div>
    </div>
  )
}

export default Header