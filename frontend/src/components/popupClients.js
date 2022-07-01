import React from "react";
import { Modal, Button } from "react-bootstrap";

const PopupClients = (props) => {
  console.log(props.client);
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
            CLIENT INFORMATION
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.client.username}</h4>
          <p>
          {props.client.email}
          <br />
          {props.client.gender}
          <br />
          {props.client.plan}
          <br />
          {props.client.dob}
          <br />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupClients;
