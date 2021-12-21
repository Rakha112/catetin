import React from "react";
import logo from "../image/CATETIN2.png";
import "../css/navbar.css";
import Loginbtn from "./Loginbtn";
import Signupbtn from "./Signupbtn";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar_mobile">
        <div className="logo">
          <img src={logo} alt="" />
          <h1>CATETIN</h1>
        </div>
      </div>
      <div className="navbar_laptop">
        <div className="logo">
          <img src={logo} alt="" />
          <h1>CATETIN</h1>
        </div>
        <div className="btn_nav">
          <div className="login">
            <Loginbtn navbtn="login_nav" />
          </div>
          <Signupbtn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
