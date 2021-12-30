import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import { createStore } from "redux";
import App from "./App";
import Note from "./components/Note";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const initialState = {
  aktifLG: false,
  aktifSG: false,
  aktifN: false,
  login: false,
  load: false,
  show: false,
  judul: "",
  isi: "",
  status: "",
  tglbuat: "",
  tgledit: "",
  edit: false,
  delete: false,
  save: true,
  insert: false,
  update: false,
};

const rootReducer = (state = initialState, action) => {
  if (action.type === "ISAKTIFLG") {
    return {
      ...state,
      aktifLG: !state.aktifLG,
      aktifSG: false,
    };
  }
  if (action.type === "ISAKTIFSG") {
    return {
      ...state,
      aktifLG: false,
      aktifSG: !state.aktifSG,
    };
  }
  if (action.type === "ISLOGIN") {
    return {
      ...state,
      login: !state.login,
    };
  }
  if (action.type === "ISNOTE") {
    return {
      ...state,
      aktifN: !state.aktifN,
    };
  }
  if (action.type === "ISLOAD") {
    return {
      ...state,
      load: !state.load,
    };
  }
  if (action.type === "ISSHOW") {
    return {
      ...state,
      show: !state.show,
    };
  }
  if (action.type === "SETJUDUL") {
    return {
      ...state,
      judul: action.payload,
    };
  }
  if (action.type === "SETISI") {
    return {
      ...state,
      isi: action.payload,
    };
  }
  if (action.type === "SETSTATUS") {
    return {
      ...state,
      status: action.payload,
    };
  }
  if (action.type === "SETTGLBUAT") {
    return {
      ...state,
      tglbuat: action.payload,
    };
  }
  if (action.type === "SETTGLEDIT") {
    return {
      ...state,
      tgledit: action.payload,
    };
  }
  if (action.type === "ISEDIT") {
    return {
      ...state,
      edit: !state.edit,
    };
  }
  if (action.type === "ISSAVE") {
    return {
      ...state,
      save: !state.save,
    };
  }
  if (action.type === "ISDELETE") {
    return {
      ...state,
      delete: !state.delete,
    };
  }
  if (action.type === "ISINSERT") {
    return {
      ...state,
      insert: !state.insert,
    };
  }
  if (action.type === "ISUPDATE") {
    return {
      ...state,
      update: !state.update,
    };
  }
  return state;
};

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/note" element={<Note />} />
          <Route path="/note/:id" element={<Note />} />
          <Route path="/" element={<App />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
