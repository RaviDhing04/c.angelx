import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Product from "../Product/Product";
import "./ProductList.scss";
import ProductRowShimmer from "../ProductRowShimmer/ProductRowShimmer";

const ProductList = props => {
  const {
    data: { Items },
    name
  } = props;
  return (
    <React.Fragment>
      {Items && Items.length ? (
        <React.Fragment>
          <div className="product-row-heading">{name}</div>
          <Row className="product-row-1">
            {Items &&
              Items.slice(0, 5).map((item, index) => {
                return index < 5 ? (
                  <Col key={item.ProductId.S}>
                    <Product data={item} />
                  </Col>
                ) : null;
              })}
          </Row>
        </React.Fragment>
      ) : (
        <ProductRowShimmer/>
      )}
      {Items && Items.length ? (
        <React.Fragment>
          <Row className="product-row-2">
            {Items &&
              Items.slice(5).map((item, index) => {
                return index < 5 ? (
                  <Col key={item.ProductId.S}>
                    <Product data={item} />
                  </Col>
                ) : null;
              })}
          </Row>
          <Button className="view-all">View All</Button>
        </React.Fragment>
      ) : (
        <ProductRowShimmer/>
      )}
    </React.Fragment>
  );
};

export default ProductList;
