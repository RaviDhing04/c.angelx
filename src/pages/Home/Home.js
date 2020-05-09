import React from "react";
import { Switch } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import Router from "../../routes/routes";
import { child_routes } from "../../routes/routes";
import { Container } from "react-bootstrap";
import LeftNav from "../../containers/LeftNav/LeftNav";
import "./Home.scss";
import { leftNavLinks, merchantList } from "../../constants/constants";

const Home = () => {
  return (
    <React.Fragment>
      {window.location.href.includes("productDetail") ? null : <Banner />}
      <div>
        <Container className="home-body" fluid>
          <div className="left-section">
            <LeftNav
              links={leftNavLinks}
              showMerchants={true}
              merchants={merchantList}
            />
          </div>
          <div className="right-section">
            <Switch>
              <Router routes={child_routes} />
            </Switch>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Home;
