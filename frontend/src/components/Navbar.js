import React, { useState } from "react";
import { Link } from "react-router-dom";
// import {MdFingerprint} from 'react-icons/md'
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../images/ssk.png";
import { Button } from "./Button";
import "../css/Navbar.css";
import "../css/Button.css";
import { IconContext } from "react-icons/lib";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // useEffect(() => {
  //   showButton();
  window.addEventListener("resize", showButton);
  //   return {
  //     window.removeEventListener('resize', showButton)
  //   }
  // }, []);
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="nav-content">
          <div className="navbar-container nav-container">
            <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
              {/* <MdFingerprint className='navbar-icon' /> */}
              <img src={logo} alt="SSKLOGO" className="navbar-icon" />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="mynav-btn">
                {button ? (
                  <Link to="/signup" className="mybtn-link">
                    <Button buttonStyle="mybtn--outline" buttonColor="golden">
                      Get Started
                    </Button>
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="mybtn-link"
                    onClick={closeMobileMenu}
                  >
                    <Button
                      buttonStyle="mybtn--outline"
                      buttonSize="mybtn--mobile"
                      buttonColor="golden"
                    >
                      Get Started
                    </Button>
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <Link
                  to="/home"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/services"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/features"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/more"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  More
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
