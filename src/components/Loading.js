import React from "react";
import logo from "../image/CATETIN2.png";
import "../css/loading.css";
const Loading = () => {
  return (
    <div className="loading">
      <img src={logo} alt="" />
      <h1>CATETIN</h1>
    </div>
  );
};

export default Loading;
