import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Connection error. Please try again.");
      console.log("Login error:", error.response || error);
    }
  };

  return (
    <div className='min-h-[90vh] flex flex-col items-center justify-center bg-slate-50/50 px-4'>
      {/* --- Branding Section --- */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Pulse Life</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium italic">Hospital Management System</p>
      </div>

      <form 
        onSubmit={onSubmitHandler} 
        className='w-full max-w-100 bg-white p-10 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col gap-5'
      >
        <div className="text-center">
          <p className='text-xl font-bold text-slate-700'>
            <span className={state === 'Admin' ? "text-blue-600" : "text-emerald-600"}>{state}</span> Login
          </p>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Authorized Access Only</p>
        </div>

        {/* Email Field */}
        <div className="w-full">
          <label className="text-xs font-bold text-slate-600 uppercase mb-1 block">Email Address</label>
          <input 
            onChange={(e) => setEmail(e.target.value)}
            value={email} 
            className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all text-sm bg-slate-50/30" 
            type="email" 
            placeholder="name@hospital.com"
            required 
          />
        </div>

        {/* Password Field */}
        <div className='w-full'>
          <label className="text-xs font-bold text-slate-600 uppercase mb-1 block">Password</label>
          <input 
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
            className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all text-sm bg-slate-50/30" 
            type="password" 
            placeholder="••••••••"
            required 
          />
        </div>

        {/* Submit Button */}
        <button 
          className={`w-full py-3 rounded-xl text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer mt-2 ${
            state === 'Admin' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-100' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
          }`} 
          type="submit"
        >
          Access Portal
        </button>

        {/* Toggle between Admin/Doctor */}
        <div className="text-center mt-2">
          {state === 'Admin' ? (
            <p className="text-slate-500 text-sm">
              Are you a Doctor? 
              <span 
                className="text-blue-600 font-bold ml-1 cursor-pointer hover:underline" 
                onClick={() => setState('Doctor')}
              > Login Here</span>
            </p>
          ) : (
            <p className="text-slate-500 text-sm">
              System Admin? 
              <span 
                className="text-emerald-600 font-bold ml-1 cursor-pointer hover:underline" 
                onClick={() => setState('Admin')}
              > Access Admin Login</span>
            </p>
          )}
        </div>
      </form>
      
      {/* Footer Note */}
      <p className="mt-8 text-slate-400 text-[10px] font-medium uppercase tracking-[3px]">Secure Endpoint 256-bit AES</p>
    </div>
  );
};

export default Login;