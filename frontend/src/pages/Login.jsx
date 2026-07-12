import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaStethoscope } from 'react-icons/fa'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-[90vh] flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50 px-4'>
      <form 
        onSubmit={onSubmitHandler} 
        className='w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-10 flex flex-col gap-6'
      >
        {/* Medical Icon & Title */}
        <div className='flex flex-col items-center text-center gap-2 mb-4'>
          <div className='w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 mb-2'>
            <FaStethoscope size={28} />
          </div>
          <h2 className='text-3xl font-black text-slate-800 tracking-tight'>
            {state === 'Sign Up' ? "Create Account" : "Welcome Back"}
          </h2>
          <p className='text-slate-500 text-sm font-medium'>
            {state === 'Sign Up' ? "Join the PulseLife health community" : "Manage your medical appointments"}
          </p>
        </div>

        <div className='space-y-4'>
          {/* Name Field (Conditional) */}
          {state === "Sign Up" && (
            <div className='space-y-1.5'>
              <label className='text-xs font-bold text-slate-500 uppercase tracking-widest ml-1'>Full Name</label>
              <div className='relative'>
                <FaUser className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-blue-500' />
                <input 
                  className='w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-400 focus:bg-white transition-all text-sm font-medium text-slate-700'
                  type="text" 
                  placeholder="Hari Bahadur"
                  onChange={(e) => setName(e.target.value)} 
                  value={name} 
                  required 
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className='space-y-1.5'>
            <label className='text-xs font-bold text-slate-500 uppercase tracking-widest ml-1'>Email Address</label>
            <div className='relative'>
              <FaEnvelope className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300' />
              <input 
                className='w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-400 focus:bg-white transition-all text-sm font-medium text-slate-700'
                type="email" 
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                required 
              />
            </div>
          </div>

          {/* Password Field */}
          <div className='space-y-1.5'>
            <label className='text-xs font-bold text-slate-500 uppercase tracking-widest ml-1'>Password</label>
            <div className='relative'>
              <FaLock className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300' />
              <input 
                className='w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-400 focus:bg-white transition-all text-sm font-medium text-slate-700'
                type="password" 
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                required 
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type='submit' 
          className='mt-2 bg-blue-600 text-white w-full py-4 rounded-2xl text-base font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer'
        >
          {state === 'Sign Up' ? "Create My Account" : "Access Portal"}
        </button>

        {/* Toggle State */}
        <div className='text-center pt-2'>
          {state === "Sign Up" ? (
            <p className='text-slate-500 text-sm'>
              Already have an account?{' '}
              <span onClick={() => setState('Login')} className='text-blue-600 font-bold underline-offset-4 hover:underline cursor-pointer'>
                Log in here
              </span>
            </p>
          ) : (
            <p className='text-slate-500 text-sm'>
              First time here?{' '}
              <span onClick={() => setState('Sign Up')} className='text-blue-600 font-bold underline-offset-4 hover:underline cursor-pointer'>
                Create a new account
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login