import React, { useState, useEffect } from "react";
import "../css/loadingUser.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { load_user } from "../actions/auth";

const LoadingUser = ({ isAdmin, isLogin, load_user }) => {
  console.log(isAdmin);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    load_user()
    // Wait for 3 seconds
    setTimeout(() => {
      console.log(isAdmin);
      console.log(isLogin);
      setIsLoading(false);
      //   if (isAdmin) {
      //     return <Redirect to="/dashboard" />;
      //   } else {
      //     return <Redirect to="/userDashboard" />;
      //   }
    }, 2000);
  }, [isAdmin,isLoading,isLogin, load_user]);

  return isLoading ? (
    <div>
      <div className="loader"></div>

      <br />
      <p className="text"> It will take a sec</p>
    </div>
  ) : !isAdmin && isLogin ? (
    <Redirect to="/userDashboard" />
  ) : (
    <Redirect to="/dashboard" />
  );
};
const mapStateToProps = (state) => ( {
  isAdmin: state.auth.isAdmin,
  isLogin: state.auth.isLogin,
});
export default connect(mapStateToProps, {load_user})(LoadingUser);
