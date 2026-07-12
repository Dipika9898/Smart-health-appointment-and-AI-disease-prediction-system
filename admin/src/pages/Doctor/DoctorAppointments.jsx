import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken, getAppointments])

  return (
    <div className='w-full max-w-6xl m-5 animate-in fade-in duration-500'>
      
      {/* --- Header Section --- */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Appointments Queue</h2>
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm">
          Total: {appointments.length}
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'> 
        
        {/* --- Table Header (Desktop Only) --- */}
        <div className='hidden lg:grid grid-cols-[0.5fr_3fr_1.5fr_1fr_3fr_1fr_2fr] items-center py-4 px-6 bg-slate-50 border-b border-slate-100 text-slate-500 font-bold text-[11px] uppercase tracking-widest'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p className='text-center'>Manage Action</p>
        </div>

        {/* --- Scrollable Appointment List --- */}
        <div className='max-h-[80vh] min-h-[50vh] overflow-y-auto divide-y divide-slate-50'>
          
          {/* ✅ STRICTOR SORTING: Sorts by Date (Newest first) then by Time */}
          {[...appointments]
            .sort((a, b) => {
                const dateA = new Date(a.slotDate);
                const dateB = new Date(b.slotDate);
                if (dateB - dateA !== 0) return dateB - dateA; // Sort by date first
                return b.slotTime.localeCompare(a.slotTime); // Then by time
            })
            .map((item, index) => (
            <div
              className='grid grid-cols-1 lg:grid-cols-[0.5fr_3fr_1.5fr_1fr_3fr_1fr_2fr] items-center gap-y-4 lg:gap-y-0 py-5 px-6 hover:bg-blue-50/20 transition-all group'
              key={item._id}
            >
              {/* Index */}
              <p className='hidden lg:block font-medium text-slate-400'>{index + 1}</p>

              {/* Patient Info */}
              <div className='flex items-center gap-3'>
                <img 
                    className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-md bg-slate-200' 
                    src={item.userData.image} 
                    alt="Patient" 
                />
                <div>
                    <p className='text-slate-900 font-bold text-sm lg:text-base'>{item.userData.name}</p>
                    <span className='lg:hidden inline-block text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase mt-1'>
                        Age: {calculateAge(item.userData.dob)}
                    </span>
                </div>
              </div>

              {/* Payment Badge */}
              <div>
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                    item.payment 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                    : 'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {item.payment ? 'Online' : 'CASH'}
                </span>
              </div>

              {/* Age (Desktop) */}
              <p className='hidden lg:block text-slate-600 font-medium'>{calculateAge(item.userData.dob)}</p>

              {/* Slot Info */}
              <div className='flex flex-col gap-0.5'>
                <p className='text-slate-700 font-bold text-sm'>{slotDateFormat(item.slotDate)}</p>
                <p className='text-[11px] font-black text-blue-600 uppercase tracking-tighter bg-blue-100/50 w-fit px-2 rounded'>{item.slotTime}</p>
              </div>

              {/* Fees */}
              <p className='text-slate-900 font-bold'>
                {currency}{item.amount}
              </p>

              {/* --- ACTION BUTTONS: Redesigned for Maximum Visibility --- */}
              <div className='flex items-center justify-start lg:justify-center gap-4'>
                {item.cancelled ? (
                  <div className='flex items-center gap-2 text-red-500 bg-red-50 px-6 py-2.5 rounded-xl border border-red-100 w-full lg:w-40 justify-center shadow-inner'>
                    <span className='text-[10px] font-black uppercase tracking-widest'>Cancelled</span>
                  </div>
                ) : item.isCompleted ? (
                  <div className='flex items-center gap-2 text-emerald-600 bg-emerald-50 px-6 py-2.5 rounded-xl border border-emerald-100 w-full lg:w-40 justify-center shadow-inner'>
                    <span className='text-[10px] font-black uppercase tracking-widest'>Completed</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-5 w-full lg:w-auto'>
                    
                    {/* TICK / ACCEPT BUTTON: Large, Solid Green */}
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className='flex-1 lg:flex-none flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all active:scale-95 cursor-pointer border-4 border-white'
                      title="Accept/Complete"
                    >
                      <img 
                        className='w-7 brightness-0 invert' 
                        src={assets.tick_icon} 
                        alt="Tick" 
                      />
                    </button>

                    {/* CROSS / CANCEL BUTTON: Large, Solid Red */}
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='flex-1 lg:flex-none flex items-center justify-center w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95 cursor-pointer border-4 border-white'
                      title="Cancel Appointment"
                    >
                      <img 
                        className='w-7 brightness-0 invert' 
                        src={assets.cancel_icon} 
                        alt="Cancel" 
                      />
                    </button>
                    
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments