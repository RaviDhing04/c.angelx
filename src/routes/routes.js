import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Loadable from "react-loadable";
import { connect } from "react-redux";

const LoadingFallback = props => {
  if (props.error) {
    console.log(props.error);
  }
  return null;
};

const AsyncHome = Loadable({
  loader: () => import(/* webpackChunkName: "HomePage" */ "../pages/Home/Home"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["HomePage"]
});

const AsyncLandingPage = Loadable({
  loader: () => import(/* webpackChunkName: "LandingPage" */ "../pages/LandingPage/LandingPage"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["LandingPage"]
});

const AsyncMobileHome = Loadable({
  loader: () => import(/* webpackChunkName: "LandingPage" */ "../pages/MobileHome/MobileHome"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["LandingPage"]
});

const AsyncSearchPage = Loadable({
  loader: () => import(/* webpackChunkName: "SearchPage" */ "../pages/SearchPage/SearchPage"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["SearchPage"]
});

const AsyncCart = Loadable({
  loader: () => import(/* webpackChunkName: "CartPage" */ "../pages/Cart/Cart"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["CartPage"]
});

const AsyncManageBusiness = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "CartPage" */ "../pages/AllBusiness/AllBusiness"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["ManageBusiness"]
});

const AsyncMerchantHome = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "MerchantPage" */ "../pages/MerchantHome/MerchantHome"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["MerchantPage"]
});

const AsyncMerchantPageHandle = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "MerchantPage" */ "../pages/MerchantPageHandle/MerchantPageHandle"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["MerchantPageHandle"]
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
    import(
      /* webpackChunkName: "RegisterBusiness" */ "../pages/RegisterBusiness/RegisterBusiness"
    ),
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

const AsyncAddEmployees = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "AddEmployees" */ "../containers/AddEmployees/AddEmployees"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["AddEmployees"]
});

const AsyncPatrons = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "AddEmployees" */ "../containers/PatronsList/PatronsList"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["AddEmployees"]
});

const AsyncHomeViewAllProducts = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ViewAllProducts" */ "../containers/ViewAllProducts/ViewAllProducts"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["ViewAllProducts"]
});

const AsyncHomeInventory = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "HomeInventory" */ "../containers/MerchantTableContainer/MerchantTableContainer"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["HomeInventory"]
});

const AsyncAddInventory = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "AddInventory" */ "../containers/AddInventory/AddInventory"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["AddInventory"]
});

const AsyncAddCampaign = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "AddCampaign" */ "../containers/AddCampaigns/AddCampaigns"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["AddCampaign"]
});

const AsyncAddCoupon = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "AddCoupon" */ "../containers/AddCoupons/AddCoupons"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["AddCoupon"]
});

const AsyncProfileEdit = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ProfileEdit" */ "../containers/ProfileEdit/ProfileEdit"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["ProfileEdit"]
});

const AsyncCheckoutShipping = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "CheckoutShipping" */ "../containers/CheckoutShipping/CheckoutShipping"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["CheckoutShipping"]
});

const AsyncCheckoutBilling = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "CheckoutBilling" */ "../containers/CheckoutBilling/CheckoutBilling"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["CheckoutBilling"]
});

const AsyncCheckoutConfirm = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "CheckoutConfirm" */ "../containers/CheckoutConfirm/CheckoutConfirm"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["CheckoutConfirm"]
});

const AsyncProfile = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Profile" */ "../pages/Profile/Profile"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["Profile"]
});

const AsyncCheckout = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Checkout" */ "../pages/Checkout/Checkout"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["Checkout"]
});

const AsyncProfileAddresses = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "ProfileAddresses" */ "../containers/ProfileAddresses/ProfileAddresses"
    ),
  loading: error => <LoadingFallback {...error} />,
  modules: ["ProfileAddresses"]
});

// const AsyncProfilePayments = Loadable({
//   loader: () =>
//     import(
//       /* webpackChunkName: "ProfilePayments" */ "../containers/ProfilePayments/ProfilePayments"
//     ),
//   loading: error => <LoadingFallback {...error} />,
//   modules: ["ProfilePayments"]
// });

