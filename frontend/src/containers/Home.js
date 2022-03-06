import React from "react";
import "../css/Home.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";

const Home = ({ isAdmin, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/loadingUser" />;
  }
  return (
   <>
   <Navbar />
   </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps)(Home);
