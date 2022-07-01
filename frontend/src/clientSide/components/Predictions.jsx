import React from "react";
import styled from "styled-components";
import { BsGraphUp } from "react-icons/bs";
import { themeColor, hoverEffect } from "../utils";
function Predictions() {
  return (
    <PredictionCard>
      <CardContent>
        <Chart>
          <BsGraphUp />
        </Chart>
        <HeadingText>Predictions</HeadingText>
        <Text>
          Identifying whether a textual information is positive or negative
          manually can be frantic and time consuming provided large amounts of
          data.{" "}
        </Text>
      </CardContent>
    </PredictionCard>
  );
}
const PredictionCard = styled.div`
  height: 220px;
  width: 28rem;
  background-color: #39b1e1;
  padding: 1rem;
  border-radius: 1rem;
  color: #white;
  font-size: 9px;
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    width: 80%;
    height: 18rem;
  }
`;

const CardContent = styled.div`
  margin: 1rem;
`;

const Chart = styled.div`
  display: flex;
  justify-content: center;
  svg {
    height: 5rem;
    width: 6rem;
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

export default Predictions;
