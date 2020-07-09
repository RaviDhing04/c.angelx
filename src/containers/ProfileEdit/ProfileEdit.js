import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, Col } from "react-bootstrap";
import { bindActionCreators } from "redux";
import {
  getSavedContacts,
  searchContactWithEmail,
  resetSearchedContact,
  addNewContact,
  deleteContact
} from "../../store/actions";
import "./ProfileEdit.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const ProfileEdit = props => {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { userId } = props.match.params;
  const {
    contacts,
    getSavedContacts,
    searchContactWithEmail,
    searchedContact,
    resetSearchedContact,
    addNewContact,
    deleteContact
  } = props;

  // useEffect(() => {
  //   async function fetchSavedContacts() {
  //     name ? setName(name) : setName("");
  //     const res = await getSavedContacts({ UserId: userId });
  //     res ? setLoading(false) : (function() {setLoading(false); (alert('something went wrong, Please try again!'))} ());
  //   }
  //   fetchSavedContacts();
  // }, [userId, getSavedContacts, name]);

  const addContactToList = async event => {
    event.preventDefault();
    setLoading(true);
    const res = await addNewContact({
      UserId: userId,
      ContactUserId: searchedContact && searchedContact.UserId.S,
      Name: searchedContact && searchedContact.Name.S,
      Email: searchedContact && searchedContact.Email.S,
      ContactNumber: searchedContact && searchedContact.ContactNumber.S
    });
    if (res) {
      const res = await getSavedContacts({ UserId: userId });
      res ? setLoading(false) : (function() {setLoading(false); (alert('something went wrong, Please try again!'))} ());
    }
  };

  const cancel = async event => {
    // setLoading(true);
    setEditMode(false);
    event.preventDefault();
    // const res = await resetSearchedContact();
    // res ? setLoading(false) : (function() {setLoading(false); (alert('something went wrong, Please try again!'))} ());
    // document.getElementById("SearchContactForm").reset();
  };

  return !loading ? (
    <React.Fragment>
      <Container className="add-contact-container" fluid>
        <div className="searchedUser">
          <Form
            id="DisplaySearchContactForm"
            onSubmit={e => addContactToList(e)}
          >
            <Form.Row>
              <Col>
                <Form.Group controlId="formGroupName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    defaultValue={searchedContact && searchedContact.Name.S}
                    type="text"
                    placeholder="Contact Name"
                    disabled={!editMode}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Email Id</Form.Label>
                  <Form.Control
                    defaultValue={
                      searchedContact && searchedContact.Email.S
                        ? searchedContact.Email.S
                        : ""
                    }
                    type="email"
                    placeholder="Contact Email"
                    disabled={!editMode}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGroupPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    defaultValue={
                      searchedContact && searchedContact.ContactNumber.S
                    }
                    type="number"
                    placeholder="Contact Phone number"
                    disabled={!editMode}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            {editMode ? (
              <div>
                <Button onClick={e => cancel(e)} className="cancelButton">
                  Cancel
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
      getSavedContacts,
      searchContactWithEmail,
      resetSearchedContact,
      addNewContact,
      deleteContact
    },
    dispatch
  );

const mapStatetoProps = ({ app: { contactPage } }) => {
  console.log(contactPage);
  return {};
};

export default connect(mapStatetoProps, mapDispatchToProps)(ProfileEdit);
