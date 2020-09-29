import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container } from "react-bootstrap";
import { getPreviewProductsWithPagination, getSponsoredProductsWithPagination, getWishlistProductsWithPagination, addProductToCart, addToWishlist, getLandingBanners } from "../../store/actions";
import "./MobileHome.scss";
import ProductListMobile from "../../components/ProductListMobile/ProductListMobile";
import Banner from "../../components/Banner/Banner";

const MobileHome = props => {
    const [loadingLatest, setLoadingLatest] = useState(true);
    const [loadingSponsored, setLoadingSponsored] = useState(true);
    const [loadingWishlist, setLoadingWishlist] = useState(true);
    const [banner, setBanners] = useState(null);
    useEffect(() => {
        const fetchPreviewProducts = async () => {
            const resLatest = await props.getPreviewProductsWithPagination();
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
        const getBanner = async () => { setBanners([await props.getLandingBanners()]) };
        getBanner();
        fetchPreviewProducts();
        fetchSponsoredProducts();
        fetchWishlistProducts();
    }, []);

    const addToCart = async (payload, type) => {

        // const res = await props.addProductToCart(payload);
        // if (res && type) {
        //     props.getWishlistProductsWithPagination({ UserId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId });
        // }
    }

    const addProductToWish = async (payload) => {
        // const res = await props.addToWishlist(payload);
        // if (res) {
        //     props.getWishlistProductsWithPagination({ UserId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId });
        // }
    }

    const styl = {
        "paddingTop": "4rem",
        "background": "aqua",
        "paddingBottom": "3rem",
        "borderRadius": "5rem 5rem 0rem 0rem",
        "marginTop": "4rem"
    }

    const styl1 = {
        "paddingTop": "4rem",
        "background": "#122c8a",
        "paddingBottom": "3rem",
        "borderRadius": "5rem 5rem 0rem 0rem",
        "marginTop": "4rem"
    }

    return (
        <React.Fragment>
            <div className={"mobileHome"}>
                <div className="landingpage-banner">
                    <Banner banners={banner} />
                </div>
                <Container fluid style={styl}>
                    <ProductListMobile name="Sponsored" loading={loadingSponsored} data={props.sponsoredProducts} activeCurrency={props.activeCurrency} addToWishlist={addProductToWish} addProductToCart={addToCart} />
                </Container>
                <Container fluid style={styl1}>
                    <ProductListMobile
                        name="Preview"
                        data={props.previewProducts}
                        activeCurrency={props.activeCurrency}
                        addProductToCart={addToCart}
                        addToWishlist={addProductToWish}
                        loading={loadingLatest}
                    />
                </Container>
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getPreviewProductsWithPagination,
            getSponsoredProductsWithPagination,
            getWishlistProductsWithPagination,
            addProductToCart,
            addToWishlist,
            getLandingBanners
        },
        dispatch
    );

const mapStatetoProps = ({ app: { homePage, common } }) => {
    console.log(homePage);
    return {
        previewProducts: homePage.previewProducts,
        sponsoredProducts: homePage.sponsoredProducts,
        wishlistProducts: homePage.wishlistProducts,
        activeCurrency: common.activeCurrency
    };
};
export default connect(mapStatetoProps, mapDispatchToProps)(MobileHome);