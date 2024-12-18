import React from "react";
import Navb from "../Navbar/Navb";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Navb />
      <div className="container py-24">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
}
