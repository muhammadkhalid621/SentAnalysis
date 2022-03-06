import React from 'react'
import umer from "../assets/umer.jpg";
import { connect } from "react-redux";
// import Badge from "./Badge";
import styled from "styled-components";
import Badge from "./Badge";
import { cardShadow, hoverEffect } from "../utils";
import ListGroup from 'react-bootstrap/ListGroup';

const Profile = ({username_global, email_global, image_global}) => {
  console.log(username_global, email_global, image_global)
    return (
      <RecommendProject>
      <CardContent>
        <Detail>
          <InfoContainer>
            <Pic>
              <img src={image_global} alt="" />
            </Pic>
            <Info>
              <Name>{username_global}</Name>
              <Infoemail>{email_global}</Infoemail>
            </Info>
    
          </InfoContainer>
          
          <Badge content="view profile" />
        </Detail>
        
        <ProjectInfo>
        <Text>this is where you can access the webscrapper.Lorem Ipsum is simply dummy text of the printing and</Text>
        {/* <ListGroup variant="flush">
    <ListGroup.Item><Text>Cras justo odio</Text></ListGroup.Item>
    <ListGroup.Item><Text>Cras justo odio</Text></ListGroup.Item>
    <ListGroup.Item><Text>Cras justo odio</Text></ListGroup.Item>
  </ListGroup> */}
        </ProjectInfo>
       
      </CardContent>
    </RecommendProject>
    )
}
const RecommendProject = styled.div`
  border-radius: 1rem;
  height: 120%;
  padding: 1rem;
  background-color: white;
  
  width:40.5vw;
  box-shadow: ${cardShadow};
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 220px) and (max-width: 1080px) {
    height: max-content;
    width: 80%;
    margin: 1rem 0;
  }
`;

const CardContent = styled.div`
  margin: 0.4rem;
`;


const Detail = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.2rem;
    margin-bottom: 1rem;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Pic = styled.div`
  margin-right: 1rem;
  img {
    height: 5rem;
    border-radius: 5rem;
  }
`;
const Info = styled.div`
font-weight: 500;
font-size:12px;
@media screen and (min-width: 320px) and (max-width: 1080px) {
  align-items: flex-end;
  font-size:12px;
  
}`;
const Name = styled.h3`
  font-weight: 400;
  font-size:20px;
  @media screen and (min-width: 220px) and (max-width: 1080px) {
height:0.1px;
visibility: hidden 

   

`;
const Infoemail = styled.h5`
  font-weight: 300;
  font-size:20px;
  @media screen and (min-width: 220px) and (max-width: 1080px) {
    font-size:15px;
    
    

`;

const ProjectInfo = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
  color: #3b3b3b;
  margin-bottom: 0.5em;
`;

const Text = styled.h2`
  text-align: center;
  font-size: 15px;
  margin-top: 2rem;
`;
const mapStateToProps = (state) => ({
  username_global: state.auth.username,
  email_global: state.auth.email,
  image_global: state.auth.image,
});

export default connect(mapStateToProps) (Profile)
