import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getSelectedProductDetails,
  addProductToCart
} from "../../store/actions";
import { Container, Accordion, Card } from "react-bootstrap";
import { bindActionCreators } from "redux";
import "./ProductDetails.scss";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import formatter from "../../utils/commonUtils/currencyUtils";

const ProductDetails = props => {
  const { ProductDetails, productId, activeCurrency } = props;
  const {
    Description,
    IsDonationCampaign,
    MerchantHandle,
    Name,
    ProductImages,
    ProductSpecifications
  } = ProductDetails;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (+productId !== +props.match.params.productId) {
        const payload = {
          ProductId: props.match.params.productId,
          Timestamp: props.match.params.productTimeStamp
        };
        const res = await props.getSelectedProductDetails(payload);
        res ? setLoading(false) : (function() {setLoading(false); (alert('something went wrong, Please try again!'))} ());
      }
    }
    fetchData();
  }, []);

  const addToCart = async () => {
    const payload = {
      ProductId: productId,
      UserId: "1588433471165",
      Quantity: "1"
    };
    const res = await props.addProductToCart(payload);
  };

  const transformImageDataStructure = images => {
    const imgArr =
      images &&
      images.L.map(img => {
        return img.S;
      });
    return imgArr;
  };

  return (
    <Container fluid>
      {!loading ? (
        <React.Fragment>
          <div className="product-detail-heading">Product Info</div>
          <div className="product-wrapper">
            {/* <div className="product-image"> */}
            <ProductSlider
              images={transformImageDataStructure(ProductImages)}
            />
            {/* </div> */}
            <div className="product-details">
              <ul>
                <li className="product-name">{Name.S}</li>
                <li className="product-price">
                  <span>{ProductSpecifications.M.Currency.S}</span>{" "}
                  {formatter(activeCurrency)(
                    ProductSpecifications.M.UnitPrice.S
                  )}
                </li>
                <li>
                  <span className="price-discount">8000</span>
                </li>
                <li>
                  <span onClick={addToCart} className="sm-btn bg-blue">
                    Add to cart
                  </span>
                  <span className="sm-btn bg-black">Group Purchase</span>
                  <span className="sm-btn bg-grey">Lay buy Order</span>
                </li>
                <li>
                  <div className="delivery-zip-code">
                    <label>Delivery to</label>
                    <input type="text" placeholder="Enter zip code" />
                  </div>
                </li>
                <li>
                  <div className="sub-head">Color</div>
                  <div className="color-palette">
                    <a href="" className="palette-box bg-white"></a>
                    <a href="" className="palette-box bg-blue"></a>
                    <a href="" className="palette-box bg-black"></a>
                    <a href="" className="palette-box bg-brown"></a>
                  </div>
                </li>
                <li>
                  <div className="sub-head">Seller</div>
                  <div className="seller-reating">
                    <a href="">{MerchantHandle.S}</a>
                  </div>
                </li>
              </ul>
              <Accordion className="description-accordian">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    Product Details
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>{Description.S}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <CustomLoader />
      )}
    </Container>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSelectedProductDetails,
      addProductToCart
    },
    dispatch
  );

const mapStatetoProps = ({ app: { productDetailsPage, common } }) => {
  console.log(productDetailsPage);
  return {
    ProductDetails: productDetailsPage.selectedProductDetails,
    productId: productDetailsPage.selectedProductId,
    activeCurrency: common.activeCurrency
  };
};

export default withRouter(
  connect(mapStatetoProps, mapDispatchToProps)(ProductDetails)
);
