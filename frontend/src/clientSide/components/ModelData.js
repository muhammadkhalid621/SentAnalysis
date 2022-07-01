import React, { useState } from "react";
import "../css/modeldata.css";
import total from "../../images/total.jpeg";
import positive from "../../images/positive.jpeg";
import negative from "../../images/negative.jpeg";
import highpos from "../../images/highpos.jpeg";
import highneg from "../../images/highneg.jpeg";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

function ModelData({ summaryData, images }) {
  const [backgroundPosition, setbackgroundPosition] = useState('0% 0%');
  console.log(summaryData);
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setbackgroundPosition(`${x}% ${y}%`);
  };
  console.log(backgroundPosition)
  return (
    <Container>
      <div className="content-data">
        <div className="data-card">
          <img src={total} alt="" />
          <h3>{summaryData[1][0]}</h3>
          <h4>Total Tweets</h4>
        </div>
        <div className="data-card">
          <img src={positive} alt="" />
          <h3>{summaryData[3][0]}</h3>
          <h4>Positive</h4>
        </div>
        <div className="data-card">
          <img src={negative} alt="" />
          <h3>{summaryData[1][1]}</h3>
          <h4>Negative</h4>
        </div>
        <div className="data-card">
          <img src={highpos} alt="" />
          <h3>{Math.trunc(summaryData[3][2] * 100000) / 100000}</h3>
          <h4>Highest Positive</h4>
        </div>
        <div className="data-card">
          <img src={highneg} alt="" />
          <h3>{Math.trunc(summaryData[3][1] * 100000) / 100000}</h3>
          <h4>Highest Negative</h4>
        </div>
        <div className="images">
          <Row>
            <Col>
              <figure
                onMouseMove={(e) => handleMouseMove(e)}
                style={{
                  backgroundImage: `url(${images[1]})`,
                  backgroundPosition: backgroundPosition,
                  backgroundSize: 1100,
                }}
              >
                <img src={images[1]} />
              </figure>
              {/* <div className="img-wrapper">
                <img src={images[1]} alt="" />
              </div> */}
            </Col>
            <Col>
            <figure
                onMouseMove={(e) => handleMouseMove(e)}
                style={{
                  backgroundPosition: backgroundPosition,
                  backgroundImage: images[0],
                }}
              >
                <img src={images[0]} />
              </figure>
            </Col>
          </Row>
          <Row>
            <Col>
            <figure
                onMouseMove={(e) => handleMouseMove(e)}
                style={{
                  backgroundPosition: backgroundPosition,
                  backgroundImage: images[2],
                }}
              >
                <img src={images[2]} />
              </figure>
            </Col>
            <Col>
            <figure
                onMouseMove={(e) => handleMouseMove(e)}
                style={{
                  backgroundPosition: backgroundPosition,
                  backgroundImage: images[3],
                }}
              >
                <img src={images[3]} />
              </figure>
            </Col>
          </Row>
          <Row>
            <Col>
            <figure
                onMouseMove={(e) => handleMouseMove(e)}
                style={{
                  backgroundPosition: backgroundPosition,
                  backgroundImage: images[4],
                }}
              >
                <img src={images[4]} />
              </figure>
            </Col>
            <Col>
            <figure
                onMouseMove={(e) => handleMouseMove(e)}
                style={{
                  backgroundPosition: backgroundPosition,
                  backgroundImage: images[5],
                }}
              >
                <img src={images[5]} />
              </figure>
            </Col>
          </Row>
          <Row>
            <Col>
            <figure
                onMouseMove={(e) => handleMouseMove(e)}
                style={{
                  backgroundPosition: backgroundPosition,
                  backgroundImage: images[6],
                }}
              >
                <img src={images[6]} />
              </figure>
            </Col>
            <Col>
            <figure
                onMouseMove={(e) => handleMouseMove(e)}
                style={{
                  backgroundPosition: backgroundPosition,
                  backgroundImage: images[7],
                }}
              >
                <img src={images[7]} />
              </figure>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  summaryData: state.model.summaryData,
  images: state.model.images,
});

export default connect(mapStateToProps, {})(ModelData);
