import React, { useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Router from "../../routes/routes";
import { merchant_child_routes } from "../../routes/routes";
import { Container } from "react-bootstrap";
import LeftNav from "../../containers/LeftNav/LeftNav";
import "./MerchantPageHandle.scss";
import {
  userLeftNavLinks,
  merchantLeftNavLinks
} from "../../constants/constants";
import {
  getFollowedMerchants,
  updateSelectedBusiness,
  getBusinessDetails,
  getBusinessDetailswithMerchantHandle,
  uploadImage,
  updateSelectedBusinessBanner,
  followmerchant,
  getBusinessDetailsUser,
  unfollowmerchant,
  getUserLinkCount,
  cartCount
} from "../../store/actions";
import coverError from "../../assets/cover-error.svg";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { useAuth } from "../../context/auth";

const MerchantHome = props => {
  const [loading, setLoading] = useState(false);
  const [merchantId, setMerchantId] = useState('');
  const [IsMerchantFollowed, setIsMerchantFollowed] = useState('false');
  const { followedMerchants, selectedBusiness } = props;
  const { state } = props.location;
  const isAuthenticated = useAuth();
  const { merchantHandle } = props.match.params;

  useEffect(() => {
    props.updateSelectedBusiness(0);
    const fetchData = async () => {
      if (merchantHandle) {
        const res = await props.getBusinessDetailswithMerchantHandle({
          "BusinessHandle": merchantHandle
        })
        res ? setMerchantId(res) : setMerchantId('');
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setIsMerchantFollowed(selectedBusiness && selectedBusiness.IsMerchantFollowed && selectedBusiness.IsMerchantFollowed.S);
  }, [selectedBusiness]);

  useEffect(() => {
    if (isAuthenticated && merchantId) {
      props.history.replace({
        pathname: `/merchantHome/viewAllProducts/${"Latest Uploads"}/${merchantId}`,
        state: {
          fromUser: true
        }
      })
    }
  }, [isAuthenticated, merchantId]);


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
    }() : (function () { setLoading(false); }());
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
          </div>
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
              {selectedBusiness && selectedBusiness.OrgWebsite.S ? selectedBusiness.OrgWebsite.S + '|' : null}
              {selectedBusiness && selectedBusiness.BusinessContact.S ? selectedBusiness.BusinessContact.S + '|' : null}
              {selectedBusiness && selectedBusiness.BusinessEmail.S ? selectedBusiness.BusinessEmail.S + '|' : null}
            </span>
            <span className="merchant-contact">
              {selectedBusiness && selectedBusiness.MerchantBio.S ? selectedBusiness.MerchantBio.S : ""}
            </span>
          </div>
          <div className="user-action">
            <a className="user-terms" href="/">
              Terms and Conditions
              </a>
            {IsMerchantFollowed === 'true' ? <button onClick={unfollow} className="unfollow">Unfollow</button> : <button onClick={follow} className="unfollow">Follow</button>}
          </div>
        </div>
        <div>
          <Container className="merchantHome-body" fluid>
            {/* {isAuthenticated ? <div className="left-section">
              <LeftNav
                links={
                  IsFromUser
                    ? userLeftNavLinks
                    : merchantLeftNavLinks
                }
                merchants={IsFromUser ? followedMerchants : []}
                showMerchants={IsFromUser ? true : false}
                merchantId={merchantId}
                count={props.userLinkCount}
              />
            </div> : null} */}
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
      getBusinessDetailswithMerchantHandle,
      uploadImage,
      updateSelectedBusinessBanner,
      followmerchant,
      unfollowmerchant,
      getBusinessDetailsUser,
      getUserLinkCount,
      cartCount
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
