import React from "react";
import Router from "../src/routes/routes";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { parent_routes } from "../src/routes/routes";
import Container from "react-bootstrap/Container";
import Header from "./containers/Header/Header";
import Footer from "./components/Footer/Footer";
import { AuthContext } from "./context/auth";
import Login from "./containers/Login/Login";
import "./App.scss";
import SignUp from "./containers/SignUp/SignUp";
import MobileHome from "./pages/MobileHome/MobileHome";
import Logout from "./containers/Logout/Logout";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const App = () => {
  const userId = JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId;; // to be update from login info later

  const location = useLocation();
  var url = window.location.pathname;
  React.useEffect(() => {
    localStorage.setItem("prevPath", url);
  }, [location]);

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
        <Header userId={userId} />
        <BrowserView>
          <div style={{ minHeight: '400px' }}>
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
        </BrowserView>
        <MobileView>
          {/* <Switch>
            <Route
              exact
              path={"/"}
              render={() => {
                return <Redirect to={"/mobile"} />;
              }}
            />
          </Switch> */}
          <Route path="/" component={MobileHome} />
        </MobileView>
        <Footer userId={userId} />
      </AuthContext.Provider>

    </Container>
  );
};

export default App;
