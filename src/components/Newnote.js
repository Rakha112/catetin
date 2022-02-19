import React from "react";
import logo from "../image/plus.png";
import "../css/newnote.css";
const Newnote = ({ onClick }) => {
  return (
    <div className="newnote">
      <button onClick={onClick}>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </button>
    </div>
  );
};

export default Newnote;
