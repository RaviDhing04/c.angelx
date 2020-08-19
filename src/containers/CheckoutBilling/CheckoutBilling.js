import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, Col } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import {
    getAllBillingAddress,
    addNewBillingAddress,
    updateBillingAddress
} from "../../store/actions";
import "./CheckoutBilling.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { billingAddressFormFields } from "../../constants/constants";
import edit from "../../assets/edit.svg";

const CheckoutBilling = props => {
    const [loading, setLoading] = useState(true);
    const [pageName, setName] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { userId, name } = props.match.params;
    const { getAllBillingAddress, addNewBillingAddress, updateBillingAddress } = props;
    const history = useHistory();

    useEffect(() => {
        async function fetchSavedBillingAddresses() {
            name ? setName(name) : setName("");
            const res = await getAllBillingAddress();
            res ? (function () { setAddresses(res); setLoading(false); }()) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
        }
        fetchSavedBillingAddresses();
    }, []);

    const next = async () => {
        setLoading(false);
        setSelectedAddress(null);
        const res = await getAllBillingAddress();
        res ? (function () { setAddresses(res); setLoading(false); }()) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());

    }

    const addNew = async event => {
        event.preventDefault();
        setLoading(true);
        let payload = {};
        const formElements = event.target.elements;
        billingAddressFormFields.forEach(field => {
            payload[field] = formElements[field].value;
        });
        setLoading(true);
        const res = editMode ? await updateBillingAddress(payload, selectedAddress.AddressId.S) : await addNewBillingAddress(payload);
        res ? next() : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    };

    const cancel = async event => {
        event.preventDefault();
        if (editMode) { setEditMode(false); }
        setSelectedAddress(null);
        document.getElementById("billingAddressFormFields").reset();
    };

    const selectAddress = (address) => {
        localStorage.setItem('billingAddress', JSON.stringify(address));
        history.push(`/checkout/confirm/${userId}/Checkout`); 
    }

    const editAddress = (address) => {
        setEditMode(true);
        setSelectedAddress(address);
    }

    return !loading ? (
        <React.Fragment>
            <div className="checkout-billing-heading">{pageName}</div>
            <Container className="checkout-billing-container" fluid>
                <div className="checkout-billing">
                    <Form
                        id="billingAddressFormFields"
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
                                        <option value="Billing"> Billing Address</option>
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
                                    <Form.Label>Province/State</Form.Label>
                                    <Form.Control
                                        defaultValue={
                                            selectedAddress && selectedAddress.Province &&
                                            selectedAddress.Province.S
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
            getAllBillingAddress,
            addNewBillingAddress,
            updateBillingAddress
        },
        dispatch
    );

const mapStatetoProps = ({ app: { contactPage } }) => {
    console.log(contactPage);
    return {};
};

export default connect(mapStatetoProps, mapDispatchToProps)(CheckoutBilling);
