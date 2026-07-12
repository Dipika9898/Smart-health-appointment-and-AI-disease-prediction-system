import React, { useContext, useState, useEffect, useCallback } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import EsewaLogo from '../assets/Esewa_logo.png'
import KhaltiLogo from '../assets/Khalti_logo.png'
import { useNavigate } from 'react-router-dom'
import { FaCalendarAlt, FaMapMarkerAlt, FaTimes, FaWallet, FaCheckCircle, FaUserMd } from 'react-icons/fa'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "";
    const dateArray = slotDate.split('_');
    if (dateArray.length !== 3) return slotDate;
    return `${dateArray[0]} ${months[Number(dateArray[1])] || ""} ${dateArray[2]}`;
  };

  const getUserAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      toast.error(error.message)
    }
  }, [backendUrl, token])

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Payment Handlers
  const payWithEsewa = (appointment) => {
    const form = document.createElement("form")
    form.method = "POST"
    form.action = "https://uat.esewa.com/epay/main" // Use live URL for production
    form.innerHTML = `
      <input name="tAmt" value="${appointment.amount}" type="hidden"/>
      <input name="amt" value="${appointment.amount}" type="hidden"/>
      <input name="txAmt" value="0" type="hidden"/>
      <input name="psc" value="0" type="hidden"/>
      <input name="pdc" value="0" type="hidden"/>
      <input name="scd" value="EPAYTEST" type="hidden"/>
      <input name="pid" value="${appointment._id}" type="hidden"/>
      <input name="su" value="http://localhost:5173/payment-success" type="hidden"/>
      <input name="fu" value="http://localhost:5173/payment-failure" type="hidden"/>
    `
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  const payWithKhalti = (appointment) => {
    if (!window.KhaltiCheckout) {
      toast.error("Khalti SDK failed to load. Please check your internet or script tag.")
      return
    }

    const config = {
      publicKey: "YOUR_KHALTI_PUBLIC_KEY", // Replace with your actual key
      productIdentity: appointment._id,
      productName: "Doctor Appointment",
      productUrl: window.location.href,
      eventHandler: {
        onSuccess(payload) {
          axios.post(`${backendUrl}/api/user/payment/khalti/verify`, 
            { token: payload.token, amount: appointment.amount * 100, appointmentId: appointment._id }, 
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(res => {
            if (res.data.success) {
              toast.success("Payment Successful")
              getUserAppointments()
            }
          }).catch(() => toast.error("Verification Error"))
        },
        onError(error) { console.error(error) },
        onClose() { console.log("Khalti widget closed") }
      },
      paymentPreference: ["KHALTI"]
    }
    const checkout = new window.KhaltiCheckout(config)
    checkout.show({ amount: appointment.amount * 100 })
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token, getUserAppointments])

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className='flex items-center gap-3 mb-8 border-b border-slate-100 pb-6'>
        <div className='w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100'>
          <FaCalendarAlt size={20} />
        </div>
        <div>
          <h1 className='text-2xl font-black text-slate-800 tracking-tight'>My Appointments</h1>
          
        </div>
      </div>

      <div className="space-y-6">
        {appointments.length > 0 ? appointments.map((item, index) => (
          <div key={index} className={`group relative bg-white rounded-4xl border transition-all duration-300 ${item.cancelled ? 'border-red-100 bg-red-50/10' : 'border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50'}`}>
            
            <div className="flex flex-col md:flex-row p-6 md:p-8 gap-8 items-center">
              
              {/* Doctor Avatar */}
              <div className="relative shrink-0">
                <div className={`absolute inset-0 rounded-3xl rotate-6 transition-transform group-hover:rotate-0 ${item.cancelled ? 'bg-red-100' : 'bg-blue-50'}`}></div>
                <img className="relative z-10 w-28 h-28 md:w-32 md:h-32 object-cover rounded-3xl border-4 border-white shadow-sm" src={item.docData.image} alt={item.docData.name} />
              </div>

              {/* Appointment Content */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-4 justify-center md:justify-start'>
                  <h3 className='text-xl font-black text-slate-800'>{item.docData.name}</h3>
                  <span className='inline-block px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest'>
                    {item.docData.speciality}
                  </span>
                </div>

                <div className='flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-500 text-sm'>
                  <div className='flex items-center gap-2'>
                    <FaMapMarkerAlt className='text-blue-400' />
                    <p className='font-medium'>{item.docData.address?.line1}, {item.docData.address?.line2}</p>
                  </div>
                </div>

                <div className='inline-flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100'>
                  <FaCalendarAlt className='text-slate-400' size={14} />
                  <p className='text-sm font-bold text-slate-700'>
                    {slotDateFormat(item.slotDate)} <span className='mx-2 text-slate-300'>|</span> {item.slotTime}
                  </p>
                </div>
              </div>

              {/* Status & Actions Section */}
              <div className="w-full md:w-64 flex flex-col gap-3">
                
                {/* 1. Show Payment Options if NOT cancelled, NOT paid, and NOT completed */}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <>
                    <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-1'>Choose Payment Method</p>
                    <div className='grid grid-cols-2 gap-2'>
                      <button onClick={() => payWithEsewa(item)} className='flex flex-col items-center justify-center gap-1 border border-slate-100 rounded-2xl p-3 hover:bg-green-50 hover:border-green-200 transition-all'>
                        <img src={EsewaLogo} alt="eSewa" className="w-8 h-8 object-contain"/>
                        <span className='text-[10px] font-bold text-slate-600 cursor-pointer'>eSewa</span>
                      </button>
                      <button onClick={() => payWithKhalti(item)} className='flex flex-col items-center justify-center gap-1 border border-slate-100 rounded-2xl p-3 hover:bg-purple-50 hover:border-purple-200 transition-all'>
                        <img src={KhaltiLogo} alt="Khalti" className="w-8 h-8 object-contain"/>
                        <span className='text-[10px] font-bold text-slate-600 cursor-pointer'>Khalti</span>
                      </button>
                    </div>
                  </>
                )}

                {/* 2. Show "Paid" status if paid and not completed */}
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <div className='flex items-center justify-center gap-2 py-4 bg-green-50 text-green-600 rounded-2xl border border-green-100 font-black text-xs uppercase tracking-widest'>
                    <FaCheckCircle /> Paid Securely
                  </div>
                )}

                {/* 3. Show "Cancel" button only if NOT already cancelled and NOT completed */}
                {!item.cancelled && !item.isCompleted && (
                  <button onClick={() => cancelAppointment(item._id)} className='flex items-center justify-center gap-2 w-full py-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all cursor-pointer'>
                    <FaTimes /> Cancel Appointment
                  </button>
                )}

                {/* 4. Show "Cancelled" status if cancelled */}
                {item.cancelled &&  (
                  <div className='py-4 text-center bg-red-50 text-red-500 rounded-2xl border border-red-100 font-black text-xs uppercase tracking-widest'>
                    Cancelled
                  </div>
                )}

                {/* 5. Show "Completed" status if completed */}
                {item.isCompleted && (
                  <div className='py-4 text-center bg-green-50 text-green-600 rounded-2xl border border-green-100 font-black text-xs uppercase tracking-widest'>
                    Completed
                  </div>
                )}
              </div>

            </div>
          </div>
        )) : (
          <div className='flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center px-6'>
            <div className='w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-sm'>
              <FaCalendarAlt size={40} />
            </div>
            <h2 className='text-xl font-black text-slate-800'>No Appointments Yet</h2>
            <p className='text-slate-500 text-sm mt-2 max-w-xs'>You haven't scheduled any medical consultations. Find a specialist to get started.</p>
            <button onClick={() => navigate('/doctors')} className='mt-8 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all'>Find Doctors</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAppointments