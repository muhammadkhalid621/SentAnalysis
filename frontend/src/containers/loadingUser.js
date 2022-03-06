import React, { useState, useEffect } from "react";
import "../css/loadingUser.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const LoadingUser = ({ isAdmin }) => {
  console.log(isAdmin);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Wait for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    //   if (isAdmin) {
    //     return <Redirect to="/dashboard" />;
    //   } else {
    //     return <Redirect to="/userDashboard" />;
    //   }
    }, 1000);
  }, []);

  return (
      isLoading ?
    <div>
      <div className="loader">
      
      </div>
      
      <br />
      <p className="text"> It will take a sec</p>
   
    </div>

    :
    isAdmin ?
    <Redirect to="/dashboard" />

    :
    <Redirect to="/userDashboard" />
  );
};
const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps)(LoadingUser);
