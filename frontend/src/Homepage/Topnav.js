import React, { useState, useEffect } from "react";
import { getAdminByUsername, getLoggedInUser } from "../Utils/localAuth";

const TopNav = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const username = getLoggedInUser();
    const admin = username ? getAdminByUsername(username) : null;
    setData(admin ? [admin] : []);
  }, []);

  const admin = data[0] || {};

  return (
    <div className="fixed top-0 z-[899] bg-slate-50 border-b border-gray-200 h-[84px] transition-all duration-300 ease-in-out w-[calc(100%-285px)] lg:w-[calc(100%-85px)] lg:left-[85px] left-[285px] shadow-lg md:left-0 md:w-full md:h-[70px]" style={{boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)'}}>
      <div className="flex items-center justify-between h-full px-7 gap-4 md:px-4 md:gap-2">
        <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-3 gap-3 w-[560px] max-w-[560px] md:hidden" style={{color: '#6b7280'}}>
          <i className="pi pi-search text-base" style={{color: '#9ca3af'}} />
          <input type="text" placeholder="Cari data..." className="border-none outline-none w-full text-sm font-poppins text-gray-900 bg-transparent" />
        </div>

        <div className="flex items-center gap-4 md:gap-2">
          <button type="button" className="inline-flex items-center justify-center w-10 h-10 rounded-full border-none bg-white text-gray-700 cursor-pointer md:w-9 md:h-9" style={{boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)'}}>
            <i className="pi pi-envelope text-base" />
          </button>
          <button type="button" className="inline-flex items-center justify-center w-10 h-10 rounded-full border-none bg-white text-gray-700 cursor-pointer md:w-9 md:h-9" style={{boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)'}}>
            <i className="pi pi-bell text-base" />
          </button>
          <div className="flex items-center gap-3 bg-white px-3.5 py-2.5 rounded-full border border-gray-200 md:hidden" style={{boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)'}}>
            <img
              src={admin.imageUrl || "/avatar.png"}
              alt={admin.namaPemilikCafe || "Avatar"}
              className="w-11 h-11 rounded-full object-cover"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-gray-900">{admin.namaPemilikCafe || "Andri Purnama"}</span>
              <small className="text-gray-600 text-xs">{admin.emailCafe || "andrip@mail.com"}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
