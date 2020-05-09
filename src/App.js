import React from "react";
import Router from "../src/routes/routes";
import { Route, Switch, Redirect } from "react-router-dom";
import {parent_routes} from "../src/routes/routes";
import Container from "react-bootstrap/Container";
import Header from "./containers/Header/Header";
import Footer from "./components/Footer/Footer";

import "./App.scss";

const App = () => (
  <Container fluid className="app-container">
    <Header />
    <Switch>
    <Route exact path={'/'} render={() => {
                        return <Redirect to={'/home'}/>
                    }}/>
    <Router routes={parent_routes}/>
    </Switch>
    <Footer/>
  </Container>
);

export default App;
