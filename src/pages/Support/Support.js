import React from "react";
import { Form, Button } from "react-bootstrap";
import { supportText, supportGrid } from "../../constants/constants";
import "./Support.scss";

const Support = () => {
  return (
    <React.Fragment>
      <div className="support-container">
        <div className="heading"> Get in touch </div>
        <p className="support-text">{supportText[0]}</p>
        <div className="support-grid">
          {supportGrid.map((gridItem, index) => {
            const i = index + 1;
            return (
              <div className="grid-flex">
                <div className="grid-item">
                  <img
                    className="grid-image"
                    alt={gridItem.image + "name"}
                    src={require(`../../assets/${gridItem.image}.svg`)}
                  ></img>
                  <span className="grid-title">{gridItem.title}</span>
                  {gridItem.text.map(text => {
                    return <p className="grid-text">{text}</p>;
                  })}
                </div>
                {i % 3 ? <hr className="rightLine" /> : null}
              </div>
            );
          })}
        </div>
        <div className="contact-form">
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Email"Type your message/>
            </Form.Group>
            <Button className="sendButton" type="submit">
              Send
            </Button>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Support;
