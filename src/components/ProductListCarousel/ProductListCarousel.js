import React from "react";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
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
  const itemsPerRow = 5;
  const isAuthenticated = useAuth();

  const makeItems = () => {
    const rows = [];
    for (let index = 0; index < Items.length; index = index + itemsPerRow) {
      rows.push(
        <Row className="product-row">
          {Items &&
            Items.slice(index, index + itemsPerRow).map((item, index) => {
              return (
                <div key={item.ProductId.S}>
                  <Product data={item} activeCurrency={activeCurrency} addToWishlist={addToWishlist} addProductToCart={addProductToCart} type={name} />
                </div>
              );
            })}
          {Items && Items.length && (Items.length - index < itemsPerRow) ? (
            [...Array((itemsPerRow - (Items.length - index)))].map((item) => {
              return (<div className="dummy-prod"></div>)
            })
          ) : null}
        </Row>
      );
    }
    return (rows.map((row, index) => {
      return (
        <Carousel.Item key={index}>
          {row}
        </Carousel.Item>
      )
    })
    )
  };

  return (
    <React.Fragment>
      {!loading ? (Items && Items.length ? (
        <React.Fragment>
          <div className={isAuthenticated ? "product-row-heading" : "margin-left-4 product-row-heading"}>{name}</div>
          <Carousel className="prod-carousel" fade={true} interval={null}>
            {/* <Row className="product-row">
              {Items && Items.length &&
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
              {Items && Items.length && Items.length < 5 ? (
                [...Array(5 - Items.length)].map((item) => {
                  return (<div className="dummy-prod"></div>)
                })
              ) : null}
            </Row> */}
            {makeItems()}
          </Carousel>
          <Link to={`/home/viewAllProducts/${name}`}>
            <Button className={isAuthenticated ? "view-all" : "margin-left-4 view-all"}>View All</Button>
          </Link>
        </React.Fragment>
      ) : <React.Fragment>
          <div className="row-div">
            <div className={isAuthenticated ? "product-row-heading" : "margin-left-4 product-row-heading"}>{name}</div>
            <span className="not-found"> No Records Found</span>
          </div>
        </React.Fragment>) : (
          <ProductRowShimmer />
        )}
    </React.Fragment>
  );
};

export default ProductListCarousel;
