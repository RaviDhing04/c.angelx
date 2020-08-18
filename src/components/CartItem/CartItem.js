import React from "react";
import { Container } from "react-bootstrap";
import "./CartItem.scss";
import plusIcon from "../../assets/plus.svg";
import minusIcon from "../../assets/minus.svg";
import deleteIcon from "../../assets/delete_outline.svg";
import heartIcon from "../../assets/heart.svg";
import formatter from "../../utils/commonUtils/currencyUtils";

const CartItem = props => {
  const {
    productData: { ThumbnailImageURL,
      Name,
      MerchantHandle,
      MerchantId,
      IsInStock,
      IsDonationCampaign,
    },
    couponData,
    productId,
    productTimestamp,
    qty,
    price,
    discountedPrice
  } = props.cartItem;
  return (
    <React.Fragment>
      {/* <Jumbotron fluid> */}
      <Container className="item-wrapper">
        <img className="item-image" alt="item" src={ThumbnailImageURL}></img>
        <div className="item-detail">
          <span className="item-name">{Name}</span>
          <span className="merchant-name">{MerchantHandle}</span>
          <span className={IsInStock === "true" ? "in-stock stock-info" : "out-of-stock stock-info"}>
            {IsInStock === "true" ? "In Stock" : "Out Of Stock"}
          </span>
        </div>
        <div className="item-pricing">
          <span className="item-price">
            {formatter(props.activeCurrency)(price)}
          </span>
          <span className="item-cutPrice">
            {formatter(props.activeCurrency)(discountedPrice)}
          </span>
        </div>
        <div className="item-quantity">
          <img onClick={() => props.decreaseProductQuantity({
            "ProductId": productId,
            "ProductTimestamp": productTimestamp,
            "Quantity": (+qty - 1).toString(),
            "CouponCode": couponData && couponData.CouponCode ? couponData.CouponCode : "null",
            "MerchantId": MerchantId
          })} className="minus-icon" alt="minus-icon" src={minusIcon}></img>
          <span className="item-count">{qty}</span>
          <img onClick={() => props.increaseProductQuantity({
            "ProductId": productId,
            "ProductTimestamp": productTimestamp,
            "Quantity": (+qty + 1).toString(),
            "CouponCode": couponData && couponData.CouponCode ? couponData.CouponCode : "null",
            "MerchantId": MerchantId
          })} className="plus-icon" alt="plus-icon" src={plusIcon}></img>
        </div>
        <div className="item-actions">
          <img onClick={() => { props.addToWishlist({ "ProductId": productId, "UserId": JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId }) }} className="heart-icon" alt="heart-icon" src={heartIcon}></img>
          <img onClick={() => props.deleteProductFromCart({
            "ProductId": productId,
          })} className="delete-icon" alt="delete-icon" src={deleteIcon}></img>
        </div>
      </Container>
      {/* </Jumbotron> */}
    </React.Fragment>
  );
};

export default CartItem;
