import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import uiImg from "../images/login.svg";
import "../css/passwordconfirm.css";

const ResetPasswordConfirm = ({
  match,
  reset_password_confirm,
  isPassword,
}) => {
  const [requestSent, setRequestSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password).then(
          () => {
            setRequestSent(true);
            setIsLoading(false);
          }
        );
      }
    }
  }, [isLoading]);
  const onSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
  };

  if (requestSent && isPassword) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="container passconfirm-content">
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
              <Form.Group className="mb-0 mt-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="new_password"
                  className={`input ${errors.password && "errorShow"}`}
                  type="password"
                  placeholder="Enter Password"
                  value={new_password || ""}
                  onChange={(e) => onChange(e)}
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
                {errors.re_new_password && (
                  <p className="errorShow">{errors.re_new_password}</p>
                )}
              </Form.Group>
              {isLoading ? (
                <div className="justify-content">
                  <p>An new Password is setting for your account....</p>
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
                    Creaing...
                  </Button>
                </div>
              ) : (
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    as="input"
                    type="submit"
                    value={isLoading ? "Creaing..." : "Reset Password"}
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
  isPassword: state.auth.isPassword,
});
export default connect(mapStateToProps, { reset_password_confirm })(
  ResetPasswordConfirm
);
