import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Form, Button, Col, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    checkout,
    getCartItems,
    cartCount,
    getShippingChagres
} from "../../store/actions";
import "./CheckoutConfirm.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import formatter from "../../utils/commonUtils/currencyUtils";
import CartItem from "../../components/CartItem/CartItem";

const CheckoutConfirm = (props) => {

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [postCheckout, setPostCheckout] = useState(false);
    const [paymentType, setPaymentType] = useState('');
    const [orderType, setOrderType] = useState(null);
    const [order, setOrder] = useState(null);
    const [shippingCharge, setShippingCharge] = useState(0);
    const history = useHistory();


    useEffect(() => {
        const shipping = JSON.parse(localStorage.getItem('shippingAddress'));
        const billing = JSON.parse(localStorage.getItem('billingAddress'));
        const o = JSON.parse(localStorage.getItem('orderType'));
        if (billing) {
            setAddresses([billing, shipping]);
            if (o) {
                if (o.order_type === 'cart') {
                    fetchCartItems();
                    setOrderType(o.order_type);
                } else {
                    setOrderType(o.order_type);
                    setOrder(o);
                    fetchShippingCharge([o.product_id]);
                }
            } else {
                alert('Order not slected, please go to cart');
                history.push('/home/productsListing');
            }
        } else {
            alert('Please select shipping and billing addresss');
            history.goBack();
        }
        async function fetchCartItems() {
            const res = await props.getCartItems();
            if (res) {
                // const products = props.cartItems && props.cartItems.cartDetails && props.cartItems.cartDetails.length && props.cartItems.cartDetails.map(cartItem => {
                //     return cartItem.productId;
                // })
                // fetchShippingCharge(products);
            } else {
                setLoading(false);
                (alert('something went wrong, Please try again!'));
            }
        }
        return () => {
            // localStorage.setItem('shippingAddress', null);
            // localStorage.setItem('billingAddress', null);
            // localStorage.setItem('orderType', null);
        };
    }, []);

    const fetchShippingCharge = async (products) => {
        if (addresses[1] && addresses[1].AddressId.S) {
            setShippingCharge(await props.getShippingChagres({
                "shippingAddress": addresses[1] ? addresses[1].AddressId.S : null,
                "products": products
            }))
            setLoading(false);
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (props.cartItems && props.cartItems.cartDetails && props.cartItems.cartDetails.length) {
            const products = props.cartItems && props.cartItems.cartDetails && props.cartItems.cartDetails.length && props.cartItems.cartDetails.map(cartItem => {
                return cartItem.productId;
            })
            fetchShippingCharge(products);
        }
    }, [props.cartItems]);


    const selectPaymentType = (e) => {
        const type = e.target.value;
        setPaymentType(type);
    }

    const checkoutNow = async () => {
        if (paymentType) {
            const payload = orderType === 'cart' ? {
                "order_type": orderType,
                "billing_address_id": addresses[0] ? addresses[0].AddressId.S : null,
                "shipping_address_id": addresses[1] ? addresses[1].AddressId.S : null,
                "payment_type": paymentType,
                "cart_details": props.cartItems
            } : {
                    ...order,
                    "billing_address_id": addresses[0] ? addresses[0].AddressId.S : null,
                    "shipping_address_id": addresses[1] ? addresses[1].AddressId.S : null,
                    "payment_type": paymentType,
                }
            setLoading(true);
            const res = await props.checkout(payload);
            res ? next() : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
        } else {
            alert('Please select a payment type');
        }
    }

    const next = () => {
        setLoading(false);
        props.cartCount();
        setPostCheckout(true);
    }

    return (
        <React.Fragment>
            <React.Fragment>
                {loading ? <CustomLoader /> :
                    !postCheckout ? (
                        <div className="Confirm-container">
                            <div className="checkout-billing-heading">Confirm Checkout</div>
                            {addresses && addresses.length ? (
                                <React.Fragment>
                                    <div className="selected-billing-heading">Selected Address</div>
                                    <div className="saved-address">
                                        {addresses.map((address, index) => {
                                            return (address ? <div key={address.AddressId.S} className="saved-address-div">
                                                <span className="address-count">{index === 1 ? 'Shipping Address' : 'Billing Address'}</span>
                                                <div className="display-address">
                                                    <div>{address.StreetName && address.StreetName.S}</div>
                                                    <div>{address.StreetNumber && address.StreetNumber.S}  {address.Suburb && address.Suburb.S}  {address.City && address.City.S}</div>
                                                    <div>{address.Province && address.Province.S}   {address.Country && address.Country.S}</div>
                                                    <div>{address.Zipcode && address.Zipcode.S}</div>
                                                </div>
                                            </div> : null)
                                        })}
                                    </div>
                                </React.Fragment>
                            ) : null}

                            <div>
                                <p className="text">Your total payment amount is - {orderType === 'cart' ? (<span> {props.cartItems.totalDiscountedAmount ? formatter(props.activeCurrency)(props.cartItems.totalDiscountedAmount) : formatter(props.activeCurrency)(0)} </span>) :
                                    (<span> {order && (order.total_amount || +order.unitPrice) ? (order && order.order_type === 'laybuy' ? formatter(props.activeCurrency)(((+order.total_amount) / (+order.laybuy_months))) : formatter(props.activeCurrency)(order && (order.total_amount || +order.unitPrice))) : formatter(props.activeCurrency)(0)} </span>)}
                                </p>
                                {order && order.order_type === 'laybuy' ? <p className="text">LayBy months - <span> {order && order.laybuy_months}</span></p> : null}
                                <p className="text">Your total shipping amount is - <span> {formatter(props.activeCurrency)(shippingCharge)} </span>

                                    <div className="shipper">
                                        <Form
                                            id="selectPaymentTypeForm"
                                        >
                                            <Form.Row className="width-25">
                                                <Col>
                                                    <Form.Group controlId="selectPaymentType">
                                                        <Form.Label>Select payment option</Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            defaultValue="none"
                                                            required
                                                            onChange={(e) => selectPaymentType(e)}
                                                        >
                                                            <option value="none"> Select payment option</option>
                                                            <option value="paypal"> PayPal</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                        </Form>
                                    </div>

                                    <div className="buttons">
                                        <Button className="saveButton" onClick={checkoutNow}>
                                            Pay now
                    </Button>
                                    </div>
                                </p>
                            </div>
                        </div>
                    ) : (
                            <div className="Status-container">
                                <h4>
                                    Your Order has been placed! Pull up chair, sit back and relax
                                    as your order is on its way to you.
 </h4>



                                <Nav.Link as={Link} className="continue-shopping" to={"/"}>Continue shopping</Nav.Link>
                            </div>
                        )
                } </React.Fragment>
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            checkout,
            getCartItems,
            cartCount,
            getShippingChagres
        },
        dispatch
    );

const mapStatetoProps = ({ app: { cartDetailsPage, common } }) => {
    console.log(cartDetailsPage);
    return {
        cartItems: cartDetailsPage.cartItems,
        activeCurrency: common.activeCurrency
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(CheckoutConfirm);