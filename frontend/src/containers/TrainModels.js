import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import { trian_file_upload, trian_model_files_upload } from "../actions/model";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import SideNav from "../components/SideNav";
import "../css/trainmodel.css";
import Message from "../components/message";
// import Papa from "papaparse";

const TrainModels = ({
  trian_file_upload,
  trian_model_files_upload,
  username,
  email,
  isAuthenticated,
  isAdmin,
  logout,
  modelDone,
  error,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  let form_data = new FormData();

  const onFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const logoutHandler = () => {
    logout();
  };

  const findErrors = () => {
    const newErrors = {};

    //file Error
    if (!file || file === "") newErrors.file = "Username is Required";

    return newErrors;
  };
  useEffect(() => {
    if (isLoading) {
      const newErrors = findErrors();
      if (Object.keys(newErrors).length > 0) {
        // We got errors!
        setErrors(newErrors);
      } else {
        setIsLoading(true);
        // No errors! Put any logic here for the form submission!
        console.log(file);

        form_data.append("File", file);
        form_data.append("fileName", file.name);
        form_data.append("username", username);
        form_data.append("email", email);
        // file_upload(form_data);
      }

      trian_file_upload(form_data).then(() => {
        console.log(form_data);
        setShow(true);
        trian_model_files_upload();
        setIsLoading(false);
      });
    }
  }, [isLoading, form_data, trian_file_upload]);
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
    //   // file_upload(form_data);

    // }
    // console.log(file);

    var filePath = file.name;
    console.log(filePath);
    var allowedExtensions = /(\.xlsx|\.xls|\.csv|)$/i;
    if (!allowedExtensions.exec(filePath)) {
      console.log("hello");
      alert("Invalid file type");
      filePath.name = "";
      return false;
    } else {
      // Papa.parse(file, {
      //   complete: function (results) {
      //     console.log("Finished:", results.data);
      //   },
      // });
    }
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
      <div className="content-trian-model">
        <div className="train-model-instruction">
          <h1>Instructions</h1>
          <p>1. If you are .csv file is open, please close it.</p>
          <p>
            2. If it takes more time than usual, then refresh the page and
            upload the file.
          </p>
          <Form onSubmit={submitForm}>
            <Form.Group controlId="formFile">
              <Form.Label>Choose csv File for model training</Form.Label>
              <Form.Control
                name="File"
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={(e) => onFile(e)}
                required
              />
            </Form.Group>

            {isLoading ? (
              <div className="justify-contentmt-5">
                <p className="submit">It will take few minutes to complete.</p>
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
                  Training...
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-center mt-5">
                <Button
                  as="input"
                  type="submit"
                  value={isLoading ? "training…" : "Train"}
                  className="submit"
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
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
  email: state.auth.email,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
  modelDone: state.model.modelDone,
  error: state.model.error,
});

export default connect(mapStateToProps, {
  trian_file_upload,
  logout,
  trian_model_files_upload,
})(TrainModels);
