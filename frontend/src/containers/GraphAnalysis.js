import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import "../css/graphanalysis.css";
import profiling from "../images/profiling.jpeg";
import sna from "../images/graphanalysis.png";
import profileAnalysis from "../images/profile-analysis.png";
import twitterAnalysis from "../images/twitter-analysis.png";
import facebookAnalysis from "../images/facebook-analysis.png";
import graphsAnalysis from "../images/graphs-analysis.png";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import {
  Twitter_SNA,
  Twitter_Profiling,
  Fb_SNA,
  Fb_Profiling,
  Twitter_Logs,
  Facebook_Logs,
} from "../actions/analysis";
import { connect } from "react-redux";
import Message from "../components/message";

const GraphAnalysis = ({
  Twitter_SNA,
  Twitter_Profiling,
  Fb_SNA,
  Fb_Profiling,
  Twitter_Logs,
  Facebook_Logs,
  username,
  email,
  analysisDone,
  error,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading_twitter_sna, setIsLoadingTSNA] = useState(false);
  const [isLoading_twitter_profile, setIsLoadingTProfile] = useState(false);
  const [isLoading_fb_sna, setIsLoadingFbSNA] = useState(false);
  const [isLoading_fb_profile, setIsLoadingFbProfile] = useState(false);
  const [twitter_sna, setIstwitter_sna] = useState(false);
  const [facebook_sna, setIsfacebook_sna] = useState(false);
  const [facebok_profiling, setIsfacebok_profiling] = useState(false);
  const [twitter_profiling, setIstwitter_profiling] = useState(false);
  const [file_twitter_sna, setTwiterSnaFile] = useState();
  const [file_facebook_sna, setFacebookSnaFile] = useState();
  const [file_twitter_profiling, setTwiterProfilingFile] = useState();
  const [file_facebok_profiling, setFacebookProfilingFile] = useState();
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  let form_data = new FormData();

  const onFile_twiiter_sna = (e) => {
    console.log(e.target.files[0]);
    setTwiterSnaFile(e.target.files[0]);
    // setIstwitter_sna(true);
  };

  const onFile_twiiter_prfiling = (e) => {
    console.log(e.target.files[0]);
    setTwiterProfilingFile(e.target.files[0]);
    // setIstwitter_profiling(true);
    // if (e.target.files[0] === '') {
    //     setIstwitter_profiling(false);
    // }
  };

  const onFile_facebook_sna = (e) => {
    console.log(e.target.files[0]);
    setFacebookSnaFile(e.target.files[0]);
    // setIsfacebook_sna(true);
  };

  const onFile_facebook_profiling = (e) => {
    console.log(e.target.files[0]);
    setFacebookProfilingFile(e.target.files[0]);
    // setIsfacebok_profiling(true);
  };

  const findErrors = () => {
    const newErrors = {};

    if (twitter_sna) {
      if (!file_twitter_sna || file_twitter_sna === "")
        newErrors.file_twitter_sna = "File is Required";
    }
    if (facebook_sna) {
      if (!file_facebook_sna || file_facebook_sna === "")
        newErrors.file_facebook_sna = "File is Required";
    }
    if (twitter_profiling) {
      if (!file_twitter_profiling || file_twitter_profiling === "")
        newErrors.file_twitter_profiling = "File is Required";
    }
    if (facebok_profiling) {
      if (!file_facebok_profiling || file_facebok_profiling === "")
        newErrors.file_facebok_profiling = "File is Required";
    }
    // //file Error
    // if (!file || file === "") newErrors.file = "File is Required";

    // //option Error
    // if (!option || option === "")
    //   newErrors.option = "Selecting options is Required";

    return newErrors;
  };

  useEffect(() => {
    // if (isLoading) {
    //   const newErrors = findErrors();
    //   if (Object.keys(newErrors).length > 0) {
    //     setIsLoading(isLoading_twitter_sna || isLoading_twitter_profile || isLoading_fb_sna || isLoading_fb_profile)
    //     // We got errors!
    //     console.log(facebok_profiling, newErrors);

    //     setErrors(newErrors);
    //   } else {
    //     setIsLoading(isLoading_twitter_sna || isLoading_twitter_profile || isLoading_fb_sna || isLoading_fb_profile)
    //     console.log(facebok_profiling);
    //     setErrors({});
    //     // No errors! Put any logic here for the form submission!
    //     if (twitter_sna) {
    //       console.log(file_twitter_sna.name);

    //       form_data.append("File", file_twitter_sna);
    //       form_data.append("fileName", file_twitter_sna.name);
    //       form_data.append("username", username);
    //       form_data.append("email", email);

    //       Twitter_SNA(form_data).then(() => {
    //         console.log(form_data);
    //         setShow(true);

    //         setIsLoading(isLoading_twitter_sna || isLoading_twitter_profile || isLoading_fb_sna || isLoading_fb_profile)
    //       });
    //     }
    //     // if (facebook_sna) {
    //     //   if (!file_facebook_sna || file_facebook_sna === "")
    //     //     newErrors.file_facebook_sna = "File is Required";
    //     // }
    //     if (twitter_profiling) {
    //       console.log(file_twitter_sna.name);

    //       form_data.append("File", file_twitter_profiling);
    //       form_data.append("fileName", file_twitter_profiling.name);
    //       form_data.append("username", username);
    //       form_data.append("email", email);
    //       Twitter_Profiling(form_data).then(() => {
    //         console.log(form_data);
    //         setShow(true);

    //         setIsLoading(isLoading_twitter_sna || isLoading_twitter_profile || isLoading_fb_sna || isLoading_fb_profile)
    //       });
    //     }
    //     // if (facebok_profiling) {
    //     //   if (!file_facebok_profiling || file_facebok_profiling === "")
    //     //     newErrors.file_facebok_profiling = "File is Required";
    //     // }
    //     // console.log(file.name);

    //     // form_data.append("File", file);
    //     // form_data.append("fileName", file.name);
    //     // form_data.append("username", username);
    //     // form_data.append("email", email);
    //     // file_upload(form_data);

    //     // file_upload(form_data).then(() => {
    //     //   console.log(form_data);
    //     //   setShow(true);
    //     //   if (option === "Prediction" || option === "Both") {
    //     //     const b = file.name.split(".");
    //     //     handlePDFDownload(file.name.split(".")[b.length - 1]);
    //     //   }

    //     //   setIsLoading(false);
    //     // });
    //   }
    // }

    if (isLoading_twitter_sna) {
      const newErrors = findErrors();
      if (Object.keys(newErrors).length > 0) {
        setIsLoadingTSNA(false);
        // setIsLoading(isLoading_twitter_sna || isLoading_twitter_profile || isLoading_fb_sna || isLoading_fb_profile)
        // We got errors!
        console.log(twitter_sna, newErrors);

        setErrors(newErrors);
      } else {
        setIsLoadingTSNA(true);
        // setIsLoading(isLoading_twitter_sna || isLoading_twitter_profile || isLoading_fb_sna || isLoading_fb_profile)
        console.log(twitter_sna);
        setErrors({});
        // No errors! Put any logic here for the form submission!

        console.log(file_twitter_sna.name);

        form_data.append("File", file_twitter_sna);
        form_data.append("fileName", file_twitter_sna.name);
        form_data.append("username", username);
        form_data.append("email", email);

        Twitter_SNA(form_data).then(() => {
          console.log(form_data);
          setShow(true);

          setIsLoadingTSNA(false);
        });
      }
    }

    if (isLoading_twitter_profile) {
      const newErrors = findErrors();
      if (Object.keys(newErrors).length > 0) {
        setIsLoadingTProfile(false);
        // We got errors!
        console.log(file_twitter_profiling, newErrors);

        setErrors(newErrors);
      } else {
        setIsLoadingTProfile(true);
        console.log(file_twitter_profiling);
        setErrors({});
        // No errors! Put any logic here for the form submission!

        console.log(file_twitter_profiling.name);

        form_data.append("File", file_twitter_profiling);
        form_data.append("fileName", file_twitter_profiling.name);
        form_data.append("username", username);
        form_data.append("email", email);

        Twitter_Profiling(form_data).then(() => {
          console.log(form_data);
          Twitter_Logs();
          setShow(true);

          setIsLoadingTProfile(false);
        });
      }
    }
    if (isLoading_fb_sna) {
      const newErrors = findErrors();
      if (Object.keys(newErrors).length > 0) {
        setIsLoadingFbSNA(false);
        // setIsLoading(isLoading_twitter_sna || isLoading_twitter_profile || isLoading_fb_sna || isLoading_fb_profile)
        // We got errors!
        console.log(facebook_sna, newErrors);

        setErrors(newErrors);
      } else {
        setIsLoadingFbSNA(true);
        // setIsLoading(isLoading_twitter_sna || isLoading_twitter_profile || isLoading_fb_sna || isLoading_fb_profile)
        console.log(facebook_sna);
        setErrors({});
        // No errors! Put any logic here for the form submission!

        console.log(file_facebook_sna.name);

        form_data.append("File", file_facebook_sna);
        form_data.append("fileName", file_facebook_sna.name);
        form_data.append("username", username);
        form_data.append("email", email);

        Fb_SNA(form_data).then(() => {
          console.log(form_data);
          setShow(true);

          setIsLoadingFbSNA(false);
        });
      }
    }

    if (isLoading_fb_profile) {
      const newErrors = findErrors();
      if (Object.keys(newErrors).length > 0) {
        setIsLoadingFbProfile(false);
        // We got errors!
        console.log(file_facebok_profiling, newErrors);

        setErrors(newErrors);
      } else {
        setIsLoadingFbProfile(true);
        console.log(file_facebok_profiling);
        setErrors({});
        // No errors! Put any logic here for the form submission!

        console.log(file_facebok_profiling.name);

        form_data.append("File", file_facebok_profiling);
        form_data.append("fileName", file_facebok_profiling.name);
        form_data.append("username", username);
        form_data.append("email", email);

        Fb_Profiling(form_data).then(() => {
          console.log(form_data);
          setShow(true);

          setIsLoadingFbProfile(false);
        });
      }
    }
  }, [
    isLoading_twitter_sna,
    isLoading_twitter_profile,
    isLoading_fb_sna,
    isLoading_fb_profile,
  ]);
  const submitForm_twiiter_sna = (event) => {
    setIstwitter_sna(true);
    setIsLoadingTSNA(true);
    setIsLoading(
      isLoading_twitter_sna ||
        isLoading_twitter_profile ||
        isLoading_fb_sna ||
        isLoading_fb_profile
    );
    event.preventDefault();
  };

  const submitForm_fb_Sna = (event) => {
    setIsfacebook_sna(true);
    setIsLoadingFbSNA(true);
    setIsLoading(
      isLoading_twitter_sna ||
        isLoading_twitter_profile ||
        isLoading_fb_sna ||
        isLoading_fb_profile
    );
    event.preventDefault();
  };

  const submitForm_twitter_profling = (event) => {
    setIstwitter_profiling(true);
    setIsLoadingTProfile(true);
    // setIsLoading(isLoading_twitter_sna || isLoading_twitter_profile || isLoading_fb_sna || isLoading_fb_profile)
    event.preventDefault();
  };

  const submitForm_fb_profiling = (event) => {
    setIsfacebok_profiling(true);
    setIsLoadingFbProfile(true);
    setIsLoading(
      isLoading_twitter_sna ||
        isLoading_twitter_profile ||
        isLoading_fb_sna ||
        isLoading_fb_profile
    );
    event.preventDefault();
  };

  return (
    <>
      <SideNav />
      <div className="content-graphanalysis">
        <div className="cyber-warfare">
          <h1>CYBER WARFARE</h1>
          <Row>
            <Col>
              <img src={profiling} alt="" />
            </Col>
            <Col>
              <img src={sna} alt="" />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                A pdf report is created regarding to the people who were
                spreading hateful content on facebook and twitter. The report
                consists of a profile of the suspects having their usernames,
                names, location, profile picture (if available), last few
                posts/tweets , and other identification information which would
                be helpful in not only tracing the hostile element but also to
                maintain logs on them.
              </p>
            </Col>
            <Col>
              <p>
                {" "}
                Social network analysis is the process of investigating social
                structures through the use of networks and graphs. It
                characterizes networked structures in terms of nodes and the
                edges, or links that connect them. In twitter, to follow someone
                means that one resonates with the ideology of the target.{" "}
              </p>
            </Col>
          </Row>
        </div>
        <div className="facebook">
          <img className="icon" src={facebookAnalysis} alt="" />
          <Row>
            <Col>
              <div className="profiling">
                <img className="icon-img" src={profileAnalysis} alt="" />
                <div className="profile-Form">
                  <Form onSubmit={submitForm_fb_profiling}>
                    <Form.Group controlId="formFile">
                      <Form.Control
                        className={`input ${
                          errors.file_facebok_profiling && "errorShow"
                        }`}
                        name="file_facebok_profiling"
                        type="file"
                        accept=".xlsx, .xls, .csv"
                        onChange={(e) => onFile_facebook_profiling(e)}
                        // disabled={isLoading}
                        // disabled={
                        //   twitter_sna || twitter_profiling || facebook_sna
                        // }
                      />
                      {errors.file_facebok_profiling && (
                        <p className="errorShow">
                          {errors.file_facebok_profiling}
                        </p>
                      )}
                    </Form.Group>
                    {isLoading_fb_profile ? (
                      <div className="justify-content">
                        <p>It will take few minutes to complete.</p>
                        <Button
                          variant="primary"
                          disabled
                          className="submit justify-content-center"
                        >
                          <Spinner
                            as="span"
                            animation="border"
                            role="status"
                            aria-hidden="true"
                          />
                          Profiling...
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center">
                        <Button
                          as="input"
                          type="submit"
                          value={isLoading ? "Profiling..." : "Profile"}
                          className="submit d-flex justify-content-center pace-content-center"
                          disabled={
                            isLoading_twitter_sna ||
                            isLoading_twitter_profile ||
                            isLoading_fb_sna ||
                            isLoading_fb_profile
                          }
                        />
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </Col>
            <Col>
              <div className="sna">
                <img className="icon-img" src={graphsAnalysis} alt="" />
                <div className="sna-Form">
                  <Form onSubmit={submitForm_fb_Sna}>
                    <Form.Group controlId="formFile">
                      <Form.Control
                        className={`input ${
                          errors.file_facebook_sna && "errorShow"
                        }`}
                        name="file_facebook_sna"
                        type="file"
                        accept=".xlsx, .xls, .csv"
                        onChange={(e) => onFile_facebook_sna(e)}
                        // disabled={isLoading}
                        // disabled={
                        //   twitter_sna || twitter_profiling || facebok_profiling
                        // }
                      />
                      {errors.file_facebook_sna && (
                        <p className="errorShow">{errors.file_facebook_sna}</p>
                      )}
                    </Form.Group>
                    {isLoading_fb_sna ? (
                      <div className="justify-content">
                        <p>It will take few minutes to complete.</p>
                        <Button
                          variant="primary"
                          disabled
                          className="submit justify-content-center"
                        >
                          <Spinner
                            as="span"
                            animation="border"
                            role="status"
                            aria-hidden="true"
                          />
                          SNA...
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center">
                        <Button
                          as="input"
                          type="submit"
                          value={isLoading ? "SNA..." : "SNA"}
                          className="submit d-flex justify-content-center pace-content-center"
                          disabled={
                            isLoading_twitter_sna ||
                            isLoading_twitter_profile ||
                            isLoading_fb_sna ||
                            isLoading_fb_profile
                          }
                        />
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="twitter">
          <img className="icon" src={twitterAnalysis} alt="" />
          <Row>
            <Col>
              <div className="profiling">
                <img className="icon-img" src={profileAnalysis} alt="" />
                <div className="profile-Form">
                  <Form onSubmit={submitForm_twitter_profling}>
                    <Form.Group controlId="formFile">
                      <Form.Control
                        className={`input ${
                          errors.file_twitter_profiling && "errorShow"
                        }`}
                        name="file_twitter_profiling"
                        type="file"
                        accept=".xlsx, .xls, .csv"
                        onChange={(e) => onFile_twiiter_prfiling(e)}
                        // disabled={isLoading_twitter_sna || isLoading_twitter_profile || isLoading_fb_sna || isLoading_fb_profile}
                        // disabled={
                        //   twitter_sna || facebook_sna || facebok_profiling
                        // }
                      />
                      {errors.file_twitter_profiling && (
                        <p className="errorShow">
                          {errors.file_twitter_profiling}
                        </p>
                      )}
                    </Form.Group>
                    {isLoading_twitter_profile ? (
                      <div className="justify-content">
                        <p>It will take few minutes to complete.</p>
                        <Button
                          variant="primary"
                          disabled
                          className="submit justify-content-center"
                        >
                          <Spinner
                            as="span"
                            animation="border"
                            role="status"
                            aria-hidden="true"
                          />
                          Profiling...
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center">
                        <Button
                          as="input"
                          type="submit"
                          value={isLoading ? "Profiling..." : "Profile"}
                          className="submit d-flex justify-content-center pace-content-center"
                          disabled={
                            isLoading_twitter_sna ||
                            isLoading_twitter_profile ||
                            isLoading_fb_sna ||
                            isLoading_fb_profile
                          }
                        />
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </Col>
            <Col>
              <div className="sna">
                <img className="icon-img" src={graphsAnalysis} alt="" />
                <div className="sna-Form">
                  <Form onSubmit={submitForm_twiiter_sna}>
                    <Form.Group controlId="formFile">
                      <Form.Control
                        className={`input ${
                          errors.file_twitter_sna && "errorShow"
                        }`}
                        name="file_twitter_sna"
                        type="file"
                        accept=".xlsx, .xls, .csv"
                        onChange={(e) => onFile_twiiter_sna(e)}
                        disabled={
                          isLoading_twitter_sna ||
                          isLoading_twitter_profile ||
                          isLoading_fb_sna ||
                          isLoading_fb_profile
                        }
                        // disabled={
                        //   twitter_profiling || facebook_sna || facebok_profiling
                        // }
                      />
                      {errors.file_twitter_sna && (
                        <p className="errorShow">{errors.file_twitter_sna}</p>
                      )}
                    </Form.Group>
                    {isLoading_twitter_sna ? (
                      <div className="justify-content">
                        <p>It will take few minutes to complete.</p>
                        <Button
                          variant="primary"
                          disabled
                          className="submit justify-content-center"
                        >
                          <Spinner
                            as="span"
                            animation="border"
                            role="status"
                            aria-hidden="true"
                          />
                          SNA...
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center">
                        <Button
                          as="input"
                          type="submit"
                          value={isLoading_twitter_sna ? "SNA..." : "SNA"}
                          className="submit d-flex justify-content-center pace-content-center"
                          disabled={
                            isLoading_twitter_sna ||
                            isLoading_twitter_profile ||
                            isLoading_fb_sna ||
                            isLoading_fb_profile
                          }
                        />
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div>
          {analysisDone && (
            <Message
              title="Congratulations"
              message="Task Completed Successfully. Files will be Created shortly"
              show={show}
              onHide={() => setShow(false)}
            />
          )}
        </div>
        <div>
          {error && (
            <Message
              title="Error"
              message="Error in ML models. Please Follow the instructions."
              show={show}
              onHide={() => setShow(false)}
            />
          )}
        </div>
        <div></div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
  email: state.auth.email,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
  analysisDone: state.analysis.modelDone,
  error: state.analysis.error,
});

export default connect(mapStateToProps, {
  Twitter_SNA,
  Twitter_Profiling,
  Fb_SNA,
  Fb_Profiling,
  Twitter_Logs,
  Facebook_Logs,
})(GraphAnalysis);
