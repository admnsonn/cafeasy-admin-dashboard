import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { getAdminByUsername } from "../Utils/localAuth";
import "../Homepage/Topnav.css";

const TopNav = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("secretLogToken");
    let username = null;

    if (token) {
      try {
        username = JSON.parse(token).username;
      } catch (err) {
        username = null;
      }
    }

    const admin = username ? getAdminByUsername(username) : null;
    setData(admin ? [admin] : []);
  }, []);

  let arr = data ?? [];


  return (
    <div className="topnav">
      <div className="topnav-wrapper">
        <div className="search__box"></div>
        <div className="topnav-right">
          <div className="profil">
            <i>{arr[0]?.namaPemilikCafe}</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
