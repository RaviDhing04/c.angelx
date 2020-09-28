import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./Product.scss";
import formatter from "../../utils/commonUtils/currencyUtils";
import heartIcon from "../../assets/heart.svg";
import checkmark from "../../assets/checkmark.svg";
import defaultImg from "../../assets/default-prod.png";
import {
  isMobile
} from "react-device-detect";

const Product = props => {
  const { data, activeCurrency, addProductToCart, type } = props;
  return (
    <React.Fragment>
      {data && Object.keys(data).length ? (
        <Card className="product-card" style={isMobile ? {"width": "22rem" } : null}>
          <div className="prod-img">
            {type && type.toLowerCase() === 'wishlist' ? null : <img className="heart-icon" onClick={() => { props.addToWishlist({ "ProductId": data.ProductId && data.ProductId.S, "UserId": JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId }) }} alt="heart-icon" src={heartIcon}></img>}
            <Link to={!isMobile ? `/home/productDetail/${data.ProductId && data.ProductId.S}/${data.Timestamp && data.Timestamp.S}`: window.location.pathname}>
              <div className="product-image">
                <Card.Img src={data.ThumbnailImageURL.S ? data.ThumbnailImageURL.S : defaultImg} />
              </div>
            </Link>
          </div>
          <Card.Body>
            <Link to={!isMobile ? `/home/productDetail/${data.ProductId.S}/${data.Timestamp.S}`: window.location.pathname}>
              <div >
                <Card.Title><span> {data.Name && data.Name.S} </span> </Card.Title>
                <Card.Text>
                  {data.IsDonationCampaign && data.IsDonationCampaign.S === 'true'
                    ? (<span>By {data.MerchantHandle.S}
                      {/* {1 ? <img
                      className="nav-icon"
                      alt="checkmark"
                      src={checkmark}
                    ></img> : null} */}
                    </span>)
                    : (<span> {formatter(activeCurrency)(data.ProductVariations && data.ProductVariations.L && data.ProductVariations.L.length && data.ProductVariations.L[0].M.UnitPrice && data.ProductVariations.L[0].M.UnitPrice.S ? data.ProductVariations.L[0].M.UnitPrice.S : 0)} </span>)}
                </Card.Text>
              </div>
            </Link>
            {data.IsDonationCampaign && data.IsDonationCampaign.S === "true" ? (
              <Link to={!isMobile ? `/home/productDetail/${data.ProductId.S}/${data.Timestamp.S}`: window.location.pathname}>
                <Button className="product-button">Donate</Button>
              </Link>
            ) : (
                <Button onClick={() => addProductToCart({
                  "ProductId": data.ProductId.S,
                  "ProductTimestamp": data.Timestamp.S,
                  "Quantity": "1",
                  "CouponCode": null,
                  "MerchantId": data.MerchantId.S,
                  "SelectedVariation": {
                    "AvailableColor": data.ProductVariations && data.ProductVariations.L && data.ProductVariations.L.length && data.ProductVariations.L[0].M.AvailableColor && data.ProductVariations.L[0].M.AvailableColor.S,
                    "UnitPrice": data.ProductVariations && data.ProductVariations.L && data.ProductVariations.L.length && data.ProductVariations.L[0].M.UnitPrice && data.ProductVariations.L[0].M.UnitPrice.S,
                    "AvailableQuantity": "1",
                    "Currency": data.ProductVariations && data.ProductVariations.L && data.ProductVariations.L.length && data.ProductVariations.L[0].M.Currency && data.ProductVariations.L[0].M.Currency.S,
                  }
                }, type && type.toLowerCase() === 'wishlist' ? 'wishlist' : null)} className="product-button">Add to Cart</Button>
              )}
            <Link to={!isMobile ? `/home/productDetail/${data.ProductId.S}/${data.Timestamp.S}`: window.location.pathname}>
              <Button className="more-button">More Options</Button>
            </Link>
          </Card.Body>
        </Card>
      ) : null
      }
    </React.Fragment >
  );
};

export default Product;
