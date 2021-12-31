import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../css/loginpage.css";
import close from "../image/plus.png";
import Loginbtn from "./Loginbtn";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";

const Loginpage = ({ aktifLG, klikL, aktifSG, klikS, klikLG, setdataawal }) => {
  const navigate = useNavigate();
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
  async function fetchData() {
    await axios
      .get("https://catetinnote.herokuapp.com/note", {
        params: {
          user: username,
        },
      })
      .then((res) => {
        setdataawal(res.data);
      });
  }

  async function profile() {
    await axios
      .get("https://catetinnote.herokuapp.com/profile")
      .then((response) => {
        if (response.data.loggedIn === true) {
          klikL();
          klikLG();
          navigate(`/note/${response.data.username}`);
        }
      });
  }

  async function loginreq() {
    await axios
      .post("https://catetinnote.herokuapp.com/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.alert === 2) {
          setAlertId("success");
          profile();
          fetchData();
        } else if (response.data.alert === 3) {
          setAlertId("error");
        }
        setAlertContent(response.data.message);
        setAlert(true);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  const submit = () => {
    if (username && password !== "") {
      loginreq();
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
    <div className={aktifLG ? "loginpage aktif" : "loginpage"}>
      <div className="alert">
        {alert ? (
          <Fade in={open}>
            <Alert severity={alertId}>{alertContent}</Alert>
          </Fade>
        ) : (
          <></>
        )}
      </div>
      <div className="loginbox">
        <img src={close} alt="" onClick={klikL} />
        <h1>Log In</h1>

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

        <Loginbtn classbtn="loginbtnpge" Click={submit} />
        <p>
          Belum punya akun ? Silahkan <span onClick={klikS}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    aktifLG: state.aktifLG,
    aktifSG: state.aktifSG,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    klikL: () => dispatch({ type: "ISAKTIFLG" }),
    klikS: () => dispatch({ type: "ISAKTIFSG" }),
    klikLG: () => dispatch({ type: "ISLOGIN" }),
    setdataawal: (data) => dispatch({ type: "DATAAWAL", payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loginpage);
