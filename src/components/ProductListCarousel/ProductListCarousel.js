import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import "./ProductListCarousel.scss";
import ProductRowShimmer from "../ProductRowShimmer/ProductRowShimmer";
import { useAuth } from "../../context/auth";

const ProductListCarousel = props => {
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
          <Row className={(Items.length >= 5) ? "product-row" : "product-row-no-flex"}>
            {Items &&
              Items.map((item, index) => {
                return index < 5 ? (
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
          </Row>
          <Link to={`/home/viewAllProducts/${name}`}>
            <Button className={isAuthenticated ? "view-all" : "margin-left-4 view-all"}>View All</Button>
          </Link>
        </React.Fragment>
      ) : <React.Fragment>
          <div className={isAuthenticated ? "product-row-heading" : "margin-left-4 product-row-heading"}>{name}</div>
          <span className="not-found"> No Records Found</span>
        </React.Fragment>) : (
          <ProductRowShimmer />
        )}
    </React.Fragment>
  );
};

export default ProductListCarousel;
