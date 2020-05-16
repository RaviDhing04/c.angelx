import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Row } from "react-bootstrap";
import { getLatestProducts } from "../../store/actions";
import Product from "../../components/Product/Product";
import ProductRowShimmer from "../../components/ProductRowShimmer/ProductRowShimmer";
import "./ViewAllProducts.scss";

const ViewAllProducts = props => {
  const {
    activeCurrency,
    products: { Items }
  } = props;
  const { name } = props.match.params;

  useEffect(() => {
    switch (name) {
      case "Latest Uploads":
        props.getLatestProducts();
        break;
      case "Sponsored":
        props.getLatestProducts();
        break;
      case "Trending":
        props.getLatestProducts();
        break;
      default:
        break;
    }
  }, []);

  const makeItems = () => {
    const rows = [];
    for (let index = 0; index < Items.length; index = index + 5) {
      rows.push(
        <Row className="product-row">
          {Items &&
            Items.slice(index, index + 5).map((item, index) => {
              return (
                <div key={item.ProductId.S}>
                  <Product data={item} activeCurrency={activeCurrency} />
                </div>
              );
            })}
        </Row>
      );
    }
    return rows;
  };

  return (
    <React.Fragment>
      <Container className="viewallpage-container" fluid>
        {Items && Items.length ? (
          <React.Fragment>
            <div className="product-row-heading">{name}</div>
            {makeItems()}
          </React.Fragment>
        ) : (
          <ProductRowShimmer />
        )}
      </Container>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLatestProducts
    },
    dispatch
  );

const mapStatetoProps = ({ app: { viewAllProductPage, common } }) => {
  console.log(viewAllProductPage);
  return {
    products: viewAllProductPage.products,
    activeCurrency: common.activeCurrency
  };
};

export default withRouter(
  connect(mapStatetoProps, mapDispatchToProps)(ViewAllProducts)
);
