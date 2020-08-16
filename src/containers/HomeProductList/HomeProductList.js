import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container } from "react-bootstrap";
import { getLatestProductsWithPagination, getSponsoredProductsWithPagination, getWishlistProductsWithPagination, addProductToCart, addToWishlist } from "../../store/actions";
import ProductListCarousel from "../../components/ProductListCarousel/ProductListCarousel";
import ProductList from "../../components/ProductList/ProductList";
import { useAuth } from "../../context/auth";

const HomeProductList = props => {
  const isAuthenticated = useAuth();
  useEffect(() => {
    props.getLatestProductsWithPagination();
    props.getSponsoredProductsWithPagination();
    props.getWishlistProductsWithPagination({UserId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId});
  }, []);

  const addToCart = async (payload, type) => {
    const res = await props.addProductToCart(payload);
    if(res && type) {
      props.getWishlistProductsWithPagination({UserId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId});
    }
  }

  const addProductToWish = async (payload) => {
    const res = await props.addToWishlist(payload);
  }

  return (
    <React.Fragment>
      <Container fluid>
        <ProductListCarousel name="Sponsored" data={props.sponsoredProducts} activeCurrency={props.activeCurrency} addToWishlist={addProductToWish} addProductToCart={addToCart} />
        <ProductList name="Latest Uploads" data={props.latestProducts} activeCurrency={props.activeCurrency} addToWishlist={addProductToWish} addProductToCart={addToCart} />
        <ProductList name="Trending" data={props.latestProducts} activeCurrency={props.activeCurrency} addToWishlist={addProductToWish} addProductToCart={addToCart} />
        {isAuthenticated ? <ProductListCarousel name="Wishlist" data={props.wishlistProducts} activeCurrency={props.activeCurrency} addToWishlist={addProductToWish} addProductToCart={addToCart} /> : null}
      </Container>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLatestProductsWithPagination,
      getSponsoredProductsWithPagination,
      getWishlistProductsWithPagination,
      addProductToCart,
      addToWishlist
    },
    dispatch
  );

const mapStatetoProps = ({ app: { homePage, common } }) => {
  console.log(homePage);
  return {
    latestProducts: homePage.latestProducts,
    sponsoredProducts: homePage.sponsoredProducts,
    wishlistProducts: homePage.wishlistProducts,
    activeCurrency: common.activeCurrency
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(HomeProductList);
