import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  fetchRegisterBusiness,
  registerNewBusiness
} from "../../store/actions";
import "./RegisterBusiness.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { Form, Col, Button, InputGroup } from "react-bootstrap";
import { registerFormFields } from "../../constants/constants";

const RegisterBusiness = props => {
  const { selectedBusiness, selectedBusinessDetails } = props;
  let history = useHistory();
  const action = props.match.params.action;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const action = props.match.params.action;
    async function fetchBusinessDetails() {
      setLoading(true);
      const res = await props.fetchRegisterBusiness({
        PatronId: selectedBusiness.PatronId.S,
        MerchantId: selectedBusiness.MerchantId.S
      });
      res ? setLoading(false) : console.log("err");
    }
    if (action === "edit") {
      fetchBusinessDetails();
    }
  }, []);

  const addContactToList = async event => {
    let payload = {};
    const formElements = event.target.elements;
    registerFormFields.forEach(field => {
      payload[field] = formElements[field].value;
    });
    payload["PatronId"] = "69116697064443";
    const tags = formElements.Tags.value;
    tags.split(",").forEach((tag, index) => {
      payload["tag" + index+1] = tag;
    });
    setLoading(true);
    const res = await registerNewBusiness(payload);
    res ? setLoading(false) : console.log("err");
  };

  const cancel = async event => {
    event.preventDefault();
    document.getElementById("RegisterBusinessForm").reset();
  };

  return !loading ? (
    <Container className="RegisterBusiness-page-container" fluid>
      <div className="RegisterBusiness-page">
        <div className="RegisterBusiness-header">
          <span className="heading">
            {action === "addNew" ? "Register New Business" : "Edit Business"}
          </span>
        </div>
        <div className="RegisterBusiness">
          <Form id="RegisterBusinessForm" onSubmit={e => addContactToList(e)}>
            <div className="sub-heading">Organization Details</div>
            <Form.Row className="width-50">
              <Col>
                <Form.Group controlId="BusinessHandle">
                  <Form.Label>Your C-Angelx User Handle</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="text"
                    placeholder="Trading Name"
                    required
                  />
                </Form.Group>
              </Col>
              {/* <Col>
                <Form.Group controlId="formGroupSKUNumber">
                  <Form.Label>SKU Number</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="text"
                    placeholder="Mall or Street"
                required />
                </Form.Group>
              </Col> */}
              <Col>
                <Form.Group controlId="PaypalId">
                  <Form.Label>Insert Paypal ID</Form.Label>
                  <InputGroup>
                    <Form.Control
                      defaultValue={
                        selectedBusinessDetails &&
                        selectedBusinessDetails.ContactNumber.S
                      }
                      type="text"
                      placeholder="Paypal ID"
                      required
                    />
                    <InputGroup.Append className="inputGroupPayfastID">
                      <a className="signUp" href="/">
                        Click to Sign up!
                      </a>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="width-75">
              <Col>
                <Form.Group controlId="OrgName">
                  <Form.Label>Organization Name</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="text"
                    placeholder="Trading Name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="BusinessType">
                  <Form.Label>Type of Business</Form.Label>
                  <Form.Control as="select"   required>
                    <option value="testValue"> Select Type</option>
                    <option value="testValue"> India</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select"   required>
                    <option value="testValue"> Select Country</option>
                    <option value="testValue"> India</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="BusinessContact">
                  <Form.Label>Contact Details</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="tel"
                    placeholder="Contact Number"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="BusinessEmail">
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Email.S
                        ? selectedBusinessDetails.Email.S
                        : ""
                    }
                    type="email"
                    placeholder="Contact Email"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="OrgWebsite">
                  <Form.Label>Organization Website</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="url"
                    placeholder="www.Domain.com"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="PayFastId">
                  <Form.Label>Insert Payfast ID</Form.Label>
                  <InputGroup>
                    <Form.Control
                      defaultValue={
                        selectedBusinessDetails &&
                        selectedBusinessDetails.ContactNumber.S
                      }
                      type="text"
                      placeholder="Payfast ID"
                      required
                    />
                    <InputGroup.Append className="inputGroupPayfastID">
                      <a className="signUp" href="/">
                        Click to Sign up!
                      </a>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Form.Row>
            <div className="sub-heading">Address Details</div>
            <Form.Row className="width-25">
              <Col>
                <Form.Group controlId="AddressType">
                  <Form.Label>Address Type</Form.Label>
                  <Form.Control as="select"   required>
                    <option value="testValue"> Address Type</option>
                    <option value="testValue"> India</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="Country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select"   required>
                    <option value="testValue"> Select Country</option>
                    <option value="testValue"> India</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Pincode">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="text"
                    placeholder="Type Pincode"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Province">
                  <Form.Label>Province</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="text"
                    placeholder="Type Province"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="City">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="text"
                    placeholder="City"
                    required
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="width-75">
              <Col>
                <Form.Group controlId="StreetName">
                  <Form.Label>Street Name</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="text"
                    placeholder="Type Street Name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="StreetNumber">
                  <Form.Label>Street Number</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="text"
                    placeholder="Type Street Number"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Suburb">
                  <Form.Label>Suburb</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="text"
                    placeholder="Type Suburb"
                    required
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <div className="sub-heading">Tags</div>{" "}
            <span className="hint">
              (Give your business / organization tags, to make it easily
              searchable. After each tag, please add a comma (,).)
            </span>
            <Form.Row className="width-25">
              <Col>
                <Form.Group controlId="Tags">
                  <Form.Label>Business Tags</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="text"
                    placeholder="Tags"
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <div className="buttons">
              <Button onClick={e => cancel(e)} className="cancelButton">
                Cancel
              </Button>
              <Button className="saveAnotherButton">
                Save & Add Another Business
              </Button>
              <Button className="saveButton" type="submit">
                Save Business
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  ) : (
    <CustomLoader />
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchRegisterBusiness
    },
    dispatch
  );

const mapStatetoProps = ({ app: { manageBusiness } }) => {
  console.log(manageBusiness);
  return {
    selectedBusiness: manageBusiness.selectedBusiness,
    selectedBusinessDetails: manageBusiness.selectedBusinessDetails
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(RegisterBusiness);
