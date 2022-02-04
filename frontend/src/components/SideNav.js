import React from "react";
import { Navbar, Offcanvas, Container, Nav } from "react-bootstrap";
import "../css/sideNav.css";
import { Logout } from "../actions/auth"
import { Redirect } from "react-router";
import { connect } from "react-redux";

function SideNav(Logout) {
  const onlogout = () => {
    Logout();
    return <Redirect to="/login" />
  }
  return (
    <>
      {/* <Nav className="md-12 d-none d-md-block bg-light sidebar"
            activeKey="/dashboard"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link href="/dashboard">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item>
            </Nav> */}
      {/* <div className="container">
        <ul className="sidebar">
          <li>
            <span>Travelers</span>
          </li>
          <li>
            <span>
              <i className="fa fa-home"></i>
            </span>
            <span>Home</span>
          </li>
          <li>
            <span>
              <i className="fa fa-dashboard"></i>
            </span>
            <span>Dashboard</span>
          </li>
          <li>
            <span>
              <i className="fa fa-users"></i>
            </span>
            <span>Users</span>
          </li>
          <li>
            <span>
              <i className="fa fa-shopping-cart"></i>
            </span>
            <span>Products</span>
          </li>
          <li>
            <span>
              <i className="fa fa-bookmark"></i>
            </span>
            <span>Bookmarks</span>
          </li>
          <li>
            <span>
              <i className="fa fa-gear"></i>
            </span>
            <span>Settings</span>
          </li>
        </ul>

        <div className="content"></div>
      </div> */}

      <div className="sidebar">
        <a href="#home">
          <i className="fa fa-fw fa-home"></i> Home
        </a>
        <a href="/scrapper">
          <i className="fa fa-fw fa-wrench"></i> Scrapper
        </a>
        <a href="/models">
          <i className="fa fa-fw fa-wrench"></i> Models
        </a>
        <a href="#clients">
          <i className="fa fa-fw fa-user"></i> Clients
        </a>
        <a href="#contact">
          <i className="fa fa-fw fa-envelope"></i> Contact
        </a>
        <button onClick={onlogout}>
          <i className="fa fa-fw fa-envelope"></i> Logout
        </button>
      </div>
    </>
  );
}

export default connect(null, { Logout } )(SideNav);
