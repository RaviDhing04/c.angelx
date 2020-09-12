import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Nav } from "react-bootstrap";
import "./Merchant.scss";
import formatter from "../../utils/commonUtils/currencyUtils";
import heartIcon from "../../assets/heart.svg";
import checkmark from "../../assets/checkmark.svg";
import defaultImg from "../../assets/default-prod.png";

const Merchant = props => {
  const { data, activeCurrency, addProductToCart, type } = props;
  return (
    <React.Fragment>
      {data && Object.keys(data).length ? (
        <Card className="product-card">
          <div className="prod-img">
            {/* {type && type.toLowerCase() === 'wishlist' ? null : <img className="heart-icon" onClick={() => { props.addToWishlist({ "ProductId": data.ProductId && data.ProductId.S, "UserId": JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId }) }} alt="heart-icon" src={heartIcon}></img>} */}
            {/* <Link to={`/home/productDetail/${data.ProductId && data.ProductId.S}/${data.Timestamp && data.Timestamp.S}`}>

            </Link> */}
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to={{
                  pathname: `/merchantHome/viewAllProducts/${"Latest Uploads"}/${data.MerchantId && data.MerchantId.S}`,
                  state: {
                    fromUser: true
                  }
                }}
              >
                <div className="product-image">
                  <Card.Img src={data.BannerImageURL && data.BannerImageURL.S ? data.BannerImageURL.S : defaultImg} />
                </div>
              </Nav.Link>
            </Nav>
          </div>
          <Card.Body>
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to={{
                  pathname: `/merchantHome/viewAllProducts/${"Latest Uploads"}/${data.MerchantId && data.MerchantId.S}`,
                  state: {
                    fromUser: true
                  }
                }}
              >
                <div >
                  <Card.Title><span>{data.OrgName && data.OrgName.S}</span></Card.Title>
                  <Card.Text>
                    <span>{data.BusinessHandle.S}
                    </span>
                  </Card.Text>
                </div>
              </Nav.Link>
            </Nav>
            {/* {data.IsDonationCampaign && data.IsDonationCampaign.S === "true" ? (
              <Link to={`/home/productDetail/${data.ProductId.S}/${data.Timestamp.S}`}>
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
              )} */}
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to={{
                  pathname: `/merchantHome/viewAllProducts/${"Latest Uploads"}/${data.MerchantId && data.MerchantId.S}`,
                  state: {
                    fromUser: true
                  }
                }}
              >
                <Button className="more-button">More Options</Button>
              </Nav.Link>
            </Nav>
          </Card.Body>
        </Card>
      ) : null
      }
    </React.Fragment >
  );
};

export default Merchant;
