import React from "react";
import { connect } from "react-redux";
import "../css/loginbtn.css";

const Loginbtn = ({ aktifLG, klik, classbtn, navbtn, Click }) => {
  return (
    <div
      className={`loginbtn ${
        classbtn === "loginbtnpge"
          ? "loginbtnpge"
          : navbtn === "login_nav"
          ? "loginnav"
          : "lp"
      }`}
    >
      <button onClick={classbtn === "loginbtnpge" ? Click : klik}>
        Log In
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    aktifLG: state.aktifLG,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    klik: () => dispatch({ type: "ISAKTIFLG" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loginbtn);
