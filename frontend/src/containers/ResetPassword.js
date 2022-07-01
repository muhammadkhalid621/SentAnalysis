import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../actions/auth";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import uiImg from "../images/login.svg";
import "../css/forgetpassword.css";

const ResetPassword = ({ reset_password, isEmail }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  useEffect(() => {
    if (isLoading) {
      const newErrors = findErrors();

      if (Object.keys(newErrors).length > 0) {
        setIsLoading(false);
        // We got errors!
        setErrors(newErrors);
      } else {
        setIsLoading(true);
        setErrors({});
        // No errors! Put any logic here for the form submission!
        reset_password(email).then(() => {
          setRequestSent(true);
          setIsLoading(false);
        });
      }
    }
  }, [isLoading]);
  const onSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
  };

  if (requestSent && isEmail) {
    console.log("sent");
    return <Redirect to="/login" />;
  } else {
    console.log("not send");
    //return <Redirect to='/login' />
  }

  return (
    <>
      <div className="container resetpass-content">
        <Row>
          <Col lg={8} md={8} sm={12}>
            <img className="w-100 mt-5" src={uiImg} alt="" />
          </Col>
          <Col lg={4} md={8} sm={14} className="mt-1 p-0">
            {/* <img className="icon-img" src={loginIcon} alt="icon" /> */}
            <h1 className="mt-5 d-flex justify-content-center title">
              SSK Enterprise
            </h1>
            <h1 className="mt-5 d-flex justify-content-center title">Welcome User</h1>
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

              {isLoading ? (
                <div className="justify-content">
                  <p>An email is sending to your Email address....</p>
                  <br />
                  <Button
                    variant="primary"
                    disabled
                    className="submit d-flex justify-content-center"
                  >
                    <Spinner
                      as="span"
                      animation="border"
                      role="status"
                      aria-hidden="true"
                    />
                    Submitting...
                  </Button>
                </div>
              ) : (
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    as="input"
                    type="submit"
                    value={isLoading ? "Submitting..." : "Reset Password"}
                    className="submit d-flex justify-content-center pace-content-center"
                    disabled={isLoading}
                  />
                </div>
              )}

              <div className="back">
                <a href="/home">Back To Site</a>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  isEmail: state.auth.isEmail,
});

export default connect(mapStateToProps, { reset_password })(ResetPassword);
