import React from 'react'
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
        <HeadingText >Graph</HeadingText>
        <Text>this is where you can access the webscrapper.Lorem Ipsum is simply dummy text of the printing and</Text>
      </CardContent>
    </StartCard>
    )
}
const StartCard = styled.div`
  height:240px;
  width: 470px;
  background-color: #3EC9A8;
  padding: 1rem;
  border-radius: 1rem;
  color: white;
  font-size: 9px;
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 150px) and (max-width: 1080px) {
    width: 80%;
    height:300px;   
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
 
  font-size:30px;
`;

const Text = styled.h2`
  text-align: center;
  font-size:15px;
`;




export default Graph
