import React, {useEffect} from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import {bindActionCreators} from "redux";
import { getCartItems } from "../../store/actions";

const Cart = (props) => {
    useEffect(() => {
        props.getLatestProductsWithPagination();
      }, []);

  return (
    <Container fluid>
      <div className="cart-page">
        <div className="left-section"></div>
        <div className="right-section"></div>
      </div>
    </Container>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCartItems
    },
    dispatch
  );

const mapStatetoProps = ({ app: { homePage } }) => {
  console.log(homePage);
  return { latestProducts: homePage.latestProducts };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Cart);
