import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Product from "../Product/Product";
import "./ProductListCarousel.scss";

const ProductListCarousel = props => {
  const { data:{Items}, name } = props;
  return (
    <React.Fragment>
      <div className="product-row-heading">{name}</div>
      <Row className="product-row">
        {Items && Items.map((item, index) => {
          return index < 5 ? (
            <Col key={item.ProductId.S}>
              <Product data={item} />
            </Col>
          ) : null;
        })}
      </Row>
      <Button className="view-all">View All</Button>
    </React.Fragment>
  );
};

export default ProductListCarousel;
