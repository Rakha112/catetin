import React, { useState } from "react";
// import logo from "../image/CATETIN2.png";
import "../css/navnote.css";
import logouser from "../image/user.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Savebtn from "./Btn";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const Navnote = ({ user }) => {
  const [aktifOut, setAktifOut] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const submit = () => {
    async function logout() {
      axios.get("https://catetinnote.herokuapp.com/logout").then((response) => {
        if (response.data.logout === true) {
          navigate("/");
        }
      });
    }
    logout();
  };
  const klik = () => {
    async function profile() {
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
    profile();
  };
  const out = () => {
    setAktifOut(!aktifOut);
  };
  return (
    <div className="navnote">
      <div className="user">
        <img src={logouser} alt="user" />
        <h1>{user}</h1>
        <div className={aktifOut ? "logout aktif" : "logout"}>
          <Savebtn nama={"Log out"} submit={submit} />
        </div>
      </div>
      <div className="logo" onClick={klik}>
        <IconButton onClick={out}>
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Navnote;
