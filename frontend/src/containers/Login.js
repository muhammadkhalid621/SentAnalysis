import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import uiImg from "../images/login.svg";
import "../css/signup.css";

const Login = ({ login, isAuthenticated, isAdmin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const findErrors = () => {
    const newErrors = {};

    //Email Error
    if (!email || email === "") newErrors.email = "Email is Required";
    else if (!regexp.test(email)) newErrors.email = "Invalid Email";

    if (!password || password === "")
      newErrors.password = "Password is Required";

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
      login(email, password);
    }
  };

  console.log(isAdmin, isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/loadingUser" />;
  }
  // if (isAdmin) {
  //       return <Redirect to="/dashboard" />;
  //     } else {
  //       return <Redirect to="/userDashboard" />;
  //     }
  return (
    <>
      <Container className="mt-1">
        <Row>
          <Col lg={8} md={9} sm={10}>
            <img className="w-100 mt-5" src={uiImg} alt="" />
          </Col>
          <Col lg={4} md={8} sm={10} className="mt-1 p-0">
            {/* <img className="icon-img" src={loginIcon} alt="icon" /> */}
            <h1 className="mt-5 d-flex justify-content-center">
              SSK Enterprise
            </h1>
            <h1 className="mt-5 d-flex justify-content-center">Welcome User</h1>
            <Form  onSubmit={onSubmit}>
              <Form.Group className="mb-0 mt-3" controlId="formGroupEmail">
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
              <Form.Group className="mb-0" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  className={`input ${errors.password && "errorShow"}`}
                  type="password"
                  placeholder="Enter Password"
                  value={password || ""}
                  onChange={(e) => onChange(e)}
                />
                {errors.password && (
                  <p className="errorShow">{errors.password}</p>
                )}
              </Form.Group>
              <div className="d-flex justify-content-left">
                <p>
                  <Link to="/reset-password">Forgot Password</Link>
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  as="input"
                  type="submit"
                  value="Login"
                  className="submit"
                />
              </div>

              <div className="createAccount">
                <span>
                  New Here?
                  <a href="/signup">Create Account</a>
                </span>
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

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
