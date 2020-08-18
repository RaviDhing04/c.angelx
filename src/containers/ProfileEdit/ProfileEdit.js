import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, Col } from "react-bootstrap";
import { bindActionCreators } from "redux";
import {
  updateUserDetails
} from "../../store/actions";
import "./ProfileEdit.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { FormRow } from "react-bootstrap/Form";

const ProfileEdit = props => {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(false);


  useEffect(() => {
    async function fetchSavedContacts() {
      setUserData(JSON.parse(localStorage.getItem('userData')));
    }
    fetchSavedContacts();
  }, []);

  const updateUserDetails = async event => {
    const formElements = event.target.elements;
    event.preventDefault();
    setLoading(true);
    const res = await props.updateUserDetails(
      {
        "email": formElements.formGroupEmail.value,
        "password": formElements.formGroupPassword.value,
        "profile_data": {
          "phone_number": formElements.formGroupPhone.value,
          "birthdate": userData.birthdate,
          "name": formElements.formGroupName.value,
          "gender": userData.gender
        }
      }
    );
    res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());

  };

  const cancel = async event => {
    // setLoading(true);
    setEditMode(false);
    event.preventDefault();
    // const res = await resetuserData();
    // res ? setLoading(false) : (function() {setLoading(false); (alert('something went wrong, Please try again!'))} ());
    // document.getElementById("SearchContactForm").reset();
  };

  return !loading ? (
    <React.Fragment>
      <Container className="add-contact-container" fluid>
        <div className="searchedUser">
          <Form
            id="DisplaySearchContactForm"
            onSubmit={e => updateUserDetails(e)}
          >
            <Form.Row>
              <Col>
                <Form.Group controlId="formGroupName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    defaultValue={userData && userData.name ? userData.name
                      : ""}
                    type="text"
                    placeholder="Contact Name"
                    disabled={!editMode}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Email Id</Form.Label>
                  <Form.Control
                    defaultValue={
                      userData && userData.email
                        ? userData.email
                        : ""
                    }
                    type="email"
                    placeholder="Contact Email"
                    disabled={!editMode}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGroupPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    defaultValue={
                      userData && userData.phone_number ? userData.phone_number
                        : ""
                    }
                    type="tel"
                    placeholder="Phone number"
                    disabled={!editMode}
                    required
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            {editMode ? <Form.Row>
              <Col>
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    required
                  />
                </Form.Group>
              </Col>
            </Form.Row> : null}
            {editMode ? (
              <div>
                <Button onClick={e => cancel(e)} className="cancelButton">
                  Reset
                </Button>
                <Button className="saveButton" type="submit">
                  Save
                </Button>
              </div>
            ) : (
                <Button
                  onClick={() => setEditMode(true)}
                  className="cancelButton"
                >
                  Edit
                </Button>
              )}
          </Form>
        </div>
      </Container>
    </React.Fragment>
  ) : (
      <CustomLoader />
    );
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUserDetails
    },
    dispatch
  );

const mapStatetoProps = ({ app: { contactPage } }) => {
  console.log(contactPage);
  return {};
};

export default connect(mapStatetoProps, mapDispatchToProps)(ProfileEdit);
