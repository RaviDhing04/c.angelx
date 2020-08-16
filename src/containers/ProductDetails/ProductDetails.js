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
import { useAuth } from "../../context/auth";

const ProductDetails = props => {
  const { ProductDetails, productId, activeCurrency } = props;
  const {
    Description,
    IsDonationCampaign,
    MerchantHandle,
    Name,
    ProductImages,
    ProductSpecifications,
    Timestamp,
    MerchantId
  } = ProductDetails;

  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState(null);
  const [groupBy, setGroupBy] = useState(false);
  const [group, setGroup] = useState([{}]);
  const [yourContribution, setYourContribution] = useState(0);
  const [quantity, setQuantity] = useState(0);
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

  const addToCart = async () => {
    setLoading(true)
    const payload = {
      "ProductId": productId,
      "ProductTimestamp": Timestamp.S,
      "Quantity": "1",
      "CouponCode": coupon,
      "MerchantId": MerchantId.S

    };
    const res = await props.addProductToCart(payload);
    res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
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
      "product_timestamp": Timestamp.S,
      "laybuy_months": laybuy_months,
      "product_price": ProductSpecifications.M.UnitPrice.S,
      "qty": quantity,
      "total_amount": ProductSpecifications.M.UnitPrice.S * quantity,
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
    const totalAmount = ProductSpecifications && ProductSpecifications.M && ProductSpecifications.M.UnitPrice && ProductSpecifications.M.UnitPrice.S * quantity;
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
      "product_timestamp": Timestamp.S,
      "user_shares": userShares,
      "product_price": ProductSpecifications.M.UnitPrice.S,
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
              <ul>
                <li className="product-name">{Name.S}</li>
                <li className="product-price">
                  {/* <span>{ProductSpecifications.M.Currency.S}</span>{" "} */}
                  {formatter(activeCurrency)(
                    ProductSpecifications.M.UnitPrice.S
                  )}
                </li>
                <li>
                  {/* <span className="price-discount">8000</span> */}
                </li>
                <li>
                  <span onClick={() => { setGroupBy(false); setNormalPurchase(true); setLayBy(false); addToCart() }} className="sm-btn bg-blue">
                    Add to cart
                  </span>
                  {isAuthenticated ? <span onClick={() => { setGroupBy(true); setNormalPurchase(false); setLayBy(false); setQuantity(0); }} className="sm-btn bg-black">Group Purchase</span> : null}
                  {isAuthenticated ? <span onClick={() => { setGroupBy(false); setNormalPurchase(false); setLayBy(true); setQuantity(0); }} className="sm-btn bg-grey">Lay buy Order</span> : null}
                </li>
                {/* <li>
                  <div className="delivery-zip-code">
                    <label>Delivery to</label>
                    <input type="text" placeholder="Enter zip code" />
                  </div>
                </li> */}
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
                              <select onChange={(e) => { group[i]['email'] = e.target.value; setGroup([...group]) }} name="contacts" id="contacts" required>
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
                {1 ? <li>
                  <div className="delivery-zip-code">
                    <label>Enter Coupon Code</label>
                    <input type="text" onChange={(e) => setCoupon(e.target.value)} placeholder="Enter coupon code" />
                  </div>
                </li> : null}
                <li>
                  <div className="sub-head">Color</div>
                  <div className="color-palette">
                    {ProductSpecifications.M.AvailableColors.S.split(' ').map((color, index) => {
                      return <span key={index} style={{ "backgroundColor": color }} className="palette-box"></span>
                    })
                    }
                  </div>
                </li>
                <li>
                  <div className="sub-head">Seller</div>
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
                        {MerchantHandle.S}
                      </Nav.Link>
                    </Nav>
                    {/* <a href=""></a> */}
                  </div>
                </li>
              </ul>
              <Accordion className="description-accordian">
                <Card>
                  <Accordion.Toggle as={Card.Header} className="prod-details" eventKey="0">
                    Product Details
                    <img
                      className="nav-icon"
                      alt="downArrow-icon"
                      src={downArrow}
                    ></img>
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
