import React from "react";
import { connect } from "react-redux";
import { Container, Jumbotron } from "react-bootstrap";

const CartItem = () => {
  return (
    <React.Fragment>
      <Jumbotron fluid>
        <Container className="item-wrapper">
          <img alt="item-image" src={'./abc'}></img>
        </Container>
      </Jumbotron>
    </React.Fragment>
  );
};

export default CartItem;
