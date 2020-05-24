import React from "react";
import { Row, Button } from "react-bootstrap";
import Product from "../Product/Product";
import { Link } from "react-router-dom";
import "./ProductList.scss";
import ProductRowShimmer from "../ProductRowShimmer/ProductRowShimmer";

const ProductList = props => {
  const {
    data: { Items },
    name,
    activeCurrency,
    addProductToCart
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
        </React.Fragment>
      ) : (
        <ProductRowShimmer />
      )}
      {Items && Items.length ? (
        <React.Fragment>
          <Row className="product-row-2">
            {Items &&
              Items.slice(5).map((item, index) => {
                return index < 5 ? (
                  <div key={item.ProductId.S}>
                    <Product data={item} activeCurrency={activeCurrency} />
                  </div>
                ) : null;
              })}
          </Row>
          <Link to={`/home/viewAllProducts/${name}`}>
            <Button className="view-all">View All</Button>
          </Link>
        </React.Fragment>
      ) : (
        <ProductRowShimmer />
      )}
    </React.Fragment>
  );
};

export default ProductList;
