import React, { useContext, useState } from "react";
import { assets } from '../assets/assets'
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from 'react-toastify'
import { FaUserEdit, FaSave, FaCamera, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaBirthdayCake, FaVenusMars } from 'react-icons/fa'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(
  backendUrl + '/api/user/update-profile',
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return userData && (
    <div className="max-w-4xl mx-auto py-12 px-4">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        
        {/* Blue Header Accent */}
        <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-700 relative"></div>

        <div className="px-8 pb-10 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
            
            {/* Avatar Section */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] border-4 border-white shadow-xl overflow-hidden bg-white">
                <img
                  className={`w-full h-full object-cover transition-all cursor-pointer duration-300 ${isEdit ? 'opacity-50 blur-[2px]' : ''}`}
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                />
              </div>
              
              {isEdit && (
                <label htmlFor="image" className="absolute inset-0 flex items-center justify-center cursor-pointer group">
                  <div className="bg-white/90 p-3 rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform">
                    <FaCamera className="text-blue-600 text-xl" />
                  </div>
                  <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
              )}
            </div>

            {/* Title Section */}
            <div className="flex-1 pb-2">
              {isEdit ? (
                <input
                  className="text-3xl font-black text-slate-800 bg-slate-50 border-b-2 border-blue-500 outline-none px-2 w-full max-w-sm"
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                />
              ) : (
                <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">{userData.name}</h1>
              )}
              <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-xs">Patient Account</p>
            </div>

            {/* Edit/Save Button */}
            <div className="mb-2">
              {isEdit ? (
                <button onClick={updateUserProfileData} className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all cursor-pointer">
                  <FaSave /> Save Changes
                </button>
              ) : (
                <button onClick={() => setIsEdit(true)} className="flex items-center gap-2 border-2 border-slate-100 text-slate-600 px-8 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                  <FaUserEdit /> Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            
            {/* Contact Info Column */}
            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
                Contact Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm"><FaEnvelope /></div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Email Address</p>
                    <p className="text-slate-700 font-bold">{userData.email}</p>
                  </div>
                </div>

                <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all border ${isEdit ? 'bg-white border-blue-200 shadow-md' : 'bg-slate-50/50 border-slate-100'}`}>
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-500 shadow-sm"><FaPhone /></div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Phone Number</p>
                    {isEdit ? (
                      <input className="w-full bg-transparent outline-none font-bold text-slate-700" type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                    ) : (
                      <p className="text-slate-700 font-bold">{userData.phone}</p>
                    )}
                  </div>
                </div>

                <div className={`flex items-start gap-4 p-4 rounded-2xl transition-all border ${isEdit ? 'bg-white border-blue-200 shadow-md' : 'bg-slate-50/50 border-slate-100'}`}>
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm mt-1"><FaMapMarkerAlt /></div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Mailing Address</p>
                    {isEdit ? (
                      <div className="space-y-2 mt-1">
                        <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" value={userData.address?.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                        <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" value={userData.address?.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                      </div>
                    ) : (
                      <p className="text-slate-700 font-bold text-sm leading-relaxed">{userData.address?.line1}<br/>{userData.address?.line2}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Info Column */}
            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
                Demographics
              </h2>

              <div className="space-y-4">
                <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all border ${isEdit ? 'bg-white border-blue-200 shadow-md' : 'bg-slate-50/50 border-slate-100'}`}>
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-500 shadow-sm"><FaVenusMars /></div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Gender Identity</p>
                    {isEdit ? (
                      <select className="w-full bg-transparent outline-none font-bold text-slate-700 cursor-pointer" value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    ) : (
                      <p className="text-slate-700 font-bold">{userData.gender}</p>
                    )}
                  </div>
                </div>

                <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all border ${isEdit ? 'bg-white border-blue-200 shadow-md' : 'bg-slate-50/50 border-slate-100'}`}>
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm"><FaBirthdayCake /></div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Date of Birth</p>
                    {isEdit ? (
                      <input className="w-full bg-transparent outline-none font-bold text-slate-700 cursor-pointer" type="date" value={userData.dob} onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
                    ) : (
                      <p className="text-slate-700 font-bold">{userData.dob}</p>
                    )}
                  </div>
                </div>
                
                {/* Security Note */}
                <div className="mt-8 p-6 bg-blue-50 rounded-3xl border border-blue-100">
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Privacy Notice</p>
                   <p className="text-blue-700 text-xs leading-relaxed font-medium">
                      PulseLife uses strong encryption to keep your medical information safe. Your basic details also help our AI give more accurate health predictions.
                   </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
