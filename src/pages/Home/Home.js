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
import { getFollowedMerchants, getDashboardBanners, getUserLinkCount, cartCount } from "../../store/actions";
import { useAuth } from "../../context/auth";

const Home = props => {
  const { followedMerchants, getUserLinkCount, userLinkCount, cartCount } = props;
  const [banners, setBanners] = useState(null);
  const isAuthenticated = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        getUserLinkCount();
        // cartCount();
        !(followedMerchants && followedMerchants.length) &&
          props.getFollowedMerchants({
            PatronId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId
          });
        setBanners(await props.getDashboardBanners());
      } else {
        if (!(window.location.href.includes("productDetail") || window.location.href.includes("viewAllProducts") || window.location.href.includes("search"))) { props.history.push('/landing?login=true'); }
      }
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
                showMerchants={true}
                count={userLinkCount}
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
      getDashboardBanners,
      getUserLinkCount,
      cartCount
    },
    dispatch
  );

const mapStatetoProps = ({ app: { homePage } }) => {
  console.log(homePage);
  return {
    followedMerchants: homePage.followedMerchants,
    userLinkCount: homePage.userLinkCount
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Home);
