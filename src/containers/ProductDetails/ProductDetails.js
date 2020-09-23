import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getSelectedProductDetails,
  addProductToCart,
  getSavedContacts,
  publishViralDonations
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
import upArrow from "../../assets/up-arrow.svg";
import checkmark from "../../assets/checkmark.png";
import { useAuth } from "../../context/auth";
import { addProductFormFieldsProductType, displayNameMap } from "../../constants/constants";
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

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
    ProductCategory,
    VerificationStatus
  } = ProductDetails;

  const [loading, setLoading] = useState(true);
  const [toggleArrow, setToggleArrow] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [groupBy, setGroupBy] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [group, setGroup] = useState([{}]);
  const [yourContribution, setYourContribution] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationContacts, setDonationContacts] = useState([]);
  const [viralDonate, setViralDonate] = useState(false);
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
    window.onclick = function (e) {
      if (!(e.target.matches('.drop-down-alike') || e.target.matches('.custom-dropdown') || e.target.matches('.custom-select-option') || e.target.matches('.abc'))) {
        setShowOptions(false);
      }
    }
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
    res ? setLoading(false) : (function () { setLoading(false); }());
  };


  const Donate = async () => {
    setLoading(true)
    const orderType = {
      "product_id": productId,
      // "Quantity": "1",
      // "MerchantId": MerchantId && MerchantId.S,
      "order_type": "DONATION",
      "billing_address_id": null,
      "shipping_address_id": null,
      "payment_type": null,
      "unitPrice": donationAmount,
      "SelectedColor": null,
    };
    localStorage.setItem('orderType', JSON.stringify(orderType));
    history.push(`/checkout/shipping/${JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId}/${'Shipping'}`);
  };

  const preOrder = async (event) => {
    setLoading(true)
    event.preventDefault();
    const orderType = {
      "order_type": "PREORDER",
      "product_id": productId,
      "unitPrice": selectedVariation && selectedVariation.M && selectedVariation.M.UnitPrice && selectedVariation.M.UnitPrice.S,
      "qty": 1,
      "coupon_code": coupon,
      "discountedPrice": selectedVariation && selectedVariation.M && selectedVariation.M.UnitPrice && selectedVariation.M.UnitPrice.S,
      "SelectedColor": selectedVariation && selectedVariation.M && selectedVariation.M.AvailableColor && selectedVariation.M.AvailableColor.S,
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
      "payment_type": null,
      "coupon_code": coupon,
      "SelectedColor": selectedVariation && selectedVariation.M && selectedVariation.M.AvailableColor && selectedVariation.M.AvailableColor.S,
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
      "payment_type": null,
      "coupon_code": coupon,
      "SelectedColor": selectedVariation && selectedVariation.M && selectedVariation.M.AvailableColor && selectedVariation.M.AvailableColor.S,
    }
    localStorage.setItem('orderType', JSON.stringify(orderType));
    history.push(`/checkout/shipping/${JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId}/${'Shipping'}`);
  }

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      setToggleArrow(!toggleArrow)
    );

    return (
      // <button
      //   type="button"
      //   style={{ backgroundColor: 'pink' }}
      //   onClick={decoratedOnClick}
      // >
      <div className="prod-details" onClick={decoratedOnClick}>
        {children}
      </div>
      // </button>
    );
  }

  function onOptionsChange(selectedOptions) {
    setDonationContacts(selectedOptions);
  }

  const sendViralDonations = async () => {
    if (donationContacts && donationContacts.length) {
      setLoading(true);
      const res = await props.publishViralDonations({
        "UserEmailId": donationContacts,
        "NotificationType": "Viral Donation",
        "Message": "Checkout this campaign",
        "Message1": window.location.href
      });
      res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    } else {
      alert('No contacts selected.');
    }

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
              <ul style={IsDonationCampaign && IsDonationCampaign.S === 'true' ? { "paddingBottom": "7.5rem" } : (IsInStock && IsInStock.S === "true" ? {} : { "paddingBottom": "8rem" })} >
                <li className="product-name">{Name && Name.S}</li>
                <li className="product-price">
                  {/* <span>{ProductSpecifications.M.Currency.S}</span>{" "} */}
                  {IsDonationCampaign && IsDonationCampaign.S === 'true' ? (formatter(activeCurrency)(
                    DonationCampaignDetails && DonationCampaignDetails.M && DonationCampaignDetails.M.MinDonation && DonationCampaignDetails.M.MinDonation.S
                  ) + " (Minimum Donation Amount)") : formatter(activeCurrency)(
                    selectedVariation && selectedVariation.M && selectedVariation.M.UnitPrice && selectedVariation.M.UnitPrice.S
                  )}
                </li>
                {IsDonationCampaign && IsDonationCampaign.S === 'true' && !viralDonate ? <li>
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
                </span>) : (!viralDonate ? <li>
                  <span onClick={() => Donate()} style={{ "marginBottom": "2rem" }} className="sm-btn bg-blue">
                    Donate
                  </span>
                  <span onClick={() => setViralDonate(true)} style={{ "marginBottom": "2rem" }} className="sm-btn bg-blue">
                    Viral Donation
                </span>
                </li> : null)}
                {viralDonate ? <li style={{ "marginTop": "5.5rem" }}>
                  <div className="group-by delivery-zip-code">
                    <div>
                      <label>Select contacts to share with:</label>
                      <div onClick={() => setShowOptions(!showOptions)} className="drop-down-alike"> Select contacts </div>
                      {showOptions ? <MultiSelect
                        options={props.contacts.map((contact) => contact.email)}
                        onOptionsChange={onOptionsChange}
                      /> : null}
                    </div>

                    <div className="buttons" style={{ "marginLeft": "2rem", "marginTop": "1.6rem" }}>
                      <button onClick={() => { setViralDonate(false); }} className="cancelButton">Cancel</button>
                      <button className="saveButton" onClick={() => { sendViralDonations() }} type="submit">Confirm</button>
                    </div>
                  </div>
                </li> : null}
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
                        <select onChange={(e) => setLaybuy_months(e.target.value)} name="lay_months" id="contacts" required>
                          <option value="">Select Laybuy months</option>
                          {['03 Months', '06 Months', '09 Months', '12 Months'].map((month) => { return (<option value={month.split(' ')[0]}>{month}</option>) })}
                        </select>
                      </div>
                      <div className="buttons">
                        <button onClick={() => { setGroupBy(false); setNormalPurchase(true); setLayBy(false); }} className="cancelButton">Cancel</button>
                        <button className="saveButton" type="submit">Confirm</button>
                      </div>
                    </form>
                  </div>
                </li> : null}
                {!(IsDonationCampaign && IsDonationCampaign.S === 'true') ? IsInStock.S === "true" ? <li>
                  <div className="delivery-zip-code">
                    <label>Enter Coupon Code</label>
                    <input type="text" onChange={(e) => setCoupon(e.target.value)} placeholder="Enter coupon code" />
                  </div>
                </li> : null : null}
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
                        {MerchantHandle.S}{VerificationStatus.S === 'Verified' ? <img
                          className="nav-icon"
                          style={{
                            "width": "1.5rem",
                            "height": "1.5rem",
                            "marginLeft": "0.25rem"
                          }}
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
                  <Card.Header>
                    <CustomToggle eventKey="0">
                      {IsDonationCampaign && IsDonationCampaign.S === 'true' ? "Cause Details" : "Product Details"}
                      {!toggleArrow ? <img
                        className="nav-icon"
                        alt="downArrow-icon"
                        src={downArrow}
                      ></img> : <img
                        className="nav-icon"
                        alt="downArrow-icon"
                        style={{ "width": "0.8rem", "height": "0.8rem" }}
                        src={upArrow}
                      ></img>}
                    </CustomToggle>
                  </Card.Header>
                  {/* <Accordion.Toggle  as={Card.Header} > */}

                  {/* </Accordion.Toggle> */}
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <div style={{ "fontWeight": "bold", "fontSize": "1.25rem" }} className="sub-head">{IsDonationCampaign && IsDonationCampaign.S === 'true' ? "Cause Description" : "Product Description"}</div>
                      {Description && Description.S}
                      {!(IsDonationCampaign && IsDonationCampaign.S === 'true') && ProductSpecifications && ProductSpecifications.M ? <div style={{ "fontWeight": "bold", "fontSize": "1.25rem", "marginTop": "0.5rem" }} className="sub-head">Product Specifications</div> : null}
                      {ProductSpecifications && ProductSpecifications.M ? (
                        ProductCategory && ProductCategory.S && addProductFormFieldsProductType[ProductCategory.S] && addProductFormFieldsProductType[ProductCategory.S].length && addProductFormFieldsProductType[ProductCategory.S].map((item, index) => {
                          return (
                            ProductSpecifications.M[item] ? (<div key={index}>
                              <span>{displayNameMap[item] ? displayNameMap[item] : item}</span> : <span>{ProductSpecifications.M[item].S}</span>
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
                          <span>Available Sizes</span> : <span>{ProductSpecifications.M['AvailableSizes'].L.map((size) => size.S)}</span>
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
      getSavedContacts,
      publishViralDonations
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







class Option extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: false }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    this.setState(
      prevState => ({ selected: !prevState.selected }),
      () => this.props.onOptionChange(this.props.option, this.state.selected)
    )
  }

  render() {
    return (
      <div className="custom-select-option">
        <input
          className="abc"
          type="checkbox"
          id={this.props.option}
          name="option name"
          value={this.props.option}
          onChange={this.handleChange}
          checked={this.state.selected}
        />
        <label className="abc" htmlFor={this.props.option}>{this.props.option}</label>
      </div>
    )
  }
}

class MultiSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selectedOptions: [] }
    this.onOptionsChange = this.onOptionsChange.bind(this)
  }

  onOptionsChange(option, selected) {
    if (selected) {
      this.setState(
        prevState => {
          prevState.selectedOptions.push(option)
          return {
            selectedOptions: prevState.selectedOptions,
          }
        },
        () => this.props.onOptionsChange(this.state.selectedOptions)
      )
    } else {
      this.setState(
        prevState => {
          const index = prevState.selectedOptions.indexOf(option)
          if (index > -1) {
            prevState.selectedOptions.splice(index, 1)
          }
          return {
            selectedOptions: prevState.selectedOptions,
          }
        },
        () => this.props.onOptionsChange(this.state.selectedOptions)
      )
    }
  }

  render() {
    return (
      <fieldset className="custom-dropdown">
        {this.props.options.map((option, index) => (
          <Option option={option} onOptionChange={this.onOptionsChange} />
        ))}
      </fieldset>
    )
  }
}

