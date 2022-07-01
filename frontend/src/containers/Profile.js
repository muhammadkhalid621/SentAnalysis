import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { load_user } from "../actions/profile";
import { delete_account } from "../actions/auth";
import { Form, Row, Col, Button, Container } from "react-bootstrap";

import { Redirect } from "react-router";
import { logout } from "../actions/auth";

const Profile = ({
  logout,
  //delete_account,
  username_global,
  email_global,
  number_global,
  password_global,
  gender_global,
  dob_global,
}) => {
  const [redirect, setRedirect] = useState(false);
  const logoutHandler = () => {
    console.log("hi");
    logout();
    setRedirect(true);
  };
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    number: "",
    gender: "",
    dob: "",
  });

  const { username, email, password, number, gender, dob } = formData;

  useEffect(() => {
    setFormData({
      username: username_global,
      email: email_global,
      password: password_global,
      number: number_global,
      gender: gender_global,
      dob: dob_global,
    });
  }, [email]);
  console.log(formData)
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    load_user()
  };
  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Welcome User</h1>
      <button onClick={logoutHandler}>Logout</button>
      <Form onSubmit={onSubmit}>
              <Form.Group className="mb-0" controlId="formGroupText">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  //className={`input ${errors.username && "errorShow"}`}
                  type="text"
                  placeholder={`${username_global}`}
                  value={username}
                  onChange={e => onChange(e)}
                  required
                />
                {/* {errors.username && (
                  <p className="errorShow">{errors.username}</p>
                )} */}
              </Form.Group>
              <Form.Group className="mb-0" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                //   className={`input ${errors.email && "errorShow"}`}
                  type="email"
                  placeholder={`${email_global}`}
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />
                {/* {errors.email && <p className="errorShow">{errors.email}</p>} */}
              </Form.Group>
              <Form.Group className="mb-0" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                //   className={`input ${errors.password && "errorShow"}`}
                  type="password"
                  placeholder={`${password_global}`}
                  minLength='8'
                  maxLength='14'
                  value={password}
                  onChange={e => onChange(e)}
                  required
                />
                {/* {errors.password && (
                  <p className="errorShow">{errors.password}</p>
                )} */}
              </Form.Group>
              <Form.Group className="mb-0" controlId="formGroupConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="re_password"
                //   className={`input ${errors.password2 && "errorShow"}`}
                  type="password"
                  placeholder={`${password_global}`}
                  value={password}
                  onChange={e => onChange(e)}
                  required
                />
                {/* {errors.password && (
                  <p style={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}className="errorShow">{errors.password}</p>
                )} */}
              </Form.Group>
              
              <Form.Group className="mb-0" controlId="formGroupNumber">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  name="number"
                //   className={`input ${errors.number && "errorShow"}`}
                  type="text"
                  placeholder={`${number_global}`}
                  minLength='11'
                  minLength='11'
                  value={number}
                  onChange={e => onChange(e)}
                  required
                />
                {/* {errors.number && <p className="errorShow">{errors.number}</p>} */}
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicSelectGender">
                    <Form.Label>Select Gender</Form.Label>
                    <Form.Control
                      name="gender"
                    //   className={`input ${errors.gender && "errorShow"}`}
                      as="select"
                      placeholder={`${gender_global}`}
                      value={gender}
                      onChange={e => onChange(e)}
                    >
                      <option value="Gender">Select...</option>
                      <option value="Male">Male</option>
                      <option value="Feale">Female</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-0" controlId="formGroupDate">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      name="dob"
                    //   className={`input ${errors.dob && "errorShow"}`}
                      type="date"
                      placeholder={`${dob_global}`}
                      value={dob}
                      onChange={e => onChange(e)}
                      required
                    />
                    {/* {errors.dob && <p className="errorShow">{errors.dob}</p>} */}
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <Button
                  as="input"
                  type="submit"
                  value="Signup"
                  className="submit"
                />
              </div>

              
            </Form>
    </div>
  );
}

const mapStateToProps = (state) => ({
    username_global: state.auth.username,
    email_global: state.auth.email,
    password_global: state.auth.password,
    number_global: state.auth.number,
    gender_global: state.auth.gender,
    dob_global: state.auth.dob,
});

export default connect(mapStateToProps, { logout, load_user })(Profile);