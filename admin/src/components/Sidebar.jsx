import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  // Standardized Link Styles for all sidebar items
  const linkStyles = ({ isActive }) => 
    `flex items-center justify-center md:justify-start gap-4 py-4 px-4 md:px-10 cursor-pointer transition-all duration-300 border-r-4 group ${
      isActive 
      ? 'bg-blue-50/80 border-blue-600 text-blue-700 font-bold' 
      : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800'
    }`

  return (
    <div className='min-h-screen bg-white border-r border-slate-100 shadow-[2px_0_10px_rgba(0,0,0,0.02)] w-16 md:w-72 transition-all duration-300'>
      
      {/* Admin Menu */}
      {aToken && (
        <ul className='flex flex-col gap-1 mt-6'>
          
          {/* Dashboard Link */}
          <NavLink className={linkStyles} to={'/admin-dashboard'}>
            <div className='w-6 flex justify-center'>
                <img className='w-5 opacity-70 group-hover:opacity-100 transition-opacity' src={assets.home_icon} alt=""/>
            </div>
            <p className='hidden md:block text-sm tracking-wide'>Dashboard</p>
          </NavLink>

          {/* Appointments Link */}
          <NavLink className={linkStyles} to={'/all-appointments'}>
            <div className='w-6 flex justify-center'>
                <img className='w-5 opacity-70 group-hover:opacity-100 transition-opacity' src={assets.appointment_icon} alt=""/>
            </div>
            <p className='hidden md:block text-sm tracking-wide'>Appointments</p>
          </NavLink>

          {/* Add Doctor Link */}
          <NavLink className={linkStyles} to={'/add-doctor'}>
            <div className='w-6 flex justify-center'>
                <img className='w-5 opacity-70 group-hover:opacity-100 transition-opacity' src={assets.add_icon} alt=""/>
            </div>
            <p className='hidden md:block text-sm tracking-wide'>Add Doctor</p>
          </NavLink>

          {/* Doctors List Link - Now Standardized */}
          <NavLink className={linkStyles} to={'/doctors-list'}>
            <div className='w-6 flex justify-center'>
                <img className='w-5 opacity-70 group-hover:opacity-100 transition-opacity' src={assets.people_icon} alt=""/>
            </div>
            <p className='hidden md:block text-sm tracking-wide'>Doctors List</p>
          </NavLink>
          
        </ul>
      )}

      {/* Doctor Menu */}
      {dToken && (
        <ul className='flex flex-col gap-1 mt-6'>
          <NavLink className={linkStyles} to={'/doctor-dashboard'}>
            <div className='w-6 flex justify-center'>
                <img className='w-5 opacity-70 group-hover:opacity-100 transition-opacity' src={assets.home_icon} alt=""/>
            </div>
            <p className='hidden md:block text-sm tracking-wide'>Overview</p>
          </NavLink>

          <NavLink className={linkStyles} to={'/doctor-appointments'}>
            <div className='w-6 flex justify-center'>
                <img className='w-5 opacity-70 group-hover:opacity-100 transition-opacity' src={assets.appointment_icon} alt=""/>
            </div>
            <p className='hidden md:block text-sm tracking-wide'>My Appointments</p>
          </NavLink>

          <NavLink className={linkStyles} to={'/doctor-profile'}>
            <div className='w-6 flex justify-center'>
                <img className='w-5 opacity-70 group-hover:opacity-100 transition-opacity' src={assets.people_icon} alt=""/>
            </div>
            <p className='hidden md:block text-sm tracking-wide'>Doctor Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar