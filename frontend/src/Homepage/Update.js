import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import {
  getAdminByUsername,
  updateAdminByUsername,
  getLoggedInUser,
  setLoggedInUser,
  removeLoggedInUser,
} from "../Utils/localAuth";

const USER_UPDATE = {
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

function Update() {
  const [updateUser, setUpdateUser] = useState(USER_UPDATE);
  const Navigate = useNavigate();
  const [data, setData] = useState([]);

  const getCurrentUsername = () => {
    return getLoggedInUser();
  };

  useEffect(() => {
    const currentUsername = getCurrentUsername();
    if (!currentUsername) {
      removeLoggedInUser();
      Navigate("/LoginAdmin", { replace: true });
      return;
    }

    const admin = getAdminByUsername(currentUsername);
    if (admin) {
      setData([admin]);
      setUpdateUser({
        username: admin.username || "",
        emailCafe: admin.emailCafe || "",
        password: admin.password || "",
        namaCafe: admin.namaCafe || "",
        alamatCafe: admin.alamatCafe || "",
        deskripsiCafe: admin.deskripsiCafe || "",
        namaPemilikCafe: admin.namaPemilikCafe || "",
        noHpCafe: admin.noHpCafe || "",
        image: admin.imageUrl || "",
      });
    } else {
      removeLoggedInUser();
      Navigate("/LoginAdmin", { replace: true });
    }
  }, [Navigate]);

  let arr = data ?? [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateUser.username.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Update Gagal!",
        text: "Data tidak boleh kosong!!!",
      });
      return;
    }

    const currentUsername = getCurrentUsername();
    if (!currentUsername) {
      removeLoggedInUser();
      Navigate("/LoginAdmin", { replace: true });
      return;
    }

    const updated = updateAdminByUsername(currentUsername, {
      username: updateUser.username,
      emailCafe: updateUser.emailCafe,
      password: updateUser.password,
      namaCafe: updateUser.namaCafe,
      alamatCafe: updateUser.alamatCafe,
      deskripsiCafe: updateUser.deskripsiCafe,
      namaPemilikCafe: updateUser.namaPemilikCafe,
      noHpCafe: updateUser.noHpCafe,
      imageUrl: updateUser.image || arr[0]?.imageUrl || "/avatar.png",
    });

    if (updated) {
      setLoggedInUser(updated.username);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Update Berhasil!",
        showConfirmButton: false,
        timer: 1500,
      });
      Navigate("/ProfileAdmin");
      setUpdateUser(USER_UPDATE);
    } else {
      Swal.fire({
        icon: "error",
        title: "Update Gagal!",
        text: "Data tidak dapat diperbarui.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-screen min-h-screen">
      <form className="bg-gray-800 w-[550px] shadow-md p-10 rounded-2xl">
        <div className="pl-[10%] pr-[12%]">
          <br></br>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-white block mb-1">Email</label>
              <input
                value={updateUser.emailCafe}
                onChange={(e) =>
                  setUpdateUser((data) => ({
                    ...data,
                    emailCafe: e.target.value,
                  }))
                }
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                placeholder={arr[0]?.emailCafe}
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-white block mb-1">Nama Pengguna</label>
              <input
                value={updateUser.username}
                onChange={(e) =>
                  setUpdateUser((data) => ({ ...data, username: e.target.value }))
                }
                type="text"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                placeholder={arr[0]?.username}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-white block mb-1">Sandi</label>
              <input
                value={updateUser.password}
                onChange={(e) =>
                  setUpdateUser((data) => ({ ...data, password: e.target.value }))
                }
                type="password"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                placeholder="Masukan Sandi baru"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-white block mb-1">Nama Cafe</label>
              <input
                value={updateUser.namaCafe}
                onChange={(e) =>
                  setUpdateUser((data) => ({ ...data, namaCafe: e.target.value }))
                }
                type="text"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                placeholder={arr[0]?.namaCafe}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-semibold text-white block mb-1">Alamat Cafe</label>
            <textarea
              value={updateUser.alamatCafe}
              onChange={(e) =>
                setUpdateUser((data) => ({ ...data, alamatCafe: e.target.value }))
              }
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
              placeholder={arr[0]?.alamatCafe}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-xs font-semibold text-white block mb-1">Deskripsi Cafe</label>
            <textarea
              value={updateUser.deskripsiCafe}
              onChange={(e) =>
                setUpdateUser((data) => ({
                  ...data,
                  deskripsiCafe: e.target.value,
                }))
              }
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
              placeholder={arr[0]?.deskripsiCafe}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-white block mb-1">Nama Pemilik Cafe</label>
              <input
                value={updateUser.namaPemilikCafe}
                onChange={(e) =>
                  setUpdateUser((data) => ({
                    ...data,
                    namaPemilikCafe: e.target.value,
                  }))
                }
                type="text"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                placeholder={arr[0]?.namaPemilikCafe}
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-white block mb-1">No Telepon</label>
              <input
                value={updateUser.noHpCafe}
                onChange={(e) =>
                  setUpdateUser((data) => ({
                    ...data,
                    noHpCafe: e.target.value,
                  }))
                }
                type="tel"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                placeholder={arr[0]?.noHpCafe}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-semibold text-white block mb-1">Foto Cafe</label>
            <input
              onChange={(e) =>
                setUpdateUser((data) => ({
                  ...data,
                  image: e.target.files[0],
                }))
              }
              type="file"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
            <Link
                type="button"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors no-underline text-center block"
                onClick={handleSubmit}
              >
                Simpan
              </Link>
            </div>

            <div>
              <Link
                type="button"
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors no-underline text-center block"
                to="/ProfileAdmin"
              >
                Batal
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Update;
