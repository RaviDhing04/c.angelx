import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getMerchantAllProductsAndSegregate,
  getMerchantAllCoupons,
  setSelectedRow,
  deleteProduct,
  deleteCoupon,
  clearSelectedRow,
  getBusinessDetails
} from "../../store/actions";
import "./MerchantTableContainer.scss";
import { Container } from "react-bootstrap";
import TableComp from "../../components/TableComp/TableComp";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { useHistory } from "react-router-dom";

const MerchantTableContainer = props => {
  const [loading, setLoading] = useState(true);
  const { name, merchantId } = props.match.params;
  const tableHeader = {
    Inventory: ["Product Name", "Price", "Product Id"],
    Causes: ["Campaign Name", "Min Price", "Campaign Id"],
    "Coupons": [
      "Coupon Code",
      "Discount (%)",
      "Currency",
      "Max. Discount Amount",
      "Active From",
      "Active Till"
    ]
  };
  const tableKeys = {
    Inventory: ["Name", "Price", "ProductId"],
    Causes: ["Name", "Price", "ProductId"],
    "Coupons": [
      "CouponCode",
      "Discount",
      "Currency",
      "MaxDiscountAmount",
      "CouponActiveFrom",
      "CouponExpiryDate"
    ]
  };
  const [Items, setItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      props.getBusinessDetails({
        MerchantId: merchantId,
        PatronId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId
      });
      switch (name) {
        case "Inventory":
          await props.getMerchantAllProductsAndSegregate({
            MerchantId: merchantId
          });
          setLoading(false);
          break;
        case "Causes":
          await props.getMerchantAllProductsAndSegregate({
            MerchantId: merchantId
          });
          setLoading(false);
          break;
        case "Coupons":
          await props.getMerchantAllCoupons({
            MerchantId: merchantId
          });
          setLoading(false);
          break;
        default:
          break;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    makeData(name);
  }, [props.allProducts, props.allCampaigns, props.allCoupons]);

  const deleteRow = async row => {
    if (name === "Inventory" || name === "Causes") {
      setLoading(true);
      const res = await props.deleteProduct({
        ProductId: row.ProductId.S,
        Timestamp: row.Timestamp.S
      });
      if (res) {
        const res1 = await props.getMerchantAllProductsAndSegregate({
          MerchantId: merchantId
        });
        setLoading(false);
        res1 ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
      } else {
        setLoading(false);
        (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
      }
    } else if (name === "Coupons") {
      setLoading(true);
      const res = await props.deleteCoupon({
        MerchantId: merchantId,
        Timestamp: row.Timestamp.S
      });
      if (res) {
        const res1 = await props.getMerchantAllCoupons({
          MerchantId: merchantId
        });
        setLoading(false);
        res1 ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
      } else {
        setLoading(false);
        (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
      }
    }
  };

  const EditRow = row => {
    console.log(row);
    props.setSelectedRow(row);
    history.push(`/merchantHome/add${name}/edit/${merchantId}`);
  };

  const makeData = name => {
    let Items = [];
    if (name === "Inventory") {
      Items = props.allProducts.map(item => {
        return {
          Name: item.Name,
          Price: item.ProductVariations && item.ProductVariations.L && item.ProductVariations.L.length && item.ProductVariations.L[0].M.UnitPrice && item.ProductVariations.L[0].M.UnitPrice.S ? item.ProductVariations.L[0].M.UnitPrice.S : 0,
          ProductId: item.ProductId,
          Timestamp: item.Timestamp
        };
      });
    } else if (name === "Causes") {
      Items = props.allCampaigns.map(item => {
        return {
          Name: item.Name,
          Price: item.DonationCampaignDetails && item.DonationCampaignDetails.M && item.DonationCampaignDetails.M.MinDonation && item.DonationCampaignDetails.M.MinDonation.S ? item.DonationCampaignDetails.M.MinDonation.S : 0,
          ProductId: item.ProductId,
          Timestamp: item.Timestamp
        };
      });
    } else if (name === "Coupons") {
      Items = props.allCoupons.map(item => {
        return item;
      });
    }
    setItems(Items);
  };

  const navigateToAdd = name => {
    history.push(`/merchantHome/add${name}/add/${merchantId}`);
  };

  return !loading ? (
    <React.Fragment>
      <div className="merchantTable-heading">{name}</div>
      <Container className="merchantTable-container" fluid>
        <button onClick={() => navigateToAdd(name)} className="unfollow">
          Add {name}
        </button>
        <div className="merchantTable-table">
          {Items && Items.length === 0 ? (
            <React.Fragment>
              {/* <div className="product-row-heading">{name}</div> */}
              <span className="not-found"> No data added, Go to {name} to add {name}</span>
            </React.Fragment>
          ) : (
              <TableComp
                tableData={Items}
                tableHeader={tableHeader[name]}
                tableKeys={tableKeys[name]}
                onDelete={deleteRow}
                showDelete={true}
                showEdit={true}
                onEdit={EditRow}
                editText={'Edit'}
                deleteText={'Delete'}
              />)
          }
        </div>
      </Container>
    </React.Fragment>
  ) : (
      <CustomLoader />
    );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMerchantAllProductsAndSegregate,
      getMerchantAllCoupons,
      setSelectedRow,
      deleteProduct,
      deleteCoupon,
      clearSelectedRow,
      getBusinessDetails
    },
    dispatch
  );

const mapStatetoProps = ({ app: { manageBusiness } }) => {
  console.log(manageBusiness);
  return {
    allProducts: manageBusiness.allProducts,
    allCampaigns: manageBusiness.allCampaigns,
    allCoupons: manageBusiness.allCoupons
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(MerchantTableContainer);
