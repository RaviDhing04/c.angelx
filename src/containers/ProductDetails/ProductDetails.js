import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getSelectedProductDetails,
  addProductToCart,
  getSavedContacts
} from "../../store/actions";
import { Container, Accordion, Card } from "react-bootstrap";
import { bindActionCreators } from "redux";
import "./ProductDetails.scss";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import formatter from "../../utils/commonUtils/currencyUtils";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import plusIcon from "../../assets/plus.svg";
import deleteIcon from "../../assets/delete_outline.svg";
import downArrow from "../../assets/down-arrow.svg";
import checkmark from "../../assets/checkmark.svg";
import { useAuth } from "../../context/auth";
import { addProductFormFieldsProductType } from "../../constants/constants";

const ProductDetails = props => {
  const { ProductDetails, productId, activeCurrency } = props;
  const {
    ProductSpecifications,
    ProductVariations,
    Description,
    IsDonationCampaign,
    DonationCampaignDetails,
    IsInStock,
    MerchantHandle,
    Name,
    ProductImages,
    Timestamp,
    MerchantId,
    ProductCategory
  } = ProductDetails;

  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState(null);
  const [groupBy, setGroupBy] = useState(false);
  const [group, setGroup] = useState([{}]);
  const [yourContribution, setYourContribution] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedVariation, setSelectedVariation] = useState({});
  const [laybuy_months, setLaybuy_months] = useState(0);
  const [normalPurchase, setNormalPurchase] = useState(true);
  const [layBy, setLayBy] = useState(false);
  const history = useHistory();
  const isAuthenticated = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (+productId !== +props.match.params.productId) {
        const payload = {
          ProductId: props.match.params.productId,
          Timestamp: props.match.params.productTimeStamp
        };
        const res = await props.getSelectedProductDetails(payload);
        res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
      } else {
        setLoading(false)
      }
    }
    fetchData();
  }, [props.match.params.productId]);

  useEffect(() => {
    async function fetchSavedContacts() {
      const res = await props.getSavedContacts({
        "UserEmailId": JSON.parse(localStorage.getItem('userData')).email
      });
      res
        ? setLoading(false)
        : (function () {
          setLoading(false);
          alert("something went wrong, Please try again!");
        })();
    }
    if (isAuthenticated) {
      fetchSavedContacts();
    }
  }, []);

  useEffect(() => {
    if (ProductVariations && ProductVariations.L && ProductVariations.L.length) {
      setSelectedVariation(ProductVariations.L[0]);
    }
  }, [ProductVariations])

  const addToCart = async () => {
    setLoading(true)
    const payload = {
      "ProductId": productId,
      "ProductTimestamp": Timestamp && Timestamp.S,
      "Quantity": "1",
      "CouponCode": coupon,
      "MerchantId": MerchantId && MerchantId.S,
      "SelectedVariation": {
        "AvailableColor": selectedVariation.M.AvailableColor && selectedVariation.M.AvailableColor.S,
        "UnitPrice": selectedVariation.M.UnitPrice && selectedVariation.M.UnitPrice.S,
        "AvailableQuantity": "1",
        "Currency": selectedVariation.M.Currency && selectedVariation.M.Currency.S,
      }
    };
    const res = await props.addProductToCart(payload);
    res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
  };


  const Donate = async () => {
    setLoading(true)
    const payload = {
      "ProductId": productId,
      "ProductTimestamp": Timestamp && Timestamp.S,
      "Quantity": "1",
      "CouponCode": coupon,
      "MerchantId": MerchantId && MerchantId.S

    };
    const res = await props.addProductToCart(payload);
    res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
  };

  const preOrder = async (event) => {
    setLoading(true)
    event.preventDefault();
    const orderType = {
      "order_type": "preorder",
      "product_id": productId,
      "product_timestamp": Timestamp && Timestamp.S,
      "laybuy_months": laybuy_months,
      "product_price": selectedVariation && selectedVariation.M && selectedVariation.M.UnitPrice && selectedVariation.M.UnitPrice.S,
      "qty": quantity,
      "total_amount": selectedVariation && selectedVariation.M && selectedVariation.M.UnitPrice && (selectedVariation.M.UnitPrice.S * quantity),
      "billing_address_id": null,
      "shipping_address_id": null,
      "payment_type": null
    }
    localStorage.setItem('orderType', JSON.stringify(orderType));
    history.push(`/checkout/shipping/${JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId}/${'Shipping'}`);
  };

  const transformImageDataStructure = images => {
    const imgArr =
      images &&
      images.L.map(img => {
        return img.S;
      });
    return imgArr;
  };

  const layByOrder = (event) => {
    event.preventDefault();
    const orderType = {
      "order_type": "laybuy",
      "product_id": productId,
      "product_timestamp": Timestamp && Timestamp.S,
      "laybuy_months": laybuy_months,
      "product_price": selectedVariation && selectedVariation.M && selectedVariation.M.UnitPrice && selectedVariation.M.UnitPrice.S,
      "qty": quantity,
      "total_amount": selectedVariation && selectedVariation.M && selectedVariation.M.UnitPrice && (selectedVariation.M.UnitPrice.S * quantity),
      "billing_address_id": null,
      "shipping_address_id": null,
      "payment_type": null
    }
    localStorage.setItem('orderType', JSON.stringify(orderType));
    history.push(`/checkout/shipping/${JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId}/${'Shipping'}`);
  }

  const groupByOrder = async (event) => {
    event.preventDefault();
    const userShares = {};
    const totalAmount = selectedVariation && selectedVariation.M && selectedVariation.M.UnitPrice && (selectedVariation.M.UnitPrice.S * quantity);
    userShares[JSON.parse(localStorage.getItem('userData')).email] = yourContribution;
    let grpAmount = 0;
    group.forEach((grp) => {
      userShares[grp.email] = grp.amount;
      grpAmount += +grp.amount;
    });
    if (totalAmount !== (+grpAmount + +yourContribution)) {
      alert('Total group contribution should be equal to Total purchase amount i.e. (quantity x Unit Price)');
      return false;
    }
    const orderType = {
      "order_type": "group",
      "product_id": productId,
      "product_timestamp": Timestamp && Timestamp.S,
      "user_shares": userShares,
      "product_price": selectedVariation && selectedVariation.M && selectedVariation.M.UnitPrice && selectedVariation.M.UnitPrice.S,
      "qty": quantity,
      "total_amount": totalAmount,
      "billing_address_id": null,
      "shipping_address_id": null,
      "payment_type": null
    }
    localStorage.setItem('orderType', JSON.stringify(orderType));
    history.push(`/checkout/shipping/${JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId}/${'Shipping'}`);
  }



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
              <ul style={IsDonationCampaign && IsDonationCampaign.S === 'true' ? { "paddingBottom": "9rem" } : {}}>
                <li className="product-name">{Name && Name.S}</li>
                <li className="product-price">
                  {/* <span>{ProductSpecifications.M.Currency.S}</span>{" "} */}
                  {IsDonationCampaign && IsDonationCampaign.S === 'true' ? (formatter(activeCurrency)(
                    DonationCampaignDetails && DonationCampaignDetails.M && DonationCampaignDetails.M.MinDonation && DonationCampaignDetails.M.MinDonation.S
                  ) + " (Minimum Donation Amount)") : formatter(activeCurrency)(
                    selectedVariation && selectedVariation.M && selectedVariation.M.UnitPrice && selectedVariation.M.UnitPrice.S
                  )}
                </li>
                {IsDonationCampaign && IsDonationCampaign.S === 'true' ? <li>
                  <div className="delivery-zip-code">
                    <label>Enter Donation Amount</label>
                    <input type="number" min="1" onChange={(e) => setDonationAmount(e.target.value)} value={donationAmount ? donationAmount : ''} placeholder="Enter Donation Amount" />
                  </div>
                </li> : null}
                {!(IsDonationCampaign && IsDonationCampaign.S === 'true') ? IsInStock.S === "true" ? (<li>
                  <span onClick={() => { setGroupBy(false); setNormalPurchase(true); setLayBy(false); addToCart() }} className="sm-btn bg-blue">
                    Add to cart
                  </span>
                  {isAuthenticated ? <span onClick={() => { setGroupBy(true); setNormalPurchase(false); setLayBy(false); setQuantity(0); }} className="sm-btn bg-black">Group Purchase</span> : null}
                  {isAuthenticated ? <span onClick={() => { setGroupBy(false); setNormalPurchase(false); setLayBy(true); setQuantity(0); }} className="sm-btn bg-grey">Lay buy Order</span> : null}
                </li>) : (<span onClick={(e) => { preOrder(e) }} className="sm-btn bg-blue">
                  Pre Order
                </span>) : <span onClick={() => Donate()} className="sm-btn bg-blue">
                    Donate
                  </span>}
                {groupBy ? <li>
                  <div className="group-by delivery-zip-code">
                    <form onSubmit={(e) => groupByOrder(e)}>
                      <div>
                        <label>Quantity</label>
                        <input type="number" min="1" onChange={(e) => setQuantity(e.target.value)} value={quantity ? quantity : ''} placeholder="Enter" required />
                      </div>
                      <div>
                        <label>Your Contribution</label>
                        <input type="number" min="1" onChange={(e) => setYourContribution(e.target.value)} value={yourContribution ? yourContribution : ''} placeholder="Enter" required />
                      </div>
                      <div>
                        <label>Select a contact to collaborate with:</label>
                        {group && group.length && group.map((item, index) => {
                          let i = index;
                          return (
                            <div>
                              <select onChange={(e) => { group[i]['email'] = e.target.value; setGroup([...group]) }} value={item.email ? item.email : ''} name="contacts" id="contacts" required>
                                <option value="">Select contact</option>
                                {props.contacts.map((contact) => { return (<option value={contact.email}>{contact.email}</option>) })}
                              </select>
                              <input type="number" min="1" onChange={(e) => { group[i]['amount'] = e.target.value; setGroup([...group]) }} value={item.amount ? item.amount : ''} placeholder="Contribution" required />
                              <img onClick={() => setGroup([...group, {}])} className="plus-icon" alt="plus-icon" src={plusIcon}></img>
                              <img onClick={() => { if (group.length > 1) group.splice(i, 1); setGroup([...group]) }} className="delete-icon" alt="delete-icon" src={deleteIcon}></img>
                            </div>
                          )
                        })}
                      </div>
                      <div className="buttons">
                        <button onClick={() => { setGroupBy(false); setNormalPurchase(true); setLayBy(false); }} className="cancelButton">Cancel</button>
                        <button className="saveButton" type="submit">Confirm</button>
                      </div>
                    </form>
                  </div>
                </li> : null}
                {layBy ? <li>
                  <div className="group-by delivery-zip-code">
                    <form onSubmit={(e) => layByOrder(e)}>
                      <div>
                        <label>Quantity</label>
                        <input type="number" min="1" onChange={(e) => setQuantity(e.target.value)} value={quantity ? quantity : ''} placeholder="Enter Quantity" required />
                      </div>
                      <div>
                        <label>Laybuy months</label>
                        <input type="number" min="1" onChange={(e) => setLaybuy_months(e.target.value)} value={laybuy_months ? laybuy_months : ''} placeholder="Enter Laybuy Months" required />
                      </div>
                      <div className="buttons">
                        <button onClick={() => { setGroupBy(false); setNormalPurchase(true); setLayBy(false); }} className="cancelButton">Cancel</button>
                        <button className="saveButton" type="submit">Confirm</button>
                      </div>
                    </form>
                  </div>
                </li> : null}
                {!(IsDonationCampaign && IsDonationCampaign.S === 'true') ? <li>
                  <div className="delivery-zip-code">
                    <label>Enter Coupon Code</label>
                    <input type="text" onChange={(e) => setCoupon(e.target.value)} placeholder="Enter coupon code" />
                  </div>
                </li> : null}
                {!(IsDonationCampaign && IsDonationCampaign.S === 'true') ? <li>
                  <div className="sub-head">Color</div>
                  <div className="color-palette">
                    {ProductVariations.L.map((variation, index) => {
                      return <span key={index} onClick={() => setSelectedVariation(variation)} style={{ "backgroundColor": variation.M && variation.M.AvailableColor && variation.M.AvailableColor.S }} className={variation.M && variation.M.AvailableColor && variation.M.AvailableColor.S === selectedVariation.M.AvailableColor.S ? "palette-box active" : "palette-box"}></span>
                    })
                    }
                  </div>
                </li> : null}
                {!(IsDonationCampaign && IsDonationCampaign.S === 'true') ? <li>
                  {/* <div className="sub-head">Availibility</div> */}
                  <div className={IsInStock && IsInStock.S === "true" ? "in-stock stock-info" : "out-of-stock stock-info"}>
                    {IsInStock && IsInStock.S === "true" ? "In Stock" : "Out Of Stock"}
                  </div>
                </li> : null}
                <li>
                  <div className="sub-head">{IsDonationCampaign && IsDonationCampaign.S === 'true' ? "NPO" : "Seller"}</div>
                  <div className="seller-reating">
                    <Nav className="flex-column">
                      <Nav.Link
                        as={Link}
                        to={{
                          pathname: `/merchantHome/viewAllProducts/${"Latest Uploads"}/${MerchantId.S}`,
                          state: {
                            fromUser: true
                          }
                        }}
                      >
                        {MerchantHandle.S}{1 ? <img
                          className="nav-icon"
                          alt="checkmark"
                          src={checkmark}
                        ></img> : null}
                      </Nav.Link>
                    </Nav>
                    {/* <a href=""></a> */}
                  </div>
                </li>
              </ul>
              <Accordion className="description-accordian">
                <Card>
                  <Accordion.Toggle as={Card.Header} className="prod-details" eventKey="0">
                    {IsDonationCampaign && IsDonationCampaign.S === 'true' ? "Cause Details" : "Product Details"}
                    <img
                      className="nav-icon"
                      alt="downArrow-icon"
                      src={downArrow}
                    ></img>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <div style={{ "fontWeight": "bold", "fontSize": "1.25rem" }} className="sub-head">{IsDonationCampaign && IsDonationCampaign.S === 'true' ? "Cause Description" : "Product Description"}</div>
                      {Description && Description.S}
                      {!(IsDonationCampaign && IsDonationCampaign.S === 'true') && ProductSpecifications && ProductSpecifications.M ? <div style={{ "fontWeight": "bold", "fontSize": "1.25rem", "marginTop": "0.5rem" }} className="sub-head">Product Specifications</div> : null}
                      {ProductSpecifications && ProductSpecifications.M ? (
                        ProductCategory && ProductCategory.S && addProductFormFieldsProductType[ProductCategory.S] && addProductFormFieldsProductType[ProductCategory.S].length && addProductFormFieldsProductType[ProductCategory.S].map((item, index) => {
                          return (
                            ProductSpecifications.M[item] ? (<div key={index}>
                              <span>{item}</span> : <span>{ProductSpecifications.M[item].S}</span>
                            </div>) : null
                          )
                        })
                      ) : null}
                      {ProductSpecifications.M['productDimensions'] && ProductSpecifications.M['productDimensions'].M ? (["Height", "Width", "Length", "Depth", "Weight"].map((item, index) => {
                        return (
                          ProductSpecifications.M['productDimensions'].M[item] ? (<div key={index}>
                            <span>{item}</span> : <span>{ProductSpecifications.M['productDimensions'].M[item].S}</span>
                          </div>) : null
                        )
                      })) : null}
                      {ProductSpecifications.M['AvailableSizes'] && ProductSpecifications.M['AvailableSizes'].L && ProductSpecifications.M['AvailableSizes'].L.length ?
                        <div>
                          <span>AvailableSizes</span> : <span>{ProductSpecifications.M['AvailableSizes'].L.join(', ')}</span>
                        </div>
                        : null}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </div>
        </React.Fragment>
      ) : (
          <CustomLoader />
        )
      }
    </Container >
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSelectedProductDetails,
      addProductToCart,
      getSavedContacts
    },
    dispatch
  );

const mapStatetoProps = ({ app: { productDetailsPage, common, contactPage } }) => {
  console.log(productDetailsPage);
  return {
    ProductDetails: productDetailsPage.selectedProductDetails,
    productId: productDetailsPage.selectedProductId,
    activeCurrency: common.activeCurrency,
    contacts: contactPage.contacts,
  };
};

export default withRouter(
  connect(mapStatetoProps, mapDispatchToProps)(ProductDetails)
);
