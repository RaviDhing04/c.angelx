import React from "react";
import Router from "../src/routes/routes";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { parent_routes } from "../src/routes/routes";
import Container from "react-bootstrap/Container";
import Header from "./containers/Header/Header";
import MobileHeader from "./containers/MobileHeader/MobileHeader";
import Footer from "./components/Footer/Footer";
import MobileFooter from "./components/MobileFooter/MobileFooter";
import { AuthContext } from "./context/auth";
import Login from "./containers/Login/Login";
import "./App.scss";
import SignUp from "./containers/SignUp/SignUp";
import MobileHome from "./pages/MobileHome/MobileHome";
import SearchPage from "./pages/SearchPage/SearchPage";
import Logout from "./containers/Logout/Logout";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import ScrollToTop from "./ScrollToTop";

const App = () => {
  const userId = JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId; // to be update from login info later

  const location = useLocation();
  var url = window.location.pathname;
  React.useEffect(() => {
    localStorage.setItem("prevPath", url);
    hashLinkScroll();
  }, [location]);

  function hashLinkScroll() {
    const { hash } = window.location;
    if (hash !== '') {
      // Push onto callback queue so it runs after the DOM is updated,
      // this is required when navigating from a different page so that
      // the element is rendered on the page before trying to getElementById.
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }, 0);
    }
  }

  React.useEffect(() => {
    if (!(window.location.pathname.includes('checkout'))) {
      localStorage.setItem('shippingAddress', null);
      localStorage.setItem('billingAddress', null);
      localStorage.setItem('orderType', null);
    }
  }, []);



  return (
    <Container fluid className={isBrowser ? "app-container" : "mobile-container"}>
      <AuthContext.Provider value={(localStorage.getItem('token') && JSON.parse(localStorage.getItem('userData'))) ? true : false}>
        <BrowserView>
          <Header userId={userId} />
          <div style={{ minHeight: '400px' }}>
            <ScrollToTop />
            <Switch>
              <Route
                exact
                path={"/"}
                render={() => {
                  return <Redirect to={"/landing"} />;
                }}
              />
              <Router routes={parent_routes} />
            </Switch>
            <Route path="/" component={Login} />
            <Route path="/" component={SignUp} />
            <Route path="/" component={ForgotPassword} />
            <Route path="/" component={Logout} />
          </div>
          <Footer userId={userId} />
        </BrowserView>
        <MobileView>
          <MobileHeader userId={userId} />
          <Switch>
          <Route
                exact
                path={"/"}
                render={() => {
                  return <Redirect to={"/landing"} />;
                }}
              />
          <Route path="/landing" component={MobileHome} />
          <Route path="/home/search/:text/:selectedCategory" component={SearchPage} exact={true} />
          </Switch>
        </MobileView>
        <MobileFooter userId={userId} />
      </AuthContext.Provider>

    </Container>
  );
};

export default App;
