import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }
      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { Authorization: `Bearer ${dToken}` } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className='m-5 animate-in fade-in duration-500'>
      
      {/* --- Main Container with Centered Content for smaller image --- */}
      <div className='flex flex-col lg:flex-row gap-10 items-start max-w-5xl lg:m-auto'>

        {/* --- Left Side: Smaller Doctor Image & Status --- */}
        {/* FIXED: Dynamic width to make image smaller on desktop (w-48) */}
        <div className='w-full lg:w-48 shrink-0 flex flex-col items-center lg:items-start'>
          <img
            className='bg-blue-500 w-48 h-48 lg:w-full lg:h-auto rounded-full lg:rounded-2xl shadow-lg border-4 border-white object-cover aspect-square'
            src={profileData?.image}
            alt="doctor"
          />
          
          <div className={`mt-5 flex items-center justify-center gap-2 p-3 w-48 lg:w-full rounded-full lg:rounded-xl border ${profileData?.available ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
            <input
              type="checkbox"
              className='w-4 h-4 accent-emerald-500'
              checked={profileData?.available}
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
            />
            <label className={`text-[11px] font-bold uppercase tracking-tight ${profileData?.available ? 'text-emerald-600' : 'text-red-500'}`}>
              {profileData?.available ? 'Available' : 'Unavailable'}
            </label>
          </div>
        </div>

        {/* --- Right Side: Clean Profile Card --- */}
        <div className='flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10'>
          
          {/* Header Info */}
          <div className='border-b border-slate-50 pb-6'>
            <h1 className='text-4xl font-extrabold text-slate-800 tracking-tighter'>
                {profileData?.name}
            </h1>
            <div className='flex flex-wrap items-center gap-3 mt-3'>
                <p className='text-blue-600 bg-blue-50 px-3 py-1 rounded-md text-sm font-bold uppercase tracking-wide'>
                    {profileData?.degree}
                </p>
                <p className='text-slate-600 font-semibold'>
                    {profileData?.speciality}
                </p>
                <span className='px-2.5 py-0.5 border border-slate-200 text-[11px] rounded-full text-slate-400 font-bold uppercase tracking-wider'>
                    {profileData?.experience} Experience
                </span>
            </div>
          </div>

          {/* Body Content */}
          <div className='mt-8 space-y-8'>
            
            {/* About Section */}
            <div>
              <p className='text-xs font-black text-slate-400 uppercase tracking-[2px] mb-3'>Professional Biography</p>
              <p className='text-slate-600 leading-relaxed max-w-2xl'>
                {profileData?.about}
              </p>
            </div>

            {/* Fee Section */}
            <div className='flex flex-col gap-1'>
              <p className='text-xs font-black text-slate-400 uppercase tracking-[2px]'>Consultation Fee</p>
              <div className='flex items-center gap-2 mt-1.5'>
                <span className='text-2xl font-black text-slate-900'>{currency}</span>
                {isEdit ? (
                    <input
                      type="number"
                      className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-lg font-black w-40 focus:outline-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      value={profileData?.fees || ""}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                    />
                ) : (
                    <span className='text-2xl font-black text-slate-900'>{profileData?.fees}</span>
                )}
              </div>
            </div>

            {/* Address Section */}
            <div className='bg-slate-50/50 p-6 rounded-2xl border border-slate-100'>
              <p className='text-xs font-black text-slate-400 uppercase tracking-[2px] mb-4'>Address</p>
              <div className='space-y-3'>
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      placeholder="Street Address Line 1"
                      className="w-full bg-white border border-slate-200 px-4 py-3 rounded-lg focus:outline-blue-500"
                      value={profileData?.address?.line1 || ""}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    />
                    <input
                      type="text"
                      placeholder="Suite / Unit / Floor"
                      className="w-full bg-white border border-slate-200 px-4 py-3 rounded-lg focus:outline-blue-500"
                      value={profileData?.address?.line2 || ""}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                    />
                  </>
                ) : (
                  <p className='text-slate-800 font-medium leading-relaxed'>
                    {profileData?.address?.line1} <br />
                    {profileData?.address?.line2}
                  </p>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className='pt-6 border-t border-slate-50 flex justify-end'>
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className='bg-blue-600 text-white px-12 py-3.5 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 cursor-pointer'
                >
                  Save Profile Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className='bg-white border-2 border-blue-600 text-blue-600 px-12 py-3.5 rounded-full font-bold hover:bg-blue-50 transition-all active:scale-95 cursor-pointer'
                >
                  Edit Information
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile