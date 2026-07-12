import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FaUserMd, FaChevronRight, FaStar } from 'react-icons/fa'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-6 my-16 md:my-24 text-slate-900 md:mx-10 px-4'>
      
      {/* --- Section Header --- */}
      <div className='text-center space-y-3'>
        <h1 className='text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight'>
          Our Top <span className='text-blue-600'>Doctors</span>
        </h1>
        <div className='w-16 md:w-20 h-1.5 bg-blue-600 mx-auto rounded-full'></div>
        <p className='w-full sm:w-2/3 lg:w-1/2 mx-auto text-slate-500 text-sm md:text-base mt-4 px-2'>
          Connect with our best doctors. All doctors are verified and provide good healthcare.
        </p>
      </div>

      {/* --- Responsive Grid --- */}
      <div
        className='w-full grid gap-4 sm:gap-6 md:gap-8 pt-10 px-0'
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
      >
        {doctors?.slice(0, 10).map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
            className='group bg-white border border-slate-100 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500'
            key={index}
          >
            {/* Image Section - Adjusted for Responsiveness */}
            <div className='relative bg-slate-50 overflow-hidden'>
              <img 
                className={`w-full h-48 sm:h-64 lg:h-72 object-cover object-top group-hover:scale-105 transition-transform duration-700 ${!item.available ? 'grayscale opacity-80' : ''}`} 
                src={item.image} 
                alt={item.name} 
              />
              {/* Floating Badge - Scaled for Mobile */}
              <div className='absolute top-3 left-3 md:top-4 md:left-4 bg-white/90 backdrop-blur-md px-2 md:px-3 py-1 rounded-full shadow-sm flex items-center gap-1 md:gap-1.5'>
                <FaStar className='text-yellow-400 text-[8px] md:text-xs' />
                <span className='text-[8px] md:text-[10px] font-bold text-slate-700 uppercase tracking-widest'>Top Rated</span>
              </div>
            </div>

            {/* Content Section */}
            <div className='p-4 md:p-6'>
              <div className='flex items-center justify-between mb-2 md:mb-3'>
                <div className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 rounded-full ${item.available ? 'bg-green-50' : 'bg-slate-100'}`}>
                  <span className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
                  <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-tight ${item.available ? 'text-green-700' : 'text-slate-500'}`}>
                    {item.available ? 'Available' : 'Not Available'}
                  </span>
                </div>
                <FaUserMd className='text-slate-200 text-base md:text-xl' />
              </div>

              <h3 className='text-slate-800 text-base md:text-xl font-bold group-hover:text-blue-600 transition-colors leading-tight truncate'>
                {item.name}
              </h3>
              <p className='text-blue-500 text-[10px] md:text-xs font-bold mt-1 md:mt-2 uppercase tracking-widest'>
                {item.speciality}
              </p>

              <div className='mt-4 md:mt-6 pt-3 md:pt-4 border-t border-slate-50 flex items-center justify-between'>
                <span className='text-slate-400 text-[10px] md:text-xs font-medium'>
                    {item.available ? 'Book Now' : 'Schedule'}
                </span>
                <div className={`w-6 md:w-8 h-6 md:h-8 rounded-full flex items-center justify-center transition-all ${item.available ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : 'bg-slate-100 text-slate-300'}`}>
                  <FaChevronRight size={10} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- "View More" Action --- */}
      <button 
        onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
        className='group mt-12 md:mt-16 flex items-center gap-3 bg-blue-600 text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-bold text-xs md:text-sm shadow-lg hover:bg-blue-700 transition-all active:scale-95'
      >
        View All Doctors
        <FaChevronRight className='group-hover:translate-x-2 transition-transform' size={14} />
      </button>
    </div>
  )
}

export default TopDoctors
