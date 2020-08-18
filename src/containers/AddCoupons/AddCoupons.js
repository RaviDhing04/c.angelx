import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, Col, InputGroup } from "react-bootstrap";
import { bindActionCreators } from "redux";
import {
  addNewCoupon,
  updateCoupon,
  clearSelectedRow
} from "../../store/actions";
import "./AddCoupons.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { addCouponFormFields } from "../../constants/constants";
import { useHistory } from "react-router-dom";

const AddCoupons = props => {
  const [loading, setLoading] = useState(false);
  const { addNewCoupon, selectedBusiness, selectedRow, updateCoupon } = props;
  const [couponDetails, setCouponDetails] = useState(null);
  const action = props.match.params.action;
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      if (selectedRow) {
        setCouponDetails(selectedRow);
        console.log(selectedRow);
        setLoading(false);
      } else {
        history.goBack();
      }
    }
    if (action === "edit") {
      fetchData();
    }

    return () => {
      props.clearSelectedRow();
    };
  }, []);

  const add = async event => {
    let payload = {};
    const formElements = event.target.elements;
    addCouponFormFields.forEach(field => {
      if(["CouponActiveFrom", "CouponExpiryDate"].includes(field)) {
        payload[field] = new Date(formElements[field].value).toGMTString();
      } else {
        payload[field] = formElements[field].value;
      }
    });

    payload["MerchantId"] = selectedBusiness.MerchantId.S;
    if (action === "edit") {
      payload["Timestamp"] = couponDetails.Timestamp.S;
      payload["CouponId"] = couponDetails.CouponId.S;
      payload["IsActive"] = couponDetails.IsActive.S;
    }
    setLoading(true);
    const res =
      action === "add"
        ? await addNewCoupon(payload)
        : await updateCoupon(payload);
    res ? setLoading(false) : (function() {setLoading(false); (alert('something went wrong, Please try again!'))} ());
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
                    defaultValue={couponDetails && couponDetails.CouponCode.S}
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
                    defaultValue={
                      couponDetails &&
                      new Date(couponDetails.CouponActiveFrom.S)
                        .toISOString()
                        .slice(0, 19)
                    }
                    type="datetime-local"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="CouponExpiryDate">
                  <Form.Label>Coupon Active Till</Form.Label>
                  <Form.Control
                    defaultValue={
                      couponDetails &&
                      new Date(couponDetails.CouponExpiryDate.S)
                        .toISOString()
                        .slice(0, 19)
                    }
                    type="datetime-local"
                    required
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="Discount">
                  <Form.Label>Discount(%)</Form.Label>
                  <Form.Control
                    defaultValue={couponDetails && couponDetails.Discount.S}
                    type="number" min="1"
                    placeholder=" Type Discount(%)"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="MaxDiscountAmount">
                  <Form.Label>Max. Discount Amount</Form.Label>
                  <Form.Control
                    defaultValue={
                      couponDetails && couponDetails.MaxDiscountAmount.S
                    }
                    type="number" min="1"
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
                    defaultValue={couponDetails && couponDetails.Currency.S}
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
                    defaultValue={
                      couponDetails && couponDetails.CouponDescription.S
                    }
                    as="textarea"
                    placeholder="Type Coupon Description"
                    required
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <div className="buttons">
              <Button onClick={e => cancel(e)} className="cancelButton">
                Reset
              </Button>
              <Button className="saveButton" type="submit">
                Save Coupon
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
      addNewCoupon,
      updateCoupon,
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

export default connect(mapStatetoProps, mapDispatchToProps)(AddCoupons);
