import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FaFilter, FaUserMd, FaChevronRight } from 'react-icons/fa'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilters, setShowFilters] = useState(false) 
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  const specialties = [
    'Dentist', 'Cardiologist', 'Dermatologist', 'Endocrinologist', 'ENT Doctor',
    'Gastroenterologist', 'General Physician', 'Gynecologist', 'Nephrologist',
    'Neurologist', 'Opthalmologist', 'Pediatrician', 'Pulmonologist'
  ]

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>

      {/* --- Page Header --- */}
      <div className='mb-10 text-left border-l-4 border-blue-600 pl-6'>
        <h1 className='text-3xl md:text-4xl font-black text-slate-800 tracking-tight'>
          Find Your <span className='text-blue-600'>Specialist</span>
        </h1>
        <p className='text-slate-500 mt-2 text-sm md:text-base'>
          Explore our trusted and certified doctors in Kathmandu to get the right medical care easily.
        </p>
      </div>

      <div className='flex flex-col lg:flex-row gap-10 items-start'>

        {/* --- Sidebar Filter --- */}
        <div className='w-full lg:w-64 shrink-0'>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`lg:hidden flex items-center justify-between w-full px-5 py-3 rounded-xl mb-4 font-bold transition-all ${showFilters ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            <span className='flex items-center gap-2'><FaFilter size={14}/> {showFilters ? 'Close Filters' : 'Filter by Speciality'}</span>
            <FaChevronRight className={`transition-transform ${showFilters ? 'rotate-90' : ''}`} size={12}/>
          </button>

          <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100`}>
            <p className='hidden lg:block text-[10px] font-black text-slate-400 uppercase tracking-widest p-4 pb-2'>Departments</p>
            {specialties.map((spec, idx) => (
              <p
                key={idx}
                onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
                className={`cursor-pointer px-5 py-3 rounded-xl transition-all duration-300 text-sm font-medium
                  ${speciality === spec 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 translate-x-2' 
                    : 'text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-sm'}`}
              >
                {spec}
              </p>
            ))}
          </div>
        </div>

        {/* --- Doctor Listing Grid --- */}
        <div className='grow w-full'>
          {filterDoc.length > 0 ? (
            <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
              {filterDoc.map((item, index) => (
                <div
                  key={index}
                  onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0,0) }}
                  className='group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500'
                >
                  <div className='relative overflow-hidden bg-slate-50 h-64'>
                    {/* --- IMAGE GRAYSCALE LOGIC --- */}
                    <img 
                      className={`w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ${!item.available ? 'grayscale opacity-80' : ''}`} 
                      src={item.image} 
                      alt={item.name} 
                    />
                    
                    {/* --- DYNAMIC BADGE LOGIC --- */}
                    <div className='absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm'>
                      <span className='relative flex h-2 w-2'>
                        {item.available && (
                          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                        )}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${item.available ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                      </span>
                      <span className={`text-[10px] font-black uppercase ${item.available ? 'text-green-700' : 'text-slate-500'}`}>
                        {item.available ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                  </div>
                  
                  <div className='p-6'>
                    <p className='text-blue-600 text-[10px] font-black uppercase tracking-widest mb-1'>{item.speciality}</p>
                    <h3 className='text-slate-900 text-xl font-bold group-hover:text-blue-600 transition-colors'>{item.name}</h3>
                    
                    <div className='mt-6 pt-4 border-t border-slate-50 flex items-center justify-between'>
                      <div className='flex items-center gap-2 text-slate-400'>
                        <FaUserMd size={14}/>
                        <span className='text-xs font-medium'>
                          {item.available ? 'View Profile' : 'Check Schedule'}
                        </span>
                      </div>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${item.available ? 'bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white' : 'bg-slate-100 text-slate-300'}`}>
                        <FaChevronRight size={10} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200'>
              <FaUserMd className='text-slate-300 mb-4' size={50}/>
              <p className='text-slate-500 font-medium'>No doctors found in this department.</p>
              <button onClick={() => navigate('/doctors')} className='mt-4 text-blue-600 font-bold hover:underline'>View All Doctors</button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Doctors