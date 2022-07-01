import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Row, Col } from "react-bootstrap";
import "../css/signup.css";

const AddClients = (props) => {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
    number: "",
    gender: "",
    plan: "",
    dob: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const [Image, setImage] = useState({});
  let form_data = new FormData();
  const [errors, setErrors] = useState({});
  const { username, email, password, re_password, number, gender, plan, dob } =
    formData;
  const { image } = Image;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
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

    //Plan Error
    if (!plan || plan === "") newErrors.plan = "Gender is Required";

    //DoB Error
    if (!dob || dob === "") newErrors.dob = "Date of Birth is Required";

    //ImageError
    // if (!image || image === "") newErrors.image = "Image is Required";

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
        console.log(Image);
        console.log(username);
        form_data.append("username", username);
        form_data.append("email", email);
        form_data.append("password", password);
        form_data.append("re_password", re_password);
        form_data.append("number", number);
        form_data.append("gender", gender);
        form_data.append("dob", dob);
        form_data.append("image", Image);
        console.log(...form_data);

        props.signup(form_data).then(() => {
          setIsLoading(false);
        });
      }
    }
  }, [isLoading]);
  const onSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            ADD CLIENTS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="signup-form">
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
              <Form.Group className="mb-0 mt-2" controlId="formGroupEmail">
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

              <Form.Group className="mb-0 mt-2" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>

                <Form.Control
                  name="password"
                  className={`input ${errors.password && "errorShow"}`}
                  type="password"
                  placeholder="Enter Password"
                  value={password || ""}
                  onChange={(e) => onChange(e)}
                />
                {/* <Form.Text id="passwordHelpBlock" muted>
                  Your password must be 8-16 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </Form.Text> */}
                {errors.password && (
                  <p className="errorShow">{errors.password}</p>
                )}
              </Form.Group>
              <Form.Group
                className="mb-0 mt-2"
                controlId="formGroupConfirmPassword"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="re_password"
                  className={`input ${errors.password && "errorShow"}`}
                  type="password"
                  placeholder="Enter Confirm Password"
                  value={re_password || ""}
                  onChange={(e) => onChange(e)}
                />
                {errors.re_password && (
                  <p className="errorShow">{errors.re_password}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-0  mt-2" controlId="formGroupNumber">
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
                  <Form.Group
                    className="mb-0  mt-2"
                    controlId="formBasicSelectGender"
                  >
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
                  <Form.Group
                    className="mb-0  mt-2"
                    controlId="formBasicSelectPlan"
                  >
                    <Form.Label>Select Plan</Form.Label>
                    <Form.Control
                      name="plan"
                      className={`input ${errors.plan && "errorShow"}`}
                      as="select"
                      value={plan || ""}
                      onChange={(e) => onChange(e)}
                    >
                      <option>Select...</option>
                      <option value="Basic">Basic</option>
                      <option value="Premium">Premium</option>
                      <option value="Enterprise">Enterprise</option>
                    </Form.Control>
                    {errors.plan && <p className="errorShow">{errors.plan}</p>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-0  mt-2" controlId="formGroupDate">
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
              <Form.Group controlId="formFile" className="mb-3  mt-2">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  // className={`input ${errors.image && "errorShow"}`}
                  accept="image/png, image/jpeg"
                  onChange={(e) => onImage(e)}
                  required
                />
                {/* {errors.image && <p className="errorShow">{errors.image}</p>} */}
              </Form.Group>
              {isLoading ? (
                <div className="justify-content">
                  <p>Client is Adding....</p>
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
                    Adding...
                  </Button>
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <Button
                    as="input"
                    type="submit"
                    value={isLoading ? "Adding..." : "Add"}
                    className="submit d-flex justify-content-center pace-content-center"
                    disabled={isLoading}
                  />
                </div>
              )}
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddClients;
