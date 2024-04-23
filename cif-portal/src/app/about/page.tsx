"use client"
import React from "react";
//import Image from "react-image-resizer";
import img1 from "../../../public/TCS PS_0.jpg";

const About = () => {
    return (

        <>
            <div className="image-with-caption">
                <img src={"/TCS PS_0.jpg"} alt="Caption" className="image" />
            </div>
            <h2><b>Central Instrumentation Facility</b></h2>
            <article>Central Instrumentation Facility (CIF) and Central Micro-Nano  Fabrication Facility (CMFF) are two highly sophisticated research  facilities set up by IIT Palakkad with the following essential  objectives   1. To support high-quality research activities at IIT Palakkad by  developing and maintaining the state of the art analytical and  fabrication facilities.   2. To foster research collaborations with other academic and industrial organizations.</article>
        </>
    );
};

export default About;