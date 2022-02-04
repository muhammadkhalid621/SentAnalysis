import React from "react";
import SideNav from "../components/SideNav";
import { withRouter } from "react-router";
import "../css/sideNav.css";

import uiImg from "../images/ssk.jpg";

const Dash = (props) => {
  return (
    <>
      <div>
        <SideNav />
      </div>

      <div className="main">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="column">
                <img
                  src={uiImg}
                  className="title-image rounded-circle pull-left mx-1"
                  alt="Cinque Terre"
                />
                <p className="name"> ADMIN NAME</p>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <p className="email"> email@example.com</p>
              </div>
              <div className="column">
                <p className="email"> email@example.com</p>
              </div>
              <div className="column">
                <p className="email"> email@example.com</p>
              </div>
            </div>
          </div>
          <div className="card-body">Content</div>
        </div>
      </div>

      {/* <Row>
          <Col lg={2} md={2} sm={4} >
            <SideNav />
          </Col>
          <Col lg={9} md={8} sm={10}>
            <Card>
              <Row>
                <Col>
                  <div className="d-flex justify-content-start">
                    <Image src="" roundedCircle />
                  </div>
                </Col>

                <Col>
                  <div className="d-flex justify-content-start">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue="Admin Name"
                    />
                  </div>
                </Col>

                <Col>
                  <div className="d-flex justify-content-end">
                    <Button href="#">Account</Button>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={2} md={3} sm={12}>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="email@example.com"
                  />
                </Col>

                <Col lg={2} md={3} sm={12}>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="123456789011"
                  />
                </Col>

                <Col lg={2} md={3} sm={12}>
                  <Form.Control plaintext readOnly defaultValue="website" />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row> */}
    </>
  );
};
const Dashboard = withRouter(Dash);
export default Dashboard;
