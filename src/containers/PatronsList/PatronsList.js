import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getMerchantAllPatrons,
    getBusinessDetails
} from "../../store/actions";
import "./PatronsList.scss";
import { Container } from "react-bootstrap";
import TableComp from "../../components/TableComp/TableComp";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { useHistory } from "react-router-dom";

const PatronsList = props => {
    const [loading, setLoading] = useState(true);
    const { name, merchantId } = props.match.params;
    const tableHeader = {
        "Patrons": ["Patron Name", "Status"]
    };
    const tableKeys = {
        "Patrons": ["name", "user_status"],
    };
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            //   props.getBusinessDetails({
            //     MerchantId: merchantId,
            //     PatronId: JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId
            //   });
            switch (name) {
                case "Patrons":
                    await props.getMerchantAllPatrons({
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

    return !loading ? (
        <React.Fragment>
            <div className="patronsTable-heading">{name}</div>
            <Container className="patronsTable-container" fluid>
                <div className="patronsTable-table">
                    {props.allPatrons && props.allPatrons.length === 0 ? (
                        <React.Fragment>
                            {/* <div className="product-row-heading">{name}</div> */}
                            <span className="not-found"> No records found</span>
                        </React.Fragment>
                    ) : (
                            < TableComp
                                tableData={props.allPatrons}
                                tableHeader={tableHeader[name]}
                                tableKeys={tableKeys[name]}
                                showDelete={false}
                                showEdit={false}
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
            getMerchantAllPatrons,
            getBusinessDetails
        },
        dispatch
    );

const mapStatetoProps = ({ app: { manageBusiness } }) => {
    console.log(manageBusiness);
    return {
        allPatrons: manageBusiness.allPatrons
    };
};

export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(PatronsList);
