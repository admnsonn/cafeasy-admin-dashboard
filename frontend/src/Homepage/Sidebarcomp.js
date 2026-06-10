import React, { useState, useEffect } from "react";
import "../Homepage/Sidebarpage.css";
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
    <div className={`sidebar-wrapper ${isExpanded ? "expanded" : ""}`}>
      <nav className="sidebar flex flex-column h-full">
        <div className="sidebar-top sidebar-bg flex align-items-center justify-content-between p-3">
          <div className="sidebar-brand">
            <img src={logodannama} alt="Cafeasy Logo" />
          </div>
          <button
            className="p-link layout-topbar-button lg:hidden"
            onClick={() => setExpandedState(!isExpanded)}
          >
            <i className="pi pi-bars" />
          </button>
        </div>

        <div className="sidebar-content">
          <ul className="sidebar-list">
            {Sidebardata.map((item, index) => (
              <li className={item.cName} key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "sidebar-active sidebar-link" : "sidebar-link"
                  } // Apply active class if needed
                  onClick={item.action || undefined} // Handle logout action
                >
                  {item.icon}
                  <span className="link-text">{item.display}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="sidebar-bottom">
            <button type="button" onClick={logout} className="sidebar-logout">
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
