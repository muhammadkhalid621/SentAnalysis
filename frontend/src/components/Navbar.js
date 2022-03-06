import React from "react";
import "../css/Navbar.css";
import logo from "../images/ssk.jpg";

function Navbar() {
  return (
    <div className="header">
      <a href="#default">
        <img className="logo" src={logo} alt="Sentiment Analysis" />
      </a>
      <div className="header-right">
        <a href="#home">Home</a>
        <a href="#contact">Feature</a>
        <a href="#about">Services</a>
        <a href="#about">More</a>
        <a href="/login">Login</a>
        <button className="btn" type="button">
          {" "}
          GET STARTED{" "}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
