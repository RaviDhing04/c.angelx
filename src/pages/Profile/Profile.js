import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Router from "../../routes/routes";
import { profile_child_routes } from "../../routes/routes";
import { Container } from "react-bootstrap";
import LeftNav from "../../containers/LeftNav/LeftNav";
import "./Profile.scss";
import {
  profileLeftNavLinks,
} from "../../constants/constants";
import {
  getFollowedMerchants,
  getBusinessDetails
} from "../../store/actions";

const Profile = props => {
  const { state } = props.location;

  useEffect(() => {
  
  }, []);

  return (
    <React.Fragment>
      <div className="Profile-container">
        <div>
          <Container className="Profile-body" fluid>
            <div className="left-section">
              <LeftNav
                links={ profileLeftNavLinks }
                merchantId={""}
                merchants={[]}
                showMerchants={false}
              />
            </div>
            <div className="right-section">
              <Switch>
                <Router routes={profile_child_routes} />
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
      getBusinessDetails
    },
    dispatch
  );

const mapStatetoProps = ({ app: { ProfilePage } }) => {
  console.log(ProfilePage);
  return {
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Profile);
