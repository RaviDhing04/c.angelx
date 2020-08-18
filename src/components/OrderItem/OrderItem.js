import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import "./OrderItem.scss";
import plusIcon from "../../assets/plus.svg";
import heartIcon from "../../assets/heart.svg";
import formatter from "../../utils/commonUtils/currencyUtils";

const OrderItem = props => {
  const {
    productData,
    discountedPrice,
    price
  } = props.orderItem;

  const { 
    ThumbnailImageURL,
    Name,
    MerchantHandle,
    IsInStock} = productData.M;
  return (
    <React.Fragment>
      {/* <Jumbotron fluid> */}
      <div className="order-wrapper">
        <img className="item-image" alt="item" src={ThumbnailImageURL && ThumbnailImageURL.S}></img>
        <div className="item-detail">
          <span className="item-name">{Name && Name.S}</span>
          <span className="merchant-name">{MerchantHandle && MerchantHandle.S}</span>
          <span className={IsInStock && IsInStock.S === "true" ? "in-stock stock-info" : "out-of-stock stock-info"}>
            {IsInStock && IsInStock.S === "true" ? "In Stock" : "Out Of Stock"}
          </span>
        </div>
        <div className="item-pricing">
          <span className="item-price">
            {formatter(props.activeCurrency)(price && price.S)}
          </span>
          <span className="item-cutPrice">
            {formatter(props.activeCurrency)(discountedPrice && discountedPrice.S)}
          </span>
        </div>
        <div className="item-transit">
          <span className="trasit-status">
            Transit Status
          </span>
          <span className="item-status">
            {props.orderStatus && props.orderStatus.S}
          </span>
        </div>
        <div className="item-actions">
          <img className="heart-icon" alt="heart-icon" src={heartIcon}></img>
          {/* <span className="more-details">More Details</span> */}
        </div>
        {console.log(props.orderItem)}
      </div>
      {/* </Jumbotron> */}
    </React.Fragment>
  );
};

export default OrderItem;
