import React, { useEffect, useState } from "react";
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
import { getFollowedMerchants, getDashboardBanners } from "../../store/actions";
import { useAuth } from "../../context/auth";

const Home = props => {
  const { followedMerchants } = props;
  const [banners, setBanners] = useState(null);
  const isAuthenticated = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      !followedMerchants.length &&
        props.getFollowedMerchants({
          PatronId: "1588433471165"
        });
      setBanners(await props.getDashboardBanners());
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {window.location.href.includes("productDetail") ? null : (
        <Banner banners={banners} />
      )}
      <div>
        <Container className="home-body" fluid>
          {isAuthenticated ? (
            <div className="left-section">
              <LeftNav
                links={userLeftNavLinks}
                merchants={followedMerchants}
                merchantId={""}
              />
            </div>
          ) : null}
          <div className={isAuthenticated ? "right-section" : "width-100 right-section"}>
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
      getFollowedMerchants,
      getDashboardBanners
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
