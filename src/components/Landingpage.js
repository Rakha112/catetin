import React, { useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Signupbtn from "./Signupbtn";
import Loginbtn from "./Loginbtn";
import image from "../image/CATETIN.png";
import { connect } from "react-redux";
import "../css/landingpage.css";
import Loginpage from "./Loginpage";
import Signuppage from "./Signuppage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gsap, Power3 } from "gsap";

const Landingpage = ({ aktifLG, aktifSG }) => {
  let h1 = useRef(null);
  let p = useRef(null);
  let tombol = useRef(null);
  let illustrasi = useRef(null);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  useEffect(() => {
    let unmounted = false;
    axios.get("https://catetinnote.herokuapp.com/profile").then((response) => {
      if (!unmounted) {
        if (response.data.loggedIn === true) {
          navigate(`note/${response.data.username}`);
        }
      }
    });

    return () => {
      unmounted = true;
    };
  }, [navigate]);

  useEffect(() => {
    gsap.to(h1, { duration: 1.5, opacity: 1, y: -40, ease: Power3.easeOut });
    gsap.to(p, {
      duration: 1.5,
      opacity: 1,
      y: -40,
      ease: Power3.easeOut,
      delay: 0.2,
    });
    gsap.to(tombol, {
      duration: 1.5,
      opacity: 1,
      y: -40,
      ease: Power3.easeOut,
      delay: 0.4,
    });
    gsap.to(illustrasi, {
      duration: 1.5,
      opacity: 1,
      y: -40,
      ease: Power3.easeOut,
      delay: 0.6,
    });
  }, []);

  return (
    <div className="landingpage">
      <Navbar />
      <div className="page">
        <div
          className="ilustrasi"
          ref={(e) => {
            illustrasi = e;
          }}
        >
          <img src={image} alt="" />
        </div>
        <div className="isi_lp">
          <h1
            ref={(e) => {
              h1 = e;
            }}
          >
            Tempat untuk Mencatat
          </h1>
          <p
            ref={(e) => {
              p = e;
            }}
          >
            CATETIN merupakan tempat untuk menulis dan mencatat apapun yang
            ingin anda tulis dan catat
          </p>
          <div
            className="tombol"
            ref={(e) => {
              tombol = e;
            }}
          >
            <Loginbtn />
            <Signupbtn />
          </div>
        </div>
        <Loginpage />
        <Signuppage />
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
export default connect(mapStateToProps)(Landingpage);