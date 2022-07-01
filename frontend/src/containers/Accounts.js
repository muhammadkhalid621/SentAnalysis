import React, { useEffect, useState } from "react";
import "../css/accounts.css";
import "../css/loadingUser.css";
import logo from "../images/ssk.png";
import img1 from "../images/home.jpeg";
import img2 from "../images/models.jpeg";
import img3 from "../images/scrapper.jpeg";
import img4 from "../images/alerts.jpeg";
import img5 from "../images/clients.jpeg";
import img6 from "../images/logout.jpeg";
import facebook from "../images/facebook.png";
import twitter from "../images/twitter.png";
import cyber from "../images/cyber.png";
import { logout, get_emails, change_password } from "../actions/auth";
import { clients_list } from "../actions/clients";
import { get_task_details, get_task } from "../actions/task";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import Message from "../components/message";

const Accounts = ({
  username,
  number,
  gender,
  image,
  email,
  logout,
  clients_list,
  emails,
  get_emails,
  get_task_details,
  task_details,
  get_task,
  tasks,
  change_password,
  pass_change,
  pass_change_error,
  error,
}) => {
  const admin_email = [];
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    old_pass: "",
    new_pass: "",
  });
  const [errors, setErrors] = useState({});
  const { old_pass, new_pass } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const findErrors = () => {
    const newErrors = {};

    //Email Error
    if (!old_pass || old_pass === "")
      newErrors.old_pass = "Old Password is Required";

    if (!new_pass || new_pass === "")
      newErrors.new_pass = "New Password is Required";

    return newErrors;
  };

  useEffect(() => {
    get_emails();
    get_task_details();
    get_task();
    console.log(task_details);
    console.log(tasks);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    if (pass_change) {
      logoutHandler();
    }
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
        change_password(old_pass, new_pass).then(() => {
          setIsLoading(false);
        });

        // No errors! Put any logic here for the form submission!

        // login(email, password).then(() => {
        //   setIsLoading(false);
        // });
      }
    }
  }, [get_emails, isLoading, loading]);
  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };
  for (var i = 0; i < emails.length; i++) {
    admin_email.push(emails[i]["email"]);
    if (emails[i]["email"] === email) {
      admin_email.pop(i);
    }
  }
  console.log(admin_email);
  const clients = () => {
    console.log("hello");
    clients_list();
  };
  const logoutHandler = () => {
    logout();
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <nav className="navigation">
        <img src={logo} alt="" />
        <a href="/dashboard">
          {" "}
          <img className="icon" src={img1} alt="" /> Home
        </a>
        <a href="/models">
          <img className="icon" src={img2} alt="" /> Model
        </a>
        <div>
          <a
            href="javascript:"
            onClick={() => setShowSettings(!showSettings)}
            type="button"
          >
            <img className="icon" src={img3} alt="" />
            Scrapes
          </a>
          <div>
            {showSettings ? (
              <ul className="list-unstyled">
                <li>
                  <a href="/twitterscrapper">
                    <img className="icon" src={twitter} alt="" />
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="/fbscrapper">
                    <img className="icon" src={facebook} alt="" />
                    Facebook
                  </a>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* <a href="/scrapper">
          <img className="icon" src={img3} alt="" /> Scrapes
        </a> */}
        <a href="/clients" onClick={clients}>
          <img className="icon" src={img4} alt="" /> Clients
        </a>
        <a href="/dashboard/graph-analysis">
          <img className="icon" src={cyber} alt="" /> Analysis
        </a>
        <button className="nav-btn" onClick={logoutHandler}>
          {" "}
          <img src={img6} /> Logout
        </button>
      </nav>
      {loading ? (
        <div>
          <div className="loader"></div>
        </div>
      ) : (
        <div className="accounts-content">
          <Row>
            <Col>
              <div className="profile">
                <div className="profile-info">
                  <img className="icon" src={image} alt="" />
                  <h1>{username}</h1>
                  <h2>{email}</h2>
                  <h3>{"+92" + number}</h3>
                  <h3>{gender}</h3>
                </div>
              </div>
            </Col>
            <Col>
              <div className="change-pass">
                <Form onSubmit={onSubmit}>
                  <h1> CHNAGE PASSWORD</h1>
                  <Form.Group className="mt-4" controlId="formGroupPassword">
                    <Form.Control
                      name="old_pass"
                      className={`input ${errors.old_pass && "errorShow"}`}
                      type="password"
                      placeholder="Enter Old Password"
                      value={old_pass || ""}
                      onChange={(e) => onChange(e)}
                    />
                    {errors.old_pass && (
                      <p className="errorShow">{errors.old_pass}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mt-4" controlId="formGroupPassword">
                    <Form.Control
                      name="new_pass"
                      className={`input ${errors.new_pass && "errorShow"}`}
                      type="password"
                      placeholder="Enter New Password"
                      value={new_pass || ""}
                      onChange={(e) => onChange(e)}
                    />
                    {errors.new_pass && (
                      <p className="errorShow">{errors.new_pass}</p>
                    )}
                  </Form.Group>
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
                        Changing...
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <Button
                        as="input"
                        type="submit"
                        value={isLoading ? "Changing..." : "Confirm"}
                        className="submit d-flex justify-content-center pace-content-center"
                        disabled={isLoading}
                      />
                    </div>
                  )}
                  <div>
                    {pass_change && (
                      <Message
                        title="Congratulations"
                        message="Your Password has been Changed"
                        show={show}
                        onHide={() => setShow(false)}
                      />
                    )}
                  </div>
                  <div>
                    {error && (
                      <Message
                        title="Error"
                        message={pass_change_error}
                        show={show}
                        onHide={() => setShow(false)}
                      />
                    )}
                  </div>
                </Form>
              </div>

              <div className="tasks">
                <h1> ADMIN TASKS</h1>
                {task_details.map((task, i) => (
                  <div className="task-info-complete" key={task.task_id}>
                    <span className="circle"></span>
                    <p>{task.tasktitle}</p>

                    <Button className="task-btn" disabled>
                      {" "}
                      DONE
                    </Button>
                  </div>
                ))}

                {tasks.map((task, i) => (
                  <div className="task-info-pending" key={task.task_id}>
                    <span className="circle"></span>
                    <p>{task.tasktitle}</p>

                    <Button className="task-btn" disabled>
                      {" "}
                      PENDING
                    </Button>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  emails: state.auth.emails,
  email: state.auth.email,
  username: state.auth.username,
  gender: state.auth.gender,
  number: state.auth.number,
  image: state.auth.image,
  task_details: state.task.task_details,
  tasks: state.task.tasks,
  pass_change: state.auth.pass_change,
  pass_change_error: state.auth.pass_change_error,
  error: state.auth.error,
});

export default connect(mapStateToProps, {
  logout,
  clients_list,
  get_emails,
  get_task_details,
  get_task,
  change_password,
})(Accounts);
