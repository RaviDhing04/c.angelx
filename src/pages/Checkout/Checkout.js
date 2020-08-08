import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Router from "../../routes/routes";
import { checkout_child_routes } from "../../routes/routes";
import { Container } from "react-bootstrap";
import LeftNav from "../../containers/LeftNav/LeftNav";
import "./Checkout.scss";
import {
  checkoutLeftNavLinks,
} from "../../constants/constants";
import {
  getFollowedMerchants,
  updateSelectedBusiness,
  getBusinessDetails
} from "../../store/actions";

const Checkout = props => {
  const { state } = props.location;

  useEffect(() => {
  
  }, []);

  return (
    <React.Fragment>
      <div className="Checkout-container">
        <div>
          <Container className="Checkout-body" fluid>
            <div className="left-section">
              <LeftNav
                links={ checkoutLeftNavLinks }
                merchantId={""}
                merchants={[]}
                showMerchants={false}
              />
            </div>
            <div className="right-section">
              <Switch>
                <Router routes={checkout_child_routes} />
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

const mapStatetoProps = ({ app: { ProfilePage } }) => {
  console.log(ProfilePage);
  return {
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Checkout);
