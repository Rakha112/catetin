import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Navnote from "./Navnote";
import Listnote from "./Listnote";
import Newnote from "../components/Newnote";
import "../css/note.css";
import Noteinput from "./Noteinput";
import Shownote from "./Shownote";

const Note = ({ klik, aktifLG, aktifN, klikN, load, show }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      axios
        .get("https://catetinnote.herokuapp.com/profile")
        .then((response) => {
          if (response.data.loggedIn === true) {
            navigate(`/note/${response.data.username}`);
            setUsername(response.data.username);
            klik();
            const loadData = async () => {
              await new Promise((r) => setTimeout(r, 500));
              setLoading((loading) => !loading);
            };

            loadData();
          }
          if (response.data.loggedIn !== true) {
            navigate("/");
            klik();
          }
        });
    }

    return () => {
      unmounted = true;
    };
  }, [klik, navigate]);

  if (loading) {
    return <Loading />;
  }

  // If page is not in loading state, display page.
  else {
    return (
      <div className={aktifN ? "note_container aktif" : "note_container"}>
        <div className="note">
          <Navnote user={capitalizeFirstLetter(username)} />
          <Listnote username={username} aktifN={aktifN} />
        </div>
        <Newnote onClick={klikN} />
        <Noteinput user={username} />
        <Shownote user={username} />
        <div className={aktifN ? "bg aktif" : "bg"}></div>
        <div className={show ? "bg aktif" : "bg"}></div>
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    aktifLG: state.aktifLG,
    aktifN: state.aktifN,
    load: state.load,
    show: state.show,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    klik: () => dispatch({ type: "ISAKTIFLG" }),
    klikN: () => dispatch({ type: "ISNOTE" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Note);
