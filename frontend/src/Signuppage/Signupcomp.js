import React, { useState } from "react";
import Swal from "sweetalert2";
import Iconline1 from "../Photos/Iconline1.png";
import { useNavigate } from "react-router-dom";
import { addAdmin, isUsernameTaken } from "../Utils/localAuth";

const USER_DEFAULT = {
  username: "",
  emailCafe: "",
  password: "",
  namaCafe: "",
  alamatCafe: "",
  deskripsiCafe: "",
  namaPemilikCafe: "",
  noHpCafe: "",
  image: "",
};

const Signupcomp = () => {
  const [user, setUser] = useState(USER_DEFAULT);
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.username.trim() === "" || user.password.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Register Gagal!",
        text: "Nama Pengguna dan kata sandi tidak boleh kosong!",
      });
      return;
    }

    if (isUsernameTaken(user.username)) {
      Swal.fire({
        icon: "error",
        title: "Register Gagal!",
        text: "Nama pengguna sudah terdaftar.",
      });
      return;
    }

    const newAdmin = addAdmin({
      username: user.username,
      password: user.password,
      emailCafe: user.emailCafe,
      namaCafe: user.namaCafe,
      alamatCafe: user.alamatCafe,
      deskripsiCafe: user.deskripsiCafe,
      namaPemilikCafe: user.namaPemilikCafe,
      noHpCafe: user.noHpCafe,
      imageUrl: "/avatar.png",
    });

    if (newAdmin) {
      Swal.fire("Daftar Berhasil!", "Kamu Berhasil Daftar!", "success");
      Navigate("/LoginAdmin");
      setUser(USER_DEFAULT);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen min-h-screen">
      <form className="bg-gray-800 w-[550px] shadow-md p-10 rounded-2xl">
        <div className="pl-[10%] pr-[12%]">
          <h3 className="text-center font-poppins mb-2 text-xl text-white font-black">Daftar</h3>

          <div className="flex justify-between mb-4">
            <div className="">
              <a href="LoginAdmin" className="text-gray-400 no-underline text-sm hover:text-white transition-colors">Login</a>
            </div>
            <div className="">
              <a href="" className="text-gray-400 no-underline text-sm hover:text-white transition-colors">
                Daftar <img src={Iconline1} alt="Icon" className="w-6 h-6 inline" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-white block mb-1">Email</label>
              <input
                defaultValue={user.emailCafe}
                onChange={(e) =>
                  setUser((data) => ({ ...data, emailCafe: e.target.value }))
                }
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                placeholder="Masukan Email"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-white block mb-1">Nama Pengguna</label>
              <input
                defaultValue={user.username}
                onChange={(e) =>
                  setUser((data) => ({ ...data, username: e.target.value }))
                }
                type="text"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                placeholder="Masukan Nama Pengguna"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-white block mb-1">Sandi</label>
              <input
                defaultValue={user.password}
                onChange={(e) =>
                  setUser((data) => ({ ...data, password: e.target.value }))
                }
                type="password"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                placeholder="Masukan Sandi"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-white block mb-1">Nama Cafe</label>
              <input
                defaultValue={user.namaCafe}
                onChange={(e) =>
                  setUser((data) => ({ ...data, namaCafe: e.target.value }))
                }
                type="text"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                placeholder="Masukan Nama Cafe"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-semibold text-white block mb-1">Alamat Cafe</label>
            <textarea
              defaultValue={user.alamatCafe}
              onChange={(e) =>
                setUser((data) => ({ ...data, alamatCafe: e.target.value }))
              }
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
              placeholder="Masukan Alamat"
            />
          </div>
          <div className="mb-4">
            <label className="text-xs font-semibold text-white block mb-1">Deskripsi Cafe</label>
            <textarea
              defaultValue={user.deskripsiCafe}
              onChange={(e) =>
                setUser((data) => ({ ...data, deskripsiCafe: e.target.value }))
              }
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
              placeholder="Masukan Deskripsi"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-white block mb-1">Nama Pemilik Cafe</label>
              <input
                defaultValue={user.namaPemilikCafe}
                onChange={(e) =>
                  setUser((data) => ({
                    ...data,
                    namaPemilikCafe: e.target.value,
                  }))
                }
                type="text"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                placeholder="Masukan Nama Pemilik"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-white block mb-1">No Telepon</label>
              <input
                value={user.noHpCafe}
                onChange={(e) =>
                  setUser((data) => ({
                    ...data,
                    noHpCafe: e.target.value,
                  }))
                }
                type="tel"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                placeholder="Masukan Nomor Telepon"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-semibold text-white block mb-1">Foto Cafe</label>
            <input
              onChange={(e) =>
                setUser((data) => ({
                  ...data,
                  image: e.target.files[0],
                }))
              }
              type="file"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              onClick={handleSubmit}
            >
              Daftar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Signupcomp;
