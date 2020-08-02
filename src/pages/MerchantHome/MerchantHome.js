import React, { useEffect, useState } from "react";
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
  getBusinessDetails,
  uploadImage,
  updateSelectedBusinessBanner,
  followmerchant,
  getBusinessDetailsUser,
  unfollowmerchant
} from "../../store/actions";
import coverError from "../../assets/cover-error.svg";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const MerchantHome = props => {
  const [loading, setLoading] = useState(false);
  const [merchantId, setMerchantId] = useState('');
  const { followedMerchants, selectedBusiness } = props;
  const { state } = props.location;

  useEffect(() => {
    var temp = window.location.pathname.split('/');
    const merchantId = temp[temp.length - 1];
    setMerchantId(merchantId);
    if (state && state.fromUser) {
      !followedMerchants.length &&
        props.getFollowedMerchants({
          PatronId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId
        });
      props.getBusinessDetailsUser({
        MerchantId: merchantId
      });
    } else {
      props.getBusinessDetails({
        MerchantId: merchantId,
        PatronId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId
      });
    }
  }, []);


  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const addFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
    }
    const fileType = event.target.files[0].type;
    const fileString = await toBase64(file);
    const payload = { "image_type": "merchant", "added_info": { "id": selectedBusiness.MerchantId.S }, "img": fileString.split(',')[1], "image_extension": fileType }
    const res = await props.uploadImage(payload);
    res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    if (res) {
      props.updateSelectedBusinessBanner(res.full_image_url);
    }
  };

  const unfollow = () => {
    const res = props.unfollowmerchant({
      PatronId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId,
      MerchantId: merchantId,
      "BusinessHandle": selectedBusiness && selectedBusiness.BusinessHandle.S
    });
    res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
  }

  const follow = () => {
    const res = props.followmerchant({
      PatronId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId,
      MerchantId: merchantId,
      "BusinessHandle": selectedBusiness && selectedBusiness.BusinessHandle.S
    });
    res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
  }

  return !loading ? (
    <React.Fragment>
      <div className="merchantHome-container">
        <React.Fragment>
          {selectedBusiness && selectedBusiness.BannerImageURL.S ? (<div className="cover-img">
            <img
              className="d-block w-100"
              src={selectedBusiness && selectedBusiness.BannerImageURL.S}
              alt="cover"
            />
            {selectedBusiness && selectedBusiness.BannerImageURL.S ? (
              <div onChange={addFile}>
                <label htmlFor="fileUpload_merchantBanner" class="btn">Change Cover</label>
                <input id="fileUpload_merchantBanner"
                  type="file"
                  accept=".jgp, .png"
                  style={{ display: "none" }}
                /> </div>) : (<div onChange={addFile}>
                  <input id="fileUpload_merchantBanner"
                    type="file"
                    accept=".jgp, .png"
                    style={{ display: "none" }}
                  /> <button htmlFor="fileUpload_merchantBanner" class="btn-center">Add Cover Image</button> </div>)}
          </div>) : null}
          <div className="img-err">
            <img src={coverError} alt="cover" />
            <span>
              Please upload high quality images more then width - 800px to
                ensure your cover image looks great.{" "}
            </span>
          </div>
        </React.Fragment>
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
              {selectedBusiness && selectedBusiness.IsMerchantFollowed.S === 'True' ? <button onClick={unfollow} className="unfollow">Unfollow</button> : <button onClick={follow} className="unfollow">Follow</button>}
            </div>
          ) : null}
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
                merchantId={merchantId}
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
  ) : (
      <CustomLoader />
    );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFollowedMerchants,
      updateSelectedBusiness,
      getBusinessDetails,
      uploadImage,
      updateSelectedBusinessBanner,
      followmerchant,
      unfollowmerchant,
      getBusinessDetailsUser
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
