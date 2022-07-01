// import React, { useState, useRef } from "react";
// import {
//   Form,
//   Button,
//   Dropdown,
//   DropdownButton,
//   Col,
//   Row,
// } from "react-bootstrap";
// import { twitter_model } from "../actions/scrape"
// import { connect } from "react-redux"

// function Models({twitter_model, username, email}) {
//   const [formData, setFormData] = useState('');
//   const [File, setFile] = useState('');

//   const { option } = formData
//   const { file } = File
//   const onChange = (e) =>
//     {
//       setFormData({ ...formData, [e.target.name]: e.target.value });

//   }

//   const changeHandler = (e) => {
//     setFile({ file: e.target.files });
//     //let files = e.target.files[0]
//     console.log(e.target.files[0])
//   }

//   const onSubmit = (e) => {
//     e.preventDefault();

//     console.log(e.target.files)
//     console.log(file);
//     twitter_model(file, option, username, email)
//   };
//   return (
//     <>
//       <Form onSubmit={onSubmit}>

//         <Row>
//           <Col>
//             <Form.Group controlId="formFile">
//             <Form.Label>Choose csv File for model training</Form.Label>
//               <Form.Control
//                 name='file'
//                 type="file"
//                 accept=".xlsx, .xls, .csv"
//                 value={file || ""}
//                 onChange={(e) => changeHandler(e)}

//                 required/>
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group controlId="formBasicSelectOption">
//               <Form.Label>Select options</Form.Label>
//               <Form.Control
//                 name="option"
//                 as="select"
//                 value={option || ""}
//                 onChange={(e) => onChange(e)}
//                 required
//               >
//                 <option value="default">Select...</option>
//                 <option value="Prediction">Run Predictions</option>
//                 <option value="Train">Training the models</option>
//               </Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Button variant="primary" className="mt-3" type="submit">Submit</Button>
//       </Form>
//     </>
//   );
// }
// const mapStateToProps = (state) => ({
//     username: state.auth.username,
//     email: state.auth.email,
//   });

// export default connect(mapStateToProps,{ twitter_model })(Models);

import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import { twitter_model, facebook_model } from "../actions/model";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import SideNav from "../components/SideNav";
import "../css/models.css";
import Message from "../components/message";
// import Papa from "papaparse";

