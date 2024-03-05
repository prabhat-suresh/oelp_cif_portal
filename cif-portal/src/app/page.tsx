"use client"
import React from "react";
import "./globals.css"
//import Image from "react-image-resizer";
import img1 from "../../../public/TCS PS_0.jpg";

const Home = () => {
  return (

    <div className="image-with-caption">
      <img src={"/TCS PS_0.jpg"} alt="Caption" className="image" />
      <h1 className="caption">{"Hello there"}</h1>
    </div>
  );
};

export default Home;