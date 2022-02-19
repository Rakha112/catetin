import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../css/signuppage.css";
import close from "../image/plus.png";
import Signupbtn from "./Signupbtn";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
const Loginpage = ({ aktifLG, klikL, aktifSG, klikS }) => {
  const [alertId, setAlertId] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  useEffect(() => {
    let timer1 = setTimeout(() => setAlert(false), 5000);
    let timer2 = setTimeout(() => setOpen(false), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [alert]);

  axios.defaults.withCredentials = true;
  async function profile() {
    await axios
      .post("https://apicatetin.rakhawibowo.my.id/signup", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.alert === 2) {
          setAlertId("success");
          setTimeout(() => {
            klikS();
          }, 2000);
        } else if (response.data.alert === 3) {
          setAlertId("error");
        }
        setAlertContent(response.data.message);
        setAlert(true);
        setOpen(true);
      });
  }
  const submit = () => {
    if (username && password !== "") {
      profile();
      setUserName("");
      setPassword("");
    } else {
      setAlertContent("Username dan password tidak boleh kosong");
      setAlertId("warning");
      setAlert(true);
      setOpen(true);
      setUserName("");
      setPassword("");
    }
  };
  const enter = (event) => {
    if (event.key === "Enter") {
      submit();
    }
  };
  return (
    <div className={aktifSG ? "signuppage aktif" : "signuppage"}>
      <div className="alert">
        {alert ? (
          <Fade in={open}>
            <Alert severity={alertId}>{alertContent}</Alert>
          </Fade>
        ) : (
          <></>
        )}
      </div>
      <div className="signupbox">
        <img src={close} alt="" onClick={klikS} />
        <h1>Sign Up</h1>

        <form action="" onKeyDown={enter}>
          <label> Username</label>
          <input
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={username}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </form>

        <Signupbtn classbtn="signupbtnpge" Click={submit} />
        <p>
          Sudah punya akun ? Silahkan <span onClick={klikL}>Log in</span>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    aktifLG: state.aktifLG,
    aktifSG: state.aktifSG,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    klikL: () => dispatch({ type: "ISAKTIFLG" }),
    klikS: () => dispatch({ type: "ISAKTIFSG" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loginpage);
