import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, Col } from "react-bootstrap";
import { bindActionCreators } from "redux";
import {
  getSavedEmployees,
  searchContactWithEmail,
  resetSearchedContact,
  addNewEmployee,
  deleteEmployee
} from "../../store/actions";
import "./AddEmployees.scss";
import TableComp from "../../components/TableComp/TableComp";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const AddContacts = props => {
  const [loading, setLoading] = useState(true);
  const [pageName, setName] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const { name, merchantId } = props.match.params;
  const {
    contacts,
    getSavedEmployees,
    searchContactWithEmail,
    searchedContact,
    resetSearchedContact,
    addNewEmployee,
    deleteEmployee
  } = props;
  const tableHeader = ["Email", "Name", "Phone Number"];
  const tableKeys = ["email", "name", "phone_number"];

  useEffect(() => {
    async function fetchSavedContacts() {
      name ? setName(name) : setName("");
      const res = await getSavedEmployees({
        "MerchantId": merchantId
      });
      res
        ? setLoading(false)
        : (function () {
          setLoading(false);
          alert("something went wrong, Please try again!");
        })();
    }
    fetchSavedContacts();
  }, []);

  const getUserInfo = async event => {
    event.preventDefault();
    const formElements = event.target.elements;
    const email = formElements.formGroupEmail.value;
    setLoading(true);
    const res = await searchContactWithEmail({
      email_list: [email]
    });
    res
      ? (function () {
        res && res.message ? (function () {
          setDisableBtn(true); setLoading(false);
        })() :
          (function () {
            setDisableBtn(false); setLoading(false);
          })()
      })()
      : (function () {
        setLoading(false);
        alert("something went wrong, Please try again!");
      })();
  };

  const addContactToList = async event => {
    event.preventDefault();
    setLoading(true);
    const res = await addNewEmployee({
      "MerchantId": merchantId,
      "Employees": [searchedContact && searchedContact.email]
    });
    if (res) {
      const res = await getSavedEmployees({
        "MerchantId": merchantId
      });
      res
        ? (function () {
          setLoading(false);
          setDisableBtn(true);
          document.getElementById("SearchContactForm").reset();
        })()
        : (function () {
          setLoading(false);
          alert("something went wrong, Please try again!");
        })();
    }
  };

  const deleteRow = async row => {
    setLoading(true);
    const res = await deleteEmployee(
      {
        "MerchantId": merchantId,
        "Employees": [row && row.email]
      });
    if (res) {
      const res = await getSavedEmployees({
        "MerchantId": merchantId
      });
      res
        ? setLoading(false)
        : (function () {
          setLoading(false);
          alert("something went wrong, Please try again!");
        })();
    }
  };

  const cancel = async event => {
    setLoading(true);
    event.preventDefault();
    const res = await resetSearchedContact();
    res
      ? setLoading(false)
      : (function () {
        setLoading(false);
        alert("something went wrong, Please try again!");
      })();
    document.getElementById("SearchContactForm").reset();
  };

  return !loading ? (
    <React.Fragment>
      <div className="add-contact-heading">{pageName}</div>
      <Container className="add-contact-container" fluid>
        <div className="search">
          <Form id="SearchContactForm" onSubmit={e => getUserInfo(e)}>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email Id</Form.Label>
              <Form.Control type="email" placeholder="Type Email" required />
            </Form.Group>
            <Button className="getInfoButton" type="submit">
              Get Info
            </Button>
          </Form>
        </div>
        <div className="searchedUser">
          <Form
            id="DisplaySearchContactForm"
            onSubmit={e => addContactToList(e)}
          >
            <Form.Row>
              <Col>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Email Id</Form.Label>
                  <Form.Control
                    defaultValue={
                      searchedContact && searchedContact.email
                        ? searchedContact.email
                        : ""
                    }
                    type="email"
                    placeholder="Contact Email"
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGroupName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    defaultValue={searchedContact && searchedContact.name}
                    type="text"
                    placeholder="Contact Name"
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGroupPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    defaultValue={
                      searchedContact && searchedContact.phone_number
                    }
                    type="number" min="1"
                    placeholder="Contact Phone number"
                    disabled
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Button onClick={e => cancel(e)} className="cancelButton">
              Reset
            </Button>
            <Button disabled={disableBtn} className="saveButton" type="submit">
              Save
            </Button>
          </Form>
        </div>

        <div className="contacts-table">
          {
            <TableComp
              tableData={contacts}
              tableHeader={tableHeader}
              tableKeys={tableKeys}
              onDelete={deleteRow}
              showDelete={true}
              showEdit={false}
              editText={'Edit'}
              deleteText={'Delete'}
            />
          }
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
      getSavedEmployees,
      searchContactWithEmail,
      resetSearchedContact,
      addNewEmployee,
      deleteEmployee
    },
    dispatch
  );

const mapStatetoProps = ({ app: { contactPage } }) => {
  console.log(contactPage);
  return {
    contacts: contactPage.contacts,
    searchedContact: contactPage.searchedContact
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddContacts);
