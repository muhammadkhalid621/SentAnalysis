import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../actions/auth";
import { user_profile } from "../actions/profile";
import { Redirect } from "react-router-dom";

const Layout = ({ checkAuthenticated, load_user, children, isAdmin, isAuthenticated }) => {
  useEffect(() => {
    // user_profile()
    checkAuthenticated();
    load_user();
    if (isAuthenticated) {
      return <Redirect to="/loadingUser" />;
    // if (isAdmin) {
    //       return <Redirect to="/dashboard" />;
    //     } else {
    //       return <Redirect to="/userDashboard" />;
    //     }
    }
  }, []);
  
  return <div>{children}</div>;
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps, { checkAuthenticated, load_user })(Layout);
