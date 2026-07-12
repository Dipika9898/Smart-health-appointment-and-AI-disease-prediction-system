import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext.jsx'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-auto animate-in fade-in duration-500'>
      {/* --- Header Section --- */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-slate-800 tracking-tight'>Medical Staff</h1>
          <p className='text-slate-500 text-sm'>Manage doctor availability and profiles</p>
        </div>
        <div className='bg-white px-4 py-2 rounded-lg border border-slate-200 text-slate-400 text-sm hidden sm:block'>
          Total Doctors: <span className='text-blue-600 font-bold'>{doctors.length}</span>
        </div>
      </div>

      {/* --- Grid Container --- */}
      <div className='w-full flex flex-wrap gap-6 pt-2 justify-center sm:justify-start'>
        {doctors.map((item, index) => (
          <div 
            className='bg-white border border-slate-100 rounded-2xl w-full sm:max-w-60 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group' 
            key={index}
          >
            {/* Image Wrapper */}
            <div className='relative overflow-hidden bg-slate-100'>
              <img 
                className='w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500' 
                src={item.image} 
                alt={item.name} 
              />
              {/* Availability Badge on Image */}
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm ${item.available ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}`}>
                {item.available ? 'Active' : 'Offline'}
              </div>
            </div>

            {/* Content Section */}
            <div className='p-5'>
              <p className='text-slate-800 text-lg font-bold truncate'>{item.name}</p>
              <p className='text-blue-600 text-xs font-bold uppercase tracking-tighter mb-4'>{item.speciality}</p>
              
              <div className='pt-4 border-t border-slate-50 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {/* Custom Styled Toggle-like Checkbox */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      onChange={() => changeAvailability(item._id)} 
                      checked={item.available} 
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className='text-xs font-semibold text-slate-600 cursor-pointer'>Available</span>
                </div>
                
                {/* Visual indicator of availability */}
                <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList