import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5 animate-in fade-in duration-500">
        {/* --- Top Stats Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
            <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
              <img className="w-10" src={assets.doctor_icon} alt="" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{dashData.doctors}</p>
              <p className="text-slate-500 text-sm font-medium">Total Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
            <div className="bg-emerald-50 p-3 rounded-lg group-hover:bg-emerald-100 transition-colors">
              <img className="w-10" src={assets.appointments_icon} alt="" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{dashData.appointments}</p>
              <p className="text-slate-500 text-sm font-medium">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
            <div className="bg-orange-50 p-3 rounded-lg group-hover:bg-orange-100 transition-colors">
              <img className="w-10" src={assets.patients_icon} alt="" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{dashData.patients}</p>
              <p className="text-slate-500 text-sm font-medium">Total Patients</p>
            </div>
          </div>
        </div>

        {/* --- Latest Bookings Section --- */}
        <div className="bg-white mt-8 rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center gap-2.5 px-6 py-5 bg-slate-50/50 border-b border-slate-100">
            <img className="w-5" src={assets.list_icon} alt="" />
            <p className="font-bold text-slate-800 tracking-tight">Latest Bookings</p>
          </div>

          <div className="divide-y divide-slate-100">
            {dashData.latestAppointments.map((item, index) => (
              <div 
                className="flex items-center px-6 py-4 gap-4 hover:bg-slate-50/50 transition-all" 
                key={index}
              >
                {/* Doctor Image */}
                <img 
                  className="rounded-full w-12 h-12 object-cover border-2 border-slate-100 bg-slate-50 shadow-sm" 
                  src={item.docData.image} 
                  alt="Doctor" 
                />

                {/* Details Container */}
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 font-bold text-sm truncate">
                    {item.docData.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-slate-500 text-xs font-medium">
                      {slotDateFormat(item.slotDate)}
                    </p>
                    <span className="text-slate-300">•</span>
                    <p className="text-blue-600 text-[11px] font-bold uppercase">
                      Patient: {item.userData?.name || "Member"}
                    </p>
                  </div>
                </div>

                {/* Status / Action Buttons */}
                <div className="flex items-center shrink-0">
                  {item.cancelled ? (
                    <div className="px-3 py-1 rounded-full bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-widest border border-red-100">
                      Cancelled
                    </div>
                  ) : item.isCompleted ? (
                    <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                      Completed
                    </div>
                  ) : (
                    <div 
                        onClick={() => cancelAppointment(item._id)}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 cursor-pointer transition-all active:scale-90 border border-red-100 group"
                        title="Cancel Appointment"
                    >
                      {/* FIXED: Removed opacity-40 so it is always visible */}
                      <img 
                        className="w-5 grayscale group-hover:grayscale-0 transition-all" 
                        src={assets.cancel_icon} 
                        alt="Cancel" 
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer */}
          <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
             <button 
                onClick={() => getDashData()} 
                className="text-blue-600 text-xs font-bold hover:underline"
              >
                Update Dashboard Stats
              </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