export const parent_routes = [
  {
    path: "/landing",
    component: AsyncLandingPage,
    exact: false
  },
  {
    path: "/mobile",
    component: AsyncMobileHome,
    exact: false
  },
  {
    path: "/home",
    component: AsyncHome,
    exact: false
  },
  {
    path: "/cart/:userId",
    component: AsyncCart,
    exact: false,
    type: "private"
  },
  {
    path: "/manageBusiness/:userId",
    component: AsyncManageBusiness,
    exact: false,
    type: "private"
  },
  {
    path: "/merchantHome",
    component: AsyncMerchantHome,
    exact: false,
    type: "private"
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
    exact: false,
    type: "private"
  },
  {
    path: "/profile",
    component: AsyncProfile,
    exact: false,
    type: "private"
  },
  {
    path: "/checkout",
    component: AsyncCheckout,
    exact: false,
    type: "private"
  },
  {
    path: "/merchantPage/:merchantHandle",
    component: AsyncMerchantPageHandle,
    exact: false,
  }
];

export const child_routes = [
  {
    path: "/home/productsListing",
    component: AsyncHomeProductList,
    exact: true,
    type: "private"
  },
  {
    path: "/home/productDetail/:productId/:productTimeStamp",
    component: AsyncHomeProductDetails,
    exact: true
  },
  {
    path: "/home/ordersList/:userId/:name",
    component: AsyncHomeOrdersList,
    exact: true,
    type: "private"
  },
  {
    path: "/home/myContacts/:userId/:name",
    component: AsyncHomeMyContacts,
    exact: true,
    type: "private"
  },
  {
    path: "/home/viewAllProducts/:name",
    component: AsyncHomeViewAllProducts,
    exact: true
  },
  {
    path: "/home/search/:text/:selectedCategory",
    component: AsyncSearchPage,
    exact: false
  }
];

export const merchant_child_routes = [
  {
    path: "/merchantPage/:merchantHandle",
    component: AsyncHomeViewAllProducts,
    exact: false,
  },
  {
    path: "/merchantHome/viewAllProducts/:name/:merchantId",
    component: AsyncHomeViewAllProducts,
    exact: true,
    type: "private"
  },
  {
    path: "/merchantHome/inventory/:name/:merchantId",
    component: AsyncHomeInventory,
    exact: true,
    type: "private"
  },
  {
    path: "/merchantHome/addInventory/:action/:merchantId",
    component: AsyncAddInventory,
    exact: true,
    type: "private"
  },
  {
    path: "/merchantHome/addCauses/:action/:merchantId",
    component: AsyncAddCampaign,
    exact: true,
    type: "private"
  },
  {
    path: "/merchantHome/addCoupons/:action/:merchantId",
    component: AsyncAddCoupon,
    exact: true,
    type: "private"
  },
  {
    path: "/merchantHome/campaigns/:name/:merchantId",
    component: AsyncHomeInventory,
    exact: true,
    type: "private"
  },
  {
    path: "/merchantHome/coupons/:name/:merchantId",
    component: AsyncHomeInventory,
    exact: true,
    type: "private"
  },
  {
    path: "/merchantHome/myEmployees/:name/:merchantId",
    component: AsyncAddEmployees,
    exact: true,
    type: "private"
  },
  {
    path: "/merchantHome/Patrons/:name/:merchantId",
    component: AsyncPatrons,
    exact: true,
    type: "private"
  }
];

export const profile_child_routes = [
  {
    path: "/profile/edit/:userId",
    component: AsyncProfileEdit,
    exact: true,
    type: "private"
  },
  {
    path: "/profile/edit/:userId/:name",
    component: AsyncProfileEdit,
    exact: true,
    type: "private"
  },
  {
    path: "/profile/addresses/:userId/:name",
    component: AsyncProfileAddresses,
    exact: true,
    type: "private"
  }
  // {
  //   path: "/profile/payment/",
  //   component: AsyncProfilePayments,
  //   exact: true
  // }
];

export const checkout_child_routes = [
  {
    path: "/checkout/shipping/:userId/:name",
    component: AsyncCheckoutShipping,
    exact: true,
    type: "private"
  },
  {
    path: "/checkout/billing/:userId/:name",
    component: AsyncCheckoutBilling,
    exact: true,
    type: "private"
  },
  {
    path: "/checkout/Confirm/:userId/:name",
    component: AsyncCheckoutConfirm,
    exact: true,
    type: "private"
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
        {/* <Route component={LoginRedirect}>
          <Route path="/" component={ModalCheck}> */}
        {routes && routes.map((r, i) =>
          r && r.type && r.type === "private" ? (
            <PrivateRoute
              path={r.path}
              component={r.component}
              key={i}
              exact={r.exact}
            />
          ) : (
              <Route
                path={r.path}
                component={r.component}
                key={i}
                exact={r.exact}
              />
            )
        )}
        {/* </Route>
        </Route> */}
        {/* </Switch> */}
      </>
    );
  }
}

export default withRouter(connect()(Router));
