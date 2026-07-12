import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false)

    // --- NEW: Global Scroll & Navigation Handler ---
    const handleScrollNavigate = (path) => {
        navigate(path);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' // 'instant' prevents the weird "sliding" visual during page changes
        });
        setShowMenu(false); // Closes mobile sidebar if open
    }

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        handleScrollNavigate('/login') // Use scroll handler for logout too
    }

    return (
        <div className='flex items-center justify-between text-sm py-5 mb-8 border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-md z-40 px-2 md:px-0'>
            
            {/* Logo Section */}
            <div className='flex items-center gap-2'>
                <img 
                    onClick={() => handleScrollNavigate('/')} // Added scroll logic
                    className='w-40 md:w-48 cursor-pointer hover:opacity-80 transition-opacity' 
                    src={assets.logo} 
                    alt="PulseLife Logo" 
                />
            </div>

            {/* Desktop Navigation */}
            <ul className='hidden md:flex items-center gap-8 font-semibold text-slate-600'>
                <NavLink 
                    to='/' 
                    onClick={() => window.scrollTo(0,0)} // Resets scroll on desktop click
                    className={({ isActive }) => `relative py-1 transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600' : ''}`}
                >
                    <li className='list-none uppercase tracking-wider text-[12px]'>Home</li>
                </NavLink>

                <NavLink 
                    to='/doctors' 
                    onClick={() => window.scrollTo(0,0)} 
                    className={({ isActive }) => `relative py-1 transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600' : ''}`}
                >
                    <li className='list-none uppercase tracking-wider text-[12px]'>Doctors List</li>
                </NavLink>

                <NavLink 
                    to='/about' 
                    onClick={() => window.scrollTo(0,0)} 
                    className={({ isActive }) => `relative py-1 transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600' : ''}`}
                >
                    <li className='list-none uppercase tracking-wider text-[12px]'>About Us</li>
                </NavLink>

                <NavLink 
                    to='/contact' 
                    onClick={() => window.scrollTo(0,0)} 
                    className={({ isActive }) => `relative py-1 transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600' : ''}`}
                >
                    <li className='list-none uppercase tracking-wider text-[12px]'>Contact</li>
                </NavLink>
            </ul>

            {/* Action Section */}
            <div className='flex items-center gap-5'>
                {
                    token && userData
                        ? <div className='flex items-center gap-3 cursor-pointer group relative bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 hover:bg-white hover:shadow-md transition-all'>
                            <img className='w-8 h-8 rounded-full object-cover border border-blue-200' src={userData.image} alt="Profile" />
                            <div className='hidden sm:block text-left'>
                                <p className='text-[11px] font-bold text-slate-700 leading-none'>{userData.name.split(' ')[0]}</p>
                                <p className='text-[9px] text-blue-500 font-medium'>Patient Portal</p>
                            </div>
                            <img className='w-2.5 opacity-50' src={assets.dropdown_icon} alt="" />
                            
                            <div className='absolute top-full right-0 mt-2 pt-2 text-base font-medium text-gray-600 z-50 hidden group-hover:block transition-all duration-300 transform origin-top-right'>
                                <div className='min-w-56 bg-white rounded-xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden'>
                                    <div className='px-5 py-3 bg-slate-50 border-b border-slate-100'>
                                        <p className='text-xs text-slate-400'>Signed in as</p>
                                        <p className='text-sm font-bold text-slate-700 truncate'>{userData.email}</p>
                                    </div>
                                    <p onClick={() => handleScrollNavigate('/my-profile')} className='px-5 py-3 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors text-sm'>My Medical Profile</p>
                                    <p onClick={() => handleScrollNavigate('/my-appointments')} className='px-5 py-3 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors text-sm'>Appointments History</p>
                                    <div className='border-t border-slate-100'>
                                        <p onClick={logout} className='px-5 py-3 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors text-sm font-bold'>Logout</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <button 
                            onClick={() => handleScrollNavigate('/login')} 
                            className='bg-blue-600 text-white px-7 py-2.5 rounded-full text-xs font-bold hidden md:block hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all cursor-pointer'
                          >
                            Access Portal
                          </button>
                }
                
                {/* Mobile Menu Icon */}
                <button 
                    onClick={() => setShowMenu(true)} 
                    className='p-2 bg-slate-100 rounded-lg md:hidden hover:bg-slate-200 transition-colors'
                >
                    <img className='w-5' src={assets.menu_icon} alt="Menu" />
                </button>

                {/* Mobile Navigation Sidebar */}
                <div className={`${showMenu ? 'fixed inset-0 w-full translate-x-0' : 'fixed inset-0 w-0 translate-x-full'} md:hidden z-50 overflow-hidden bg-white transition-all duration-500 ease-in-out`}>
                    <div className='flex items-center justify-between px-6 py-6 border-b border-slate-100'>
                        <img className='w-36' onClick={() => handleScrollNavigate('/')} src={assets.logo} alt="Logo" />
                        <button onClick={() => setShowMenu(false)} className='p-2 bg-slate-50 rounded-full'>
                            <img className='w-6' src={assets.cross_icon} alt="Close" />
                        </button>
                    </div>
                    <ul className='flex flex-col items-start gap-4 mt-8 px-8 text-xl font-bold text-slate-800'>
                        {/* Mobile links use the helper to close menu AND scroll up */}
                        <li onClick={() => handleScrollNavigate('/')} className='w-full py-3 border-b border-slate-50 hover:text-blue-600 transition-colors cursor-pointer'>Home</li>
                        <li onClick={() => handleScrollNavigate('/doctors')} className='w-full py-3 border-b border-slate-50 hover:text-blue-600 transition-colors cursor-pointer'>Specialists</li>
                        <li onClick={() => handleScrollNavigate('/about')} className='w-full py-3 border-b border-slate-50 hover:text-blue-600 transition-colors cursor-pointer'>About Clinic</li>
                        <li onClick={() => handleScrollNavigate('/contact')} className='w-full py-3 border-b border-slate-50 hover:text-blue-600 transition-colors cursor-pointer'>Support</li>
                        
                        {!token && (
                            <button onClick={() => handleScrollNavigate('/login')} className='w-full bg-blue-600 text-white py-4 rounded-2xl mt-6 shadow-xl cursor-pointer'>
                                Login to Portal
                            </button>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar