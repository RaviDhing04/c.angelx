import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import "./CartItem.scss";
import plusIcon from "../../assets/plus.svg";
import minusIcon from "../../assets/minus.svg";
import deleteIcon from "../../assets/delete_outline.svg";
import heartIcon from "../../assets/heart.svg";

const CartItem = props => {
  const {
    ThumbnailImageURL,
    Name,
    MerchantHandle,
    IsInStock,
    ProductSpecifications,
    Quantity,
    IsDonationCampaign
  } = props.cartItem;
  return (
    <React.Fragment>
      {/* <Jumbotron fluid> */}
      <Container className="item-wrapper">
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
        <div className="item-quantity">
          <img className="minus-icon" alt="minus-icon" src={minusIcon}></img>
          <span className="item-count">{Quantity.S}</span>
          <img className="plus-icon"alt="plus-icon" src={plusIcon}></img>
        </div>
        <div className="item-actions">
          <img className="heart-icon" alt="heart-icon" src={heartIcon}></img>
          <img className="delete-icon" alt="delete-icon" src={deleteIcon}></img>
        </div>
        {console.log(props.cartItem)}
      </Container>
      {/* </Jumbotron> */}
    </React.Fragment>
  );
};

export default CartItem;
