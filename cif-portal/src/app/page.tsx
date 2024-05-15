"use client"
import React from "react";
import "./globals.css";

const Home = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <b>CIF PORTAL</b>
          </a>
          <div className="navbar-nav">
            <a className="nav-link me-3" href="/login">
              <u>Login</u>
            </a>
            <a className="nav-link me-3" href="/about">
              <u>About</u>
            </a>
            <a className="nav-link me-3" href="/equipments">
              <u>Equipments</u>
            </a>
            <a className="nav-link me-3" href="/pendingRequests/labstaff">
              <u>Lab Staff Pending Requests</u>
            </a>
            <a className="nav-link" href="/pendingRequests/projectadmin">
              <u>Project Admin Pending Requests</u>
            </a>
          </div>
        </div>
      </nav>
      <div className="image-with-caption">
        <img src={"/TCS PS_0.jpg"} alt="Caption" className="image" />
      </div>
    </>
  );
};

export default Home;
