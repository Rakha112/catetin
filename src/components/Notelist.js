import React from "react";
import "../css/notelist.css";
import logonote from "../image/note.svg";
import { connect } from "react-redux";
const Notelist = ({
  judul1,
  klikShow,
  setjudul,
  isi1,
  setisi,
  setstatus,
  settglbuat,
  settgledit,
  status,
  tglbuat,
  tgledit,
}) => {
  const klik = () => {
    setjudul(judul1);
    setisi(isi1);
    setstatus(status);
    settglbuat(tglbuat);
    settgledit(tgledit);
    klikShow();
  };
  return (
    <div className="notelist" onClick={klik}>
      <div className="logo">
        <img src={logonote} alt="" />
      </div>
      <h1>{judul1}</h1>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    show: state.show,
    judul: state.judul,
    isi: state.isi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    klikShow: () => dispatch({ type: "ISSHOW" }),
    setisi: (isi) => dispatch({ type: "SETISI", payload: { isi: isi } }),
    setstatus: (status) =>
      dispatch({ type: "SETSTATUS", payload: { status: status } }),
    settglbuat: (tglbuat) =>
      dispatch({ type: "SETTGLBUAT", payload: { tglbuat: tglbuat } }),
    settgledit: (tgledit) =>
      dispatch({ type: "SETTGLEDIT", payload: { tgledit: tgledit } }),
    setjudul: (judul) =>
      dispatch({ type: "SETJUDUL", payload: { judul: judul } }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notelist);
