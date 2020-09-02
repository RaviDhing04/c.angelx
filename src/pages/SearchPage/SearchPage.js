import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Row } from "react-bootstrap";
import { addToWishlist, addProductToCart, headerSearch, searchMerchants } from "../../store/actions";
import Product from "../../components/Product/Product";
import ProductListCarousel from "../../components/ProductListCarousel/ProductListCarousel";
import "./SearchPage.scss";

const SearchPage = props => {
    const [resloadingProd, setResProds] = useState(true);
    const [resloadingMerch, setResMerch] = useState(true);
    const [products, setProducts] = useState([]);
    const [merchants, setMerchants] = useState([]);

    const { text, selectedCategory } = props.match.params;

    useEffect(() => {
        const fetchproductsData = async () => {
            const resProd = await props.headerSearch(text, (selectedCategory == 'x' ? '' : selectedCategory));
            if (resProd) {
                setResProds(false);
                setProducts(resProd);
            }
        }
        const fetchmerchantsData = async () => {
            const resMerch = await props.searchMerchants(text, (selectedCategory == 'x' ? '' : selectedCategory));
            if (resMerch) {
                setResMerch(false);
                setMerchants(resMerch);
            }
        }
        fetchproductsData();
        fetchmerchantsData();
    }, [text, selectedCategory]);


    const addToCart = async (payload) => {
        const res = await props.addProductToCart(payload);
    }

    const addProductToWish = async (payload) => {
        const res = await props.addToWishlist(payload);
    }

    const styl = {
        "paddingRight": "4.0625rem",
        "paddingLeft": "0.625rem"
    }

    return (
        <React.Fragment>
            <Container fluid style={styl}>
                <ProductListCarousel name="Searched Products" loading={resloadingProd} data={products} activeCurrency={props.activeCurrency} addToWishlist={addProductToWish} addProductToCart={addToCart} />
                <ProductListCarousel name="Searched Merchants" loading={resloadingMerch} data={merchants} activeCurrency={props.activeCurrency} addToWishlist={addProductToWish} addProductToCart={addToCart} />
                </Container>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            addToWishlist,
            addProductToCart,
            headerSearch,
            searchMerchants
        },
        dispatch
    );

const mapStatetoProps = ({ app: { viewAllProductPage, common, manageBusiness } }) => {
    console.log(viewAllProductPage);
    return {
        activeCurrency: common.activeCurrency,
    };
};

export default withRouter(
    connect(mapStatetoProps, mapDispatchToProps)(SearchPage)
);
