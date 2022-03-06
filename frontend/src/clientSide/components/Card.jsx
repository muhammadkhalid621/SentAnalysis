import React from 'react'
import umer from "../assets/umer.jpg";
// import Badge from "./Badge";
import { darkThemeColor } from "../utils";
import styled from "styled-components";
import { RiHome2Fill, RiBarChart2Fill,RiAccountBoxFill,RiFileSearchFill,RiHandCoinFill } from "react-icons/ri";

function Card() {
    return (
        <Container>
        <ProfileContainer>
      <Avatar src={umer} />
      <Name>SSK</Name>
      {/* <Badge content="Pro Level" /> */}
    </ProfileContainer>
    <LinksContainer>
    <Links>
    <Link>
          <RiHome2Fill />
          <h3>Home</h3>
        </Link><Link>
        <RiAccountBoxFill />
          <h3>Account</h3>
        </Link>
        <Link>
        <RiFileSearchFill />
          <h3>Scrapper</h3>
        </Link>
        <Link>
          <RiBarChart2Fill />
          <h3>Predict</h3>
        </Link>
        
        <Link>
          <RiHandCoinFill />
          <h3>Support</h3>
        </Link>
        <Link>
          <RiHandCoinFill />
          <h3>Support</h3>
        </Link>
        </Links>
        </LinksContainer>
      </Container>
    )
}
const Container = styled.div`
  width: 20%;
  height: 100% !important;
  border-radius: 2rem;
  background-color: #091322;
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

const Avatar = styled.img`
  height: 7rem;
  border-radius: 6rem;
  margin-top: 20%;
`;
const Name = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.1rem 0 0.1rem 0;
`;

const LinksContainer = styled.div`
  background-color: ${darkThemeColor};
  height: 100%;
  width: 100%;
  border-radius: 2rem;
`;

const Links = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  height: 60%;
`;

const Link = styled.li`
  margin-left: 25%;
  margin-bottom: 2rem;
  display: flex;
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
export default Card
