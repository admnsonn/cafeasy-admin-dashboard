import React, { useState, useEffect } from "react";
import Iconline from "../Photos/Iconline.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  findAdmin,
  getLoggedInUser,
  setLoggedInUser,
  removeLoggedInUser,
} from "../Utils/localAuth";
import "../Utils/Sign.css";
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
    <div className="Logform-container">
      <form className="Logform" onSubmit={submitLogin}>
        <div className="Logform-content">
          <h3 className="Logform-title">Masuk</h3>
          <div className="click-button">
            <div className="row">
              <div className="col-md-3 color-text">
                <a href="">
                  Login <img src={Iconline} alt="Icon" />
                </a>
              </div>
              <div className="col-md-6">
                <a href="RegisterAdmin">Daftar</a>
              </div>
            </div>
          </div>

          <div className="form-group mt-3">
            <label>Nama Pengguna</label>
            <input
              type="text"
              required
              className="form-control mt-1"
              placeholder="Masukan Nama Pengguna"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group mt-3">
            <div className="inputbutton">
              <label>Sandi</label>
              <input
                type="password"
                required
                className="form-control mt-1"
                placeholder="Masukan Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-secondary"
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
