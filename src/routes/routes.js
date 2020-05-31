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
    import(/* webpackChunkName: "HomePage" */ "../pages/Home/Home"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["HomePage"]
});

const AsyncCart = Loadable({
  loader: () =>
    import(/* webpackChunkName: "CartPage" */ "../pages/Cart/Cart"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["CartPage"]
});

const AsyncManageBusiness = Loadable({
  loader: () =>
    import(/* webpackChunkName: "CartPage" */ "../pages/AllBusiness/AllBusiness"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["ManageBusiness"]
});

const AsyncMerchantHome = Loadable({
  loader: () =>
    import(/* webpackChunkName: "MerchantPage" */ "../pages/MerchantHome/MerchantHome"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["MerchantPage"]
});

const AsyncAboutUs = Loadable({
  loader: () =>
    import(/* webpackChunkName: "AboutUs" */ "../pages/AboutUs/AboutUs"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["AboutUs"]
});

const AsyncSupport = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Support" */ "../pages/Support/Support"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["Support"]
});

const AsyncRegisterBusiness = Loadable({
  loader: () =>
    import(/* webpackChunkName: "RegisterBusiness" */ "../pages/RegisterBusiness/RegisterBusiness"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["RegisterBusiness"]
});

const AsyncHomeProductList = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ProductList" */ "../containers/HomeProductList/HomeProductList"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["ProductList"]
});

const AsyncHomeProductDetails = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ProductDetails" */ "../containers/ProductDetails/ProductDetails"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["ProductDetails"]
});

const AsyncHomeOrdersList = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "OrdersList" */ "../containers/OrdersList/OrdersList"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["OrdersList"]
});

const AsyncHomeMyContacts = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "MyContacts" */ "../containers/AddContacts/AddContacts"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["MyContacts"]
});

const AsyncHomeViewAllProducts = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ViewAllProducts" */ "../containers/ViewAllProducts/ViewAllProducts"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["ViewAllProducts"]
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
  },
  {
    path: "/manageBusiness/:userId",
    component: AsyncManageBusiness,
    exact: false
  },
  {
    path: "/merchantHome",
    component: AsyncMerchantHome,
    exact: false
  },
  {
    path: "/aboutUs",
    component: AsyncAboutUs,
    exact: false
  },
  {
    path: "/support",
    component: AsyncSupport,
    exact: false
  },
  {
    path: "/registerBusiness/:action",
    component: AsyncRegisterBusiness,
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
    path: "/home/ordersList/:userId/:name",
    component: AsyncHomeOrdersList,
    exact: true
  },
  {
    path: "/home/myContacts/:userId/:name",
    component: AsyncHomeMyContacts,
    exact: true
  },
  {
    path: "/home/viewAllProducts/:name",
    component: AsyncHomeViewAllProducts,
    exact: true
  }
];

export const merchant_child_routes = [
  {
    path: "/merchantHome/viewAllProducts/:name/:merchantId",
    component: AsyncHomeViewAllProducts,
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
