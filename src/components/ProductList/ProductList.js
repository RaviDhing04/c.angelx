import React from "react";
import { Row, Button } from "react-bootstrap";
import Product from "../Product/Product";
import { Link } from "react-router-dom";
import "./ProductList.scss";
import ProductRowShimmer from "../ProductRowShimmer/ProductRowShimmer";
import { useAuth } from "../../context/auth";

const ProductList = props => {
  const {
    data: { Items },
    name,
    activeCurrency,
    addProductToCart,
    addToWishlist
  } = props;
  const isAuthenticated = useAuth();
  return (
    <React.Fragment>
      {Items && Items.length ? (
        <React.Fragment>
          <div className={isAuthenticated ? "product-row-heading" : "margin-left-4 product-row-heading"}>{name}</div>
          <Row className="product-row-1">
            {Items &&
              Items.slice(0, 5).map((item, index) => {
                return index < 5 ? (
                  <div key={item.ProductId.S}>
                    <Product
                      data={item}
                      activeCurrency={activeCurrency}
                      addProductToCart={addProductToCart}
                      addToWishlist={addToWishlist}
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
                    <Product data={item} activeCurrency={activeCurrency} addProductToCart={addProductToCart} addToWishlist={addToWishlist} />
                  </div>
                ) : null;
              })}
          </Row>
          <Link to={`/home/viewAllProducts/${name}`}>
            <Button className={isAuthenticated ? "view-all" : "margin-left-4 view-all"}>View All</Button>
          </Link>
        </React.Fragment>
      ) : (
          <ProductRowShimmer />
        )}
    </React.Fragment>
  );
};

export default ProductList;
