"use client"
import React from "react";
import "./globals.css"
//import Image from "react-image-resizer";
import img1 from "../../../public/TCS PS_0.jpg";

const Home = () => {
  return (

    <>
      <nav>
        <a href="/login">Login  </a>
        <a href="/about">About  </a>
        <a href="/equipments">Equipments</a>
      </nav>
      <div className="image-with-caption">
        <img src={"/TCS PS_0.jpg"} alt="Caption" className="image" />
      </div>
    </>
  );
};

export default Home;