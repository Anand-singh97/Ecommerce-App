import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
const App = () => {
  return (
    <div className="App font-poppins">
    <Routes>
      <Route path = '/' element = {<Navbar/>}/>
    </Routes>
      
    </div>
  )
}

export default App