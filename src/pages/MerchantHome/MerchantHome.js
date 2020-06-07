import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Router from "../../routes/routes";
import { merchant_child_routes } from "../../routes/routes";
import { Container } from "react-bootstrap";
import LeftNav from "../../containers/LeftNav/LeftNav";
import "./MerchantHome.scss";
import {
  userLeftNavLinks,
  merchantLeftNavLinks
} from "../../constants/constants";
import {
  getFollowedMerchants,
  updateSelectedBusiness,
  getBusinessDetails
} from "../../store/actions";
import coverError from "../../assets/cover-error.svg";

const MerchantHome = props => {
  const { followedMerchants, selectedBusiness } = props;
  const { state } = props.location;

  useEffect(() => {
    if (state && state.fromUser) {
      const { merchantId } = props.match.params;
      !followedMerchants.length &&
        props.getFollowedMerchants({
          PatronId: "1588433471165"
        });
    }
    props.getBusinessDetails({
      MerchantId: "1587031042915",
      PatronId: "69116697064443"
    });
  }, []);

  return (
    <React.Fragment>
      <div className="merchantHome-container">
        {selectedBusiness && selectedBusiness.BannerImageURL.S ? (
          <React.Fragment>
            <div className="cover-img">
              <img
                className="d-block w-100"
                src={selectedBusiness && selectedBusiness.BannerImageURL.S}
                alt="cover"
              />
            </div>
            <div className="img-err">
              <img src={coverError} alt="cover" />
              <span>
                Please upload high quality images more then width - 800px to
                ensure your cover image looks great.{" "}
              </span>
            </div>
          </React.Fragment>
        ) : null}
        <div className="merchant-info">
          <div className="merchant-detail">
            <span className="merchant-name">
              {selectedBusiness && selectedBusiness.BusinessHandle.S}
            </span>
            <span className="merchant-contact">
              {selectedBusiness && selectedBusiness.OrgWebsite.S} |{" "}
              {selectedBusiness && selectedBusiness.BusinessContact.S} |{" "}
              {selectedBusiness && selectedBusiness.BusinessEmail.S}
            </span>
          </div>
          {state && state.fromUser ? (
            <div className="user-action">
              <a className="user-terms" href="/">
                Terms and Conditions
              </a>
              <button className="unfollow">Unfollow</button>
            </div>
          ) : null }
        </div>
        <div>
          <Container className="merchantHome-body" fluid>
            <div className="left-section">
              <LeftNav
                links={
                  state && state.fromUser
                    ? userLeftNavLinks
                    : merchantLeftNavLinks
                }
                merchants={state && state.fromUser ? followedMerchants : []}
                merchantId={"1587031042915"}
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
      getFollowedMerchants,
      updateSelectedBusiness,
      getBusinessDetails
    },
    dispatch
  );

const mapStatetoProps = ({ app: { merchantHomePage, manageBusiness } }) => {
  console.log(merchantHomePage);
  return {
    followedMerchants: merchantHomePage.followedMerchants,
    selectedBusiness: manageBusiness.selectedBusiness
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(MerchantHome);
