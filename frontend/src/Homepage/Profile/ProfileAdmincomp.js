import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAdminByUsername,
  getLoggedInUser,
  removeLoggedInUser,
} from "../../Utils/localAuth";
import "../../Utils/Crud.css";
import "../Profile/ProfileAdmin.css";

const ProfileAdmincomp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const username = getLoggedInUser();

    if (!username) {
      navigate("/LoginAdmin", { replace: true });
      return;
    }

    const admin = getAdminByUsername(username);
    if (admin) {
      setData([admin]);
    } else {
      removeLoggedInUser();
      navigate("/LoginAdmin", { replace: true });
    }
  }, [navigate]);

  const arr = data ?? [];
  const admin = arr[0] || {};

  return (
    <div className="profile-page-wrapper">
      <div className="profile-banner-wrap">
        <img
          src={admin.imageUrl || "/placeholder.png"}
          alt="Banner"
        />
        <button type="button" className="profile-banner-upload">
          <i className="pi pi-camera" />
        </button>
      </div>

      <div className="profile-overview-card">
        <div className="profile-avatar-box">
          <div className="profile-avatar">
            <img
              src={admin.imageUrl || "/avatar.png"}
              alt="Profile"
            />
          </div>
        </div>

        <div className="profile-info">
          <h3>{admin.namaPemilikCafe || "Andri Purnama"}</h3>
          <p>{admin.emailCafe || "andrip@mail.com"}</p>
          <p>{admin.alamatCafe || "Jl. Distrik Aksara No. 404, Blok C, Kawasan Lama, Kota Metropola."}</p>
        </div>

        <Link className="profile-edit-btn" to="/Update">
          Edit
        </Link>
      </div>

      <div className="profile-sections">
        <section className="profile-section">
          <h4>
            Informasi Pribadi
            <Link className="section-edit-link" to="/Update">
              Edit
            </Link>
          </h4>

          <div className="profile-fields">
            <div className="profile-field">
              <label>Nama Cafe</label>
              <p>{admin.namaCafe || "Etnicafeinay"}</p>
            </div>
            <div className="profile-field">
              <label>Nama Pengguna</label>
              <p>{admin.username || "andri_p"}</p>
            </div>
            <div className="profile-field">
              <label>Nama Depan</label>
              <p>{admin.namaDepan || "Andri"}</p>
            </div>
            <div className="profile-field">
              <label>Nama Terakhir</label>
              <p>{admin.namaBelakang || "Purnama"}</p>
            </div>
            <div className="profile-field">
              <label>ID Admin</label>
              <p>{admin.idAdmin || "adm-r4odv"}</p>
            </div>
            <div className="profile-field">
              <label>Email</label>
              <p>{admin.emailCafe || "andrip@mail.com"}</p>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h4>
            Informasi Professional
            <Link className="section-edit-link" to="/Update">
              Edit
            </Link>
          </h4>

          <div className="profile-fields">
            <div className="profile-field full-width">
              <label>Alamat Cafe</label>
              <p>{admin.alamatCafe || "Jl. Distrik Aksara No. 404, Blok C, Kawasan Lama, Kota Metropola."}</p>
            </div>
            <div className="profile-field full-width">
              <label>Deskripsi Cafe</label>
              <p>{admin.deskripsiCafe || "Tempat di mana dentum bass modern bertemu dengan akar tradisi. etnicafeinay adalah ruang transisi bagi mereka yang mencari pelarian di tengah kota."}</p>
            </div>
            <div className="profile-field full-width">
              <label>Nomor Telepon</label>
              <p>{admin.noHpCafe || "0826263547"}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileAdmincomp;
