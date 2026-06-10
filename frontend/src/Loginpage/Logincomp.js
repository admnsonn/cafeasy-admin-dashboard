import React, { useState, useEffect } from "react";
import Iconline from "../Photos/Iconline.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  findAdmin,
  getLoggedInUser,
  setLoggedInUser,
} from "../Utils/localAuth";
// const jwt = require('jsonwebtoken');
// import { Link } from 'react-router-dom';
// import { Navigate } from "react-router-dom";
// import ProfileAdmincomp from "../Homepage/ProfileAdmincomp";
// import PropTypes from 'prop-types'

function Logincomp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nextNavigate = useNavigate();

  useEffect(() => {
    const currentUser = getLoggedInUser();
    if (currentUser) {
      nextNavigate("/ProfileAdmin", { replace: true });
    }
  }, [nextNavigate]);

  const submitLogin = async (e) => {
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Login Gagal!",
        text: "Nama Pengguna atau Sandi tidak boleh kosong!",
      });
      return;
    }

    const account = findAdmin(username, password);
    if (account) {
      setLoggedInUser(account.username);
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Berhasil!",
        showConfirmButton: false,
        timer: 1500,
      });
      nextNavigate("/ProfileAdmin", { replace: true });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Gagal!",
        text: "Nama Pengguna atau Sandi salah!!!",
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <form className="bg-gray-800 w-[550px] shadow-md p-10 rounded-2xl" onSubmit={submitLogin}>
        <div className="pl-[10%] pr-[12%]">
          <h3 className="text-center font-poppins mb-2 text-xl text-white font-black">Masuk</h3>
          <div className="mb-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">
                  Login <img src={Iconline} alt="Icon" className="w-6 h-6" />
                </span>
              </div>
              <div>
                <Link to="/RegisterAdmin" className="text-gray-400 no-underline text-sm hover:text-white transition-colors">Daftar</Link>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-semibold text-white block mb-1">Nama Pengguna</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
              placeholder="Masukan Nama Pengguna"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <div>
              <label className="text-xs font-semibold text-white block mb-1">Sandi</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                placeholder="Masukan Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Masuk
            </button>
          </div>
          
        </div>
      </form>
    </div>
  );

  // return <div className="app">{ renderForm}</div>;
}

export default Logincomp;
