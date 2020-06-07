import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, Col, InputGroup } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { addNewCoupon } from "../../store/actions";
import "./AddCoupons.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { addCouponFormFields } from "../../constants/constants";
import { useHistory } from "react-router-dom";

const AddCoupons = props => {
  const [loading, setLoading] = useState(false);
  const { addNewCoupon, selectedBusiness } = props;
  const history = useHistory();
  // const add = async event => {
  //   event.preventDefault();
  //   setLoading(true);
  //   const res = await addNewCoupon({
  //     // UserId: userId,
  //     // ContactUserId: searchedContact && searchedContact.UserId.S,
  //     // Name: searchedContact && searchedContact.Name.S,
  //     // Email: searchedContact && searchedContact.Email.S,
  //     // ContactNumber: searchedContact && searchedContact.ContactNumber.S
  //   });
  // };

  const add = async event => {
    let payload = {};
    const formElements = event.target.elements;
    addCouponFormFields.forEach(field => {
      payload[field] = formElements[field].value;
    });

    payload["MerchantId"] = selectedBusiness.MerchantId.S;
    setLoading(true);
    const res = await addNewCoupon(payload);
    res ? setLoading(false) : console.log("err");
    history.goBack();
  };

  const cancel = async event => {
    setLoading(true);
    event.preventDefault();
    document.getElementById("addCouponForm").reset();
    setLoading(false);
  };

  return !loading ? (
    <React.Fragment>
      <div className="add-coupon-heading">Add Coupon</div>
      <Container className="add-coupon-container" fluid>
        <div className="AddCoupon">
          <Form id="addCouponForm" onSubmit={e => add(e)}>
            <Form.Row className="width-33">
              <Col>
                <Form.Group controlId="CouponCode">
                  <Form.Label>Coupon Code</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessHandle.S
                    // }
                    type="text"
                    placeholder="Type Coupon Code"
                    required
                  />
                </Form.Group>
              </Col>

            </Form.Row>
            <Form.Row className="width-66">
              <Col>
                <Form.Group controlId="CouponActiveFrom">
                  <Form.Label>Coupon Active From</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessHandle.S
                    // }
                    type="datetime-local"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="CouponExpiryDate">
                  <Form.Label>Coupon Active Till</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessHandle.S
                    // }
                    type="datetime-local"
                    required
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="Discount(%)">
                  <Form.Label>Discount(%)</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessAddress.M.PostalCode.S
                    // }
                    type="number"
                    placeholder=" Type Discount(%)"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="MaxDiscountAmount">
                  <Form.Label>Max. Discount Amount</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessAddress.M.PostalCode.S
                    // }
                    type="number"
                    placeholder=" Max. Discount Amount"
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
                <Form.Group controlId="CouponDescription">
                  <Form.Label>Coupon Description</Form.Label>
                  <Form.Control
                    // defaultValue={
                    //   selectedBusinessDetails &&
                    //   selectedBusinessDetails.BusinessAddress.M.StreetName.S
                    // }
                    as="textarea"
                    placeholder="Type Coupon Description"
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
      addNewCoupon
    },
    dispatch
  );

const mapStatetoProps = ({ app: { manageBusiness } }) => {
  return {
    selectedBusiness: manageBusiness.selectedBusiness
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddCoupons);
