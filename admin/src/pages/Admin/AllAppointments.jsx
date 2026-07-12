import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
    const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

    useEffect(() => {
        if (aToken) {
            getAllAppointments()
        }
    }, [aToken])

    return (
        <div className='w-full max-w-6xl m-5'>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">System Appointments</h2>
                </div>
                <button 
                    onClick={() => getAllAppointments()} 
                    className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                    <span className="text-lg cursor-pointer">↻</span> Refresh List
                </button>
            </div>

            <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
                {/* --- Table Header (Desktop Only) --- */}
                <div className='hidden lg:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-4 px-6 bg-slate-50 border-b border-slate-100 text-slate-700 font-bold text-[11px] uppercase tracking-widest'>
                    <p>#</p>
                    <p>Patient Details</p>
                    <p>Age</p>
                    <p>Schedule</p>
                    <p>Doctor & Speciality</p>
                    <p>Fees</p>
                    <p className='text-center'>Actions</p>
                </div>

                {/* --- Scrollable Content --- */}
                <div className='max-h-[75vh] min-h-[50vh] overflow-y-auto'>
                    {appointments && [...appointments].reverse().map((item, index) => (
                        <div
                            key={index}
                            className='grid grid-cols-1 lg:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center gap-y-4 lg:gap-y-0 py-5 px-6 border-b border-slate-50 hover:bg-blue-50/20 transition-all'
                        >
                            <p className='hidden lg:block font-medium text-slate-400'>{index + 1}</p>

                            {/* --- PATIENT SECTION --- */}
                            <div className='flex items-center gap-3 border-l-4 border-blue-500 lg:border-none pl-3 lg:pl-0'>
                                <div className="relative">
                                    <img 
                                        className='w-12 h-12 rounded-full object-cover bg-blue-50 border-2 border-white shadow-sm' 
                                        src={item.userData?.image 
                                            ? `${item.userData.image}${item.userData.image.includes('?') ? '&' : '?'}t=${new Date().getTime()}` 
                                            : assets.upload_area
                                        } 
                                        onError={(e) => { e.target.src = assets.upload_area }} 
                                        alt="User" 
                                    />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full lg:hidden"></span>
                                </div>
                                <div>
                                    <p className='text-blue-900 font-bold text-base lg:text-sm lg:font-semibold'>
                                        {item.userData?.name || "Patient Not Found"}
                                    </p>
                                    <div className="flex items-center gap-2 lg:hidden">
                                        <span className='text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-bold uppercase'>Patient</span>
                                        <p className='text-xs text-slate-500'>Age: {item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Age (Desktop) */}
                            <p className='hidden lg:block text-slate-600 font-medium'>
                                {item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}
                            </p>

                            {/* Schedule Details */}
                            <div className='flex flex-col gap-0.5 lg:pl-2'>
                                <p className='text-slate-700 font-semibold text-sm'>{slotDateFormat(item.slotDate)}</p>
                                <p className='text-xs font-bold text-blue-600 uppercase bg-blue-50 w-fit px-2 py-0.5 rounded'>{item.slotTime}</p>
                            </div>

                            {/* --- DOCTOR SECTION (UPDATED FOR SPECIALITY) --- */}
                            <div className='flex items-center gap-3 bg-slate-50 lg:bg-transparent p-3 lg:p-0 rounded-xl border border-slate-100 lg:border-none'>
                                <img 
                                    className='w-10 h-10 rounded-lg bg-white border border-emerald-200 object-cover p-0.5' 
                                    src={item.docData?.image || assets.upload_area} 
                                    alt="Doctor" 
                                />
                                <div>
                                    <p className='text-emerald-900 text-sm font-bold lg:font-medium'>{item.docData?.name || "Doctor Not Found"}</p>
                                    {/* Displaying Speciality instead of static text */}
                                    <p className='text-[9px] tracking-tighter bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-black uppercase w-fit'>
                                        {item.docData?.speciality || "Specialist"}
                                    </p>
                                </div>
                            </div>

                            {/* Fees */}
                            <p className='text-slate-900 font-bold lg:font-normal lg:text-center text-sm'>
                                <span className='lg:hidden text-xs text-slate-400 mr-2'>Fee:</span>
                                {currency}{item.amount}
                            </p>

                            {/* Actions & Status */}
                            <div className='flex justify-start lg:justify-center items-center mt-2 lg:mt-0'>
                                {item.cancelled ? (
                                    <div className='flex items-center gap-1.5 text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 w-full lg:w-auto justify-center'>
                                        <span className='text-[10px] font-bold uppercase tracking-widest'>Cancelled</span>
                                    </div>
                                ) : item.isCompleted ? (
                                    <div className='flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 w-full lg:w-auto justify-center'>
                                        <span className='text-[10px] font-bold uppercase tracking-widest'>Completed</span>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => cancelAppointment(item._id)}
                                        className='flex items-center justify-center gap-2 w-full lg:w-auto text-red-500 hover:bg-red-200 p-2.5 rounded-xl transition-all cursor-pointer border border-red-100 lg:border-none group'
                                    >
                                        <img className='w-5 opacity-60 group-hover:opacity-100' src={assets.cancel_icon} alt="Cancel" />
                                        <span className='lg:hidden text-sm font-bold uppercase cursor-pointer'>Cancel Appointment</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllAppointments