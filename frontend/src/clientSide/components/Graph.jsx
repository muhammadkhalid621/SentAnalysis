import React from "react";
import styled from "styled-components";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { themeColor, hoverEffect } from "../utils";
function Graph() {
  return (
    <StartCard>
      <CardContent>
        <Chart>
          <BsFillBarChartLineFill />
        </Chart>
        <HeadingText>Graph</HeadingText>
        <Text>
          This technique helps in the generation of a global map with users
          pin-pointed with their locations and their username. This component
          only works if the data provided contains the location of each of the
          user with their textual data.{" "}
        </Text>
      </CardContent>
    </StartCard>
  );
}
const StartCard = styled.div`
  height: 270px;
  width: 450px;
  background-color: #3ec9a8;
  padding: 1rem;
  border-radius: 1rem;
  color: black;
  font-size: 9px;
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 150px) and (max-width: 1080px) {
    width: 80%;
    height: 300px;
  }
`;

const CardContent = styled.div`
  margin: 1rem;
`;

const Chart = styled.div`
  display: flex;
  color:black;
  justify-content: center;
  svg {
    height: 6rem;
    width: 7rem;
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

export default Graph;
