import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Row, Col } from "react-bootstrap";

const AddTask = (props) => {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    tasktitle: "",
    taskMessage: "",
  });
  const { tasktitle, taskMessage } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const email_Set = (e) => {
    const email_admin = e.target.value;
    console.log(email_admin)
    setEmail(email_admin);
  };
  const findErrors = () => {
    const newErrors = {};

    //Email Error
    if (!email || email === "") newErrors.email = "Email is Required";
    // else if (!regexp.test(email)) newErrors.email = "Invalid Email";

    //task title Error
    if (!tasktitle || tasktitle === "")
      newErrors.tasktitle = "Task title is Required";
    else if (tasktitle.length > 50)
      newErrors.tasktitle = "Task title is Too Long";

    //task message Error
    if (!taskMessage || taskMessage === "")
      newErrors.taskMessage = "Task Message is Required";
    else if (taskMessage.length > 300)
      newErrors.taskMessage = "Task Message is too Long";

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
        props
          .task_upload(email, props.email, tasktitle, taskMessage)
          .then(() => {
            setIsLoading(false);
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
          <Modal.Title id="contained-modal-title-vcenter">ADD TASK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="signup-form">
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-0 mt-2" controlId="formGroupText">
                <Form.Label>From</Form.Label>
                <Form.Control
                  className="mt-2"
                  type="email"
                  value={props.email}
                  onChange={(e) => onChange(e)}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-0 mt-2" controlId="formGroupEmail">
                <Form.Label>To</Form.Label>
                <Form.Control
                  name="email"
                  className={`input ${errors.email && "errorShow"} mt-2`}
                  type="email"
                  as="select"
                  placeholder="Select email..."
                  value={email || ""}
                  onChange={(e) => email_Set(e)}
                >
                  <option value="default">Select Email...</option>
                  {props.emails.map((emails, index) => {
                    return <option key={index}>{emails}</option>;
                  })}
                </Form.Control>
                {errors.email && <p className="errorShow">{errors.email}</p>}
              </Form.Group>
              <Form.Group className="mb-0 mt-2" controlId="formGroupText">
                <Form.Label>Task Title</Form.Label>
                <Form.Control
                  name="tasktitle"
                  as="textarea"
                  rows={1}
                  className={`input ${errors.tasktitle && "errorShow"} mt-2`}
                  type="text"
                  placeholder="Enter task title"
                  value={tasktitle || ""}
                  onChange={(e) => onChange(e)}
                />
                {errors.tasktitle && (
                  <p className="errorShow">{errors.tasktitle}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-0 mt-2" controlId="ControlTextarea1">
                <Form.Label>Task Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="taskMessage"
                  className={`input ${
                    errors.taskMessage && "errorShow"
                  } mt-2 mb-2`}
                  type="text"
                  placeholder="Enter task Message"
                  value={taskMessage || ""}
                  onChange={(e) => onChange(e)}
                />
                {errors.taskMessage && (
                  <p className="errorShow">{errors.taskMessage}</p>
                )}
              </Form.Group>

              {isLoading ? (
                <div className="justify-content">
                  <p>Task is Adding....</p>
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
                    Adding...
                  </Button>
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <Button
                    as="input"
                    type="submit"
                    value={isLoading ? "Adding..." : "Add"}
                    className="submit d-flex justify-content-center pace-content-center"
                    disabled={isLoading}
                  />
                </div>
              )}
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTask;
