import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { getOrderItems, clearUserOrderList } from "../../store/actions";
import "./OrdersList.scss";
import OrderItem from "../../components/OrderItem/OrderItem";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { Switch } from "react-router-dom";

const OrdersList = props => {
  const [loading, setLoading] = useState(true);
  const [pageName, setName] = useState("");
  // let orderProducts = [];
  const { orderItems, getOrderItems, activeCurrency } = props;
  const { userId, name } = props.match.params;

  const fetchData = async () => {
    name ? setName(name) : setName("");
    let res;
    setLoading(true);
    switch (name) {
      case 'Pending in Total':
        res = await getOrderItems({ UserId: userId, "OrderType": "CART" });
        break;
      case 'Lay Buys in Total':
        res = await getOrderItems({ UserId: userId, "OrderType": "LAYBUY" });
        break;
      case 'Group Buys in Total':
        res = await getOrderItems({ UserId: userId, "OrderType": "GROUP" });
        break;
      case 'Donations':
        res = await getOrderItems({ UserId: userId, "OrderType": "DONATION" });
        break;
      default:
        break;
    }
    res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());

  }

  useEffect(() => {
    fetchData();
    return () => {
      props.clearUserOrderList();
    }
  }, [name]);

  return !loading ? (
    <React.Fragment>
      <div className="orderlist-heading">{pageName}</div>
      {orderItems && orderItems.length === 0 ? (
        <React.Fragment>
          {/* <div className="product-row-heading">{name}</div> */}
          <div className="not-found" style={{ 'marginTop': '3rem', 'textAlign': 'left' }}> No records found</div>
        </React.Fragment>
      ) :
        <Container className="order-page-container" fluid>
          <div className="order-page">
            {orderItems && orderItems.map((Item) => {
              return (Item.ProductDetails && Item.ProductDetails.L && Item.ProductDetails.L.map((orderItem, index) => {
                return (
                  <OrderItem
                    // +orderItem.FinalPaymentId
                    key={index}
                    orderItem={orderItem.M}
                    orderStatus={Item.OrderStatus}
                    activeCurrency={activeCurrency}
                  />
                );
              })
              );
            })}
          </div>
        </Container>}
    </React.Fragment>
  ) : (
      <CustomLoader />
    );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrderItems,
      clearUserOrderList
    },
    dispatch
  );

const mapStatetoProps = ({ app: { ordersListPage, common } }) => {
  console.log(ordersListPage);
  return {
    orderItems: ordersListPage.orderItems,
    activeCurrency: common.activeCurrency
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(OrdersList);

