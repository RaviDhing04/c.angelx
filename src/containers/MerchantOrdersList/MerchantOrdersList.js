import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getOrderItemsMerchant
} from "../../store/actions";
import "./MerchantOrdersList.scss";
import { Container } from "react-bootstrap";
import TableComp from "../../components/TableComp/TableComp";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { useHistory } from "react-router-dom";

const MerchantOrdersList = props => {
    const [loading, setLoading] = useState(true);
    const [pageName, setName] = useState("");
    const { name, merchantId } = props.match.params;
    const tableHeader = {
        "Patrons": ["Patron Name", "Status"]
    };
    const tableKeys = {
        "Patrons": ["name", "user_status"],
    };
    const history = useHistory();


    useEffect(() => {
        async function fetchOrderItems() {
            name ? setName(name) : setName("");
            let res;
            switch (name) {
                case 'Pending in Total':
                    res = await getOrderItemsMerchant({ MerchantId: merchantId, "OrderType": "CART", "OrderStatus": "PAYMENT_COMPLETED" });
                    break;
                case 'Lay Buys in Total':
                    res = await getOrderItemsMerchant({ UserId: merchantId, "OrderType": "LAYBUY", "OrderStatus": "PAYMENT_COMPLETED" });
                    break;
                case 'Group Buys in Total':
                    res = await getOrderItemsMerchant({ UserId: merchantId, "OrderType": "GROUP", "OrderStatus": "PAYMENT_COMPLETED" });
                    break;
                case 'Donations':
                    res = await getOrderItemsMerchant({ UserId: merchantId, "OrderType": "DONATION", "OrderStatus": "PAYMENT_COMPLETED" });
                    break;
                default:
                    break;
            }
            res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
        }
        fetchOrderItems();
    }, []);

    return !loading ? (
        <React.Fragment>
            <div className="patronsTable-heading">{pageName}</div>
            <Container className="patronsTable-container" fluid>
                <button style={{ "visibility": "hidden" }} className="unfollow">
                    Add {name}
                </button>
                <div className="patronsTable-table">
                    {props.merchant && props.allPatrons.length === 0 ? (
                        <React.Fragment>
                            {/* <div className="product-row-heading">{name}</div> */}
                            <span className="not-found"> No records found</span>
                        </React.Fragment>
                    ) : (
                            <TableComp
                                tableData={props.allPatrons}
                                tableHeader={tableHeader[name]}
                                tableKeys={tableKeys[name]}
                                showDelete={false}
                                showEdit={false}
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
            getOrderItemsMerchant
        },
        dispatch
    );

const mapStatetoProps = ({ app: { ordersListMerchantPage, common } }) => {
    console.log(ordersListMerchantPage);
    return {
        orderItems: ordersListMerchantPage.orderItems,
        activeCurrency: common.activeCurrency
    };
};

export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(MerchantOrdersList);
