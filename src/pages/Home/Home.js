import React from "react";
import Banner from "../../components/Banner/Banner";
import Router from "../../routes/routes";
import { child_routes } from "../../routes/routes";
import { Container} from "react-bootstrap";
import LeftNav from "../../containers/LeftNav/LeftNav";
import "./Home.scss"
import { leftNavLinks, merchantList } from "../../constants/constants";

const Home = () => {
  return (
    <React.Fragment>
      <Banner />
      <div>
        <Container className="home-body" fluid>
          <div className="left-section">
            <LeftNav links={leftNavLinks} showMerchants={true} merchants={merchantList}/>
          </div>
          <div className="right-section">
            <Router routes={child_routes} />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Home;
