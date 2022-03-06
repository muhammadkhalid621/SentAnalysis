import React from 'react'
import styled from "styled-components";
import Navbar from "./Navbar";
import Predictions from "./Predictions";
import Graph from "./Graph";
import Support from './Support';
// import Webscrapper from './Webscrapper';
import Profile from './Profile';

function MainContent() {
    return (
     <Container>
         <Navbar />
         <SubContainer>
             <SectionOne>
                 <ColumnOne1>
                 <Profile/>
                 <Predictions />
         
                 </ColumnOne1>
                
             </SectionOne>
             <SectionTwo>
             <ColumnOne2>
             <Graph />
          
          </ColumnOne2>
              
                 <ColumnTwo2>
                 <Support/>
               
                 </ColumnTwo2>
                
             </SectionTwo>
             
         </SubContainer>
     </Container>
    )
}
const Container = styled.div`
  width: 80%;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
  margin: 0.5rem 4rem 2rem 2rem;
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 1rem 0 0 0;
  }
  
`;

const SubContainer = styled.div`
  margin: 0.5rem 0;
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    height: 100%;
  }
`;
const SectionOne = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40%;
  gap: 1rem;
  width: 100%;
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    flex-direction: column;
    align-items: center;
    height: max-content;
  }
`;
const ColumnOne1 = styled.div`
  display: flex;
  gap: 1rem;
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }
`;



const SectionTwo = styled.div`
  display: flex;
  gap: 3rem;
  height: 26vh;
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    flex-direction: column;
    height: max-content;
    width: 100%;
  }
`;
const ColumnOne2 = styled.div`
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`;


const ColumnTwo2 = styled.div`


  @media screen and (min-width: 120px) and (max-width: 1080px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }
`;


export default MainContent
