import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Row } from "react-bootstrap";
import { getLatestProducts, getMerchantAllProducts, clearViewAllProducts, addToWishlist, addProductToCart, getWishlistProducts, getPreviewProducts } from "../../store/actions";
import Product from "../../components/Product/Product";
import ProductRowShimmer from "../../components/ProductRowShimmer/ProductRowShimmer";
import "./ViewAllProducts.scss";
import { useAuth } from "../../context/auth";

const ViewAllProducts = props => {
  const {
    activeCurrency,
    selectedBusiness,
    products: { Items }
  } = props;
  const { name, merchantId, merchantHandle } = props.match.params;
  const itemsPerRow = merchantId ? 4 : 5;
  const isAuthenticated = useAuth();

  useEffect(() => {
    fetchData();
    return () => {
      props.clearViewAllProducts();
    }
  }, [name]);

  useEffect(() => {
    if (!name && !merchantId) {
      if (merchantHandle) {
        props.getMerchantAllProducts({
          MerchantId: selectedBusiness && selectedBusiness.MerchantId && selectedBusiness.MerchantId.S
        })
      }
    }
  }, [selectedBusiness]);

  const fetchData = () => {
    switch (name) {
      case "Latest Uploads":
        merchantId
          ? props.getMerchantAllProducts({
            MerchantId: merchantId
          })
          : props.getLatestProducts();
        break;
      case "Followed":
        props.getLatestProducts();
        break;
      case "Sponsored":
        props.getLatestProducts();
        break;
      case "Trending":
        props.getLatestProducts();
        break;
      case 'Preview':
        props.getPreviewProducts();
        break;
      case "Wishlist":
        props.getWishlistProducts({ UserId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId, });
        break;
      default:
        break;
    }
  }

  const addToCart = async (payload) => {
    const res = await props.addProductToCart(payload);
    if (res && name === "Wishlist") {
      props.getWishlistProducts({ UserId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId, });
    }
  }

  const addProductToWish = async (payload) => {
    const res = await props.addToWishlist(payload);
  }

  const makeItems = () => {
    const rows = [];
    for (let index = 0; index < Items.length; index = index + itemsPerRow) {
      rows.push(
        <Row className="product-row">
          {Items &&
            Items.slice(index, index + itemsPerRow).map((item, index) => {
              return (
                <div key={item.ProductId.S}>
                  <Product data={item} activeCurrency={activeCurrency} addToWishlist={addProductToWish} addProductToCart={addToCart} type={name} />
                </div>
              );
            })}
          {Items && Items.length && (Items.length - index < itemsPerRow) ? (
            [...Array((itemsPerRow - (Items.length - index)))].map((item) => {
              return (<div className="dummy-prod"></div>)
            })
          ) : null}
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
            <div className={isAuthenticated ? "product-row-heading" : "margin-left-4 product-row-heading"} >{name ? name : "Latest Uploads"}</div>
            {makeItems()}
          </React.Fragment>
        ) : Items && Items.length === 0 ? (
          <React.Fragment>
            <div className="product-row-heading">{name ? name : "Latest Uploads"}</div>
            {merchantId ? <span className="not-found"> No Products added, Go to Inventory to add inventory</span> : <span className="not-found"> No Records Found</span>}
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
      addProductToCart,
      getPreviewProducts
    },
    dispatch
  );

const mapStatetoProps = ({ app: { viewAllProductPage, common, manageBusiness } }) => {
  console.log(viewAllProductPage);
  return {
    products: viewAllProductPage.products,
    activeCurrency: common.activeCurrency,
    selectedBusiness: manageBusiness.selectedBusiness
  };
};

export default withRouter(
  connect(mapStatetoProps, mapDispatchToProps)(ViewAllProducts)
);
