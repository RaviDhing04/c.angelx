import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Banner from "../../components/Banner/Banner";
import Router from "../../routes/routes";
import { merchant_child_routes } from "../../routes/routes";
import { Container } from "react-bootstrap";
import LeftNav from "../../containers/LeftNav/LeftNav";
import "./MerchantHome.scss";
import {
  userLeftNavLinks,
  merchantLeftNavLinks
} from "../../constants/constants";
import { getFollowedMerchants } from "../../store/actions";
import coverError from "../../assets/cover-error.svg";

const MerchantHome = props => {
  const { followedMerchants } = props;
  const { state } = props.location;

  useEffect(() => {
    state && state.fromUser &&
      !followedMerchants.length &&
      props.getFollowedMerchants({
        UserId: "1588433471165",
        Timestamp: "Sat, 02 May 2020 15:31:11 GMT"
      });
  }, []);

  return (
    <React.Fragment>
      <div className="merchantHome-container">
        <div className="cover-img">
          <img
            className="d-block w-100"
            src="https://fullimages-products.s3.us-east-2.amazonaws.com/bannerimage1.jpg"
            alt="cover"
          />
        </div>
        <div className="img-err">
          <img src={coverError} alt="cover" />
          <span>
            Please upload high quality images more then width - 800px to ensure
            your cover image looks great.{" "}
          </span>
        </div>
        <div className="merchant-info">
          <div className="merchant-detail">
            <span className="merchant-name">ProdTest@DeleteLater</span>
            <span className="merchant-contact">
              www.mock.com | +27 43572 73628 | loremipsum@mock.com
            </span>
          </div>
          <div className="user-action">
            <a className="user-terms" href="/">
              Terms and Conditions
            </a>
            {state && state.fromUser ? <button className="unfollow">Unfollow</button> : null}
          </div>
        </div>
        <div>
          <Container className="merchantHome-body" fluid>
            <div className="left-section">
              <LeftNav
                links={state && state.fromUser ? userLeftNavLinks : merchantLeftNavLinks}
                merchants={state && state.fromUser ? followedMerchants : []}
              />
            </div>
            <div className="right-section">
              <Switch>
                <Router routes={merchant_child_routes} />
              </Switch>
            </div>
          </Container>
        </div>
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

const mapStatetoProps = ({ app: { MerchantHomePage } }) => {
  console.log(MerchantHomePage);
  return {
    followedMerchants: MerchantHomePage.followedMerchants
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(MerchantHome);
