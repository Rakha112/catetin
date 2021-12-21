import React from "react";
import "../css/signupbtn.css";
import { connect } from "react-redux";
const Signupbtn = ({ aktifSG, klik, classbtn, Click }) => {
  return (
    <div className={classbtn ? "signupbtnpge" : "signupbtn"}>
      <button onClick={classbtn === "signupbtnpge" ? Click : klik}>
        Sign Up
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    aktifSG: state.aktifSG,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    klik: () => dispatch({ type: "ISAKTIFSG" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signupbtn);