function Models({
  twitter_model,
  facebook_model,
  username,
  email,
  isAuthenticated,
  isAdmin,
  logout,
  modelDone,
  error,
  downloadFile,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFacebbok, setIsFacebook] = useState(false);
  const [fbFile, setFbFile] = useState(false);
  const [twitterFile, setTwitterFile] = useState();
  const [errors, setErrors] = useState({});
  const [option, setOptions] = useState();
  const [show, setShow] = useState(false);
  let form_data = new FormData();

  const ontwitterFile = (e) => {
    console.log(e.target.files[0]);
    setTwitterFile(e.target.files[0]);
  };

  const onFbfile = (e) => {
    console.log(e.target.files[0]);
    setFbFile(e.target.files[0]);
  };
  const logoutHandler = () => {
    logout();
  };

  const facebook = (e) => {
    const facebook = e.target.checked;
    setIsFacebook(facebook);
  };

  const findErrors = () => {
    const newErrors = {};

    if (isFacebbok) {
      //file Error
      if (!fbFile || fbFile === "") newErrors.fbFile = "File is Required";
    } else {
      //file Error
      if (!twitterFile || twitterFile === "")
        newErrors.twitterFile = "File is Required";

      //option Error
      if (!option || option === "")
        newErrors.option = "Selecting options is Required";
    }

    return newErrors;
  };

  useEffect(() => {
    if (isLoading) {
      const newErrors = findErrors();
      if (Object.keys(newErrors).length > 0) {
        setIsLoading(false);
        // We got errors!
        setErrors(newErrors);
      } else {
        setIsLoading(true);
        setErrors({});
        // No errors! Put any logic here for the form submission!

        if (isFacebbok) {
          console.log(fbFile.name);
          form_data.append("File", fbFile);
          form_data.append("fileName", fbFile.name);
          form_data.append("username", username);
          form_data.append("email", email);
          facebook_model(form_data, fbFile.name).then(() => {
            console.log(form_data, fbFile.name);
            setShow(true);

            setIsLoading(false);
          });
        } else {
          console.log(twitterFile.name);
          form_data.append("File", twitterFile);
          form_data.append("fileName", twitterFile.name);
          form_data.append("option", option);
          form_data.append("username", username);
          form_data.append("email", email);
          twitter_model(form_data, twitterFile.name).then(() => {
            console.log(form_data, twitterFile.name);
            setShow(true);

            setIsLoading(false);
          });
        }
      }
    }
  }, [isLoading]);
  const submitForm = (event) => {
    setIsLoading(true);
    event.preventDefault();
    // const newErrors = findErrors();

    // if (Object.keys(newErrors).length > 0) {
    //   // We got errors!
    //   setErrors(newErrors);
    // } else {
    //   setIsLoading(true)
    //   // No errors! Put any logic here for the form submission!
    //   console.log(file);

    //   form_data.append("File", file);
    //   form_data.append("fileName", file.name);
    //   form_data.append("option", option);
    //   form_data.append("username", username);
    //   form_data.append("email", email);
    //   // twitter_model(form_data);

    // }
    // console.log(file);

    // var filePath = file.name;
    // console.log(filePath);
    // var allowedExtensions = /(\.xlsx|\.xls|\.csv|)$/i;
    // if (!allowedExtensions.exec(filePath)) {
    //   console.log("hello");
    //   alert("Invalid file type");
    //   filePath.name = "";
    //   return false;
    // } else {
    // Papa.parse(file, {
    //   complete: function (results) {
    //     console.log("Finished:", results.data);
    //   },
    // });
    // }
  };
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
      <div className="content-model">
        <div className="instructions">
          <h1>Instructions</h1>
          <p>
            1. If you are using option "Run Predictions" then upload the .csv
            file which is scrapped from using the twitter scrapper
          </p>
          <p>
            2. If you are using option "Generate Report" then upload the .csv
            containinig the "_Sentiments" in their name.
          </p>
          <p>3. If you are .csv file is open, please close it.</p>
          <p>
            4. If it takes more time than usual, then refresh the page and
            upload the file.
          </p>
        </div>

        <div className="model-form">
          <Form onSubmit={submitForm}>
            {isFacebbok ? (
              <Form.Group controlId="formFile">
                <Form.Label>Choose csv File for model training</Form.Label>
                <Form.Control
                  className={`input ${errors.fbFile && "errorShow"}`}
                  name="fbFile"
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={(e) => onFbfile(e)}
                />
                {errors.fbFile && <p className="errorShow">{errors.fbFile}</p>}
              </Form.Group>
            ) : (
              <Row>
                <Col>
                  <Form.Group controlId="formFile">
                    <Form.Label>Choose csv File for model training</Form.Label>
                    <Form.Control
                      className={`input ${errors.twitterFile && "errorShow"}`}
                      name="twitterFile"
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      onChange={(e) => ontwitterFile(e)}
                    />
                    {errors.twitterFile && (
                      <p className="errorShow">{errors.twitterFile}</p>
                    )}
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formBasicSelectOption">
                    <Form.Label>Select options</Form.Label>
                    <Form.Control
                      className={`input ${errors.option && "errorShow"}`}
                      name="option"
                      as="select"
                      value={option || ""}
                      onChange={(e) => setOptions(e.target.value)}
                    >
                      <option value="default">Select...</option>
                      <option value="Prediction">Run Predictions</option>
                      <option value="Report">Generate Report</option>
                      <option value="Both">
                        Run Predictions & Generate Report
                      </option>
                    </Form.Control>
                    {errors.option && (
                      <p className="errorShow">{errors.option}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Form.Check
              aria-label="option 3"
              label="Facebook Model"
              onChange={(e) => facebook(e)}
              className="mt-3 mb-3"
              disabled={isLoading}
            />
            {isLoading ? (
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
                  Submitting...
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-center mt-5">
                <Button
                  as="input"
                  type="submit"
                  value={isLoading ? "Submitting…" : "Submit"}
                  className="submit d-flex justify-content-center pace-content-center"
                  disabled={isLoading}
                />
              </div>
            )}
          </Form>
          <div>
            {modelDone && (
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
          <div>
            {downloadFile && (
              <Message
                title="Error"
                message="Error in downloading the File(s)."
                show={show}
                onHide={() => setShow(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  username: state.auth.username,
  email: state.auth.email,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
  modelDone: state.model.modelDone,
  error: state.model.error,
  downloadFile: state.model.downloadFile,
});

export default connect(mapStateToProps, {
  twitter_model,
  logout,
  facebook_model,
})(Models);

// class Models extends Component {

//   state = {
//     option: null,
//     file: null,
//   }

//   handleFIle (e) {
//     let file = e.target.files[0]
//     console.log(file)
//     this.setState({file:file})
//   }

//   onChange (e) {

//     this.setState({option:e.target.value})
//   }

//   onSubmit (e) {
//     e.preventDefault();

//     console.log(this.state.file);
//     twitter_model(this.state.file, this.state.option, this.props.username, this.props.email)
//   }

//   render() {
//     return (
//       <>
//         <Form onSubmit={this.onSubmit}>
//           <Row>
//             <Col>
//               <Form.Group controlId="formFile">
//                 <Form.Label>Choose csv File for model training</Form.Label>
//                 <Form.Control
//                   name="file"
//                   type="file"
//                   accept=".xlsx, .xls, .csv"
//                   value={this.state.file || ""}
//                   onChange={(e) => this.handleFIle(e)}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group controlId="formBasicSelectOption">
//                 <Form.Label>Select options</Form.Label>
//                 <Form.Control
//                   name="option"
//                   as="select"
//                   value={this.state.option || ""}
//                   onChange={(e) => this.onChange(e)}
//                   required
//                 >
//                   <option value="default">Select...</option>
//                   <option value="Prediction">Run Predictions</option>
//                   <option value="Train">Training the models</option>
//                 </Form.Control>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Button variant="primary" className="mt-3" type="submit">
//             Submit
//           </Button>
//         </Form>
//       </>
//     );
//   }

// }
// function mapStateToProps (state)  {
//   return {
//     username: state.auth.username,
//     email: state.auth.email,
// };
// };

// export default connect(mapStateToProps,{ twitter_model })(Models);
