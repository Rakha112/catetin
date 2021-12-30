import React, { useState, useEffect } from "react";
import Notelist from "./Notelist";
import axios from "axios";
import { connect } from "react-redux";
import "../css/listnote.css";
const Listnote = ({
  username,
  aktifN,
  loading,
  edit,
  deleted,
  insert,
  update,
}) => {
  const [dataNote, setDataNote] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        "https://catetinnote.herokuapp.com/note",
        {
          params: {
            user: username,
          },
        }
      );
      console.log(request.data);
      setDataNote(request.data);
      return request.data;
    }
    loading();
    fetchData();
  }, [loading, username, aktifN, edit, deleted, insert, update]);

  if (dataNote.length === 0) {
    return (
      <div className="listnote">
        <p>Belum ada note...</p>
      </div>
    );
  } else {
    return (
      <div className="listnote">
        {dataNote.map((data, i) => {
          return (
            <Notelist
              judul1={data.judul}
              isi1={data.isi}
              status={data.status}
              tglbuat={data.tgl_buat}
              tgledit={data.tgl_edit}
              key={i}
            />
          );
        })}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    load: state.load,
    judul: state.judul,
    edit: state.edit,
    deleted: state.delete,
    klik: state.aktifN,
    insert: state.insert,
    update: state.update,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loading: () => dispatch({ type: "ISLOAD" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Listnote);
