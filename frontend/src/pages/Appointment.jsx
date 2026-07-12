import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'
import { FaRegCalendarCheck, FaClock, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(today)
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime) ? false : true

        if (isSlotAvailable) {
          timeSlots.push({ dateTime: new Date(currentDate), time: formattedTime })
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    try {
      const date = docSlots[slotIndex][0].dateTime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, { docId, slotDate, slotTime }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => { fetchDocInfo() }, [doctors, docId])
  useEffect(() => { if (docInfo) getAvailableSlots() }, [docInfo])

  return docInfo && (
    <div className='max-w-6xl mx-auto py-10 px-4'>
      
      {/* --- Doctor Section --- */}
      <div className='flex flex-col sm:flex-row gap-8 items-start mb-12'>
        
        {/* Profile Image Container */}
        <div className='w-full sm:w-72 relative group'>
          <div className='absolute inset-0 bg-blue-600 rounded-4xl rotate-3 group-hover:rotate-0 transition-transform duration-500 opacity-10'></div>
          <img
            className='relative z-10 bg-blue-50 w-full rounded-4xl shadow-xl border-4 border-white object-cover aspect-square'
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        {/* Doctor Info Card */}
        <div className='flex-1 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden'>
            {/* Background Decoration */}
            <div className='absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl'></div>
            
            <div className='relative z-10'>
                <div className='flex flex-wrap items-center gap-3 mb-2'>
                    <h1 className='text-3xl md:text-4xl font-black text-slate-800 tracking-tight'>{docInfo.name}</h1>
                    <FaCheckCircle className='text-blue-500 text-2xl' title="Verified Specialist" />
                </div>

                <div className='flex items-center gap-3 text-slate-500 mb-6'>
                    <p className='font-bold text-sm bg-slate-100 px-3 py-1 rounded-lg'>{docInfo.degree}</p>
                    <span className='w-1 h-1 bg-slate-300 rounded-full'></span>
                    <p className='text-blue-600 font-bold text-sm uppercase tracking-wider'>{docInfo.speciality}</p>
                    <span className='w-1 h-1 bg-slate-300 rounded-full'></span>
                    <button className='text-xs font-bold text-slate-400 border border-slate-200 px-3 py-1 rounded-full uppercase'>{docInfo.experience} EXP</button>
                </div>

                <div className='space-y-4'>
                    <div className='flex items-start gap-2'>
                        <FaInfoCircle className='text-slate-300 mt-1' />
                        <div>
                            <p className='text-xs font-black text-slate-400 uppercase tracking-widest'>About Specialist</p>
                            <p className='text-slate-600 text-sm leading-relaxed mt-1'>{docInfo.about}</p>
                        </div>
                    </div>

                    <div className='pt-6 border-t border-slate-50 flex items-center justify-between'>
                        <div className='flex flex-col'>
                            <p className='text-xs font-black text-slate-400 uppercase tracking-widest'>Consultation Fee</p>
                            <p className='text-2xl font-black text-slate-900'>{currencySymbol}{docInfo.fees}</p>
                        </div>
                        <div className='hidden md:block bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-tighter'>
                            Available for Online & In-person
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- Booking Section --- */}
      <div className='bg-slate-50 rounded-[3rem] p-8 md:p-12'>
        <div className='flex items-center gap-3 mb-8'>
            <div className='w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100'>
                <FaRegCalendarCheck />
            </div>
            <h2 className='text-2xl font-black text-slate-800 tracking-tight'>Select a Timeslot</h2>
        </div>

        {/* Days Selection */}
        <div className='flex gap-4 items-center w-full overflow-x-auto pb-6 scrollbar-hide'>
          {docSlots.length > 0 && docSlots.map((daySlots, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`flex flex-col items-center justify-center min-w-17.5 py-6 rounded-4xl cursor-pointer transition-all duration-300 ${
                slotIndex === index 
                ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200 -translate-y-2' 
                : 'bg-white text-slate-400 border border-slate-100 hover:border-blue-200'
              }`}
              key={index}
            >
              <p className='text-[10px] font-black uppercase tracking-widest mb-1'>{daySlots[0] && daysOfWeek[daySlots[0].dateTime.getDay()]}</p>
              <p className='text-xl font-black'>{daySlots[0] && daySlots[0].dateTime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Selection */}
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mt-8'>
          {docSlots.length > 0 && docSlots[slotIndex].map((slot, index) => (
            <div
              key={index}
              onClick={() => setSlotTime(slot.time)}
              className={`flex items-center justify-center py-3 rounded-2xl cursor-pointer text-xs font-bold transition-all duration-200 ${
                slot.time === slotTime
                  ? 'bg-slate-900 text-white shadow-xl scale-105'
                  : 'bg-white text-slate-500 border border-slate-100 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <FaClock className={`mr-2 ${slot.time === slotTime ? 'text-blue-400' : 'text-slate-300'}`} />
              {slot.time.toLowerCase()}
            </div>
          ))}
        </div>

        <div className='flex flex-col items-center mt-12'>
            <button 
                onClick={bookAppointment} 
                disabled={!slotTime}
                className={`group flex items-center gap-3 px-16 py-5 rounded-4xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-2xl ${
                    slotTime 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 active:scale-95 cursor-pointer' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
            >
                Confirm Appointment
                <FaCheckCircle className='group-hover:rotate-12 transition-transform' />
            </button>
            
        </div>
      </div>

      {/* Related Doctors */}
      <div className='mt-24 border-t border-slate-100 pt-16'>
        <h2 className='text-2xl font-black text-slate-800 tracking-tight mb-10 text-center'>Specialists in <span className='text-blue-600'>Related Fields</span></h2>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  )
}

export default Appointment