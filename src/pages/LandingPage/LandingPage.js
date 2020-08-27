import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { aboutUsGrid } from "../../constants/constants";
import "./LandingPage.scss";
import Banner from "../../components/Banner/Banner";
import { Carousel } from "react-bootstrap";
import {
  getSearchCategories,
  getLatestProductsWithPagination,
  getLandingBanners,
  addProductToCart,
  addToWishlist
} from "../../store/actions";
import ProductListCarousel from "../../components/ProductListCarousel/ProductListCarousel";
import ProductList from "../../components/ProductList/ProductList";

const LandingPage = props => {
  const [banner, setBanner] = useState(null);
  const [loadingLatest, setLoadingLatest] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      props.getSearchCategories();
      setBanner([await props.getLandingBanners()]);
    }
    const fetchLatestProducts = async () => {
      const resLatest = await props.getLatestProductsWithPagination();
      if (resLatest) setLoadingLatest(false);
    }
    fetchData();
    fetchLatestProducts();
  }, []);

  const addToCart = async payload => {
    const res = await props.addProductToCart(payload);
  };

  const addProductToWish = async (payload) => {
    const res = await props.addToWishlist(payload);
  }

  const makeItems = (Items) => {
    const rows = [];
    for (let index = 0; index < Items.length; index = index + 3) {
      rows.push(
        <div className="categories">
          {Items &&
            Items.slice(index, index + 3).map((item, index) => {
              return (
                <div key={item.CategoryId.S} className="category">
                  <img
                    className="category-img"
                    alt="category-img"
                    src={item.ImageURL.S}
                  />
                  <div className="category-name">{item.Title.S}</div>
                </div>
              );
            })}
          {Items && Items.length && (Items.length - index < 3) ? (
            [...Array((3 - (Items.length - index)))].map((item) => {
              return (<div className="dummy-cat"></div>)
            })
          ) : null}
        </div>
      );
    }
    return (rows.map((row, index) => {
      return (
        <Carousel.Item key={index}>
          {row}
        </Carousel.Item>
      )
    })
    )
  };


  return (
    <React.Fragment>
      <div className="landingpage-banner">
        <Banner banners={banner} />
      </div>
      <div className="landingpage-container">
        <div>
          {/* <ProductListCarousel
            name="Trending"
            data={props.latestProducts}
            activeCurrency={props.activeCurrency}
            addProductToCart={addToCart}
            addToWishlist={addProductToWish}
            loading={loadingLatest}
          /> */}
          <ProductList
            name="Latest Uploads"
            data={props.latestProducts}
            activeCurrency={props.activeCurrency}
            addProductToCart={addToCart}
            addToWishlist={addProductToWish}
            loading={loadingLatest}
          />
        </div>
        <div className="heading"> Explore by Categories </div>
        {props.searchCategories && props.searchCategories.length ? <Carousel className="prod-carousel" interval={null}>
          {makeItems(props.searchCategories)}
        </Carousel> : null}
        {/* <div className="categories">
          {props.searchCategories.length > 0 &&
            props.searchCategories.map(category => {
              return (
                <div key={category.CategoryId.S} className="category">
                  <img
                    className="category-img"
                    alt="category-img"
                    src={category.ImageURL.S}
                  />
                  <div className="category-name">{category.Title.S}</div>
                </div>
              );
            })}
        </div> */}
        <div className="heading"> Tell Me More </div>
        <div className="landingpage-grid">
          {aboutUsGrid.map((gridItem, index) => {
            const i = index + 1;
            return (
              <div className="grid-flex">
                <div
                  className={
                    [1, 2, 3].includes(i) ? "bottomLine grid-item" : "grid-item"
                  }
                >
                  <img
                    className="grid-image"
                    alt={gridItem.image + "name"}
                    src={require(`../../assets/${gridItem.image}.svg`)}
                  ></img>
                  <span className="grid-title">{gridItem.title}</span>
                  <p className="grid-text">{gridItem.text}</p>
                </div>
                <hr className={i % 3 ? "rightLine" : "none"} />
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchCategories,
      getLatestProductsWithPagination,
      getLandingBanners,
      addProductToCart,
      addToWishlist
    },
    dispatch
  );

const mapStatetoProps = ({ app: { homePage, common } }) => {
  console.log(homePage);
  return {
    searchCategories: homePage.searchCategories,
    latestProducts: homePage.latestProducts,
    activeCurrency: common.activeCurrency
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(LandingPage);
