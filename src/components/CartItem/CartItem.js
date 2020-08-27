import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CartItem.scss";
import plusIcon from "../../assets/plus.svg";
import minusIcon from "../../assets/minus.svg";
import deleteIcon from "../../assets/delete_outline.svg";
import heartIcon from "../../assets/heart.svg";
import checkmark from "../../assets/checkmark.svg";
import formatter from "../../utils/commonUtils/currencyUtils";

const CartItem = props => {
  const {
    productData: { ThumbnailImageURL,
      Name,
      MerchantHandle,
      VerificationStatus,
      MerchantId,
      IsInStock,
      IsDonationCampaign,
      SelectedColor,
      Currency
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
          <Nav className="flex-column merchant-name">
            <Nav.Link
              as={Link}
              to={{
                pathname: `/merchantHome/viewAllProducts/${"Latest Uploads"}/${MerchantId}`,
                state: {
                  fromUser: true
                }
              }}
            >
              {MerchantHandle}{VerificationStatus.S === 'Verified' ? <img
                className="nav-icon"
                alt="checkmark"
                src={checkmark}
              ></img> : null}
            </Nav.Link>
          </Nav>
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
          <img onClick={() => {
            if (qty > 1) {
              props.decreaseProductQuantity({
                "ProductId": productId,
                "ProductTimestamp": productTimestamp,
                "Quantity": (+qty - 1).toString(),
                "CouponCode": couponData && couponData.CouponCode ? couponData.CouponCode : "null",
                "MerchantId": MerchantId,
                "SelectedVariation": {
                  "AvailableColor": SelectedColor,
                  "UnitPrice": price.toString(),
                  "AvailableQuantity": (+qty - 1).toString(),
                  "Currency": Currency
                }
              })
            }
          }} className="minus-icon" alt="minus-icon" src={minusIcon}></img>
          <span className="item-count">{qty}</span>
          <img onClick={() => props.increaseProductQuantity({
            "ProductId": productId,
            "ProductTimestamp": productTimestamp,
            "Quantity": (+qty + 1).toString(),
            "CouponCode": couponData && couponData.CouponCode ? couponData.CouponCode : "null",
            "MerchantId": MerchantId,
            "SelectedVariation": {
              "AvailableColor": SelectedColor,
              "UnitPrice": price.toString(),
              "AvailableQuantity": (+qty + 1).toString(),
              "Currency": Currency
            }
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
