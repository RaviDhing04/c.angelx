import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, Col, InputGroup } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { addNewProduct } from "../../store/actions";
import "./AddInventory.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import plusIcon from "../../assets/plus.svg";
import { addProductFormFields } from "../../constants/constants";
import { useHistory } from "react-router-dom";

const AddInventory = props => {
  const [loading, setLoading] = useState(false);
  const [colors, addColors] = useState([]);
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
      ProductSpecifications: {},
      IsDonationCampaign: "false",
      DonationCampaignDetails: {
        MinDonation: "",
        Currency: "",
        TargetDonationAmount: ""
      }
    };
    const formElements = event.target.elements;
    addProductFormFields.forEach(field => {
      switch (field) {
        case "UnitPrice":
          payload.ProductSpecifications[field] = formElements[field].value;
          break;
        case "AvailableQuantity":
          payload.ProductSpecifications[field] = formElements[field].value;
          break;
        case "Currency":
          payload.ProductSpecifications[field] = formElements[field].value;
          break;
        default:
          payload[field] = formElements[field].value;
          break;
      }
    });

    payload["MerchantId"] = selectedBusiness.MerchantId.S;
    payload["MerchantHandle"] = selectedBusiness.BusinessHandle.S;
    payload.ProductSpecifications["AvailableColors"] = colors;
    setLoading(true);
    const res = await addNewProduct(payload);
    res ? setLoading(false) : console.log("err");
    history.goBack();
  };

  const cancel = async event => {
    setLoading(true);
    event.preventDefault();
    document.getElementById("AddProductForm").reset();
    setLoading(false);
  };

  const addFile = event => {
    console.log(event.target.files[0]);
  };

  const setColor = event => {
    const color = event.currentTarget.parentElement.previousSibling.value;
    console.log(color);
    addColors([...colors, color]);
  };

  return !loading ? (
    <React.Fragment>
      <div className="add-inventory-heading">Add Inventory</div>
      <Container className="add-inventory-container" fluid>
        <div className="AddProduct">
          <Form id="AddProductForm" onSubmit={e => add(e)}>
            <Form.Row className="width-50">
              <Col>
                <Form.Group controlId="ProductName">
                  <Form.Label>Product Name</Form.Label>
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
                  <Form.Label>Product Category</Form.Label>
                  <Form.Control
                    as="select"
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessAddress.M.AddressType.S
                    // }
                    required
                  >
                    <option value="testValue"> Product Category</option>
                    <option value="testValue"> Electronics</option>
                    <option value="testValue"> Mobiles </option>
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
            <Form.Row className="">
              <Col>
                <Form.Group controlId="Color">
                  <Form.Label>
                    Available Colors{" "}
                    <span className="hint">
                      {" "}
                      Click on color box below to select colors from color
                      picker{" "}
                    </span>
                  </Form.Label>
                  <InputGroup className="width-25">
                    <Form.Control
                      // defaultValue={
                      //   selectedBusinessDetails &&
                      //   selectedBusinessDetails.BusinessHandle.S
                      // }
                      type="color"
                      defaultValue="#ff0000"
                      required
                    />
                    <InputGroup.Append>
                      <Button onClick={setColor} className="addColorButton">
                        Add Color
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Form.Row>
            {colors && colors.length ? (
              <Form.Row className="">
                <Form.Label className="width-100">Added Colors</Form.Label>
                {colors &&
                  colors.length &&
                  colors.map((color, index) => {
                    return (
                      <Col key={index}>
                        <Form.Group controlId="Color">
                          <Form.Control
                            // defaultValue={
                            //   selectedBusinessDetails &&
                            //   selectedBusinessDetails.BusinessHandle.S
                            // }
                            type="color"
                            value={color}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    );
                  })}
              </Form.Row>
            ) : null}
            <Form.Row>
              <Col>
                <Form.Group controlId="UnitPrice">
                  <Form.Label>Unit Price</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessAddress.M.PostalCode.S
                    // }
                    type="number"
                    placeholder=" Type Unit Price"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="AvailableQuantity">
                  <Form.Label>Available Quantity</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessAddress.M.PostalCode.S
                    // }
                    type="number"
                    placeholder=" Available Quantity"
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
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessAddress.M.StreetName.S
                    // }
                    as="textarea"
                    placeholder="Type Product Description"
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

export default connect(mapStatetoProps, mapDispatchToProps)(AddInventory);
