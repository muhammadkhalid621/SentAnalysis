import React from "react";
import HeroSection from "../components/HeroSection";
import Whyssk from "../components/Whyssk";
import { homeObjOne, homeObjTwo } from "./Data";
import AllServices from "../components/AllServices";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function Home({ isAuthenticated, isAdmin }) {
  if (isAuthenticated) return <Redirect to="/loadingUser" />;
  return (
    <>
      <HeroSection {...homeObjOne} />
      <Whyssk {...homeObjTwo} />
      <AllServices />
    </>
  );
}

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Home);
