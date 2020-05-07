import React from "react";
import { Card, Button } from "react-bootstrap";
import "./Product.scss";

const Product = props => {
  const { data } = props;
  return (
    <React.Fragment>
      {data && Object.keys(data).length ? (
        <Card className="product-card">
          <div className="product-image">
            <Card.Img
              src={data.ThumbnailImageURL.S}
            />
          </div>
          <Card.Body>
            <Card.Title>{data.Name.S}</Card.Title>
            <Card.Text>
              {data.IsDonationCampaign.S
                ? "By " + data.MerchantHandle.S
                : "R " + data.ProductSpecifications.M.UnitPrice.S}
            </Card.Text>
            {data.IsDonationCampaign.S ? (
              <Button className="product-button">Donate</Button>
            ) : (
              <Button className="product-button">Add to Cart</Button>
            )}
          </Card.Body>
        </Card>
      ) : null}
    </React.Fragment>
  );
};

export default Product;
