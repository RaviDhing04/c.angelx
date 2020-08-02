import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { getOrderItems } from "../../store/actions";
import "./OrdersList.scss";
import OrderItem from "../../components/OrderItem/OrderItem";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { Switch } from "react-router-dom";

const OrdersList = props => {
  const [loading, setLoading] = useState(true);
  const [orderProducts, setorderProducts] = useState([]);
  const [pageName, setName] = useState("");
  // let orderProducts = [];
  const { orderItems, productDetails, getOrderItems, activeCurrency } = props;
  const { userId, name } = props.match.params;

  useEffect(() => {
    async function fetchOrderItems() {
      name ? setName(name) : setName("");
      let res;
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
        default:
          break;
      }
      res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    }
    fetchOrderItems();
  }, []);

  return !loading ? (
    <React.Fragment>
      <div className="orderlist-heading">{pageName}</div>
      <Container className="order-page-container" fluid>
        <div className="order-page">
          {orderItems.map(orderItem => {
            return (
              <OrderItem
                key={+orderItem.ProductId.S}
                orderItem={orderItem}
                activeCurrency={activeCurrency}
              />
            );
          })}
        </div>
      </Container>
    </React.Fragment>
  ) : (
      <CustomLoader />
    );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrderItems
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
