import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import "./OrderItem.scss";
import plusIcon from "../../assets/plus.svg";
import minusIcon from "../../assets/minus.svg";
import deleteIcon from "../../assets/delete_outline.svg";
import heartIcon from "../../assets/heart.svg";

const OrderItem = props => {
  const {
    ThumbnailImageURL,
    Name,
    MerchantHandle,
    IsInStock,
    ProductSpecifications,
    Quantity,
    IsDonationCampaign
  } = props.orderItem;
  return (
    <React.Fragment>
      {/* <Jumbotron fluid> */}
      <div className="order-wrapper">
        <img className="item-image" alt="item" src={ThumbnailImageURL.S}></img>
        <div className="item-detail">
          <span className="item-name">{Name.S}</span>
          <span className="merchant-name">{MerchantHandle.S}</span>
          <span className={IsInStock.S === "true" ? "in-stock stock-info" : "out-of-stock stock-info"}>
            {IsInStock.S === "true" ? "In Stock" : "Out Of Stock"}
          </span>
        </div>
        <div className="item-pricing">
          <span className="item-price">
            {ProductSpecifications.M.UnitPrice.S}
          </span>
          <span className="item-cutPrice">
            {ProductSpecifications.M.UnitPrice.S}
          </span>
        </div>
        <div className="item-transit">
          <span className="trasit-status">
            Transit Status
          </span>
          <span className="item-status">
            Dispatched
          </span>
        </div>
        <div className="item-actions">
          <img className="heart-icon" alt="heart-icon" src={heartIcon}></img>
          <span className="more-details">More Details</span>
        </div>
        {console.log(props.orderItem)}
      </div>
      {/* </Jumbotron> */}
    </React.Fragment>
  );
};

export default OrderItem;
