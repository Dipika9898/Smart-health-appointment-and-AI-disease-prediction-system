import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from 'react-toastify';
import axios from 'axios'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address, setAddress] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) {
                return toast.error('Image Not Selected')
            }
            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { 
    headers: { 
        Authorization: `Bearer ${aToken}` 
    } 
})

            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full max-w-300">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Add New Doctor Profile</h2>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100 w-full">
                
                {/* --- Image Upload Section --- */}
                <div className='flex items-center gap-6 mb-10 pb-8 border-b border-slate-50'>
                    <label htmlFor="doc-img" className="relative group cursor-pointer">
                        <img 
                            className='w-24 h-24 md:w-28 md:h-28 bg-slate-50 rounded-2xl object-cover border-2 border-dashed border-slate-200 group-hover:border-blue-400 transition-all' 
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                            alt="" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity">
                             <span className="text-[10px] font-bold text-blue-600 bg-white px-2 py-1 rounded shadow-sm">Change</span>
                        </div>
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <div>
                        <p className="text-slate-700 font-semibold mb-1">Doctor's Photo</p>
                        <p className="text-xs text-slate-400">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                </div>

                {/* --- Form Fields Grid --- */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 text-slate-600'>
                    
                    {/* Left Column */}
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-1.5'>
                            <p className="text-sm font-semibold text-slate-700">Full Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm" type="text" placeholder="Dr. John Doe" required />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <p className="text-sm font-semibold text-slate-700">Official Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm" type="email" placeholder="doctor@hospital.com" required />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <p className="text-sm font-semibold text-slate-700">Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm" type="password" placeholder="••••••••" required />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <p className="text-sm font-semibold text-slate-700">Professional Experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm cursor-pointer">
                                {[...Array(10)].map((_, i) => (
                                    <option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <p className="text-sm font-semibold text-slate-700">Consultation Fees</p>
                            <div className="relative">
                                <span className="absolute left-4 top-3 text-slate-400">Rs.</span>
                                <input onChange={(e) => setFees(e.target.value)} value={fees} className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-12 pr-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm" type="number" placeholder="500" required />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-5">
                        <div className='flex flex-col gap-1.5'>
                            <p className="text-sm font-semibold text-slate-700">Medical Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm cursor-pointer">
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Dentist">Dentist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="General Physician">General Physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Pediatrician">Pediatrician</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <p className="text-sm font-semibold text-slate-700">Education / Degree</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm" type="text" placeholder="MBBS, MD" required />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <p className="text-sm font-semibold text-slate-700">Clinic Address</p>
                            <input onChange={(e) => setAddress(e.target.value)} value={address} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm" type="text" placeholder="Koteshwor, Kathmandu" required />
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <p className="text-sm font-semibold text-slate-700">About Doctor</p>
                            <textarea onChange={(e) => setAbout(e.target.value)} value={about} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm resize-none" placeholder="Briefly describe the doctor's professional background..." rows={5} required />
                        </div>
                    </div>
                </div>

                {/* --- Submit Button --- */}
                <div className="mt-10 flex justify-end">
                    <button 
                        type='submit' 
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-4 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95 cursor-pointer"
                    >
                        Save Doctor Profile
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddDoctor;
