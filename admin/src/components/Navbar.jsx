import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)

    const navigate = useNavigate()

    // Function to handle logo click based on role
    const handleLogoClick = () => {
        if (aToken) {
            navigate('/admin-dashboard')
        } else if (dToken) {
            navigate('/doctor-dashboard')
        } else {
            navigate('/')
        }
    }

    const logout = () => {
        navigate('/') 
        if (aToken) {
            setAToken('')
            localStorage.removeItem('aToken')
        }
        if (dToken) {
            setDToken('')
            localStorage.removeItem('dToken')
        }
    }

    return (
        <nav className='sticky top-0 z-50 flex justify-between items-center px-6 sm:px-12 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm'>
            
            <div className='flex items-center gap-4'>
                {/* Logo: Now navigates to Dashboard instead of Login */}
                <img 
                    onClick={handleLogoClick}
                    className='w-36 sm:w-44 cursor-pointer hover:opacity-90 transition-all active:scale-95' 
                    src={assets.admin_logo} 
                    alt="Logo" 
                />
                
                <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                    aToken 
                    ? 'bg-blue-50 text-blue-600 border-blue-100' 
                    : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                }`}>
                    {aToken ? 'Admin Panel' : 'Doctor Portal'}
                </span>
            </div>

            <div className='flex items-center gap-6'>
                <button 
                    onClick={logout} 
                    className='bg-slate-900 hover:bg-red-600 text-white text-xs sm:text-sm font-semibold px-8 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-red-200 active:scale-95 cursor-pointer'
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar