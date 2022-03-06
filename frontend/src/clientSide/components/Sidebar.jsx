import React, { useState } from "react";
import logo from "../../images/ssk.jpg";
import { connect } from "react-redux";
import { Redirect } from "react-router";

// import Badge from "./Badge";
import { darkThemeColor } from "../utils";
import styled from "styled-components";
import { logout } from "../../actions/auth";
import {
  RiHome2Fill,
  RiLineChartFill,
  RiLogoutBoxRFill,
  RiBarChart2Fill,
  RiAccountBoxFill,
  RiHandCoinFill,
} from "react-icons/ri";

const Sidebar = ({ logout }) => {
  const [redirect, setRedirect] = useState(false);
  const logoutHandler = () => {
    console.log("hi");
    logout();
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <ProfileContainer>
        <Anchor href="/userDashboard">
          <Avatar src={logo} />
        </Anchor>
        {/* <Anchor href="/userDashboard">
          <Name>SSK ENTERPRISES</Name>
        </Anchor> */}
        {/* <Badge content="Pro Level" /> */}
      </ProfileContainer>
      <LinksContainer>
        <Links>
          <Anchor href="/userDashboard">
            <Link>
              <RiHome2Fill />

              <h3>Home</h3>
            </Link>
          </Anchor>
          <Anchor>
            <Link>
              <RiAccountBoxFill />
              <h3>Account</h3>
            </Link>
          </Anchor>
          <Anchor>
            <Link>
              <RiLineChartFill />
              <h3>Predict</h3>
            </Link>
          </Anchor>
          <Anchor>
            <Link>
              <RiHandCoinFill />
              <h3>Support</h3>
            </Link>
          </Anchor>
          <Anchor>
            <Link>
              <RiBarChart2Fill />
              <h3>Graph</h3>
            </Link>
          </Anchor>
          <Anchor onClick={logoutHandler}>
            <Link>
              <RiLogoutBoxRFill />
              <h3>Logout</h3>
            </Link>
          </Anchor>
        </Links>
      </LinksContainer>
    </Container>
  );
};
const Container = styled.div`
  width: 20%;
  height: 100% !important;
  border-radius: 2rem;
  background-color: #1A252B;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  @media screen and (min-width: 120px) and (max-width: 640px) {
    width: 100%;
    height: max-content !important;
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 100%;
    height: max-content !important;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Anchor = styled.a`
  text-decoration: none;
`;
const Avatar = styled.img`
  height: 7rem;
  border-radius: 4rem;
  margin-top: 20%;
`;
const Name = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.1rem 0 0.1rem 0;
`;

const LinksContainer = styled.div`
  background-color: #1A252B;
  height: 100%;
  width: 100%;
  border-radius: 2rem;
`;

const Links = styled.ul`
  list-style-type: none;
  display: flex;

  flex-direction: column;
  padding-top: 0.4rem;
  height: 55%;
`;

const Link = styled.li`
  margin-left: 25%;
  margin-bottom: 1.8rem;
  display: flex;
  text-decoration: none;
  gap: 1rem;
  color: #e4e4e4;
  cursor: pointer;
  h3 {
    font-weight: 300;
  }
  svg {
    font-size: 1.1rem;
    margin-top: 3%;
  }
`;

export default connect(null, { logout })(Sidebar);
