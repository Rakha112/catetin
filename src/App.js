import React from "react";
import { connect } from "react-redux";
import Landingpage from "./components/Landingpage";

function App({ aktifSG, aktifLG, login }) {
  return (
    <div className={aktifLG | aktifSG ? "App aktif" : "App"}>
      <Landingpage />
      <div className={aktifLG | aktifSG ? "bg aktif" : "bg"}></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    aktifLG: state.aktifLG,
    aktifSG: state.aktifSG,
    login: state.login,
  };
};

export default connect(mapStateToProps)(App);
