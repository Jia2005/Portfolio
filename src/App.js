import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./Pages/Home";
import "./App.css";

const MainApp = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </HashRouter>
  );
};

export default MainApp;
