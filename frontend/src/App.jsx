import React from "react";
import {Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";


function App(){
  return (
    <>
      <Header/>
      <ToastContainer style={{position: "absolute", left: "50%"}}/>
      <Outlet/>
      <Footer/>
  
    </>
  )

}

export default App;