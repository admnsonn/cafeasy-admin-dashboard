import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAdminByUsername,
  getLoggedInUser,
  removeLoggedInUser,
} from "../../Utils/localAuth";

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
    <div className="w-full py-8 px-6 max-w-5xl mx-auto">
      <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-purple-600 to-purple-800">
        <img
          src={admin.imageUrl || "/placeholder.png"}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <button type="button" className="absolute top-4 right-4 bg-black bg-opacity-60 text-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-opacity-80">
          <i className="pi pi-camera text-xl" />
        </button>
      </div>

      <div className="grid grid-cols-[auto_1fr_auto] gap-6 items-start bg-white p-6 rounded-2xl border border-gray-200 shadow-lg mb-8 -mt-12">
        <div className="relative">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img
              src={admin.imageUrl || "/avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="m-0 text-2xl font-bold text-gray-900">{admin.namaPemilikCafe || "Andri Purnama"}</h3>
          <p className="m-0 text-gray-600 text-base">{admin.emailCafe || "andrip@mail.com"}</p>
          <p className="m-0 text-gray-600 text-base">{admin.alamatCafe || "Jl. Distrik Aksara No. 404, Blok C, Kawasan Lama, Kota Metropola."}</p>
        </div>

        <Link className="bg-blue-700 text-white border-none py-3 px-6 rounded-full font-semibold cursor-pointer transition-colors duration-300 hover:bg-blue-800" to="/Update">
          Edit
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <section className="bg-slate-50 p-6 rounded-2xl border border-gray-200">
          <h4 className="m-0 mb-4 text-base font-bold text-gray-900 flex justify-between items-center">
            Informasi Pribadi
            <Link className="text-blue-700 no-underline text-sm font-semibold hover:underline" to="/Update">
              Edit
            </Link>
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <label className="block mb-2 font-semibold text-sm text-gray-900">Nama Cafe</label>
              <p className="m-0 text-gray-700 leading-relaxed text-base">{admin.namaCafe || "Etnicafeinay"}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <label className="block mb-2 font-semibold text-sm text-gray-900">Nama Pengguna</label>
              <p className="m-0 text-gray-700 leading-relaxed text-base">{admin.username || "andri_p"}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <label className="block mb-2 font-semibold text-sm text-gray-900">Nama Depan</label>
              <p className="m-0 text-gray-700 leading-relaxed text-base">{admin.namaDepan || "Andri"}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <label className="block mb-2 font-semibold text-sm text-gray-900">Nama Terakhir</label>
              <p className="m-0 text-gray-700 leading-relaxed text-base">{admin.namaBelakang || "Purnama"}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <label className="block mb-2 font-semibold text-sm text-gray-900">ID Admin</label>
              <p className="m-0 text-gray-700 leading-relaxed text-base">{admin.idAdmin || "adm-r4odv"}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <label className="block mb-2 font-semibold text-sm text-gray-900">Email</label>
              <p className="m-0 text-gray-700 leading-relaxed text-base">{admin.emailCafe || "andrip@mail.com"}</p>
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
