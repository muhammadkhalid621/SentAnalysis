import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
const SendMail = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    subject: "",
    body: "",
  });
  const { subject, body } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const findErrors = () => {
    const newErrors = {};

    //Subject Error
    if (!subject || subject === "")
      newErrors.subject = "Task title is Required";
    else if (subject.length > 60) newErrors.subject = "Task title is Too Long";

    //Email Body Error
    if (!body || body === "") newErrors.body = "Task Message is Required";
    else if (body.length > 300) newErrors.body = "Task Message is too Long";

    return newErrors;
  };

  useEffect(() => {
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
        // No errors! Put any logic here for the form submission!
        props.send_email(props.client_email, subject, body).then(() => {
          setIsLoading(false);
          setFormData({});
        //   window.location.reload();
        });
      }
    }
  }, [isLoading]);
  const onSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Send Mail
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-0 mt-2" controlId="formGroupText">
                <Form.Label>Client Email</Form.Label>
                <Form.Control
                  className="mt-2"
                  type="email"
                  value={props.client_email.email}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-0 mt-2" controlId="formGroupSubject">
                <Form.Label>Email Subject</Form.Label>
                <Form.Control
                  name="subject"
                  as="textarea"
                  rows={1}
                  className={`input ${errors.subject && "errorShow"} mt-2`}
                  type="text"
                  placeholder="Enter task title"
                  value={subject || ""}
                  onChange={(e) => onChange(e)}
                />
                {errors.subject && (
                  <p className="errorShow">{errors.subject}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-0 mt-2" controlId="ControlEmailBody">
                <Form.Label>Email Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="body"
                  className={`input ${errors.body && "errorShow"} mt-2 mb-2`}
                  type="text"
                  placeholder="Enter task Message"
                  value={body || ""}
                  onChange={(e) => onChange(e)}
                />
                {errors.body && <p className="errorShow">{errors.body}</p>}
              </Form.Group>
              {isLoading ? (
                <div className="justify-content">
                  <p>Mail is Sening....</p>
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
                    Sending...
                  </Button>
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <Button
                    as="input"
                    type="submit"
                    value={isLoading ? "Sending..." : "Send Mail"}
                    className="submit d-flex justify-content-center pace-content-center"
                    disabled={isLoading}
                  />
                </div>
              )}
            </Form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SendMail;
