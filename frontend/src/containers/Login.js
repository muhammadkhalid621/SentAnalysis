import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import uiImg from "../images/login.svg";
import "../css/login.css";

const Login = ({ login, isAuthenticated, isAdmin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [change, setChange] = useState(false);
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
  useEffect(() => {
    if (isLoading) {
      const newErrors = findErrors();
      if (Object.keys(newErrors).length > 0) {
        console.log("hello", newErrors);
        setIsLoading(false);
        // We got errors!
        // setIsLoading(false);
        setErrors(newErrors);
      } else {
        console.log("hello");
        setIsLoading(true);
        setErrors({});
        // No errors! Put any logic here for the form submission!

        login(email, password).then(() => {
          setIsLoading(false);
        });
      }
    }
  }, [isLoading]);
  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  console.log(isAuthenticated);
  if (isAuthenticated) {
    console.log("hello", isAdmin);
    return <Redirect to="/loadingUser" />;

    // if (isAdmin) {
    //   console.log("hello1", isAdmin);
    //   return <Redirect to="/dashboard" />;
    // } else {
    //   return <Redirect to="/userDashboard" />;
    // }
  }
  return (
    <>
      <div className="container login-content">
        <Row>
          <Col lg={8} md={9} sm={10}>
            <img className="w-100 mt-5" src={uiImg} alt="" />
          </Col>
          <Col lg={4} md={8} sm={10} className="mt-1 p-0">
            {/* <img className="icon-img" src={loginIcon} alt="icon" /> */}
            <h1 className="mt-5 d-flex justify-content-center title">
              SSK Enterprise
            </h1>
            <h1 className="mt-5 d-flex justify-content-center title">Welcome User</h1>
            <Form onSubmit={onSubmit}>
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
              {isLoading ? (
                <div className="justify-content">
                  {/* <p>Client is Adding....</p> */}
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
                    Logging in...
                  </Button>
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <Button
                    as="input"
                    type="submit"
                    value={isLoading ? "Logging in..." : "Login"}
                    className="submit d-flex justify-content-center pace-content-center"
                    disabled={isLoading}
                  />
                </div>
              )}

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
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
