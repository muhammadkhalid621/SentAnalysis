import React from 'react'
import styled from "styled-components";
import { connect } from "react-redux";
function Navbar({username_global}) {
    return (
        
        <Text>
          Hello,
          <span> {username_global} </span>
        </Text>
       
      
    )
}
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
  width: 100%;
  align: left;
  
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    flex-direction: column;
    
  }
`;

const Text = styled.h1`
margin-top: 1rem;
font-size: 30px;
  span {
    font-weight: 500;
    color: #484258;

  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    margin-top: 1rem;
  }
`;


const mapStateToProps = (state) => ({
  username_global: state.auth.username,
  
});

export default connect(mapStateToProps) (Navbar)
