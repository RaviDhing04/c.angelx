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
  unfollowmerchant,
  getUserLinkCount,
  getMerchantLinkCount,
  cartCount
} from "../../store/actions";
import coverError from "../../assets/cover-error.svg";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { useAuth } from "../../context/auth";

const MerchantHome = props => {
  const [loading, setLoading] = useState(false);
  const [merchantId, setMerchantId] = useState('');
  const [IsMerchantFollowed, setIsMerchantFollowed] = useState('false');
  const [terms, setTerms] = useState('');
  const { followedMerchants, selectedBusiness } = props;
  const { state } = props.location;
  const isAuthenticated = useAuth();

  useEffect(() => {
    props.updateSelectedBusiness(0);
    var temp = window.location.pathname.split('/');
    const merchantId = temp[temp.length - 1];
    if (merchantId && isAuthenticated) {
      props.getMerchantLinkCount({
        "MerchantId": merchantId
      });
      setMerchantId(merchantId);
      props.getBusinessDetails({
        MerchantId: merchantId,
        PatronId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId
      })
    }
    if (state && state.fromUser && isAuthenticated) {
      !followedMerchants.length &&
        props.getFollowedMerchants({
          PatronId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId
        });
      if (isAuthenticated) {
        props.getUserLinkCount();
        // props.cartCount();
      }
    }
  }, []);

  useEffect(() => {
    setIsMerchantFollowed(selectedBusiness && selectedBusiness.IsMerchantFollowed && selectedBusiness.IsMerchantFollowed.S);
    if (selectedBusiness && selectedBusiness.TermsAndConditions && selectedBusiness.TermsAndConditions.S) { setTerms(`https://docs.google.com/viewer?url=${selectedBusiness && selectedBusiness.TermsAndConditions && selectedBusiness.TermsAndConditions.S}`) };
  }, [selectedBusiness]);


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

  const unfollow = async () => {
    setLoading(true);
    const res = await props.unfollowmerchant({
      PatronId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId,
      MerchantId: merchantId,
      "BusinessHandle": selectedBusiness && selectedBusiness.BusinessHandle.S
    });
    res ? function () {
      setLoading(false)
      setIsMerchantFollowed('false');
      props.getFollowedMerchants({
        PatronId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId
      });
    }() : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
  }

  const follow = async () => {
    setLoading(true);
    const res = await props.followmerchant({
      PatronId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId,
      MerchantId: merchantId,
      "BusinessHandle": selectedBusiness && selectedBusiness.BusinessHandle.S
    });
    res ? function () {
      setLoading(false)
      setIsMerchantFollowed('true');
      props.getFollowedMerchants({
        PatronId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId
      });
    }() : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
  }

  return !loading ? (
    <React.Fragment>
      <div className="merchantHome-container">
        <React.Fragment>
          <div className="cover-img">
            {selectedBusiness && selectedBusiness.BannerImageURL.S ? (<img
              className="d-block w-100"
              src={selectedBusiness && selectedBusiness.BannerImageURL.S}
              alt="cover"
            />) : null}
            {state && state.fromUser ? null : (selectedBusiness && selectedBusiness.BannerImageURL.S ? (
              <div onChange={addFile}>
                <label htmlFor="fileUpload_merchantBanner" className="btn">Change Cover</label>
                <input id="fileUpload_merchantBanner"
                  type="file"
                  accept=".jgp, .png"
                  style={{ display: "none" }}
                /> </div>) : (<div onChange={addFile}>
                  <input id="fileUploadcenter_merchantBanner"
                    type="file"
                    accept=".jgp, .png"
                    style={{ display: "none" }}
                  /> <label htmlFor="fileUploadcenter_merchantBanner" className="btn-center">Add Cover Image</label> </div>))
            }
          </div>
          {!(state && state.fromUser) ? <div className="img-err">
            <img src={coverError} alt="cover" />
            <span>
              Please upload high quality images more then width - 800px to
                ensure your cover image looks great.{" "}
            </span>
          </div> : null}
        </React.Fragment>
        <div className="merchant-info">
          <div className="merchant-detail">
            <span className="merchant-name">
              {selectedBusiness && selectedBusiness.BusinessHandle && selectedBusiness.BusinessHandle.S}
            </span>
            <span className="merchant-contact">
              {selectedBusiness && selectedBusiness.OrgWebsite.S ? selectedBusiness.OrgWebsite.S + ' | ' : null}
              {selectedBusiness && selectedBusiness.BusinessContact.S ? selectedBusiness.BusinessContact.S + ' | ' : null}
              {selectedBusiness && selectedBusiness.BusinessEmail.S ? selectedBusiness.BusinessEmail.S + ' | ' : null}
              {selectedBusiness && selectedBusiness.MerchantBio && selectedBusiness.MerchantBio.S ? 'About us: ' + selectedBusiness.MerchantBio.S : ""}
            </span>
            {/* <span className="merchant-contact">
              {selectedBusiness && selectedBusiness.MerchantBio && selectedBusiness.MerchantBio.S ? selectedBusiness.MerchantBio.S : ""}
            </span> */}
          </div>
          {state && state.fromUser ? (
            <div className="user-action">
              {terms ? <a className="user-terms" target="blank" href={terms}>
                Terms and Conditions
              </a> :
                <span className="user-terms" >
                  Terms and Conditions
            </span>
              }
              {IsMerchantFollowed === 'true' ? <button onClick={unfollow} className="unfollow">Unfollow</button> : <button onClick={follow} className="unfollow">Follow</button>}
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
                    : merchantLeftNavLinks[selectedBusiness && ['NPO', 'Retail'].includes(selectedBusiness.BusinessType.S) ? selectedBusiness.BusinessType.S : 'Default']
                }
                merchants={state && state.fromUser ? followedMerchants : []}
                showMerchants={state && state.fromUser ? true : false}
                merchantId={merchantId}
                count={props.userLinkCount}
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
      getBusinessDetailsUser,
      getUserLinkCount,
      cartCount,
      getMerchantLinkCount
    },
    dispatch
  );

const mapStatetoProps = ({ app: { merchantHomePage, manageBusiness, homePage } }) => {
  console.log(merchantHomePage);
  return {
    followedMerchants: merchantHomePage.followedMerchants,
    selectedBusiness: manageBusiness.selectedBusiness,
    userLinkCount: homePage.userLinkCount
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(MerchantHome);
