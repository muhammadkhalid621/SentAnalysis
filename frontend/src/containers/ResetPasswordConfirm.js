import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import uiImg from "../images/login.jpg";
import "../css/signup.css";

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const [errors, setErrors] = useState({});
  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const findErrors = () => {
    const newErrors = {};

    //Password Error
    if (!new_password || new_password === "")
      newErrors.new_password = "Password is Required";
    else if (new_password.length < 8)
      newErrors.new_password = "Password is too Short";

    //Re_password Error
    if (!re_new_password || re_new_password === "")
      newErrors.re_new_password = "Password Confirmation is Required";
    else if (new_password !== re_new_password)
      newErrors.re_new_password = "Password Doesnot Match";

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
      const uid = match.params.uid;
      const token = match.params.token;

      reset_password_confirm(uid, token, new_password, re_new_password);
      setRequestSent(true);
    }
  };

  if (requestSent) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Container className="mt-1">
        <Row>
          <Col lg={8} md={8} sm={12}>
            <img className="w-100" src={uiImg} alt="" />
          </Col>
          <Col lg={4} md={8} sm={14} className="mt-1 p-0">
            {/* <img className="icon-img" src={loginIcon} alt="icon" /> */}
            <h1 className="mt-3 d-flex justify-content-center">
              SSK Enterprise
            </h1>
            <h1 className="mt-5 d-flex justify-content-center">Welcome User</h1>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-0" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="new_password"
                  className={`input ${errors.password && "errorShow"}`}
                  type="password"
                  placeholder="Enter Password"
                  value={new_password || ""}
                  onChange={(e) => onChange(e)}
                  required
                />
                {errors.new_password && (
                  <p className="errorShow">{errors.new_password}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-0" controlId="formGroupConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="re_new_password"
                  className={`input ${errors.password2 && "errorShow"}`}
                  type="password"
                  placeholder="Enter Confirm Password"
                  value={re_new_password || ""}
                  onChange={(e) => onChange(e)}
                />
                {errors.re_new_password && <p>{errors.re_new_password}</p>}
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  as="input"
                  type="submit"
                  value="Reset Password"
                  className="submit"
                />
              </div>

              <div className="back">
                <a href="/">Back To Site</a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
