import React from "react";
import styled from "styled-components";
import { RiHandCoinFill } from "react-icons/ri";
import { themeColor, hoverEffect } from "../utils";

function Support() {
  return (
    <StartCard>
      <CardContent>
        <Chart>
          <RiHandCoinFill />
        </Chart>
        <HeadingText>Support</HeadingText>
        <Text>
          Stumbled across a problem? Not sure how to proceed? Don't worry! Check
          the FAQ's window in the main page or click here and contact us
          directly.
        </Text>
      </CardContent>
    </StartCard>
  );
}
const StartCard = styled.div`
  height: 270px;
  width: 450px;
  background-color: #fcba4a;
  padding: 1rem;
  border-radius: 1rem;
  color: #white;
  font-size: 5px;
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 150px) and (max-width: 1080px) {
    width: 80%;
    height: 18rem;
    margin-left: 10%;
  }
`;

const CardContent = styled.div`
  margin: 1rem;
`;

const Chart = styled.div`
  display: flex;
  justify-content: center;
  svg {
    height: 7rem;
    width: 8rem;
  }
`;

const HeadingText = styled.h3`
  text-align: center;

  font-size: 30px;
`;

const Text = styled.h2`
  text-align: center;
  font-size: 15px;
`;

export default Support;
