import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  getCartItems,
  increaseProductQuantity,
  decreaseProductQuantity,
  deleteProductFromCart,
  deleteAllProductFromCart
} from "../../store/actions";
import "./Cart.scss";
import CartItem from "../../components/CartItem/CartItem";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import deleteIcon from "../../assets/delete_outline.svg";
import formatter from "../../utils/commonUtils/currencyUtils";

const Cart = props => {
  const [loading, setLoading] = useState(true);
  const [isCartEmpty, setEmptyCart] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [saving, setSaving] = useState(0);
  const [couponSaving, setCouponSaving] = useState(0);
  const { cartItems, activeCurrency } = props;

  useEffect(() => {
    async function fetchCartItems() {
      const userId = props.match.params.userId;
      const res = await props.getCartItems({ UserId: userId });
      res ? setLoading(false) : (function() {setLoading(false); (alert('something went wrong, Please try again!'))} ());
    }
    fetchCartItems();
  }, []);

  useEffect(() => {
    const calculate = () => {
      const out = [0,0];
      cartItems.forEach(item => {
        out[0] += (+item.ProductSpecifications.M.UnitPrice.S * +item.Quantity.S);
        out[1] += (+item.ProductSpecifications.M.UnitPrice.S * +item.Quantity.S);
      });
      return out;
    };
    cartItems && cartItems.length ? setEmptyCart(false) : setEmptyCart(true);
    const calculated = calculate();
    setSubTotal(calculated[0]);
    setSaving(calculated[1]);
  }, [cartItems]);

  const increaseProductQuantity = productId => {
    props.increaseProductQuantity(productId);
  };

  const decreaseProductQuantity = productId => {
    props.decreaseProductQuantity(productId);
  };

  const deleteProductFromCart = productId => {
    productId === "all"
      ? props.deleteAllProductFromCart()
      : props.deleteProductFromCart(productId);
  };

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
              <span
                onClick={() => deleteProductFromCart("all")}
                className="remove-all"
              >
                <img alt="delete-icon" src={deleteIcon}></img>
                Remove all items
              </span>
            </div>
            {cartItems.map(cartItem => {
              return (
                cartItem && (
                  <CartItem
                    key={+cartItem.ProductId.S}
                    cartItem={cartItem}
                    decreaseProductQuantity={decreaseProductQuantity}
                    increaseProductQuantity={increaseProductQuantity}
                    deleteProductFromCart={deleteProductFromCart}
                    activeCurrency={activeCurrency}
                  />
                )
              );
            })}
          </div>
          <div className="right-section">
            <div className="cart-calc">
              <div className="promo-code">
                <label>Promo Code</label>
                <input type="text" placeholder="Enter Code"></input>
              </div>
              <div className="sub-total">
                <span>Items Subtotal</span>
                <span> {formatter(activeCurrency)(subTotal)} </span>
              </div>
              <div className="coupon">
                <span>Coupon</span>
                <span> { formatter(activeCurrency)(couponSaving) } </span>
              </div>
              <div className="saving">
                <span>Your saving</span>
                <span> {formatter(activeCurrency)(saving)} </span>
              </div>
              <div className="line"></div>
              <div className="total">
                <span>Total</span>
                <span> {formatter(activeCurrency)(subTotal - saving - couponSaving)} </span>
              </div>
              <button className="checkout">Proceed to checkout</button>
            </div>
            <div className="continue-shopping">Continue shopping</div>
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
      increaseProductQuantity,
      decreaseProductQuantity,
      deleteProductFromCart,
      deleteAllProductFromCart
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
