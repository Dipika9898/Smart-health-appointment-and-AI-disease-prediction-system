import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { FaUserMd, FaChevronRight } from 'react-icons/fa'

const RelatedDoctors = ({ speciality, docId }) => {
    const { doctors } = useContext(AppContext)
    const navigate = useNavigate()
    const [relDoc, setRelDocs] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDocs(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-6 my-16 md:my-24 text-slate-900 md:mx-10 px-4'>
            {/* --- Section Header --- */}
            <div className='text-center space-y-2'>
                <h2 className='text-3xl md:text-4xl font-bold text-slate-800 tracking-tight'>
                    Similar Doctors
                </h2>
                <div className='w-16 h-1 bg-blue-600 mx-auto rounded-full'></div>
                <p className='text-slate-500 text-sm md:text-base mt-4 max-w-md mx-auto'>
                    Highly qualified {speciality} doctors recommended based on your current selection.
                </p>
            </div>

            {/* --- Doctors Grid --- */}
            <div
                className='w-full grid gap-4 sm:gap-6 md:gap-8 pt-10 px-0'
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
            >
                {relDoc.slice(0, 5).map((item, index) => (
                    <div
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                        className='group bg-white border border-slate-100 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300'
                        key={index}
                    >
                        {/* Doctor Image Container */}
                        <div className='relative overflow-hidden bg-slate-100'>
                            <img 
                                className={`w-full h-48 sm:h-64 object-cover object-top group-hover:scale-105 transition-transform duration-500 ${!item.available ? 'grayscale opacity-80' : ''}`} 
                                src={item.image} 
                                alt={item.name} 
                            />
                            {/* Professional Badge */}
                            <div className='absolute top-3 right-3 bg-white/90 backdrop-blur shadow-sm px-2 py-1 rounded-md flex items-center gap-1.5'>
                                <FaUserMd className='text-blue-600 text-[8px] md:text-[10px]' />
                                <span className='text-[8px] md:text-[10px] font-bold text-slate-700 uppercase tracking-tighter'>Doctor</span>
                            </div>
                        </div>

                        {/* Doctor Details */}
                        <div className='p-4 md:p-5'>
                            <div className='flex items-center gap-2 mb-3'>
                                {/* --- DYNAMIC AVAILABILITY BADGE --- */}
                                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${item.available ? 'bg-green-50' : 'bg-slate-100'}`}>
                                    <span className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                    <span className={`text-[8px] md:text-[10px] font-bold uppercase ${item.available ? 'text-green-700' : 'text-slate-500'}`}>
                                        {item.available ? 'Available' : 'Not Available'}
                                    </span>
                                </div>
                            </div>
                            
                            <h3 className='text-slate-800 text-base md:text-lg font-bold group-hover:text-blue-600 transition-colors leading-tight truncate'>
                                {item.name}
                            </h3>
                            <p className='text-blue-500 text-[10px] md:text-xs font-semibold mt-1 mb-4 uppercase tracking-wide'>
                                {item.speciality}
                            </p>

                            <div className='flex items-center justify-between pt-4 border-t border-slate-50'>
                                <span className='text-slate-400 text-[10px] md:text-[11px] font-medium'>
                                    {item.available ? 'View Profile' : 'Check Schedule'}
                                </span>
                                <div className={`w-6 md:w-7 h-6 md:h-7 rounded-full flex items-center justify-center transition-all ${item.available ? 'bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white' : 'bg-slate-100 text-slate-300'}`}>
                                    <FaChevronRight size={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- "View More" Section --- */}
            {relDoc.length > 5 && (
                <button 
                    onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
                    className='group flex items-center gap-2 bg-slate-100 text-slate-600 px-8 md:px-10 py-3 md:py-3.5 rounded-full mt-10 font-bold text-xs md:text-sm hover:bg-blue-600 hover:text-white transition-all shadow-sm'
                >
                    View More Experts
                    <FaChevronRight className='group-hover:translate-x-1 transition-transform' size={12} />
                </button>
            )}
        </div>
    )
}

export default RelatedDoctors