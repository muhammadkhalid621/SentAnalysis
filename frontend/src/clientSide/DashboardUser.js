import "./App.css";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "../actions/auth";
import { user_profile } from "../actions/profile";
import PredictionContainer from "./container/PredictionContainer";
import SupportContainer from "./container/SupportContainer";

export const DashboardUser = () => {
  
  return (
    <Container>
      <Sidebar />
      <MainContent />
    </Container>
  );
};

export const DashboardUserPrediction = () => {
  
  return (
    <Container>
      <Sidebar />
      <PredictionContainer />
    </Container>
  );
};


export const DashboardUserSupport = () => {
  
  return (
    <Container>
      <Sidebar />
      <SupportContainer />
    </Container>
  );
};




const Container = styled.div`
  display: flex;
  width: 100%;
  height: 97vh;
  
  border-radius: 2rem;
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    flex-direction: column;
  }
`;


// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   isAdmin: state.auth.isAdmin,
// });

// export default connect(mapStateToProps, { logout, user_profile })(DashboardUser);
