import React, { useState } from "react";
import logo from "../image/CATETIN2.png";
import "../css/navnote.css";
import logouser from "../image/user.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Savebtn from "./Btn";
const Navnote = ({ user }) => {
  const [aktifOut, setAktifOut] = useState(false);
  const navigate = useNavigate();
  const submit = () => {
    axios.get("https://catetinnote.herokuapp.com/logout").then((response) => {
      if (response.data.logout === true) {
        navigate("/");
      }
    });
  };
  const klik = () => {
    let unmounted = false;
    if (!unmounted) {
      axios
        .get("https://catetinnote.herokuapp.com/profile")
        .then((response) => {
          if (response.data.loggedIn === true) {
            navigate(`/note/${response.data.username}`);
          }
          if (response.data.loggedIn !== true) {
            navigate("/");
          }
        });
    }
    return () => {
      unmounted = true;
    };
  };
  const out = () => {
    setAktifOut(!aktifOut);
  };
  return (
    <div className="navnote">
      <div className="logo" onClick={klik}>
        <img src={logo} alt="" />
        <h1>CATETIN</h1>
      </div>
      <div className="user" onClick={out}>
        <h1>{user}</h1>
        <img src={logouser} alt="user" />
        <div className={aktifOut ? "logout aktif" : "logout"}>
          <Savebtn nama={"Log out"} submit={submit} />
        </div>
      </div>
    </div>
  );
};

export default Navnote;
