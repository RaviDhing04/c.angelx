import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./Product.scss";
import formatter from "../../utils/commonUtils/currencyUtils";
import heartIcon from "../../assets/heart.svg";

const Product = props => {
  const { data, activeCurrency, addProductToCart } = props;
  return (
    <React.Fragment>
      {data && Object.keys(data).length ? (
        <Card className="product-card">
          <div className="prod-img">
            <img className="heart-icon" onClick={() => { props.addToWishlist({ "ProductId": data.ProductId.S, "UserId": JSON.parse(localStorage.getItem('userData')).UserId }) }} alt="heart-icon" src={heartIcon}></img>
            <Link to={`/home/productDetail/${data.ProductId.S}/${data.Timestamp.S}`}>
              <div className="product-image">
                <Card.Img src={data.ThumbnailImageURL.S} />
              </div>
            </Link>
          </div>
          <Card.Body>
            <Link to={`/home/productDetail/${data.ProductId.S}/${data.Timestamp.S}`}>
              <div >
                <Card.Title>{data.Name.S}</Card.Title>
                <Card.Text>
                  {data.IsDonationCampaign.S === 'true'
                    ? "By " + data.MerchantHandle.S
                    : formatter(activeCurrency)(data.ProductSpecifications.M.UnitPrice.S)}
                </Card.Text>
              </div>
            </Link>
            {data.IsDonationCampaign.S === "true" ? (
              <Button className="product-button">Donate</Button>
            ) : (
                <Button onClick={() => addProductToCart({
                  "ProductId": data.ProductId.S,
                  "ProductTimestamp": data.Timestamp.S,
                  "Quantity": "1",
                  "CouponCode": null,
                  "MerchantId": data.MerchantId.S

                })} className="product-button">Add to Cart</Button>
              )}
          </Card.Body>
        </Card>
      ) : null
      }
    </React.Fragment >
  );
};

export default Product;
