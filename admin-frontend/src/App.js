import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
const App = () => {
  return (
    <div className="App font-poppins">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Admin />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
