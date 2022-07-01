import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Prediction from "../pages/Prediction";
import styled from "styled-components";
import ModelData from "../components/ModelData";
import { connect } from "react-redux";

const PredictionContainer = ({ report }) => {
  const [Predict, SetPredict] = useState(false);

  useEffect(() => {
    SetPredict(report);
  });

  return (
    <PredContainer>
      <Navbar />

      <SubPredContainer>
        <Prediction />
      </SubPredContainer>
      <div>
        {Predict ? (
          <DataPredContainer>
            <ModelData />
          </DataPredContainer>
        ) : (
          ""
        )}
      </div>
    </PredContainer>
  );
};
const PredContainer = styled.div`
  width: 68%;
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

const SubPredContainer = styled.div`
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

const DataPredContainer = styled.div`
  margin-top: 150px;

  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6rem;
  @media screen and (min-width: 120px) and (max-width: 1080px) {
    height: 100%;
  }
`;
const mapStateToProps = (state) => ({
  report: state.model.report,
});

export default connect(mapStateToProps)(PredictionContainer);
