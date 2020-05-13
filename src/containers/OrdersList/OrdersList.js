import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { getOrderItems } from "../../store/actions";
import "./OrdersList.scss";
import OrderItem from "../../components/OrderItem/OrderItem";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const OrdersList = props => {
  const [loading, setLoading] = useState(true);
  const [orderProducts, setorderProducts] = useState([]);
  // let orderProducts = [];
  const { orderItems, productDetails } = props;

  useEffect(() => {
    async function fetchOrderItems() {
      const userId = props.match.params.userId;
      const res = await props.getOrderItems({ UserId: userId });
      res ? setLoading(false) : console.log("err");
    }
    fetchOrderItems();
  }, []);

  useEffect(() => {
    const makeOrderProduct = () => {
      let out = [];
      orderItems &&
        orderItems.forEach(orderItem => {
          productDetails &&
            productDetails.forEach(product => {
              if (orderItem.ProductId.S === product.ProductId.S) {
                out.push({
                  UserId: orderItem.UserId,
                  Quantity: orderItem.Quantity,
                  ...product
                });
              }
            });
        });
      return out;
    };
    setorderProducts(makeOrderProduct());
  }, [orderItems, productDetails]);

  return !loading ? (
    <React.Fragment>
      <div className="product-row-heading">Product Info</div>
      <Container className="order-page-container" fluid>
        <div className="order-page">
          {orderProducts.map(orderItem => {
            return (
              <OrderItem key={+orderItem.ProductId.S} orderItem={orderItem} />
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

const mapStatetoProps = ({ app: { ordersListPage } }) => {
  console.log(ordersListPage);
  return {
    orderItems: ordersListPage.orderItems.Items,
    productDetails: ordersListPage.orderProductDetails.Items
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(OrdersList);
