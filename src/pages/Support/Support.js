import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { supportText, supportGrid } from "../../constants/constants";
import "./Support.scss";
import { bindActionCreators } from "redux";
import {
  support
} from "../../store/actions";
import { connect } from "react-redux";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const Support = (props) => {
  const [loading, setLoading] = useState(false);

  const askSupport = async (event) => {
    event.preventDefault();
    let payload = {};
    const formElements = event.target.elements;
    ['Name', 'Email', 'Message'].forEach(field => {
      payload[field] = formElements[field].value;
    });

    setLoading(true);
    const res = await props.support(payload);
    res ? (function () { setLoading(false); (alert('Message sent successfully!')) }()) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
  }

  return (
    <React.Fragment>
      {loading ? <CustomLoader /> : null}
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
                {i % 2 ? <hr className="rightLine" /> : null}
              </div>
            );
          })}
        </div>
        <div className="contact-form">
          <Form id="SupportForm" onSubmit={e => askSupport(e)}>
            <Form.Group controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Your Name" required/>
            </Form.Group>
            <Form.Group controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Your Email" required/>
            </Form.Group>
            <Form.Group controlId="Message">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Type your message" required />
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



const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      support
    },
    dispatch
  );

const mapStatetoProps = ({ app: { manageBusiness } }) => {
  // console.log(manageBusiness);
  return {
    // selectedBusiness: manageBusiness.selectedBusiness,
    // selectedBusinessDetails: manageBusiness.selectedBusinessDetails
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Support);
