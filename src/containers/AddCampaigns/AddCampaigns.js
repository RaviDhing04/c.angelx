import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, Col, InputGroup } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { addNewProduct, updateProduct, getSelectedProductDetails, clearSelectedRow } from "../../store/actions";
import "./AddCampaigns.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import plusIcon from "../../assets/plus.svg";
import { addCampaignFormFields } from "../../constants/constants";
import { useHistory } from "react-router-dom";

const AddCampaigns = props => {
  const [loading, setLoading] = useState(false);
  const { addNewProduct, selectedBusiness, selectedRow } = props;
  const [productDetails, setProductDetails] = useState(null);
  const action = props.match.params.action;
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      if (selectedRow) {
        const payload = {
          ProductId: selectedRow.ProductId.S,
          Timestamp: selectedRow.Timestamp.S
        };
        const res = await props.getSelectedProductDetails(payload);
        if (res) {
          setProductDetails(res);
          console.log(res);
          setLoading(false);
        }
      } else {
        history.goBack();
      }
    }
    if (action === "edit") {
      fetchData();
    }
    return () => { 
      props.clearSelectedRow();
    }
  }, []);

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
    if (action === 'edit') { 
      payload['Timestamp'] = selectedRow.Timestamp.S;
      payload['ProductId'] = productDetails.ProductId.S;
      payload['IsActive'] = productDetails.IsActive.S;
      payload['ThumbnailImageURL'] = productDetails.ThumbnailImageURL.S;
      payload['FullImageURL1'] = productDetails.ProductImages.L.S;
      payload['FullImageURL2'] = productDetails.ProductImages.L.S;
      payload['FullImageURL3'] = productDetails.ProductImages.L.S;
     }
    setLoading(true);
    const res = action === 'add' ? await addNewProduct(payload) : await updateProduct(payload);
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
                    defaultValue={
                      productDetails &&
                      productDetails.Name.S
                    }
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
                    defaultValue={
                      productDetails &&
                      productDetails.ProductCategory.S
                    }
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
                    accept=".jgp, .png"
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
                    defaultValue={
                      productDetails &&
                      productDetails.DonationCampaignDetails.M.MinDonation.S
                    }
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
                    defaultValue={
                      productDetails &&
                      productDetails.DonationCampaignDetails.M.Target.S
                    }
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
                    defaultValue={
                      productDetails &&
                      productDetails.DonationCampaignDetails.M.Currency.S
                    }
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
                    defaultValue={
                      productDetails &&
                      productDetails.Description.S
                    }
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
      addNewProduct,
      updateProduct,
      getSelectedProductDetails,
      clearSelectedRow
    },
    dispatch
  );

const mapStatetoProps = ({ app: { manageBusiness } }) => {
  return {
    selectedBusiness: manageBusiness.selectedBusiness,
    selectedRow: manageBusiness.selectedRow
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddCampaigns);
