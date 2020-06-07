import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, Col } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { addNewProduct } from "../../store/actions";
import "./AddInventory.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const AddInventory = props => {
  const [loading, setLoading] = useState(false);
  const [colors, addColors] = useState([]);
  const { addNewProduct } = props;

  const add = async event => {
    event.preventDefault();
    setLoading(true);
    const res = await addNewProduct({
      // UserId: userId,
      // ContactUserId: searchedContact && searchedContact.UserId.S,
      // Name: searchedContact && searchedContact.Name.S,
      // Email: searchedContact && searchedContact.Email.S,
      // ContactNumber: searchedContact && searchedContact.ContactNumber.S
    });
  };

  // const add = async event => {
  //   let payload = {};
  //   const formElements = event.target.elements;
  //   registerFormFields.forEach(field => {
  //     payload[field] = formElements[field].value;
  //   });
  //   payload["PatronId"] = "69116697064443";
  //   const tags = formElements.Tags.value;
  //   tags.split(",").forEach((tag, index) => {
  //     payload["tag" + index + 1] = tag;
  //   });
  //   setLoading(true);
  //   const res = await props.addNewProduct(payload);
  //   res ? setLoading(false) : console.log("err");
  //   if (!buttonClicked) {
  //     history.goBack();
  //   } else {
  //     document.getElementById("AddProductForm").reset();
  //     setbuttonClicked(false);
  //   }
  // };

  const cancel = async event => {
    // setLoading(true);
    // event.preventDefault();
    // const res = await resetSearchedContact();
    // res ? setLoading(false) : console.log("err");
    // document.getElementById("SearchContactForm").reset();
  };

  const addFile = event => {
    console.log(event.target.files[0]);
  };

  const setColor = event => {
    debugger;
    addColors();
  };

  return !loading ? (
    <React.Fragment>
      <div className="add-inventory-heading">Add Inventory</div>
      <Container className="add-inventory-container" fluid>
        <div className="AddProduct">
          <Form id="AddProductForm" onSubmit={e => add(e)}>
            <Form.Row className="width-33">
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
            <Form.Row className="width-33">
              <Col>
                <Form.Group>
                  <Form.Label
                    htmlFor="fileUpload"
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Add file
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
            <Form.Row className="width-33">
              <Col>
                <Form.Group controlId="Color">
                  <Form.Label>Product Color</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessHandle.S
                    // }
                    type="color"
                    onChange={setColor}
                    required
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              {colors.map((color, index) => {
                return (
                  <Col key={index}>
                    <Form.Group controlId="Color">
                      <Form.Label>Added Colors</Form.Label>
                      <Form.Control
                        // defaultValue={
                        //   selectedBusinessDetails &&
                        //   selectedBusinessDetails.BusinessHandle.S
                        // }
                        type="color"
                        value = {color}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                );
              })}
            </Form.Row>
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
            <Form.Row className="width-75">
              <Col>
                <Form.Group controlId="ProductDescription">
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessAddress.M.StreetName.S
                    // }
                    type="text"
                    placeholder="Type ProductDescription"
                    required
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <div className="buttons">
              <Button onClick={e => cancel(e)} className="cancelButton">
                Cancel
              </Button>
              {/* <Button
                onClick={() => setbuttonClicked(true)}
                type="submit"
                className="saveAnotherButton"
              >
                Save & Add Another Business
              </Button> */}
              <Button className="saveButton" type="submit">
                Save Business
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

const mapStatetoProps = ({ app: { contactPage } }) => {
  console.log(contactPage);
  return {
    contacts: contactPage.contacts,
    searchedContact: contactPage.searchedContact
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddInventory);
