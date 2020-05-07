import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container } from "react-bootstrap";
import { getLatestProductsWithPagination } from "../../store/actions";
import ProductListCarousel from "../../components/ProductListCarousel/ProductListCarousel";
import ProductList from "../../components/ProductList/ProductList";

const HomeProductList = props => {
  useEffect(() => {
    props.getLatestProductsWithPagination();
  }, []);

  return (
    <React.Fragment>
      <Container fluid>
        <ProductListCarousel
          name="Sponsored"
          data={props.latestProducts}
        />
        <ProductList name="Latest Uploads" data={props.latestProducts} />
        <ProductList name="Trending" data={props.latestProducts} />
        <ProductListCarousel
          name="Wishlist"
          data={props.latestProducts}
        />
      </Container>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLatestProductsWithPagination
    },
    dispatch
  );

const mapStatetoProps = ({ app: { homePage } }) => {
  console.log(homePage);
  return { latestProducts: homePage.latestProducts };
};
export default connect(mapStatetoProps, mapDispatchToProps)(HomeProductList);
