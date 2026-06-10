import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { getAdminByUsername, updateAdminByUsername } from "../Utils/localAuth";

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
  const cookies = new Cookies();
  const [data, setData] = useState([]);

  const getCurrentUsername = () => {
    const token = cookies.get("secretLogToken");
    if (!token) return null;
    try {
      return JSON.parse(token).username || null;
    } catch (err) {
      cookies.remove("secretLogToken");
      return null;
    }
  };

  useEffect(() => {
    const currentUsername = getCurrentUsername();
    if (!currentUsername) {
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
      cookies.remove("secretLogToken");
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
      cookies.remove("secretLogToken");
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
      cookies.set("secretLogToken", JSON.stringify({ username: updated.username }));
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
    <div className="Logform-container">
      <form className="Logform">
        <div className="Logform-content">
          <br></br>

          <div className="row">
            <div className="col-sm">
              <label>Email</label>
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
                className="form-control mt-1"
                placeholder={arr[0]?.emailCafe}
                required
              />
            </div>
            <div className="col-sm">
              <label>Nama Pengguna</label>
              <input
                value={updateUser.username}
                onChange={(e) =>
                  setUpdateUser((data) => ({ ...data, username: e.target.value }))
                }
                type="text"
                className="form-control mt-1"
                placeholder={arr[0]?.username}
                required
              />
            </div>
          </div>

          <br></br>

          <div className="row">
            <div className="col-sm">
              <label>Sandi</label>
              <input
                value={updateUser.password}
                onChange={(e) =>
                  setUpdateUser((data) => ({ ...data, password: e.target.value }))
                }
                type="password"
                className="form-control mt-1"
                placeholder="Masukan Sandi baru"
                required
              />
            </div>
            <div className="col-sm">
              <label>Nama Cafe</label>
              <input
                value={updateUser.namaCafe}
                onChange={(e) =>
                  setUpdateUser((data) => ({ ...data, namaCafe: e.target.value }))
                }
                type="text"
                className="form-control mt-1"
                placeholder={arr[0]?.namaCafe}
                required
              />
            </div>
          </div>

          <div class="form-group mt-3">
            <label>Alamat Cafe</label>
            <textarea
              value={updateUser.alamatCafe}
              onChange={(e) =>
                setUpdateUser((data) => ({ ...data, alamatCafe: e.target.value }))
              }
              type="text"
              className="form-control mt-1"
              placeholder={arr[0]?.alamatCafe}
              required
            />
          </div>
          <div class="form-group mt-3">
            <label>Deskripsi Cafe</label>
            <textarea
              value={updateUser.deskripsiCafe}
              onChange={(e) =>
                setUpdateUser((data) => ({
                  ...data,
                  deskripsiCafe: e.target.value,
                }))
              }
              type="text"
              className="form-control mt-1"
              placeholder={arr[0]?.deskripsiCafe}
              required
            />
          </div>

          <div className="row">
            <div className="col-sm">
              <label>Nama Pemilik Cafe</label>
              <input
                value={updateUser.namaPemilikCafe}
                onChange={(e) =>
                  setUpdateUser((data) => ({
                    ...data,
                    namaPemilikCafe: e.target.value,
                  }))
                }
                type="text"
                className="form-control mt-1"
                placeholder={arr[0]?.namaPemilikCafe}
                required
              />
            </div>
            <div className="col-sm">
              <label>No Telepon</label>
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
                className="form-control mt-1"
                placeholder={arr[0]?.noHpCafe}
                required
              />
            </div>
          </div>

          <div class="form-group mt-3">
            <label>Foto Cafe</label>
            <input
              onChange={(e) =>
                setUpdateUser((data) => ({
                  ...data,
                  image: e.target.files[0],
                }))
              }
              type="file"
              className="form-control mt-1"
            />
          </div>

          <div className="row">
            <div class="col-sm d-grid mt-3">
            <Link
                type="button"
                className="text-decoration-none btn btn-primary"
                onClick={handleSubmit}
              >
                Simpan
              </Link>
            </div>

            <div class="col-sm d-grid mt-3">
              <Link
                type="button"
                className="text-decoration-none btn btn-secondary"
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
