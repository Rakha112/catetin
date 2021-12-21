import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import close from "../image/plus.png";
import "../css/shownote.css";
import Savebtn from "./Btn";
import axios from "axios";
const Shownote = ({
  show,
  klikS,
  judul,
  isi,
  edit,
  klikE,
  user,
  klikD,
  kliksave,
  save,
  status,
  tglbuat,
  tgledit,
}) => {
  const [editIsi, setEditIsi] = useState("");
  const [setIsi, setSetIsi] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://catetinnote.herokuapp.com/note/isi", {
          params: {
            user: user,
            judul: judul.judul,
          },
        })
        .then((result) => {
          setSetIsi(result.data);
        });
    }, 500);
    setSetIsi([]);
    setEditIsi(isi.isi);
  }, [edit, isi.isi, user, judul]);

  axios.defaults.withCredentials = true;
  const saveFunc = () => {
    axios.put("https://catetinnote.herokuapp.com/note/update", {
      judul: judul.judul,
      isi: editIsi,
      user: user,
    });
    klikE();
    kliksave();
    klikS();
    // klikS();
  };
  const editFunc = () => {
    kliksave();
    klikE();
  };
  const deleteFunc = () => {
    axios
      .delete("https://catetinnote.herokuapp.com/note/delete", {
        data: {
          judul: judul.judul,
          isi: editIsi,
          user: user,
        },
      })
      .then((response) => {
        klikD();
      });
    klikS();
    klikD();
  };
  return (
    <div className={show ? "shownote aktif" : "shownote"}>
      <div className="showbox">
        <div className="atas">
          <h1>{judul.judul}</h1>
          <img src={close} alt="" onClick={klikS} />
        </div>
        <form action="">
          <textarea
            name="note"
            id="note"
            placeholder="Isikan note di sini..."
            onChange={(e) => {
              setEditIsi(e.target.value);
            }}
            value={
              edit
                ? editIsi
                : save
                ? setIsi.length > 0
                  ? setIsi.isi
                  : isi.isi
                : isi.isi
            }
            readOnly={edit ? false : true}
          />
        </form>
        <p>
          {status.status === "Created"
            ? status.status + " " + tglbuat.tglbuat
            : status.status + " " + tgledit.tgledit}
        </p>
        <div className="btn">
          <Savebtn
            submit={edit ? saveFunc : editFunc}
            nama={edit ? "Save" : "Edit"}
          />
          <Savebtn nama={"Delete"} submit={deleteFunc} />
        </div>
        {/* <Savebtn submit={submit} /> */}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    show: state.show,
    judul: state.judul,
    isi: state.isi,
    edit: state.edit,
    deleted: state.delete,
    save: state.save,
    status: state.status,
    tglbuat: state.tglbuat,
    tgledit: state.tgledit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    klikS: () => dispatch({ type: "ISSHOW" }),
    klikE: () => dispatch({ type: "ISEDIT" }),
    klikD: () => dispatch({ type: "ISDELETE" }),
    kliksave: () => dispatch({ type: "ISSAVE" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Shownote);
