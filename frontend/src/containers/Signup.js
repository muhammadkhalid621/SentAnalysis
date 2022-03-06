import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import uiImg from "../images/login.svg";
import "../css/signup.css";

const Signup = ({ signup, isAuthenticated, django_error }) => {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
    number: "",
    gender: "",
    dob: "",
  });
  const [Image, setImage] = useState({});
  const [errors, setErrors] = useState({});
  const { username, email, password, re_password, number, gender, dob } =
    formData;
  const { image } = Image
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onImage = (e) => 
  {
    console.log(e.target.files[0])
    setImage(e.target.files[0])
  }

  const findErrors = () => {
    const newErrors = {};

    //username Error
    if (!username || username === "")
      newErrors.username = "Username is Required";
    else if (username.length > 20) newErrors.username = "Username is Too Long";

    //Email Error
    if (!email || email === "") newErrors.email = "Email is Required";
    else if (!regexp.test(email)) newErrors.email = "Invalid Email";

    //Password Error
    if (!password || password === "")
      newErrors.password = "Password is Required";
    else if (password.length < 8) newErrors.password = "Password is too Short";

    //Re_password Error
    if (!re_password || re_password === "")
      newErrors.re_password = "Password Confirmation is Required";
    else if (password !== re_password)
      newErrors.re_password = "Password Doesnot Match";

    //Number Error
    if (!number || number.length !== 11)
      newErrors.number = "Invalid Mobile Number";

    //Gender Error
    if (!gender || gender === "") newErrors.gender = "Gender is Required";

    //DoB Error
    if (!dob || dob === "") newErrors.dob = "Date of Birth is Required";

    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(django_error)
    const newErrors = findErrors();

    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      console.log(Image)
      console.log(username)
      let form_data = new FormData();
      form_data.append('username', username);
      form_data.append('email', email);
      form_data.append('password', password);
      form_data.append('re_password', re_password);
      form_data.append('number', number);
      form_data.append('gender', gender);
      form_data.append('dob', dob);
      form_data.append('image', Image);
      console.log(...form_data)
      signup(form_data);
      setAccountCreated(true);
    }
  };

  // const continueWithGoogle = async () => {
  //     try {
  //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

  //         window.location.replace(res.data.authorization_url);
  //     } catch (err) {

  //     }
  // };

  // const continueWithFacebook = async () => {
  //     try {
  //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

  //         window.location.replace(res.data.authorization_url);
  //     } catch (err) {

  //     }
  // };

  if (isAuthenticated) {
    return <Redirect to="/loadingUser" />;
  }
  // if (accountCreated) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <>
      <Container className="mt-1">
        <Row>
          <Col lg={8} md={7} sm={12}>
            <img className=" mt-5 w-100" src={uiImg} alt="" />
          </Col>
          <Col lg={4} md={6} sm={12} className="mt-1 p-0">
            {/* <img className="icon-img" src={loginIcon} alt="icon" /> */}
            <h1 className="title">SSK Enterprise</h1>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-0" controlId="formGroupText">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  className={`input ${errors.username && "errorShow"}`}
                  type="text"
                  placeholder="Enter username"
                  value={username || ""}
                  onChange={(e) => onChange(e)}
                />
                {errors.username && (
                  <p className="errorShow">{errors.username}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-0" controlId="formGroupEmail">
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
              <Form.Group className="mb-0" controlId="formGroupConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="re_password"
                  className={`input ${errors.re_password && "errorShow"}`}
                  type="password"
                  placeholder="Enter Confirm Password"
                  value={re_password || ""}
                  onChange={(e) => onChange(e)}
                />
                {errors.re_password && (
                  <p className="errorShow">{errors.re_password}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-0" controlId="formGroupNumber">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  name="number"
                  className={`input ${errors.number && "errorShow"}`}
                  type="text"
                  placeholder="Enter Mobile Number"
                  // minLength="11"
                  // minLength="11"
                  value={number || ""}
                  onChange={(e) => onChange(e)}
                />
                {errors.number && <p className="errorShow">{errors.number}</p>}
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicSelectGender">
                    <Form.Label>Select Gender</Form.Label>
                    <Form.Control
                      name="gender"
                      className={`input ${errors.gender && "errorShow"}`}
                      as="select"
                      value={gender || ""}
                      onChange={(e) => onChange(e)}
                    >
                      <option value="Gender">Select...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                    {errors.gender && (
                      <p className="errorShow">{errors.gender}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-0" controlId="formGroupDate">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      name="dob"
                      className={`input ${errors.dob && "errorShow"}`}
                      type="date"
                      placeholder="Enter Date of Birth"
                      value={dob || ""}
                      onChange={(e) => onChange(e)}
                    />
                    {errors.dob && <p className="errorShow">{errors.dob}</p>}
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control 
                  type="file" 
                  name="image"
                  accept="image/png, image/jpeg"
                  onChange={(e) => onImage(e)}
                  />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  as="input"
                  type="submit"
                  value="Signup"
                  className="submit"
                />
              </div>

              <div className="createAccount">
                <span>
                  Already Have an Account
                  <a href="/login">Login</a>
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
  isAuthenticated: state.auth.isAuthenticated,
  django_error: state.auth.error,
});

export default connect(mapStateToProps, { signup })(Signup);
