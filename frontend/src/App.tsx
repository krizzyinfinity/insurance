import React from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";

import "./App.css";


import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      
      </Routes>
    </div>
  );
}

export default App;
