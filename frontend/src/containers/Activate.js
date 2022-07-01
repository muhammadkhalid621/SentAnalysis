import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";

const Activate = ({ verify, match, isActivate }) => {
  const [verified, setVerified] = useState(false);

  const verify_account = (e) => {
    const uid = match.params.uid;
    const token = match.params.token;

    verify(uid, token);
    setVerified(true);
  };

  if (verified && isActivate) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          marginTop: "200px",
          fontFamily: "Times New Roman, Times, serif",
          fontWeight: "bold",
          fontSize: "50px",
        }}
      >
        <h1>Hello User, Please CLick Here to Verify your Account:</h1>
        <button
          onClick={verify_account}
          style={{
            marginTop: "70px",
            borderRadius: "20px",
            fontSize: "25px",
            margin: "auto",
            display: "block",
          }}
          type="button"
          className="btn btn-primary"
        >
          Verify
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isActivate: state.auth.isActivate,
});
export default connect(mapStateToProps, { verify })(Activate);
