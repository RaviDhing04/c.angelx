import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { getCartItems } from "../../store/actions";
import "./Cart.scss";
import CartItem from "../../components/CartItem/CartItem";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import deleteIcon from "../../assets/delete_outline.svg";

const Cart = props => {
  const [loading, setLoading] = useState(true);
  const [cartProducts, setcartProducts] = useState([]);
  // let cartProducts = [];
  const { cartItems, productDetails } = props;

  useEffect(() => {
    async function fetchCartItems() {
      const userId = props.match.params.userId;
      const res = await props.getCartItems({ UserId: userId });
      res ? setLoading(false) : console.log("err");
      // makeCartProduct();  // 1 - does not gets update props
    }
    fetchCartItems();
  }, []);

  useEffect(() => {
    const makeCartProduct = () => {
      let out = [];
      cartItems &&
        cartItems.forEach(cartItem => {
          productDetails &&
            productDetails.forEach(product => {
              if (cartItem.ProductId.S === product.ProductId.S) {
                out.push({
                  UserId: cartItem.UserId,
                  Quantity: cartItem.Quantity,
                  ...product
                });
              }
            });
        });
      return out;
    };
    setcartProducts(makeCartProduct());
  }, [cartItems, productDetails]);

  return !loading ? (
    <Container className="cart-page-container" fluid>
      <div className="cart-page">
        <div className="left-section">
          <div className="cart-header">
            <span className="heading">Your Cart</span>
            <span className="remove-all">
              <img alt="delete-icon" src={deleteIcon}></img>
              Remove all items
            </span>
          </div>
          {cartProducts.map(cartItem => {
            return <CartItem key={+cartItem.ProductId.S} cartItem={cartItem} />;
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
              <span> 24000</span>
            </div>
            <div className="coupon">
              <span>Coupon</span>
              <span> 0 </span>
            </div>
            <div className="saving">
              <span>Your saving</span>
              <span> 1500</span>
            </div>
            <div className="line"></div>
            <div className="total">
              <span>Total</span>
              <span> 22500</span>
            </div>
            <button className="checkout">Proceed to checkout</button>
          </div>
          <div className="continue-shopping">Continue shopping</div>
        </div>
      </div>
    </Container>
  ) : (
    <CustomLoader />
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCartItems
    },
    dispatch
  );

const mapStatetoProps = ({ app: { cartDetailsPage } }) => {
  console.log(cartDetailsPage);
  return {
    cartItems: cartDetailsPage.cartItems.Items,
    productDetails: cartDetailsPage.cartProductDetails.Items
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Cart);
