import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getPatronsFollowingMerchants
} from "../../store/actions";
import "./ViewPatrons.scss";
import TableComp from "../../components/TableComp/TableComp";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const ViewPatrons = props => {
  const [loading, setLoading] = useState(true);
  const [pageName, setName] = useState("");
  const { name, merchantId } = props.match.params;
  const {
    patronsFollowingMerchants,
    getPatronsFollowingMerchants
  } = props;
  const tableHeader = ["Email", "Name", "Phone Number"];
  const tableKeys = ["email", "name", "phone_number"];

  useEffect(() => {
    async function fetchPatrons() {
      name ? setName(name) : setName("");
      const res = getPatronsFollowingMerchants({
        "MerchantId": "1587031042915"
       // "MerchantId": merchantId
      });
      res
        ? setLoading(false)
        : (function () {
          setLoading(false);
          alert("something went wrong, Please try again!");
        })();
    }
    fetchPatrons();
  }, []);

  return !loading ? (
    <React.Fragment>
    <div className="add-patron-heading">{pageName}</div>
        <div className="patrons-table">
          {
            <TableComp
              tableData={patronsFollowingMerchants}
              tableHeader={tableHeader}
              tableKeys={tableKeys}
              //onDelete={deleteRow}
              showDelete={false}
              showEdit={false}
            />
          }
        </div>
        </React.Fragment>
  ) : (
      <CustomLoader />
    );
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPatronsFollowingMerchants
    },
    dispatch
  );

const mapStatetoProps = ({ app: { patrons } }) => {
  console.log('patrons', patrons);
  return {
    patronsFollowingMerchants: patrons.patronsFollowingMerchants
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(ViewPatrons);
