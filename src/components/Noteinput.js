import React, { useState, useEffect } from "react";
import "../css/noteinput.css";
import { connect } from "react-redux";
import close from "../image/plus.png";
import Savebtn from "./Btn";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
const NoteInput = ({ aktifN, klikN, user, insert }) => {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  axios.defaults.withCredentials = true;
  async function insertData() {
    await axios
      .post("https://apicatetin.rakhawibowo.my.id/note/insert", {
        judul: judul,
        isi: isi,
        user: user,
      })
      .then(() => insert());
  }
  useEffect(() => {
    let timer1 = setTimeout(() => setAlert(false), 5000);
    let timer2 = setTimeout(() => setOpen(false), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [alert]);
  const submit = () => {
    if (judul.length > 0) {
      insertData();
      setOpen(false);
      setAlert(false);
      klikN();
      setTimeout(() => {
        setOpen(false);
        setAlert(false);
        setJudul("");
        setIsi("");
      }, 500);
    }
    setAlert(true);
    setOpen(true);
  };
  return (
    <div className={aktifN ? "noteinput aktif" : "noteinput"}>
      <div className="alert">
        {alert ? (
          <Fade in={open}>
            <Alert severity="error">Judul tidak boleh kosong</Alert>
          </Fade>
        ) : (
          <></>
        )}
      </div>
      <div className="inputbox">
        <div className="atas">
          <form action="">
            <input
              type="text"
              placeholder="Judul..."
              onChange={(e) => {
                setJudul(e.target.value);
              }}
              value={judul}
            />
          </form>
          <img src={close} alt="" onClick={klikN} />
        </div>
        <form action="">
          <textarea
            name="note"
            id="note"
            placeholder="Isikan note di sini..."
            onChange={(e) => {
              setIsi(e.target.value);
            }}
            value={isi}
          />
        </form>
        <Savebtn submit={submit} nama={"Save"} />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    aktifN: state.aktifN,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    klikN: () => dispatch({ type: "ISNOTE" }),
    insert: () => dispatch({ type: "ISINSERT" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NoteInput);
