import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  fetchRegisterBusiness,
  registerNewBusiness,
  updateBusiness,
  resetRegisterBusiness,
  checkMerchantHandle,
  fetchRegisterBusinessMasterData
} from "../../store/actions";
import "./RegisterBusiness.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { Form, Col, Button, InputGroup } from "react-bootstrap";
import { registerFormFields } from "../../constants/constants";

const RegisterBusiness = props => {
  const { selectedBusiness, selectedBusinessDetails, registerBusinessMasterData } = props;
  let history = useHistory();
  const action = props.match.params.action;
  const [loading, setLoading] = useState(true);
  const [handle, setHandle] = useState('');
  const [handleErr, setHandleErr] = useState(false);
  const [buttonClicked, setbuttonClicked] = useState(false);

  useEffect(() => {
    if (!registerBusinessMasterData) {
      props.fetchRegisterBusinessMasterData();
    }
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
    } else {
      props.resetRegisterBusiness();
      setLoading(false);
    }
  }, []);

  const registerNew = async event => {
    if (!handleErr) {
      let payload = {};
      const formElements = event.target.elements;
      registerFormFields.forEach(field => {
        if (["Suburb"].includes(field)){
          payload[field] = '';
        } else {
        payload[field] = formElements[field].value;
        }
      });
      payload['BusinessContact'] = formElements['BusinessContact'][0].value + '-' + formElements['BusinessContact'][1].value;
      payload['BusinessHandle'] = formElements['BusinessHandle'][0].value + '@' + formElements['BusinessHandle'][1].value;
      payload["PatronId"] = JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId;;
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
    }
  };

  useEffect(() => {
    selectedBusinessDetails ? setHandle(selectedBusinessDetails && selectedBusinessDetails.BusinessHandle &&
      selectedBusinessDetails.BusinessHandle.S) : setHandle('');
  }, [selectedBusinessDetails]);

  const cancel = async event => {
    event.preventDefault();
    document.getElementById("RegisterBusinessForm").reset();
    history.goBack();
  };

  const checkHandle = async () => {
    var ele = document.getElementById('handle');
    if (ele) {
      if (ele.children[0].value && ele.children[1].children[1].value) {
        const res = await props.checkMerchantHandle({
          "BusinessHandle": `${ele.children[0].value}@${ele.children[1].children[1].value}`
        });
        res && res === 'Available' ? (function () { setHandleErr(false); setHandle(`${ele.children[0].value}@${ele.children[1].children[1].value}`); }()) : (function () { setHandleErr(true); setHandle(''); }())
      }
    }
  }

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
            <Form.Row className="width-75">
              <Col>
                <Form.Group controlId="BusinessHandle">
                  <Form.Label>Your C-Angelx User Handle</Form.Label>
                  <div id="handle" style={{ "display": "flex" }}>
                    <Form.Control
                      style={{ "width": "70%" }}
                      defaultValue={
                        selectedBusinessDetails && selectedBusinessDetails.BusinessHandle &&
                        selectedBusinessDetails.BusinessHandle.S && selectedBusinessDetails.BusinessHandle.S.split('@')[0]
                      }
                      type="text"
                      placeholder="Merchant Name"
                      pattern="^[\w_-]+$"
                      onBlur={checkHandle}
                      required
                    />
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        defaultValue={
                          selectedBusinessDetails && selectedBusinessDetails.BusinessHandle &&
                          selectedBusinessDetails.BusinessHandle.S && selectedBusinessDetails.BusinessHandle.S.split('@')[1]
                        }
                        type="text"
                        pattern="^[\w_-]+$"
                        placeholder="Location"
                        onBlur={checkHandle}
                        required
                      />
                    </InputGroup>
                  </div>
                  {handleErr ? <Form.Text className="error">
                    Entered User Handle is not available, please retry.
              </Form.Text> : <Form.Text className="hint">
                      User Handle can contain alphabets, _ and - only
              </Form.Text>}
                </Form.Group>
              </Col>
              <Col>
                {handle ? (action === 'edit' ?
                  <React.Fragment>
                    <div>
                      <span className="form-label">Your Merchant Page Link:</span>
                    </div>
                    <div>
                      <a href={window.location.origin + '/merchantPage/' + handle} target="blank">{window.location.origin + '/merchantPage/' + handle}</a>
                    </div>
                  </React.Fragment> :
                  <React.Fragment>
                    <div>
                      <span className="form-label">Your Merchant Page Link:</span>
                    </div>
                    <div>
                      {window.location.origin + '/merchantPage/' + handle}
                    </div>
                    <div>
                      <span className="hint">(Link will be active once your business registration is completed)</span>
                    </div>
                  </React.Fragment>) : null}
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
                    <option disabled value="" selected> Select Type</option>
                    {registerBusinessMasterData && registerBusinessMasterData.TypeOfBusiness && registerBusinessMasterData.TypeOfBusiness.length && registerBusinessMasterData.TypeOfBusiness.map((type, index) => {
                      return (<option key={index} value={type}> {type}</option>)
                    })
                    }
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
                    <option value="South Africa"> South Africa</option>
                  </Form.Control>
                </Form.Group>
              </Col> */}
            </Form.Row>
            <Form.Row className="width-75">
              <Col>
                <Form.Group controlId="BusinessContact">
                  <Form.Label>Contact Details</Form.Label>
                  <div style={{ "display": "flex" }}>
                    <Form.Control
                      style={{ "width": "7rem" }}
                      as="select"
                      defaultValue={
                        selectedBusinessDetails && selectedBusinessDetails.BusinessContact &&
                        selectedBusinessDetails.BusinessContact.S && selectedBusinessDetails.BusinessContact.S.split('-')[0]
                      }
                      required
                    >
                      <option disabled value="" selected> Code</option>
                      {registerBusinessMasterData && registerBusinessMasterData.CountryCodes && registerBusinessMasterData.CountryCodes.length && registerBusinessMasterData.CountryCodes.map((code, index) => {
                        return (<option key={index} value={code}> {code}</option>)
                      })
                      }
                    </Form.Control>
                    <Form.Control
                      defaultValue={
                        selectedBusinessDetails && selectedBusinessDetails.BusinessContact &&
                        selectedBusinessDetails.BusinessContact.S && selectedBusinessDetails.BusinessContact.S.split('-')[1]
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
                    <option disabled value="" selected> Address Type</option>
                    {registerBusinessMasterData && registerBusinessMasterData.AddressType && registerBusinessMasterData.AddressType.length && registerBusinessMasterData.AddressType.map((type, index) => {
                      return (<option key={index} value={type}> {type}</option>)
                    })
                    }
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
                    {registerBusinessMasterData && registerBusinessMasterData.Country && registerBusinessMasterData.Country.length && registerBusinessMasterData.Country.map((type, index) => {
                      return (<option key={index} value={type}> {type}</option>)
                    })
                    }
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
            <Form.Row className="width-50">
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
              {/* <Col>
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
              </Col> */}
            </Form.Row>
            <div className="sub-heading">Business Search Tags</div>{" "}
            <span className="hint">
              (Give your business / organization tags, to make it easily
              searchable. After each tag, please add a comma (,).)
            </span>
            <Form.Row className="width-25">
              <Col>
                <Form.Group controlId="TagsData">
                  <Form.Label>Business Search Tags</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails &&
                      selectedBusinessDetails.TagsData.S
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
      registerNewBusiness,
      resetRegisterBusiness,
      checkMerchantHandle,
      fetchRegisterBusinessMasterData
    },
    dispatch
  );

const mapStatetoProps = ({ app: { manageBusiness } }) => {
  console.log(manageBusiness);
  return {
    selectedBusiness: manageBusiness.selectedBusiness,
    selectedBusinessDetails: manageBusiness.selectedBusinessDetails,
    registerBusinessMasterData: manageBusiness.registerBusinessMasterData
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(RegisterBusiness);
