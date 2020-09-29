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
              Items.slice(0, 4).map((item, index) => {
                return index < 4 ? (
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
            {Items && Items.length && Items.length < 4 ? (
              [...Array(4 - Items.length)].map((item) => {
                return (<div className="dummy-prod"></div>)
              })
            ) : null}
          </Row>
        </React.Fragment>
      ) : <React.Fragment>
          <div className="row-div">
            <div className={isAuthenticated ? "product-row-heading" : "margin-left-4 product-row-heading"}>{name}</div>
            <div className={isAuthenticated ? "not-found" : "margin-left-4 not-found"} > No Records Found</div>
          </div>
        </React.Fragment>) : (
          <ProductRowShimmer />
        )}
      {!loading ? (Items && Items.length ? (
        <React.Fragment>
          <Row className="product-row-2">
            {Items &&
              Items.slice(4).map((item, index) => {
                return index < 4 ? (
                  <div key={item.ProductId.S}>
                    <Product data={item} activeCurrency={activeCurrency} addProductToCart={addProductToCart} addToWishlist={addToWishlist} />
                  </div>
                ) : null;
              })}
            {Items && Items.length && Items.length < 8 ? (
              [...Array(8 - Items.length)].map((item) => {
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

export default ProductList;
