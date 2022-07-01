import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { user_profile } from "../actions/profile";
import "../css/admin_dashboard.css";
import { Redirect } from "react-router";
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
      <section className="container wrapper">
        <div className="scrapper">
          <h3 className="heading">WEB SCRAPPER </h3>
          <p className="wrapper-text mt-2">
            Can't find enough tweets on your desired topic? Getting tired
            querying out the tweets? Taking lots of time finding tweets
            manually?
            <br />
            <br />
            Don't worry, hop onto the website scrapping window by pressing the
            following Scrapper button to retrieve tweets on your specified
            topic.
          </p>
          <div className="btn-dashboard">
            <button
              className="wrapper-btn"
            >
              Scrapper
            </button>
            <div className="dropdown-content">
              <a href="/twitterscrapper">Twitter Scrapper</a>
              <a href="/fbscrapper">Facebook Scrapper</a>
            </div>
          </div>
        </div>
        <div className="model">
          <h3 className="heading">MODEL</h3>
          <p className="wrapper-text mt-2">
            This aspect is intended for developers particularly for ML engineers
            who can further train and test their integrated ML models for better
            achievement of accuracy.
          </p>
          <h3 className="center">TRAIN</h3>
          <img src={img7} alt="" />
          <p className="wrapper-text mt-2">
            The newly collected and curated data can be used to further train
            the models. The currently deployed ML technology is Deep Learning
            for the prediction of sentiments.
          </p>
          <h3 className="center">TEST</h3>
          <img src={img8} alt="" />
          <p className="wrapper-text mt-2">
            This is the successor to the Train feature. If the accuracy
            increases the newly developed models will be integrated for better
            prediction otherwise the previous release remains dominant.
          </p>
          <div className="btn-dashboard">
            <a href="/train">
              <button className="wrapper-btn">TRAIN</button>
            </a>
          </div>
        </div>
        <div className="prediction">
          <h3 className="heading">PREDICTION & REPORT</h3>
          <img src={img9} alt="" />
          <p className="wrapper-text mt-2">
            Identifying whether a textual information is positive or negative
            manually can be frantic and time consuming provided large amounts of
            data. This feature not only predicts and labels all the textual
            data, in the form of a sentence, as positive or negative but also
            generates a pdf report describing the data in numerous manners by
            illustrating graphs
          </p>
          <img className="circular" src={img10} alt="" />
          <img className="circular" src={img11} alt="" />
          <p className="wrapper-text mt-2">
            as well as the total number of positive & negative sentiments,
            prediction as a whole that the given sample of data lies on either
            polarity, and other numeral analysis. Just enter your csv file and
            get the output csv with the magical report.
          </p>
          <div className="btn-dashboard mt-3">
            <a href="/models">
              <button className="wrapper-btn">PREDICT</button>
            </a>
          </div>
        </div>
        <div className="analysis">
          <h3 className="heading">GRAPH ANALYSIS</h3>
          <p className="wrapper-text mt-2">
            This technique helps in the generation of a global map with users
            pin-pointed with their locations and their username. This component
            only works if the data provided contains the location of each of the
            user with their textual data.
            <br />
            <br />
            Hence, one can draw the analyses and conclusions from the map such
            as if there is negativity originating from a single area and other
            suitable deductions.
          </p>
          <img src={img12} alt="" />
          <div className="btn-dashboard">
            <a href="/dashboard/graph-analysis">
            <button className="wrapper-btn">ANALYSIS</button>
            </a>
          </div>
        </div>
        <div className="clients">
          <h3 className="heading">CLIENTS</h3>
          <p className="wrapper-text mt-2">
            Forgot the counts or names of the clientele? Don’t worry. Click on
            Clients button and observe all the subscribed users availing the
            amazing features.
          </p>
          <img src={img13} alt="" />
          <div className="btn-dashboard">
            <a href="/clients">
              <button className="wrapper-btn">CLIENTS</button>
            </a>
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
