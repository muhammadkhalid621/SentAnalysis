import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../actions/auth";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import uiImg from "../images/login.svg";
import "../css/signup.css";

const ResetPassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [errors, setErrors] = useState({});
  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const findErrors = () => {
    const newErrors = {};
    //Email Error
    if (!email || email === "") newErrors.email = "Email is Required";
    else if (!regexp.test(email)) newErrors.email = "Invalid Email";

    return newErrors;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newErrors = findErrors();

    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      reset_password(email);
      setRequestSent(true);
    }
  };

  if (requestSent) {
    console.log("sent");
    return <Redirect to="/login" />;
  } else {
    console.log("not send");
    //return <Redirect to='/login' />
  }

  return (
    <>
      <Container className="mt-1">
        <Row>
          <Col lg={8} md={8} sm={12}>
            <img className="w-100 mt-5" src={uiImg} alt="" />
          </Col>
          <Col lg={4} md={8} sm={14} className="mt-1 p-0">
            {/* <img className="icon-img" src={loginIcon} alt="icon" /> */}
            <h1 className="mt-5 d-flex justify-content-center">
              SSK Enterprise
            </h1>
            <h1 className="mt-5 d-flex justify-content-center">Welcome User</h1>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-0 mt-5" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  className={`input ${errors.email && "errorShow"}`}
                  type="email"
                  placeholder="Enter email"
                  value={email || ""}
                  onChange={(e) => onChange(e)}
                />
                {errors.email && <p className="errorShow">{errors.email}</p>}
              </Form.Group>

              <div className="d-flex justify-content-center mt-3">
                <Button
                  as="input"
                  type="submit"
                  value="Reset Password"
                  className="submit"
                />
              </div>

              <div className="back">
                <a href="/home">Back To Site</a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default connect(null, { reset_password })(ResetPassword);
