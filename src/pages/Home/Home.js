import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Banner from "../../components/Banner/Banner";
import Router from "../../routes/routes";
import { child_routes } from "../../routes/routes";
import { Container } from "react-bootstrap";
import LeftNav from "../../containers/LeftNav/LeftNav";
import "./Home.scss";
import { userLeftNavLinks } from "../../constants/constants";
import { getFollowedMerchants } from "../../store/actions";

const Home = props => {
  const { followedMerchants } = props;

  useEffect(() => {
    !followedMerchants.length && props.getFollowedMerchants({
      "UserId": "1588433471165",
      "Timestamp": "Sat, 02 May 2020 15:31:11 GMT"
    });
  }, []);

  return (
    <React.Fragment>
      {window.location.href.includes("productDetail") ? null : <Banner />}
      <div>
        <Container className="home-body" fluid>
          <div className="left-section">
            <LeftNav
              links={userLeftNavLinks}
              merchants={followedMerchants}
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

const mapDispatchToProps = dispatch => 
  bindActionCreators(
    {
      getFollowedMerchants
    },
    dispatch
  );

const mapStatetoProps = ({ app: { homePage } }) => {
  console.log(homePage);
  return {
    followedMerchants: homePage.followedMerchants
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Home);
