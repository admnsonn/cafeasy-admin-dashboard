import React, { useState, useEffect } from "react";
import { getAdminByUsername, getLoggedInUser } from "../Utils/localAuth";
import "../Homepage/Topnav.css";

const TopNav = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const username = getLoggedInUser();
    const admin = username ? getAdminByUsername(username) : null;
    setData(admin ? [admin] : []);
  }, []);

  const admin = data[0] || {};

  return (
    <div className="topnav">
      <div className="topnav-wrapper">
        <div className="topnav-search">
          <i className="pi pi-search" />
          <input type="text" placeholder="Cari data..." />
        </div>

        <div className="topnav-right">
          <button type="button" className="topnav-icon-button">
            <i className="pi pi-envelope" />
          </button>
          <button type="button" className="topnav-icon-button">
            <i className="pi pi-bell" />
          </button>
          <div className="topnav-profile">
            <img
              src={admin.imageUrl || "/avatar.png"}
              alt={admin.namaPemilikCafe || "Avatar"}
            />
            <div className="topnav-profile-info">
              <span>{admin.namaPemilikCafe || "Andri Purnama"}</span>
              <small>{admin.emailCafe || "andrip@mail.com"}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
