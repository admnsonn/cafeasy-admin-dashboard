import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdminById } from "../Utils/localAuth";
import "../Homepage/Topnav.css";

const TopNav = () => {
  const params = useParams();
  const urlParams = params.idAdmin;
  const [data, setData] = useState([]);

  useEffect(() => {
    const admin = getAdminById(urlParams);
    setData(admin ? [admin] : []);
  }, [urlParams]);

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
