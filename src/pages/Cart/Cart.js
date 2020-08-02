import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  getCartItems,
  deleteProductFromCart,
  deleteAllProductFromCart,
  addProductToCart,
  addToWishlist
} from "../../store/actions";
import "./Cart.scss";
import CartItem from "../../components/CartItem/CartItem";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import deleteIcon from "../../assets/delete_outline.svg";
import formatter from "../../utils/commonUtils/currencyUtils";

const Cart = props => {
  const [loading, setLoading] = useState(true);
  const [isCartEmpty, setEmptyCart] = useState(false);
  const [userData, setUserData] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const [saving, setSaving] = useState(0);
  const [couponSaving, setCouponSaving] = useState(0);
  const { cartItems, activeCurrency } = props;
  const history = useHistory();

  useEffect(() => {
    async function fetchCartItems() {
      setUserData(JSON.parse(localStorage.getItem('userData')));
      const res = await props.getCartItems();
      res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    }
    fetchCartItems();
  }, []);

  useEffect(() => {
    cartItems && cartItems.cartDetails && cartItems.cartDetails.length ? setEmptyCart(false) : setEmptyCart(true);
  }, [cartItems]);

  const increaseProductQuantity = async payload => {
    setLoading(true);
    const res = await props.addProductToCart(payload);
    if (res) {
      const resp = await props.getCartItems();
      resp ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    } else {
      setLoading(false); (alert('something went wrong, Please try again!'))
    }
  };

  const decreaseProductQuantity = async payload => {
    setLoading(true);
    const res = await props.addProductToCart(payload);
    if (res) {
      const resp = await props.getCartItems();
      resp ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    } else {
      setLoading(false); (alert('something went wrong, Please try again!'))
    }
  };

  const deleteProductFromCart = async payload => {
    setLoading(true);
    const res = payload === "all"
      ? props.deleteAllProductFromCart()
      : await props.deleteProductFromCart(payload);
    if (res) {
      const resp = await props.getCartItems();
      resp ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    } else {
      setLoading(false); (alert('something went wrong, Please try again!'))
    }
  };

  const redirectToCheckout = () => {
    const MerchantId = cartItems.cartDetails[0].productData.MerchantId;
    let fail = 0;
    cartItems.cartDetails.forEach((item, index) => {
      if (MerchantId !== item.productData.MerchantId) {
        fail = 1;
      }
    });
    if (!fail) {
      localStorage.setItem('orderType', JSON.stringify({'order_type': 'cart'}));
      return history.push(`/checkout/shipping/${userData.UserId}/${'Shipping'}`);
    } else {
      alert("You can select Products from single Merchant. Please remove/Wishlist products.");
    }
  }

  const addProductToWish = async (payload) => {
    const res = await props.addToWishlist(payload);
  }

  return !loading ? (
    <Container className="cart-page-container" fluid>
      {isCartEmpty ? (
        <div className="cart-empty">
          <span className="heading">Your Cart Is Empty</span>
          <Nav.Link as={Link} to={"/"}>
            <span className="continue-shopping">Continue Shopping</span>
          </Nav.Link>
        </div>
      ) : (
          <div className="cart-page">
            <div className="left-section">
              <div className="cart-header">
                <span className="heading">Your Cart</span>
                {/* <span
                  onClick={() => deleteProductFromCart("all")}
                  className="remove-all"
                >
                  <img alt="delete-icon" src={deleteIcon}></img>
                Remove all items
              </span> */}
              </div>
              {cartItems.cartDetails.map(cartItem => {
                return (
                  cartItem && (
                    <CartItem
                      key={+cartItem.ProductId}
                      cartItem={cartItem}
                      decreaseProductQuantity={decreaseProductQuantity}
                      increaseProductQuantity={increaseProductQuantity}
                      deleteProductFromCart={deleteProductFromCart}
                      addToWishlist={addProductToWish}
                      activeCurrency={activeCurrency}
                    />
                  )
                );
              })}
            </div>
            <div className="right-section">
              <div className="cart-calc">
                {/* <div className="promo-code">
                <label>Promo Code</label>
                <input type="text" placeholder="Enter Code"></input>
              </div> */}
                <div className="sub-total">
                  <span>Items Subtotal</span>
                  <span> {formatter(activeCurrency)(cartItems.totalUndiscountedAmount)} </span>
                </div>
                {/* <div className="coupon">
                <span>Coupon</span>
                <span> { formatter(activeCurrency)(couponSaving) } </span>
              </div> */}
                <div className="saving">
                  <span>Your saving</span>
                  <span> {formatter(activeCurrency)(cartItems.totalUndiscountedAmount - cartItems.totalDiscountedAmount)} </span>
                </div>
                <div className="line"></div>
                <div className="total">
                  <span>Total</span>
                  <span> {formatter(activeCurrency)(cartItems.totalDiscountedAmount)} </span>
                </div>
                <button onClick={redirectToCheckout} className="checkout">
                  Proceed to checkout
                </button>
              </div>
              <Nav.Link as={Link} className="continue-shopping" to={"/"}>Continue shopping</Nav.Link>
            </div>
          </div>
        )}
    </Container>
  ) : (
      <CustomLoader />
    );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCartItems,
      addProductToCart,
      deleteProductFromCart,
      deleteAllProductFromCart,
      addToWishlist
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

export default connect(mapStatetoProps, mapDispatchToProps)(Cart);
