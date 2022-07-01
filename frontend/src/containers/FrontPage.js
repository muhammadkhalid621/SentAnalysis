import React, { useState, useEffect } from "react";
import "../css/FrontPage.css";
import logo from "../images/home1.jpg";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const FrontPage = ({ isAdmin, isAuthenticated }) => {
  useEffect(() => {
    // Wait for 5 seconds
    
      if (isAuthenticated) {
        return <Redirect to="/loadingUser" />;
      }
    
  }, [isAuthenticated]);
  return (
    <div className="main-div">
      <img className="background" src={logo} alt="Snow" />

      <div class="top-left">
        <h1 className="main-heading">SOCIAL NETWORK SENTIMENT RESEARCH</h1>

        <h3 className="sub-heading">SSK ENTERPRISES</h3>
      </div>

      <div className="bottom-right">
        <h1 className="heading">LETS EXPLORE THE SENTIMENTS!</h1>
      </div>

      <div className="bottom-right2">
        <h3>
          Where we examine data. Discover the crust of data. with our
          exceptional
          <br />
          algorithms learn the sentiments of your data.
        </h3>
      </div>
      <div className="website">
        <a href="home" className="nounderline">
          <h3 className="gowebsite">Go to website</h3>
        </a>
      </div>
      {/* <div className="bottom-left">Bottom Left</div>
  <div className="top-left">Top Left</div>
  <div className="top-right">Top Right</div>
  <div className="bottom-right">Bottom Right</div>
  <div className="centered">Centered</div> */}
    </div>
  )
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps)(FrontPage);
