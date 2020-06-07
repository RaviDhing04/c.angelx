import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getMerchantAllProductsAndSegregate,
  getMerchantAllCoupons
} from "../../store/actions";
import "./MerchantTableContainer.scss";
import { Container } from "react-bootstrap";
import TableComp from "../../components/TableComp/TableComp";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { useHistory } from "react-router-dom";

const MerchantTableContainer = props => {
  const [loading, setLoading] = useState(true);
  const { name, merchantId } = props.match.params;
  const tableHeader = { Inventory: ["Product Name", "Price", "Product Id"] };
  const tableKeys = { Inventory: ["Name", "Price", "ProductId"] };
  const [Items, setItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      switch (name) {
        case "Inventory":
          await props.getMerchantAllProductsAndSegregate({
            MerchantId: merchantId
          });
          setLoading(false);
          break;
        case "Campaigns":
          await props.getMerchantAllProductsAndSegregate();
          setLoading(false);
          break;
        case "Coupons":
          await props.getMerchantAllCoupons();
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
    // setLoading(true);
    // const res = await deleteContact({
    //   UserId: row && row.UserId.S,
    //   ContactUserId: row && row.ContactUserId.S,
    // });
    // if (res) {
    //   const res = await getSavedContacts({ UserId: userId });
    //   res ? setLoading(false) : console.log("err");
    // }
  };

  const EditRow = row => {
    console.log(row);
  };

  const makeData = name => {
    let Items = [];
    if (name === "Inventory") {
      Items = props.allProducts.map(item => {
        return {
          Name: item.Name,
          Price: item.ProductSpecifications.M.UnitPrice,
          ProductId: item.ProductId
        };
      });
    }
    setItems(Items);
  };

  const navigateToAdd = (name) => {
    history.push(`/merchantHome/add${name}`);
  }

  return !loading ? (
    <React.Fragment>
      <div className="merchantTable-heading">{name}</div>
      <Container className="merchantTable-container" fluid>
        <button onClick={() => navigateToAdd(name)} className="unfollow">Add {name}</button>
        <div className="merchantTable-table">
          {
            <TableComp
              tableData={Items}
              tableHeader={tableHeader[name]}
              tableKeys={tableKeys[name]}
              onDelete={deleteRow}
              showDelete={true}
              showEdit={true}
              onEdit={EditRow}
            />
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
      getMerchantAllCoupons
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
