import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from "../../assets/assets"
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } =
    useContext(DoctorContext)

  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='m-5 animate-in fade-in duration-500'>

      {/* --- STATISTIC CARDS --- */}
      <div className="flex flex-wrap gap-4">

        <div className="flex items-center gap-4 bg-white p-6 min-w-64 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
          <div className='p-3 bg-blue-50 rounded-xl'>
            <img className="w-10" src={assets.earning_icon} alt="Earnings" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-700">
              {currency} {dashData.earnings}
            </p>
            <p className="text-slate-400 text-sm font-medium">Total Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 min-w-64 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
          <div className='p-3 bg-emerald-50 rounded-xl'>
            <img className="w-10" src={assets.appointments_icon} alt="Appointments" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-700">
              {dashData.appointments}
            </p>
            <p className="text-slate-400 text-sm font-medium">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 min-w-64 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
          <div className='p-3 bg-purple-50 rounded-xl'>
            <img className="w-10" src={assets.patients_icon} alt="Patients" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-700">
              {dashData.patients}
            </p>
            <p className="text-slate-400 text-sm font-medium">Unique Patients</p>
          </div>
        </div>

      </div>

      {/* --- LATEST BOOKINGS SECTION --- */}
      <div className="bg-white mt-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

        <div className="flex items-center gap-2.5 px-6 py-5 bg-slate-50/50 border-b border-slate-100">
          <img className='w-5' src={assets.list_icon} alt="" />
          <p className="font-bold text-slate-700 tracking-tight">Latest Bookings</p>
        </div>

        <div className="divide-y divide-slate-50">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={item._id}
              className="flex items-center px-6 py-4 gap-4 hover:bg-blue-50/30 transition-all group"
            >
              {/* Patient Image */}
              <img
                className="rounded-full w-12 h-12 object-cover border-2 border-white shadow-sm"
                src={item.userData.image}
                alt={item.userData.name}
              />

              {/* Patient Info */}
              <div className="flex-1">
                <p className="text-slate-900 font-bold">
                  {item.userData.name}
                </p>
                <p className="text-slate-500 text-xs font-medium mt-0.5">
                  {slotDateFormat(item.slotDate)}
                </p>
              </div>

              {/* Action Area */}
              <div className='flex items-center gap-2'>
                {
                  item.cancelled ? (
                    <div className='px-3 py-1 bg-red-50 border border-red-100 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-full'>
                        Cancelled
                    </div>
                  ) : item.isCompleted ? (
                    <div className='px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-full'>
                        Completed
                    </div>
                  ) : (
                    <div className='flex items-center gap-3'>
                      {/* Cancel Button */}
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className='w-10 h-10 flex items-center justify-center rounded-full bg-red-50 border border-red-100 hover:bg-red-500 transition-all group/btn active:scale-90 cursor-pointer'
                        title="Cancel"
                      >
                        <img className='w-5 group-hover/btn:brightness-0 group-hover/btn:invert' src={assets.cancel_icon} alt="Cancel" />
                      </button>

                      {/* Complete Button */}
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className='w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-100 hover:bg-emerald-600 transition-all group/btn active:scale-90 cursor-pointer'
                        title="Complete"
                      >
                        <img className='w-5 group-hover/btn:brightness-0 group-hover/btn:invert' src={assets.tick_icon} alt="Complete" />
                      </button>
                    </div>
                  )
                }
              </div>

            </div>
          ))}
        </div>
        
        {/* Empty state footer */}
        <div className='p-4 bg-slate-50/30 text-center'>
            <p className='text-[10px] text-slate-400 font-bold uppercase tracking-[2px]'>End of Latest Bookings</p>
        </div>

      </div>

    </div>
  )
}

export default DoctorDashboard