import React from "react";
import Navbar from "../components/Navbar";
import Support from "../pages/Support";
import styled from "styled-components";

const SupportContainer = () => {
  return (
    <SuppContainer>
      <Navbar />

      <SubSuppContainer>
        <Support />
      </SubSuppContainer>
    </SuppContainer>
  );
};
const SuppContainer = styled.div`
  width: 65%;
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;
  margin: -1rem 10rem 2rem 3rem;
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 1rem 0 0 0;
  }
`;

const SubSuppContainer = styled.div`
  margin: 0.5rem 0;
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6rem;
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    height: 100%;
  }
`;
export default SupportContainer;
