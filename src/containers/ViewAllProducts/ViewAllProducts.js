import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container } from "react-bootstrap";

const ViewAllProducts = () => {

 return (
    // <React.Fragment>
    //   <Container fluid>
    //     <ProductListCarousel
    //       name="Sponsored"
    //       data={props.latestProducts}
    //     />
    //     <ProductList name="Latest Uploads" data={props.latestProducts} />
    //     <ProductList name="Trending" data={props.latestProducts} />
    //     <ProductListCarousel
    //       name="Wishlist"
    //       data={props.latestProducts}
    //     />
    //   </Container>
    // </React.Fragment>
 )
}

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       getLatestProducts
//     },
//     dispatch
//   );

// const mapStatetoProps = ({ app: { homePage } }) => {
//   console.log(homePage);
//   return { latestProducts: homePage.latestProducts };
// };

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ViewAllProducts));