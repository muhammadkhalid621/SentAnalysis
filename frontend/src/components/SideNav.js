import React, { useState, useEffect } from "react";
import "../css/sideNav.css";
import "../css/loadingUser.css";
import { logout, get_emails } from "../actions/auth";
import { clients_list } from "../actions/clients";
import { task_upload, get_task, update_task, get_task_details } from "../actions/task";
import { Redirect } from "react-router";
import { connect } from "react-redux";
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
import AddTask from "./AddTask";

function SideNav({
  isAuthenticated,
  isAdmin,
  username_global,
  email_global,
  number_global,
  gender_global,
  image_global,
  logout,
  clients_list,
  task_upload,
  emails,
  get_emails,
  get_task,
  tasks,
  update_task,
  get_task_details
}) {
  const admin_email = [];
  const [redirect, setRedirect] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // clients_list()
  useEffect(() => {
    get_emails();
    get_task();
    get_task_details()
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [get_emails, get_task, isLoading]);
  for (var i = 0; i < emails.length; i++) {
    admin_email.push(emails[i]["email"]);
    if (emails[i]["email"] === email_global) {
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

  const updateTask = (task) => {
    update_task(task);
    window.location.reload();
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
      {/* <!-- ADMIN SECTION STARTS --> */}
      {isLoading ? (
        <div>
          <div className="loader"></div>
        </div>
      ) : (
        <div className="row">
          <div className="col-sm first">
            <img src={image_global} alt="" />
            <h3>{username_global}</h3>
            <div className="data">
              <p>{number_global}</p>
              {/* <p></p> */}
              <p>{gender_global}</p>
            </div>
            <a href="/dashboard/accounts">
              <button className="first-btn">ACCOUNT</button>
            </a>
            <hr className="first-hr" />
            <div className="container task">
              <h3>TASK</h3>
              <button className="add-btn" onClick={() => setModalShow(true)}>
                +
              </button>
              <AddTask
                show={modalShow}
                onHide={() => setModalShow(false)}
                email={email_global}
                task_upload={task_upload}
                emails={admin_email}
              />
              {/* <button className="complete-btn" onClick={console.log("hehehe")}>
              Completed
            </button> */}
              <br />
              {tasks.map((task, i) => (
                <div className="check-boxes" key={task.task_id}>
                  {/* <input
                  type="checkbox"
                  className="check"
                /> */}
                  <button
                    className="complete-btn"
                    onClick={() => updateTask(task)}
                  >
                    Completed
                  </button>
                  <label>
                    {" "}
                    {task.tasktitle} <p>{task.taskMessage}</p>{" "}
                  </label>
                  <br />
                  <hr />

                  {/* <input
                type="checkbox"
                id="vehicle2"
                name="vehicle2"
                value="Car"
              />
              <label htmlFor="vehicle2">
                {" "}
                I have a car <p>Some details are here</p>
              </label>
              <br />
              <hr /> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}{" "}
      {/* <!-- ADMIN SECTION END HOGYA --> */}
    </>
  );
}
const mapStateToProps = (state) => ({
  username_global: state.auth.username,
  email_global: state.auth.email,
  number_global: state.auth.number,
  gender_global: state.auth.gender,
  image_global: state.auth.image,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
  emails: state.auth.emails,
  tasks: state.task.tasks,
});

export default connect(mapStateToProps, {
  logout,
  clients_list,
  task_upload,
  get_emails,
  get_task,
  update_task,
  get_task_details
})(SideNav);
