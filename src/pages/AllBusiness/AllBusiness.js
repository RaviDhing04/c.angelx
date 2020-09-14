import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { fetchAllBusiness, updateSelectedBusiness } from "../../store/actions";
import "./AllBusiness.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import plusIcon from "../../assets/plus.svg";

const AllBusiness = props => {
  const { allBusiness } = props;
  let history = useHistory();
  const userId = props.match.params.userId;
  const [loading, setLoading] = useState(true);
  const [isMerchant, setIsMerchant] = useState(true);

  useEffect(() => {
    async function fetchAllBusiness() {
      const res = await props.fetchAllBusiness({ PatronId: userId });
      res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    }
    fetchAllBusiness();
  }, []);

  useEffect(() => {
    if (allBusiness && allBusiness.length) {
      allBusiness.forEach(business => {
        if (userId !== business.PatronId.S) {
          setIsMerchant(false);
        }
      });
    } else {
      setIsMerchant(true);
    }
  }, [allBusiness])
  const navigate = (event) => {
    const ele = event.target.tagName;
    const merchantId = event.currentTarget.dataset.value.split('---')[0];
    const type = event.currentTarget.dataset.value.split('---')[1];
    props.updateSelectedBusiness(merchantId);
    ele !== "BUTTON" ? type !== 'NPO' ? history.push(`/merchantHome/inventory/Inventory/${merchantId}`) : history.push(`/merchantHome/campaigns/Causes/${merchantId}`) : history.push('/registerBusiness/edit');
  }

  return !loading ? (
    <Container className="AllBusiness-page-container" fluid>
      <div className="AllBusiness-page">
        <div className="AllBusiness-header">
          <span className="heading">Registered Businesses</span>
        </div>
        <div className="business-card-holder">
          {allBusiness && allBusiness.length ? allBusiness.map(business => {
            return (
              <div data-value={business.MerchantId.S + '---' + business.BusinessType.S} onClick={(e) => navigate(e)} key={business.MerchantId.S} className="business-card">
                <p> {business.BusinessHandle.S}</p>
                <span>{business.BusinessType.S}</span>
                {isMerchant ? <button className="edit-business">Edit</button> : null}
              </div>
            );
          }) : null}
          {isMerchant ? <div className="business-card">
            <button onClick={() => history.push('/registerBusiness/addNew')} className="add-business">
              <img className="plus-icon" alt="plus-icon" src={plusIcon}></img>
              Add Merchant / Non Profit Organization
            </button>
          </div> : null}
        </div>
      </div>
    </Container>
  ) : (
      <CustomLoader />
    );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllBusiness,
      updateSelectedBusiness
    },
    dispatch
  );

const mapStatetoProps = ({ app: { manageBusiness } }) => {
  console.log(manageBusiness);
  return {
    allBusiness: manageBusiness.allBusiness
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(AllBusiness);
