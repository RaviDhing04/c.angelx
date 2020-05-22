import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Row } from "react-bootstrap";
import { getLatestProducts, getMerchantAllProducts } from "../../store/actions";
import Product from "../../components/Product/Product";
import ProductRowShimmer from "../../components/ProductRowShimmer/ProductRowShimmer";
import "./ViewAllProducts.scss";

const ViewAllProducts = props => {
  const {
    activeCurrency,
    products: { Items }
  } = props;
  const { name, merchantId } = props.match.params;
  const itemsPerRow = merchantId ? 4 : 5;

  useEffect(() => {
    switch (name) {
      case "Latest Uploads":
        merchantId
          ? props.getMerchantAllProducts({
              MerchantId: merchantId
            })
          : props.getLatestProducts();
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
    for (let index = 0; index < Items.length; index = index + itemsPerRow) {
      rows.push(
        <Row className="product-row">
          {Items &&
            Items.slice(index, index + itemsPerRow).map((item, index) => {
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
      getLatestProducts,
      getMerchantAllProducts
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
