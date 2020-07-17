import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Product from "../Product/Product";
import "./ProductListCarousel.scss";
import ProductRowShimmer from "../ProductRowShimmer/ProductRowShimmer";
import { useAuth } from "../../context/auth";

const ProductListCarousel = props => {
  const {
    data: { Items },
    name,
    activeCurrency,
    addProductToCart
  } = props;
  const isAuthenticated = useAuth();
  return (
    <React.Fragment>
      {Items && Items.length ? (
        <React.Fragment>
          <div className={isAuthenticated ? "product-row-heading" : "margin-left-4 product-row-heading"}>{name}</div>
          <Row className="product-row">
            {Items &&
              Items.map((item, index) => {
                return index < 5 ? (
                  <div key={item.ProductId.S}>
                    <Product
                      data={item}
                      activeCurrency={activeCurrency}
                      addProductToCart={addProductToCart}
                    />
                  </div>
                ) : null;
              })}
          </Row>
          <Button className={isAuthenticated ? "view-all" : "margin-left-4 view-all"}>View All</Button>
        </React.Fragment>
      ) : (
          <ProductRowShimmer />
        )}
    </React.Fragment>
  );
};

export default ProductListCarousel;
