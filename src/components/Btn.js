import React from "react";
import "../css/savebtn.css";
const Savebtn = ({ submit, nama }) => {
  return (
    <div className="savebtn">
      <button onClick={submit}>{nama}</button>
    </div>
  );
};

export default Savebtn;
