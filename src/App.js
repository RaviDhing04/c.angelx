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
import Logout from "./containers/Logout/Logout";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";

const App = () => {
  const userId = JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId;; // to be update from login info later

  const location = useLocation();
  var url = window.location.pathname;
  React.useEffect(() => {
    localStorage.setItem("prevPath", url);
  }, [location]);

  React.useEffect(() => {
    localStorage.setItem('shippingAddress', null);
    localStorage.setItem('billingAddress', null);
    localStorage.setItem('orderType', null);
  }, []);



  return (
    <Container fluid className="app-container">
      <AuthContext.Provider value={(localStorage.getItem('token') && JSON.parse(localStorage.getItem('userData'))) ? true : false}>
        <Header userId={userId} />
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
      </AuthContext.Provider>
      <Footer />
    </Container>
  );
};

export default App;
