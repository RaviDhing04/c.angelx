import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  fetchRegisterBusiness,
  registerNewBusiness,
  updateBusiness
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
  const [buttonClicked, setbuttonClicked] = useState(false);

  useEffect(() => {
    // const action = props.match.params.action;
    async function fetchBusinessDetails() {
      setLoading(true);
      if (!selectedBusiness) {
        history.goBack();
      } else {
        const res = await props.fetchRegisterBusiness({
          PatronId: selectedBusiness.PatronId.S,
          MerchantId: selectedBusiness.MerchantId.S
        });
        res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
      }
    }
    if (action === "edit") {
      fetchBusinessDetails();
    }
  }, []);

  const registerNew = async event => {
    let payload = {};
    const formElements = event.target.elements;
    registerFormFields.forEach(field => {
      payload[field] = formElements[field].value;
    });
    payload["PatronId"] = JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId;;
    const tags = formElements.Tags.value;
    tags.split(",").forEach((tag, index) => {
      payload["tag" + (index + 1)] = tag;
    });

    if (action === 'edit') {
      payload['MerchantId'] = selectedBusiness.MerchantId.S;
    }
    setLoading(true);
    const res =
      action === "edit"
        ? await props.updateBusiness(payload)
        : await props.registerNewBusiness(payload);
    res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    if (!buttonClicked) {
      history.goBack();
    } else {
      document.getElementById("RegisterBusinessForm").reset();
      setbuttonClicked(false);
    }
  };

  const cancel = async event => {
    event.preventDefault();
    document.getElementById("RegisterBusinessForm").reset();
    history.goBack();
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
          <Form id="RegisterBusinessForm" onSubmit={e => registerNew(e)}>
            <div className="sub-heading">Organization Details</div>
            <Form.Row className="width-25">
              <Col>
                <Form.Group controlId="BusinessHandle">
                  <Form.Label>Your C-Angelx User Handle</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails &&
                      selectedBusinessDetails.BusinessHandle.S
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
            </Form.Row>
            <Form.Row className="width-50">
              <Col>
                <Form.Group controlId="OrgName">
                  <Form.Label>Organization Name</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails &&
                      selectedBusinessDetails.OrgName.S
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
                  <Form.Control
                    as="select"
                    defaultValue={
                      selectedBusinessDetails &&
                      selectedBusinessDetails.BusinessType.S
                    }
                    required
                  >
                    <option value="none"> Select Type</option>
                    <option value="Electronics"> Electronics</option>
                    <option value="Furnitures"> Furnitures </option>
                    <option value="Causes"> Causes </option>
                  </Form.Control>
                </Form.Group>
              </Col>
              {/* <Col>
                <Form.Group controlId="Country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={
                      selectedBusinessDetails &&
                      selectedBusinessDetails.Country.S
                    }
                    required
                  >
                    <option value="none"> Select Country</option>
                    <option value="India"> India</option>
                    <option value="USA"> USA</option>
                    <option value="south-africa"> South Africa</option>
                  </Form.Control>
                </Form.Group>
              </Col> */}
            </Form.Row>
            <Form.Row className="width-75">
              <Col>
                <Form.Group controlId="BusinessContact">
                  <Form.Label>Contact Details</Form.Label>
                  <div style={{"display": "flex"}}>
                    <Form.Control
                     style={{"width": "7rem"}}
                      as="select"
                      // defaultValue={
                      //   selectedBusinessDetails &&
                      //   selectedBusinessDetails.Country.S
                      // }
                      required
                    >
                      <option value="none">Code</option>
                      <option value="India">+91 (India)</option>
                      <option value="USA">+1 (USA)</option>
                      <option value="south-africa">+27 (S.A)</option>
                    </Form.Control>
                    <Form.Control
                      defaultValue={
                        selectedBusinessDetails &&
                        selectedBusinessDetails.BusinessContact.S
                      }
                      type="tel"
                      pattern="^[0-9].{9}$"
                      placeholder="10 digit Contact Number"
                      required
                    />
                    </div>
                </Form.Group>
              </Col>
                <Col>
                  <Form.Group controlId="BusinessEmail">
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control
                      defaultValue={
                        selectedBusinessDetails &&
                        selectedBusinessDetails.BusinessEmail.S
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
                        selectedBusinessDetails &&
                        selectedBusinessDetails.OrgWebsite && selectedBusinessDetails.OrgWebsite.S
                      }
                      type="text"
                      placeholder="www.Domain.com"
                    />
                  </Form.Group>
                </Col>
            </Form.Row>
              <Form.Row className="width-75">
                <Col>
                  <Form.Group controlId="PayFastId">
                    <Form.Label>Insert Payfast ID</Form.Label>
                    <InputGroup>
                      <Form.Control
                        defaultValue={
                          selectedBusinessDetails &&
                          selectedBusinessDetails.PaymentIDs.M.PayFastId.S
                        }
                        type="text"
                        placeholder="Payfast ID"
                        required
                      />
                      <InputGroup.Append className="inputGroupPayfastID">
                        <a
                          className="signUp"
                          href="https://www.payfast.co.za/registration"
                          target="blank"
                        >
                          Click to Sign up!
                      </a>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="PaypalId">
                    <Form.Label>Insert Paypal ID</Form.Label>
                    <InputGroup>
                      <Form.Control
                        defaultValue={
                          selectedBusinessDetails &&
                          selectedBusinessDetails.PaymentIDs.M.PaypalId.S
                        }
                        type="text"
                        placeholder="Paypal ID"
                        required
                      />
                      <InputGroup.Append className="inputGroupPayfastID">
                        <a
                          className="signUp"
                          href="https://www.paypal.com/in/webapps/mpp/account-selection"
                          target="blank"
                        >
                          Click to Sign up!
                      </a>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="DHLId">
                    <Form.Label>Insert DHL ID</Form.Label>
                    <InputGroup>
                      <Form.Control
                        defaultValue={
                          selectedBusinessDetails &&
                          selectedBusinessDetails.DHLId && selectedBusinessDetails.DHLId.S
                        }
                        type="text"
                        placeholder="DHL ID"
                        required
                      />
                      <InputGroup.Append className="inputGroupPayfastID">
                        <a
                          className="signUp"
                          href="https://www.dhl.com/en/express/shipping/open_account.html"
                          target="blank"
                        >
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
                    <Form.Control
                      as="select"
                      defaultValue={
                        selectedBusinessDetails &&
                        selectedBusinessDetails.BusinessAddress.M.AddressType.S
                      }
                      required
                    >
                      <option value="none"> Address Type</option>
                      <option value="Merchant"> Merchant Address</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="Country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={
                        selectedBusinessDetails &&
                        selectedBusinessDetails.Country.S
                      }
                      required
                    >
                      <option value="none"> Select Country</option>
                      <option value="India"> India</option>
                      <option value="USA"> USA</option>
                      <option value="south-africa"> South Africa</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="Pincode">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      defaultValue={
                        selectedBusinessDetails &&
                        selectedBusinessDetails.BusinessAddress.M.PostalCode.S
                      }
                      type="text"
                      placeholder="Type Pincode"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="Province">
                    <Form.Label>Province/State</Form.Label>
                    <Form.Control
                      defaultValue={
                        selectedBusinessDetails &&
                        selectedBusinessDetails.BusinessAddress.M.Province.S
                      }
                      type="text"
                      placeholder="Type Province/State"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="City">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      defaultValue={
                        selectedBusinessDetails &&
                        selectedBusinessDetails.BusinessAddress.M.City.S
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
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control
                      defaultValue={
                        selectedBusinessDetails &&
                        selectedBusinessDetails.BusinessAddress.M.StreetName.S
                      }
                      type="text"
                      placeholder="Type Address 1"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="StreetNumber">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                      defaultValue={
                        selectedBusinessDetails &&
                        selectedBusinessDetails.BusinessAddress.M.StreetNumber.S
                      }
                      type="text"
                      placeholder="Type Address 2"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="Suburb">
                    <Form.Label>Suburb</Form.Label>
                    <Form.Control
                      defaultValue={
                        selectedBusinessDetails &&
                        selectedBusinessDetails.BusinessAddress.M.Suburb.S
                      }
                      type="text"
                      placeholder="Type Suburb"
                      required
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <div className="sub-heading">Business Search Tags</div>{" "}
              <span className="hint">
                (Give your business / organization tags, to make it easily
                searchable. After each tag, please add a comma (,).)
            </span>
              <Form.Row className="width-25">
                <Col>
                  <Form.Group controlId="Tags">
                    <Form.Label>Business Search Tags</Form.Label>
                    <Form.Control
                      defaultValue={
                        selectedBusinessDetails &&
                        selectedBusinessDetails.Tags.L.length &&
                        selectedBusinessDetails.Tags.L.reduce((acc, tag) => {
                          return acc + tag.S + ",";
                        }, "")
                      }
                      type="text"
                      placeholder="Business Search Tags"
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <div className="buttons">
                <Button onClick={e => cancel(e)} className="cancelButton">
                  Cancel
              </Button>
                {action === 'edit' ? null : <Button
                  onClick={() => setbuttonClicked(true)}
                  type="submit"
                  className="saveAnotherButton"
                >
                  Save & Add Another Business
              </Button>}
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
        fetchRegisterBusiness,
        updateBusiness,
        registerNewBusiness
      },
    dispatch
  );

const mapStatetoProps = ({ app: { manageBusiness} }) => {
        console.log(manageBusiness);
  return {
        selectedBusiness: manageBusiness.selectedBusiness,
    selectedBusinessDetails: manageBusiness.selectedBusinessDetails
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(RegisterBusiness);
