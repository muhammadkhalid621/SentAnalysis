import React from "react";
import { Modal, Button } from "react-bootstrap";
const Message = (props) => {
  console.log("hello");
  return (
    <>
      <Modal
        {...props}
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{props.message}</p>
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

export default Message;
