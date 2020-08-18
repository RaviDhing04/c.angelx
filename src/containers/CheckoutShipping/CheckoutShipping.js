import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, Col } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import {
  getAllShippingAddress,
  addNewShippingAddress,
  updateShippingAddress
} from "../../store/actions";
import "./CheckoutShipping.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { shippingAddressFormFields } from "../../constants/constants";
import edit from "../../assets/edit.svg";

const CheckoutShipping = props => {
  const [loading, setLoading] = useState(true);
  const [pageName, setName] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { userId, name } = props.match.params;
  const { getAllShippingAddress, addNewShippingAddress, updateShippingAddress } = props;
  const history = useHistory();

  useEffect(() => {
    async function fetchSavedShippingAddresses() {
      name ? setName(name) : setName("");
      const res = await getAllShippingAddress();
      res ? (function () { setAddresses(res); setLoading(false); }()) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    }
    fetchSavedShippingAddresses();
  }, []);

  const next = async () => {
    setLoading(false);
    setSelectedAddress(null);
    const res = await getAllShippingAddress();
    res ? (function () { setAddresses(res); setLoading(false); }()) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());

}

  const addNew = async event => {
    event.preventDefault();
    setLoading(true);
    let payload = {};
    const formElements = event.target.elements;
    shippingAddressFormFields.forEach(field => {
      payload[field] = formElements[field].value;
    });
    setLoading(true);
    const res = editMode ? await updateShippingAddress(payload, selectedAddress.AddressId.S) : await addNewShippingAddress(payload);
    res ? next() : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
  };

  const cancel = async event => {
    event.preventDefault();
    if (editMode) { setEditMode(false); }
    setSelectedAddress(null);
    document.getElementById("shippingAddressFormFields").reset();
  };

  const selectAddress = (address) => {
    localStorage.setItem('shippingAddress', JSON.stringify(address));
    history.push(`/checkout/billing/${userId}/Billing Address`);
  }

  const editAddress = (address) => {
    setEditMode(true);
    setSelectedAddress(address);
  }

  const selectShipper = (e) => {
    const shipper = e.target.value;
    if (shipper === 'Self') {
      alert("You will recieve a confirmation mail along with merchant address for pick up");
      history.push(`/checkout/billing/${userId}/Billing Address`);
    } else {
      localStorage.setItem('shipper', shipper);
    }
  }

  return !loading ? (
    <React.Fragment>
      <div className="checkout-billing-heading">{pageName}</div>
      <Container className="checkout-billing-container" fluid>

        <div className="shipper">
          <Form
            id="selectShipperForm"
          >
            <Form.Row className="width-25">
              <Col>
                <Form.Group controlId="selectShipper">
                  <Form.Label>Select Shipping Option</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="DHL"
                    required
                    onChange={(e) => selectShipper(e)}
                  >
                    <option value="testValue"> Select Shipping Option</option>
                    <option value="DHL"> DHL</option>
                    <option value="Self"> Self PickUp</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
          </Form>
        </div>
        <div className="checkout-billing">
          <Form
            id="shippingAddressFormFields"
            onSubmit={e => addNew(e)}
          >
            <Form.Row className="width-25">
              <Col>
                <Form.Group controlId="AddressType">
                  <Form.Label>Address Type</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={
                      selectedAddress && selectedAddress.AddressType &&
                      selectedAddress.AddressType.S
                    }
                    required
                  >
                    <option value="none"> Address Type</option>
                    <option value="Shipping"> Shipping Address</option>
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
                      selectedAddress && selectedAddress.Country && selectedAddress.Country.S
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
                <Form.Group controlId="ZipCode">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedAddress && selectedAddress.ZipCode &&
                      selectedAddress.ZipCode.S
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
                      selectedAddress && selectedAddress.Province &&
                      selectedAddress.Province.S
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
                      selectedAddress && selectedAddress.City &&
                      selectedAddress.City.S
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
                      selectedAddress && selectedAddress.StreetName &&
                      selectedAddress.StreetName.S
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
                      selectedAddress && selectedAddress.StreetNumber &&
                      selectedAddress.StreetNumber.S
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
                      selectedAddress && selectedAddress.Suburb &&
                      selectedAddress.Suburb.S
                    }
                    type="text"
                    placeholder="Type Suburb"
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
                Continue
            </Button>
            </div>
          </Form>
        </div>
        {addresses && addresses.length ? (
          <React.Fragment>
            <div className="saved-address-heading">Saved Address</div>
            <div className="saved-address">
              {addresses.map((address, index) => {
                return (<div key={address.AddressId.S} className="saved-address-div">
                  <img onClick={() => editAddress(address)} className="edit-icon" alt="edit" src={edit}></img>
                  <span className="address-count">Address {index + 1}</span>
                  <div className="display-address">
                    <div>{address.StreetName && address.StreetName.S}</div>
                    <div>{address.StreetNumber && address.StreetNumber.S}  {address.Suburb && address.Suburb.S}  {address.City && address.City.S}</div>
                    <div>{address.Province && address.Province.S}   {address.Country && address.Country.S}</div>
                    <div>{address.Zipcode && address.Zipcode.S}</div>
                  </div>
                  <Button onClick={() => selectAddress(address)} className="useThis" type="submit">
                    Use This
            </Button>
                </div>)
              })}
            </div>
          </React.Fragment>
        ) : null}
      </Container>
    </React.Fragment>
  ) : (
      <CustomLoader />
    );
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllShippingAddress,
      addNewShippingAddress,
      updateShippingAddress
    },
    dispatch
  );

const mapStatetoProps = ({ app: { contactPage } }) => {
  console.log(contactPage);
  return {};
};

export default connect(mapStatetoProps, mapDispatchToProps)(CheckoutShipping);
