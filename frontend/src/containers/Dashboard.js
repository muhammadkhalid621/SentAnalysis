import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { user_profile } from "../actions/profile";
import "../css/admin_dashboard.css";
import { Redirect } from "react-router";
import logo from "../images/ssk.jpg";
import img1 from "../images/home-icon.png";
import img2 from "../images/Computer-icon.png";
import img3 from "../images/Office-Customer-Male-Light-icon.png";
import img4 from "../images/alert-icon.png";
import img5 from "../images/login-icon.png";
import img6 from "../images/man-icon.png";
import img7 from "../images/train.jpg";
import img8 from "../images/TEST.jpg";
import img9 from "../images/line_graph2-removebg-preview.png";
import img10 from "../images/circular.png";
import img11 from "../images/circular2.png";
import img12 from "../images/graphanalysis.png";
import img13 from "../images/clients.jpg";
import SideNav from "../components/SideNav";

const Dashboard = ({
  isAuthenticated,
  isAdmin,
  username_global,
  number_global,
  gender_global,
  image_global,
  logout,
  user_profile,
}) => {
  
  const [redirect, setRedirect] = useState(false);
  const logoutHandler = () => {
    console.log("hi");
    logout();
    setRedirect(true);
  };
  // const user = user_profile()
  // console.log(user)
  console.log(image_global);
  if (redirect) {
    return <Redirect to="/login" />;
  }

  // if (!isAuthenticated) {
  //   logoutHandler();
  //   return <Redirect to="/login" />;
  // }
  // if (!isAdmin) {
  //   logoutHandler();
  //   return <Redirect to="/login" />;
  // }
  return (
    <>
    <SideNav />
      
      {/* <!-- NAVIGATION BAR ENDS --> */}

      {/* <!-- ADMIN SECTION STARTS --> */}
      <div className="row">
        <div className="col-sm first">
          <img src={image_global} alt="" />
          <h3>{username_global}</h3>
          <div className="data">
            <p>{number_global}</p>
            {/* <p></p> */}
            <p>{gender_global}</p>
          </div>
          <button className="first-btn">ACCOUNT</button>
          <hr className="first-hr" />
          <div className="container task">
            <h3>TASK</h3>
            <button className="add-btn" onClick={console.log("hehehe")}>
              +
            </button>
            <br />
            <div className="check-boxes">
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label htmlFor="vehicle1">
                {" "}
                I have a bike <p>Some details are here</p>{" "}
              </label>
              <br />
              <hr />
              <input
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
              <hr />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ADMIN SECTION END HOGYA --> */}

      <section className="container wrapper">
        <div className="scrapper">
          <h3 className="heading">WEB SCRAPPER </h3>
          <p className="wrapper-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repudiandae, voluptatem eligendi. Dolorum eaque minus a ut
            aspernatur recusandae deserunt explicabo obcaecati delectus earum
            ipsa error nemo consequuntur sequi, et sapiente. Ea officiis animi
            aut tempora! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Itaque quis sapiente ullam, repellendus dolore totam assumenda
            expedita id iusto voluptate! Lorem ipsum dolor sit amet consectetur
            adipisicing.
          </p>
          <div className="btn-dashboard">
            <a href="/scrapper">
              <button className="wrapper-btn">SCRAPPER</button>
            </a>
          </div>
        </div>
        <div className="model">
          <h3 className="heading">MODEL</h3>
          <p className="wrapper-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            architecto totam deleniti labore ipsum. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quas, cupiditate.
          </p>
          <h3 className="center">TRAIN</h3>
          <img src={img7} alt="" />
          <p className="wrapper-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            tempore saepe. Quos pariatur, iste labore voluptate vitae ab
            molestias architecto.
          </p>
          <h3 className="center">TEST</h3>
          <img src={img8} alt="" />
          <p className="wrapper-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
            veritatis quam dignissimos necessitatibus aliquam reprehenderit
            asperiores pariatur dolorum officiis laudantium!
          </p>
          <p className="wrapper-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime
            distinctio dicta in magnam eaque facilis at tenetur? Laborum,
            facere!
          </p>
          <div className="btn-dashboard">
            <a href="/models">
              <button className="wrapper-btn">TRAIN</button>
            </a>
          </div>
        </div>
        <div className="prediction">
          <h3 className="heading">PREDICTION</h3>
          <img src={img9} alt="" />
          <p className="wrapper-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repudiandae, voluptatem eligendi. Dolorum eaque minus a ut
            aspernatur recusandae deserunt explicabo obcaecati delectus earum
            ipsa error nemo consequuntur sequi, et sapiente. Ea officiis animi
            aut tempora! Lorem ipsum dolor sit amet consectetur adiusto
            voluptate! Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
          <img className="circular" src={img10} alt="" />
          <img className="circular" src={img11} alt="" />
          <p className="wrapper-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            voluptate tempora quo consequuntur provident aperiam consequatur
            perspiciatis quia! Nisi, deserunt?
          </p>
          <div className="btn-dashboard">
            <a href="/models">
              <button className="wrapper-btn">PREDICT</button>
            </a>
          </div>
        </div>
        <div className="analysis">
          <h3 className="heading">GRAPH ANALYSIS</h3>
          <p className="wrapper-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repudiandae, voluptatem eligendi. Dolorum eaque minus a ut
            aspernatur
          </p>
          <img src={img12} alt="" />
          <div className="btn-dashboard">
            <button className="wrapper-btn">ANALYSIS</button>
          </div>
        </div>
        <div className="clients">
          <h3 className="heading">CLIENTS</h3>
          <p className="wrapper-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repudiandae, voluptatem eligendi. Dolorum eaque minus a ut
            aspernatur
          </p>
          <img src={img13} alt="" />
          <div className="btn-dashboard">
            <button className="wrapper-btn" href="/models">
              CLIENTS
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
const mapStateToProps = (state) => ({
  username_global: state.auth.username,
  number_global: state.auth.number,
  gender_global: state.auth.gender,
  image_global: state.auth.image,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, { logout, user_profile })(Dashboard);
// export default Dashboard;
