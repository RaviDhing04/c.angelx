import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container } from "react-bootstrap";
import { getLatestProductsWithPagination, getSponsoredProductsWithPagination, getWishlistProductsWithPagination, addProductToCart, addToWishlist } from "../../store/actions";
import ProductListCarousel from "../../components/ProductListCarousel/ProductListCarousel";
import ProductList from "../../components/ProductList/ProductList";
import { useAuth } from "../../context/auth";

const HomeProductList = props => {
  const isAuthenticated = useAuth();
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [loadingSponsored, setLoadingSponsored] = useState(true);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  useEffect(() => {
    const fetchLatestProducts = async () => {
      const resLatest = await props.getLatestProductsWithPagination();
      if (resLatest) setLoadingLatest(false);
    }
    const fetchSponsoredProducts = async () => {
      const resSponsored = await props.getSponsoredProductsWithPagination();
      if (resSponsored) setLoadingSponsored(false);
    }

    const fetchWishlistProducts = async () => {
      const resWishlist = await props.getWishlistProductsWithPagination({ UserId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId });
      if (resWishlist) setLoadingWishlist(false);
    }
    fetchLatestProducts();
    fetchSponsoredProducts();
    fetchWishlistProducts();
  }, []);

  const addToCart = async (payload, type) => {
    const res = await props.addProductToCart(payload);
    if (res && type) {
      props.getWishlistProductsWithPagination({ UserId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId });
    }
  }

  const addProductToWish = async (payload) => {
    const res = await props.addToWishlist(payload);
    if (res) {
      props.getWishlistProductsWithPagination({ UserId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId });
    }
  }

  return (
    <React.Fragment>
      <Container fluid>
        <ProductListCarousel name="Sponsored" loading={loadingSponsored} data={props.sponsoredProducts} activeCurrency={props.activeCurrency} addToWishlist={addProductToWish} addProductToCart={addToCart} />
        <ProductList name="Latest Uploads" loading={loadingLatest} data={props.latestProducts} activeCurrency={props.activeCurrency} addToWishlist={addProductToWish} addProductToCart={addToCart} />
        {/* <ProductList name="Trending" data={props.latestProducts} activeCurrency={props.activeCurrency} addToWishlist={addProductToWish} addProductToCart={addToCart} /> */}
        {isAuthenticated ? <ProductListCarousel name="Wishlist" loading={loadingWishlist} data={props.wishlistProducts} activeCurrency={props.activeCurrency} addToWishlist={addProductToWish} addProductToCart={addToCart} /> : null}
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
