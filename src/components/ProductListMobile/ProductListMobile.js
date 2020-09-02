import React from "react";
import { Row, Button } from "react-bootstrap";
import Product from "../Product/Product";
import { Link } from "react-router-dom";
import "./ProductListMobile.scss";
import ProductRowShimmer from "../ProductRowShimmer/ProductRowShimmer";
import { useAuth } from "../../context/auth";

const ProductListMobile = props => {
  const {
    data: { Items },
    name,
    activeCurrency,
    addProductToCart,
    addToWishlist,
    loading
  } = props;
  const isAuthenticated = useAuth();
  return (
    <React.Fragment>
      {!loading ? (Items && Items.length ? (
        <React.Fragment>
          <div className={isAuthenticated ? "product-row-heading" : "margin-left-4 product-row-heading"}>{name}</div>
          <Row className="product-row-1">
            {Items &&
              Items.slice(0, 2).map((item, index) => {
                return index < 2 ? (
                  <div key={item.ProductId.S}>
                    <Product
                      data={item}
                      activeCurrency={activeCurrency}
                      addProductToCart={addProductToCart}
                      addToWishlist={addToWishlist}
                      type={name}
                    />
                  </div>
                ) : null;
              })}
            {Items && Items.length && Items.length < 2 ? (
              [...Array(2 - Items.length)].map((item) => {
                return (<div className="dummy-prod"></div>)
              })
            ) : null}
          </Row>
        </React.Fragment>
      ) : <React.Fragment>
          <div className="row-div">
            <div className={isAuthenticated ? "product-row-heading" : "margin-left-4 product-row-heading"}>{name}</div>
            <span className="not-found"> No Records Found</span>
          </div>
        </React.Fragment>) : (
          <ProductRowShimmer />
        )}
      {!loading ? (Items && Items.length ? (
        <React.Fragment>
          <Row className="product-row-2">
            {Items &&
              Items.slice(2).map((item, index) => {
                return index < 2 ? (
                  <div key={item.ProductId.S}>
                    <Product data={item} activeCurrency={activeCurrency} addProductToCart={addProductToCart} addToWishlist={addToWishlist} />
                  </div>
                ) : null;
              })}
            {Items && Items.length && Items.length < 4 ? (
              [...Array(4 - Items.length)].map((item) => {
                return (<div className="dummy-prod"></div>)
              })
            ) : null}
          </Row>
          <Link to={`/home/viewAllProducts/${name}`}>
            <Button className={isAuthenticated ? "view-all" : "margin-left-4 view-all"}>View All</Button>
          </Link>
        </React.Fragment>
      ) : null) : (
          <ProductRowShimmer />
        )}
    </React.Fragment>
  );
};

export default ProductListMobile;
