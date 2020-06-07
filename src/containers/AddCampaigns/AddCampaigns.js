import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, Col, InputGroup } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { addNewProduct } from "../../store/actions";
import "./AddCampaigns.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import plusIcon from "../../assets/plus.svg";
import { addCampaignFormFields } from "../../constants/constants";
import { useHistory } from "react-router-dom";

const AddCampaigns = props => {
  const [loading, setLoading] = useState(false);
  const { addNewProduct, selectedBusiness } = props;
  const history = useHistory();
  // const add = async event => {
  //   event.preventDefault();
  //   setLoading(true);
  //   const res = await addNewProduct({
  //     // UserId: userId,
  //     // ContactUserId: searchedContact && searchedContact.UserId.S,
  //     // Name: searchedContact && searchedContact.Name.S,
  //     // Email: searchedContact && searchedContact.Email.S,
  //     // ContactNumber: searchedContact && searchedContact.ContactNumber.S
  //   });
  // };

  const add = async event => {
    let payload = {
      DonationCampaignDetails: {},
      IsDonationCampaign: "true",
      ProductSpecifications: {
        AvailableColors: "",
        UnitPrice: "",
        AvailableQuantity: "",
        Currency: ""
      }
    };
    const formElements = event.target.elements;
    addCampaignFormFields.forEach(field => {
      switch (field) {
        case "MinDonation":
          payload.DonationCampaignDetails[field] = formElements[field].value;
          break;
        case "TargetDonationAmount":
          payload.DonationCampaignDetails[field] = formElements[field].value;
          break;
        case "Currency":
          payload.DonationCampaignDetails[field] = formElements[field].value;
          break;
        default:
          payload[field] = formElements[field].value;
          break;
      }
    });

    payload["MerchantId"] = selectedBusiness.MerchantId.S;
    payload["MerchantHandle"] = selectedBusiness.BusinessHandle.S;
    setLoading(true);
    const res = await addNewProduct(payload);
    res ? setLoading(false) : console.log("err");
    history.goBack();
  };

  const cancel = async event => {
    setLoading(true);
    event.preventDefault();
    document.getElementById("AddCampaignForm").reset();
    setLoading(false);
  };

  const addFile = event => {
    console.log(event.target.files[0]);
  };

  return !loading ? (
    <React.Fragment>
      <div className="add-campaigns-heading">Add Campaigns</div>
      <Container className="add-campaigns-container" fluid>
        <div className="AddCampaign">
          <Form id="AddCampaignForm" onSubmit={e => add(e)}>
            <Form.Row className="width-50">
              <Col>
                <Form.Group controlId="ProductName">
                  <Form.Label>Campaign Name</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessHandle.S
                    // }
                    type="text"
                    placeholder="Type Name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="ProductCategory">
                  <Form.Label>Campaign Category</Form.Label>
                  <Form.Control
                    as="select"
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessAddress.M.AddressType.S
                    // }
                    required
                  >
                    <option value="testValue"> Environment</option>
                    <option value="testValue"> PM Cares</option>
                    <option value="testValue"> Social Welfare </option>
                  </Form.Control>
                </Form.Group>
              </Col>
              {/* <Col>
                <Form.Group controlId="SKUNumber">
                  <Form.Label>SKU Number</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="text"
                    placeholder="Type SKU"
                required />
                </Form.Group>
              </Col> */}
            </Form.Row>
            <Form.Row className="width-25">
              <Col className="fileUpload-box">
                <Form.Group>
                  {/* <img src={gallery} alt="gallery"></img> */}
                  <Form.Label
                    htmlFor="fileUpload"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="add-business">
                      <img
                        className="plus-icon"
                        alt="plus-icon"
                        src={plusIcon}
                      ></img>
                      Add New
                    </span>{" "}
                    {/* Add file */}
                  </Form.Label>
                  <Form.Control
                    id="fileUpload"
                    type="file"
                    accept=".pdf"
                    onChange={addFile}
                    style={{ display: "none" }}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="MinDonation">
                  <Form.Label>Minimum Donation</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessAddress.M.PostalCode.S
                    // }
                    type="number"
                    placeholder=" Type Minimum Donation"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="TargetDonationAmount">
                  <Form.Label>Target Donation</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessAddress.M.PostalCode.S
                    // }
                    type="number"
                    placeholder="Type Target Donation"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Currency">
                  <Form.Label>Currency</Form.Label>
                  <Form.Control
                    as="select"
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessAddress.M.AddressType.S
                    // }
                    required
                  >
                    <option value="testValue"> ZAR</option>
                    <option value="testValue"> USD</option>
                    <option value="testValue"> INR </option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="width-100">
              <Col>
                <Form.Group controlId="ProductDescription">
                  <Form.Label>Campaign Description</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessAddress.M.StreetName.S
                    // }
                    as="textarea"
                    placeholder="Type Campaign Description"
                    required
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <div className="buttons">
              <Button onClick={e => cancel(e)} className="cancelButton">
                Cancel
              </Button>
              <Button className="saveButton" type="submit">
                Save Inventory
              </Button>
            </div>
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
      addNewProduct
    },
    dispatch
  );

const mapStatetoProps = ({ app: { manageBusiness } }) => {
  return {
    selectedBusiness: manageBusiness.selectedBusiness
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddCampaigns);
