import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container } from "react-bootstrap";
import { getLatestProductsWithPagination, addProductToCart } from "../../store/actions";
import ProductListCarousel from "../../components/ProductListCarousel/ProductListCarousel";
import ProductList from "../../components/ProductList/ProductList";

const HomeProductList = props => {
  useEffect(() => {
    props.getLatestProductsWithPagination();
  }, []);

const addToCart = async (productId) => {
  const payload = {
    ProductId: productId,
    UserId: "1588433471165",
    Quantity: "1"
  }
  const res = await props.addProductToCart(payload);
}

  return (
    <React.Fragment>
      <Container fluid>
        <ProductListCarousel name="Sponsored" data={props.latestProducts} activeCurrency={props.activeCurrency} addProductToCart={addToCart}/>
        <ProductList name="Latest Uploads" data={props.latestProducts} activeCurrency={props.activeCurrency}addProductToCart={addToCart}/>
        <ProductList name="Trending" data={props.latestProducts} activeCurrency={props.activeCurrency} addProductToCart={addToCart}/>
        <ProductListCarousel name="Wishlist" data={props.latestProducts} activeCurrency={props.activeCurrency} addProductToCart={addToCart}/>
      </Container>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLatestProductsWithPagination, 
      addProductToCart
    },
    dispatch
  );

const mapStatetoProps = ({ app: { homePage, common } }) => {
  console.log(homePage);
  return {
    latestProducts: homePage.latestProducts,
    activeCurrency: common.activeCurrency
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(HomeProductList);
