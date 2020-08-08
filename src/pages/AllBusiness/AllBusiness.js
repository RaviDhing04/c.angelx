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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllBusiness() {
      const userId = props.match.params.userId;
      const res = await props.fetchAllBusiness({ PatronId: userId });
      res ? setLoading(false) : (function() {setLoading(false); (alert('something went wrong, Please try again!'))} ());
    }
    fetchAllBusiness();
  }, []);

  const navigate = (event) => {
    const ele = event.target.tagName;
    const merchantId = event.currentTarget.dataset.value;
    props.updateSelectedBusiness(merchantId);
    ele !== "BUTTON" ? history.push(`/merchantHome/viewAllProducts/${"Latest Uploads"}/${merchantId}`) : history.push('/registerBusiness/edit');
  }

  return !loading ? (
    <Container className="AllBusiness-page-container" fluid>
      <div className="AllBusiness-page">
        <div className="AllBusiness-header">
          <span className="heading">Registered Businesses</span>
        </div>
        <div className="business-card-holder">
          {allBusiness.map(business => {
            return (
              <div data-value={business.MerchantId.S} onClick={(e) => navigate(e)} key={business.MerchantId.S} className="business-card">
                <p> {business.BusinessHandle.S}</p>
                <span>{business.BusinessType.S}</span>
                <button className="edit-business">Edit</button>
              </div>
            );
          })}
          <div className="business-card">
            <button onClick={() => history.push('/registerBusiness/addNew')} className="add-business">
              <img className="plus-icon" alt="plus-icon" src={plusIcon}></img>
              Add Merchant / Non Profit Organization
            </button>
          </div>
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
