import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Loadable from "react-loadable";
import { connect } from "react-redux";

const LoadingFallback = props => {
  if (props.error) {
    console.log(props.error);
  }
  return null;
};

const AsyncHome = Loadable({
  loader: () =>
    import(/* webpackChunkName: "PageSwitcher" */ "../pages/Home/Home"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["HomePage"]
});

const AsyncCart = Loadable({
  loader: () =>
    import(/* webpackChunkName: "PageSwitcher" */ "../pages/Cart/Cart"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["CartPage"]
});

const AsyncHomeProductList = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "PageSwitcher" */ "../containers/HomeProductList/HomeProductList"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["ProductList"]
});

const AsyncHomeProductDetails = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "PageSwitcher" */ "../containers/ProductDetails/ProductDetails"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["ProductDetails"]
});

const AsyncHomeOrdersList = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "PageSwitcher" */ "../containers/OrdersList/OrdersList"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["OrdersList"]
});

export const parent_routes = [
  {
    path: "/home",
    component: AsyncHome,
    exact: false
  },
  {
    path: "/cart/:userId",
    component: AsyncCart,
    exact: false
  }
];

export const child_routes = [
  {
    path: "/home",
    component: AsyncHomeProductList,
    exact: true
  },
  {
    path: "/home/productDetail/:productId/:productTimeStamp",
    component: AsyncHomeProductDetails,
    exact: true
  },
  {
    path: "/home/ordersList/:userId",
    component: AsyncHomeOrdersList,
    exact: true
  }
];

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { routes } = this.props;
    return (
      <>
        {/* <Route path="/" component={AsyncHome} key="/home" exact /> */}
        {routes.map((r, i) => (
          <Route path={r.path} component={r.component} key={i} exact={r.exact}/>
        ))}
        {/* </Switch> */}
      </>
    );
  }
}

export default withRouter(connect()(Router));
