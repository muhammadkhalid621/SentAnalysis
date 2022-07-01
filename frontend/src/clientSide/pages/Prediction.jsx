import { Container, Form, Button, Spinner } from "react-bootstrap";
import "../css/my.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Message from "../../components/message";
import { predict_client_twitter, predict_client_fb } from "../../actions/model";

const Prediction = ({
  predict_client,
  predict_client_twitter,
  predict_client_fb,
  username,
  email,
  isAuthenticated,
  isAdmin,
  modelDone,
  error,
  downloadFile,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [isFacebbok, setIsFacebook] = useState(false);

  let form_data = new FormData();

  const onFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const facebook = (e) => {
    const facebook = e.target.checked;
    setIsFacebook(facebook);
  };

  const findErrors = () => {
    const newErrors = {};

    //file Error
    if (!file || file === "") newErrors.file = "File is Required";

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
        console.log(file);

        form_data.append("File", file);
        form_data.append("fileName", file.name);
        form_data.append("username", username);
        form_data.append("email", email);
        // file_upload(form_data);
        if (isFacebbok) {
          predict_client_fb(form_data, file.name).then(() => {
            console.log(form_data);
            setShow(true);
            const b = file.name.split(".");
            //   handlePDFDownload_client(file.name.split(".")[b.length - 1]);
            setIsLoading(false);
          });
        } else {
          predict_client_twitter(form_data, file.name).then(() => {
            console.log(form_data);
            setShow(true);
            const b = file.name.split(".");
            //   handlePDFDownload_client(file.name.split(".")[b.length - 1]);
            setIsLoading(false);
          });
        }

        // file_upload(form_data).then(() => {
        //   console.log(form_data);
        //   setShow(true);
        //   handlePDFDownload(file.name);
        //   setIsLoading(false);
        // });
      }
    }
  }, [isLoading]);
  const submitForm = (event) => {
    setIsLoading(true);
    event.preventDefault();
  };
  return (
    <Container>
      <div className="c">
        {/* < Nav1 /> */}
        <div>
          <h1 className="head">PREDICTIONS</h1>
          <div className="text-center">
            <p className="te">
              this is where you can access the webscrapper.Lorem Ipsum is simply
              dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrytry. Lorem Ipsum has been the industry this
              is where you can access the webscrapper.Lorem Ipsum is simply
              dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrytry. Lorem Ipsum has been the industry this
              is where you can access the webscrapper.Lorem Ipsum is simply
              dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrytry. Lorem Ipsum has been the industry this
              is where you can access the webscrapper.Lorem Ipsum is simply
              dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrytry. Lorem Ipsum has been the industry */text
            </p>
          </div>
          <div className="text-center pred-form">
            <Form onSubmit={submitForm}>
              <Form.Group controlId="formFile">
                <Form.Control
                  className={`input ${errors.file && "errorShow"}`}
                  name="file"
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={(e) => onFile(e)}
                />
                {errors.file && <p className="errorShow">{errors.file}</p>}
              </Form.Group>

              <Form.Check
                aria-label="option 3"
                label="Facebook Model"
                onChange={(e) => facebook(e)}
                
                disabled={isLoading}
              />

              {isLoading ? (
                <div className="justify-content btn-submit">
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
                    Predicting...
                  </Button>
                </div>
              ) : (
                <div className="d-flex justify-content-center btn-submit">
                  <Button
                    as="input"
                    type="submit"
                    value={isLoading ? "Predicting..." : "Predict"}
                    className="submit d-flex justify-content-center pace-content-center"
                    disabled={isLoading}
                  />
                </div>
              )}
            </Form>
          </div>
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
          {/* <div className="text-center col-md-12">
            <div className="file btn btn-lg  btn btn-light  filebutton ">
              Upload
              <input type="file" name="file" />
            </div>
          </div>
          <div className="text-center">
            <button type="button" className="b btn">
              Submit
            </button>
          </div> */}
        </div>
      </div>
    </Container>
  );
};
// const Container = styled.div`
//   width: 80%;
//   background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
//   border-bottom-right-radius: 2rem;
//   border-top-right-radius: 2rem;
//   margin: 0.5rem 4rem 2rem 2rem;
//   @media screen and (min-width: 120px) and (max-width: 1080px) {
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     margin: 1rem 0 0 0;
//   }

// `;
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
  predict_client_twitter,
  predict_client_fb,
})(Prediction);
