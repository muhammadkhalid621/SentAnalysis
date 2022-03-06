import React, {useState} from "react";
import { Navbar, Offcanvas, Container, Nav } from "react-bootstrap";
import "../css/sideNav.css";
import { logout } from "../actions/auth";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import logo from "../images/ssk.jpg";
import img1 from "../images/home-icon.png";
import img2 from "../images/Computer-icon.png";
import img3 from "../images/Office-Customer-Male-Light-icon.png";
import img4 from "../images/alert-icon.png";
import img5 from "../images/login-icon.png";

function SideNav( { logout } ) {
  const [redirect, setRedirect] = useState(false);
  const logoutHandler = () => {
    logout()
    setRedirect(true)
    
  };
  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <nav className="navigation">
        <img src={logo} alt="" />
        <a href="/dashboard">
          {" "}
          <img className="icon" src={img1} alt="" /> Home
        </a>
        <a href="/models">
          <img className="icon" src={img1} alt="" /> Model
        </a>
        <a href="/scrapper">
          <img className="icon" src={img2} alt="" /> Scrapes
        </a>
        <a href="/dashboard">
          <img className="icon" src={img3} alt="" /> Clients
        </a>
        <a href="/dashboard">
          <img className="icon" src={img4} alt="" /> Alerts
        </a>
        <button className="nav-btn" onClick={logoutHandler}>
          {" "}
          <img src={img5} /> Logout
        </button>
      </nav>
    </>
  );
}

export default connect(null, { logout })(SideNav);
