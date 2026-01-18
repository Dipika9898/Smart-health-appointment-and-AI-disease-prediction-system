import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="speciality"
    >
      <h1 className="text-3xl font-medium">
        Find Doctors by their Speciality
      </h1>

      <p className="sm:w-1/3 text-center text-sm">
        Browse our extensive list of trusted doctors by speciality and book your appointment effortlessly.
      </p> 

      {/* GRID FIX */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 pt-8 w-full max-w-5xl">
        {specialityData.map((item, index) => (
          <Link
            key={index} 
            onClick={()=>scrollTo(0,0)}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center text-xs cursor-pointer hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-blue-50 border border-blue-100 shadow-sm flex items-center justify-center">

                <img
                    src={item.image}
                    alt={item.speciality}
                    
                />
            </div>



            <p className="mt-2 text-center">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
