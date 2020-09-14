import React from "react";
import { Modal } from "react-bootstrap";

const CenterModal = props => {
  return (
    <Modal
      {...props}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
      </Modal.Header> */}
      <Modal.Body>
        {props.component}
      </Modal.Body>
    </Modal>
  );
};

export default CenterModal;
