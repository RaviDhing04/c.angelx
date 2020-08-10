import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Row } from "react-bootstrap";
import { getLatestProducts, getMerchantAllProducts, clearViewAllProducts, addToWishlist, addProductToCart, getWishlistProducts } from "../../store/actions";
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
      case "Wishlist":
        props.getWishlistProducts({UserId: JSON.parse(localStorage.getItem('userData')).UserId,});
        break;
      default:
        break;
    }
    return () => {
      props.clearViewAllProducts();
    }
  }, []);

  const addToCart = async (payload) => {
    const res = await props.addProductToCart(payload);
  }

  const addProductToWish = async (payload) => {
    const res = await props.addToWishlist(payload);
  }

  const makeItems = () => {
    const rows = [];
    for (let index = 0; index < Items.length; index = index + itemsPerRow) {
      rows.push(
        <Row className={(Items.length - index > itemsPerRow) ? "product-row" : "product-row-no-flex"}>
          {Items &&
            Items.slice(index, index + itemsPerRow).map((item, index) => {
              return (
                <div key={item.ProductId.S}>
                  <Product data={item} activeCurrency={activeCurrency} addToWishlist={addProductToWish} addProductToCart={addToCart} />
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
        ) : Items && Items.length === 0 ? (
          <React.Fragment>
            <div className="product-row-heading">{name}</div>
            <span className="not-found"> No Products added, Go to Inventory to add inventory</span>
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
      getMerchantAllProducts,
      clearViewAllProducts,
      addToWishlist,
      getWishlistProducts,
      addProductToCart
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
