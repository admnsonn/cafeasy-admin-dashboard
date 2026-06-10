import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAdminByUsername } from "../../Utils/localAuth";
import Cookies from "universal-cookie";
import "../../Utils/Crud.css";
import "../Profile/ProfileAdmin.css";

const ProfileAdmincomp = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = cookies.get("secretLogToken");
    let username = null;

    if (token) {
      try {
        username = JSON.parse(token).username;
      } catch (err) {
        cookies.remove("secretLogToken");
      }
    }

    if (!username) {
      navigate("/LoginAdmin", { replace: true });
      return;
    }

    const admin = getAdminByUsername(username);
    if (admin) {
      setData([admin]);
    } else {
      cookies.remove("secretLogToken");
      navigate("/LoginAdmin", { replace: true });
    }
  }, [navigate]);

  const arr = data ?? [];

  return (
    <div className="container">
      <div className="py-4">
        <br></br>
        <div className="row">
          <div className="col-md-3">
            <div className="title-profile-pertama"> DATATABLE PROFIL ADMIN </div>
          </div>
          <div className="col-sm-4">
            <div className="title-profile-kedua"> Admin / </div>
          </div>
          <div className="col-sm-2">
            <div className="title-profile-ketiga"> Profil Admin </div>
          </div>
        </div>
        <div className="datatable-crud-demo">
          <div className="container profil-bungkus">
            <form method="post">
              <div className="row">
                <div className="col-md-4">
                  <div className="profil-img">
                    <img src={arr[0]?.imageUrl} alt="Profil" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profil-title">
                    <h5>{arr[0]?.namaPemilikCafe}</h5>
                    <h6>{arr[0]?.namaCafe}</h6>
                    <p className="profil-email">{arr[0]?.emailCafe}</p>
                    <br></br> <br></br> <br></br>
                    <ul className="nav nav-tabs" id="myTab" role="tablist"></ul>
                  </div>
                </div>
                <div className="col-md-2">
                  <Link
                    className="text-decoration-none btn btn-sm btn-primary"
                    to="/Update">
                    Perbaharui
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="tab-content profil-teks" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <label>Username</label>
                        </div>
                        <div className="col-md-6">
                          <p>{arr[0]?.username}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Alamat Cafe</label>
                        </div>
                        <div className="col-md-6">
                          <p>{arr[0]?.alamatCafe}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Deskripsi Cafe</label>
                        </div>
                        <div className="col-md-6">
                          <p>{arr[0]?.deskripsiCafe}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Nomor Telepon</label>
                        </div>
                        <div className="col-md-6">
                          <p>{arr[0]?.noHpCafe}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmincomp;
