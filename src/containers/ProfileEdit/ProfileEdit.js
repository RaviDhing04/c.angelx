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
          "phone_number": formElements['formGroupPhone'][0].value + '0000' + formElements['formGroupPhone'][1].value,
          "birthdate": formElements.birthdate.value,
          "name": formElements.formGroupName.value,
          "gender": formElements.gender.value,
          "locale": 'NA', // mapped to ussd
          "website": formElements['website'][0].value + '0000' + formElements['website'][1].value // mapped to alternate number
        }
      }
    );
    res ? (function () { setLoading(false); }()) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    if (res) {
      setUserData(JSON.parse(localStorage.getItem('userData')));
      setEditMode(false);
    }
  };

  const cancel = async event => {
    // setLoading(true);
    setEditMode(false);
    document.getElementById("DisplaySearchContactForm").reset();
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
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="formGroupPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <div style={{ "display": "flex" }}>
                    <Form.Control
                      style={{ "width": "7rem" }}
                      as="select"
                      defaultValue={userData && userData.phone_number && userData.phone_number.split('0000')[0]
                      }
                      required
                    // disabled={!editMode}
                    >
                      <option disabled value="" selected> Code</option>
                      {["+91", "+27", "+1"].map((code, index) => {
                        return (<option key={index} value={code}> {code}</option>)
                      })
                      }
                    </Form.Control>
                    <Form.Control
                      defaultValue={
                        userData && userData.website ? userData.website.split('0000')[1]
                          : ""
                      }
                      type="tel"
                      pattern="^[0-9].{9}$"
                      placeholder="10 digit Phone Number"
                      disabled={!editMode}
                      required
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="website">
                  <Form.Label>Alternate Phone Number</Form.Label>
                  <div style={{ "display": "flex" }}>
                    <Form.Control
                      style={{ "width": "7rem" }}
                      as="select"
                      defaultValue={userData && userData.phone_number && userData.phone_number.split('0000')[0]
                      }
                    // disabled={!editMode}
                    >
                      <option disabled value="" selected> Code</option>
                      {["+91", "+27", "+1"].map((code, index) => {
                        return (<option key={index} value={code}> {code}</option>)
                      })
                      }
                    </Form.Control>
                    <Form.Control
                      defaultValue={
                        userData && userData.website ? userData.website.split('0000')[1]
                          : ""
                      }
                      type="tel"
                      pattern="^[0-9].{9}$"
                      placeholder="10 digit Alternate Phone Number"
                      disabled={!editMode}
                      required
                    />
                  </div>
                </Form.Group>
              </Col>
              {/* <Col>
                <Form.Group controlId="locale">
                  <Form.Label>USSD</Form.Label>
                  <Form.Control
                    defaultValue={
                      userData && userData.locale ? userData.locale
                        : ""
                    }
                    type="tel"
                    placeholder="Enter USSD"
                    disabled={!editMode}
                    required
                  />
                </Form.Group>
              </Col> */}
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="birthdate">
                  <Form.Label>Select birth date</Form.Label>
                  <Form.Control defaultValue={
                    userData && userData.birthdate ? userData.birthdate
                      : ""
                  }
                    disabled={!editMode} type="date" name="birthdate" placeholder="Date of Birth" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    // style={{ "width": "7rem" }}
                    as="select"
                    defaultValue={
                      userData && userData.gender ? userData.gender
                        : ""
                    }
                    // disabled={!editMode}
                    required
                  >
                    <option disabled value="" selected> Gender</option>
                    {["Male", "Female", "Other"].map((code, index) => {
                      return (<option key={index} value={code}> {code}</option>)
                    })
                    }
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            {editMode ? <Form.Row>
              <Col>
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>Enter Password to Confirm the Changes</Form.Label>
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
