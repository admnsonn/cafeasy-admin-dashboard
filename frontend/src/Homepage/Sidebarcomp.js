import React, { useState, useEffect } from "react";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logodannama from "../Photos/logodannama.png";
import { useNavigate } from "react-router-dom";
import {
  getLoggedInUser,
  removeLoggedInUser,
} from "../Utils/localAuth";

function Sidebarcomp() {
  const nextNavigate = useNavigate();
  const [isExpanded, setExpandedState] = useState(false);

  useEffect(() => {
    const username = getLoggedInUser();
    if (!username) {
      nextNavigate("/LoginAdmin");
    }
  }, [nextNavigate]);

  const logout = () => {
    removeLoggedInUser();
    nextNavigate('/LoginAdmin');
  };

  const Sidebardata = [
    {
      path: "/ProfileAdmin",
      icon: <ImIcons.ImProfile className="icon-profil" />,
      cName: "sidebar-text",
      display: "Profil Admin",
    },
    {
      path: "/DataMenu",
      icon: <MdIcons.MdMenuBook className="icon-menu" />,
      cName: "sidebar-text",
      display: "Data Menu",
    },
    {
      path: "/DataTransaksi",
      icon: <AiIcons.AiOutlineTransaction className="icon-transaksi" />,
      cName: "sidebar-text",
      display: "Data Transaksi",
    },
    {
      path: "/DataPelanggan",
      icon: <HiIcons.HiUserGroup className="icon-pelanggan" />,
      cName: "sidebar-text",
      display: "Data Pelanggan",
    },
    {
      path: "/DataKategori",
      icon: <BiIcons.BiCategory className="icon-kategori" />,
      cName: "sidebar-text",
      display: "Data Kategori",
    },
    {
      path: "/DataBanner",
      icon: <FaIcons.FaImages className="icon-banner" />,
      cName: "sidebar-text",
      display: "Data Banner",
    },
  ];

  return (
    <div className={`${isExpanded ? "" : ""}`}>
      <nav className="w-[285px] min-h-screen fixed top-0 left-0 z-[999] bg-gray-900 px-5 py-8 flex flex-col gap-6 transition-all duration-300 ease-in-out lg:flex">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center justify-center gap-3.5">
            <img src={logodannama} alt="Cafeasy Logo" className="w-[150px] h-[60px] object-contain" />
          </div>
          <button
            className="hidden lg:block p-2 text-white"
            onClick={() => setExpandedState(!isExpanded)}
          >
            <i className="pi pi-bars" />
          </button>
        </div>

        <div className="flex flex-col justify-between flex-1">
          <ul className="flex flex-col gap-3">
            {Sidebardata.map((item, index) => (
              <li className="list-none" key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive 
                      ? "flex items-center gap-4 px-4 py-3 text-slate-400 font-poppins text-sm no-underline rounded-lg bg-gray-800 text-white transition-all duration-200" 
                      : "flex items-center gap-4 px-4 py-3 text-slate-400 font-poppins text-sm no-underline rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200"
                  }
                  onClick={item.action || undefined}
                >
                  {item.icon}
                  <span className="link-text">{item.display}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <button type="button" onClick={logout} className="w-full flex items-center gap-3.5 px-4 py-3 border-none bg-transparent text-slate-400 font-poppins text-sm cursor-pointer rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200">
              <BiIcons.BiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Sidebarcomp;
