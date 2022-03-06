import "./App.css";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "../actions/auth";
import { user_profile } from "../actions/profile";

const DashboardUser = ({ isAuthenticated, isAdmin, logout, user_profile }) => {
  const logoutHandler = () => {
    logout();
  };
  // if (!isAuthenticated) {
  //   logoutHandler()
  //   return <Redirect to="/login" />;
  // }
  // if (isAdmin) {
  //   logoutHandler()
  //   return <Redirect to="/login" />;
  // }
  return (
    <Container>
      <Sidebar />
      <MainContent />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 97vh;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-radius: 2rem;
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    flex-direction: column;
  }
`;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, { logout, user_profile })(DashboardUser);
