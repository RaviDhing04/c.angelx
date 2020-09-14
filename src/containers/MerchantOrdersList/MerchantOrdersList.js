import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getOrderItemsMerchant,
    updateOrderStatus
} from "../../store/actions";
import "./MerchantOrdersList.scss";
import { Container } from "react-bootstrap";
import TableComp from "../../components/TableComp/TableComp";
import CenterModal from "../../components/CenterModal/CenterModal";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { useHistory } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";

const MerchantOrdersList = props => {
    const [loading, setLoading] = useState(true);
    const [pageName, setName] = useState("");
    const [modalType, setModalType] = useState("");
    const [selectedRow, setSelectedRow] = useState({});
    const { name, merchantId } = props.match.params;
    const tableHeader = {
        'Pending Total Orders': ["Order id", "Quantity", "Amount", "Discounted amount", "Payment status"],
        'Lay Buy Orders': ["Order id", "Quantity", "Amount", "Discounted amount", "Payment status"],
        'Group Purchase Orders': ["Order id", "Quantity", "Amount", "Discounted amount", "Payment status"],
        'Donations': ["Order id", "Quantity", "Amount", "Discounted amount", "Payment status"],
        "Sales-Pending Deliveries": ["Order id", "Quantity", "Amount", "Discounted amount", "Payment status"],
        'Declined Orders': ["Order id", "Quantity", "Amount", "Discounted amount", "Payment status"]
    };
    const tableKeys = {
        'Pending Total Orders': ["OrderId", "TotalQty", "UndiscountedAmount", "DiscountedAmount", "PaymentStatus"],
        'Lay Buy Orders': ["OrderId", "TotalQty", "UndiscountedAmount", "DiscountedAmount", "PaymentStatus"],
        'Group Purchase Orders': ["OrderId", "TotalQty", "UndiscountedAmount", "DiscountedAmount", "PaymentStatus"],
        'Donations': ["OrderId", "TotalQty", "UndiscountedAmount", "DiscountedAmount", "PaymentStatus"],
        "Sales-Pending Deliveries": ["OrderId", "TotalQty", "UndiscountedAmount", "DiscountedAmount", "PaymentStatus"],
        'Declined Orders': ["OrderId", "TotalQty", "UndiscountedAmount", "DiscountedAmount", "PaymentStatus"]
    };
    const history = useHistory();

    useEffect(() => {
        fetchOrderItems();
    }, [name]);

    async function fetchOrderItems() {
        name ? setName(name) : setName("");
        let res;
        switch (name) {
            case 'Pending Total Orders':
                res = await props.getOrderItemsMerchant({ MerchantId: merchantId, "OrderType": "CART", "OrderStatus": "PAYMENT_COMPLETED" });
                break;
            case 'Lay Buy Orders':
                res = await props.getOrderItemsMerchant({ MerchantId: merchantId, "OrderType": "LAYBUY", "OrderStatus": "PAYMENT_COMPLETED" });
                break;
            case 'Group Purchase Orders':
                res = await props.getOrderItemsMerchant({ MerchantId: merchantId, "OrderType": "GROUP", "OrderStatus": "PAYMENT_COMPLETED" });
                break;
            case 'Donations':
                res = await props.getOrderItemsMerchant({ MerchantId: merchantId, "OrderType": "DONATION", "OrderStatus": "PAYMENT_COMPLETED" });
                break;
            case "Sales-Pending Deliveries":
                res = await props.getOrderItemsMerchant({ MerchantId: merchantId, "OrderType": "ALL", "OrderStatus": "SHIPMENT_CREATED" });
                break;
            case 'Declined Orders':
                res = await props.getOrderItemsMerchant({ MerchantId: merchantId, "OrderType": "ALL", "OrderStatus": "DECLINED" });
                break;
            default:
                break;
        }
        res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    }

    const DeclineOrder = async (event) => {

        const formElements = event.target.elements;
        const reason = formElements['DeclineReason'].value;
        if (reason) {
            setLoading(true);
            const res = await props.updateOrderStatus(
                {
                    "MerchantId": merchantId,
                    "OrderId": selectedRow.OrderId && selectedRow.OrderId.S,
                    "Status": "DECLINED",
                    "Comments": reason,
                    "ShippingDate": ''
                });
            if (res) {
                setModalType('');
                fetchOrderItems();
            }
        } else {
            alert('Please write the reason for decline');
        }
    }

    const ApproveOrder = async event => {

        const formElements = event.target.elements;
        const date = new Date(formElements['shippingDate'].value).toISOString().substring(0, 19)
        const offset = new Date().getTimezoneOffset();
        if (date) {
            setLoading(true);
            const res = await props.updateOrderStatus(
                {
                    "MerchantId": merchantId,
                    "OrderId": selectedRow.OrderId && selectedRow.OrderId.S,
                    "Status": "APPROVED",
                    "Comments": "Approved",
                    "ShippingDate": date + 'GMT' + minTommss(Math.abs(offset / 60))
                });
            if (res) {
                setModalType('')
                fetchOrderItems();
            }
        } else {
            alert('Please select Shipping date');
        }
    };

    function minTommss(minutes) {
        var sign = minutes < 0 ? "-" : "";
        var min = Math.floor(Math.abs(minutes));
        var sec = Math.floor((Math.abs(minutes) * 60) % 60);
        return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
    }

    const showApprovePopup = async row => {
        setModalType('Approve');
        setSelectedRow(row);
    }

    const showDeclinePopup = async row => {
        setModalType('Decline');
        setSelectedRow(row);
    }


    const temp = (type) => {
        if (type === 'Approve') {
            return (
                <div className="popup-container">
                    <Form onSubmit={e => ApproveOrder(e)}>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="shippingDate">
                                    <Form.Label>Select Shipping Date</Form.Label>
                                    <Form.Control
                                        type="date" name="shippingDate" placeholder="Shipping Date" />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <div className="buttons">
                            <Button onClick={() => setModalType('')} className="cancelButton">
                                Cancel
              </Button>
                            <Button className="saveButton" type="submit">
                                Approve
              </Button>
                        </div>
                    </Form>
                </div>
            );
        } else {
            return (
                <div className="popup-container">
                    <Form onSubmit={e => DeclineOrder(e)}>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="DeclineReason">
                                    <Form.Label>Reason for decline</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="5"
                                        placeholder="Type reason for decline"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <div className="buttons">
                            <Button onClick={() => setModalType('')} className="cancelButton">
                                Cancel
          </Button>
                            <Button className="saveButton" type="submit">
                                Decline
          </Button>
                        </div>
                    </Form>
                </div>
            )
        }
    }

    return !loading ? (
        <React.Fragment>
            <div className="patronsTable-heading">{pageName}</div>
            <Container className="patronsTable-container" fluid>
                <button style={{ "visibility": "hidden" }} className="unfollow">
                    Add {name}
                </button>
                <div className="patronsTable-table">
                    {props.orderItems && props.orderItems.length === 0 ? (
                        <React.Fragment>
                            {/* <div className="product-row-heading">{name}</div> */}
                            <span className="not-found"> No records found</span>
                        </React.Fragment>
                    ) : (['Pending Total Orders', 'Lay Buy Orders', 'Group Purchase Orders', 'Donations'].includes(pageName) ?
                        <TableComp
                            tableData={props.orderItems}
                            tableHeader={tableHeader[name]}
                            tableKeys={tableKeys[name]}
                            onDelete={showDeclinePopup}
                            showDelete={true}
                            showEdit={true}
                            onEdit={showApprovePopup}
                            editText={'Approve'}
                            deleteText={'Decline'}
                        /> : <TableComp
                            tableData={props.orderItems}
                            tableHeader={tableHeader[name]}
                            tableKeys={tableKeys[name]}
                            showDelete={false}
                            showEdit={false}
                            editText={'Approve'}
                            deleteText={'Decline'}
                        />)
                    }
                </div>
            </Container>
            {modalType ? <CenterModal
                onHide={() => setModalType('')}
                component={temp(modalType)}
                show={true}
                size="sm"
            /> : null}
        </React.Fragment>
    ) : (
            <CustomLoader />
        );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getOrderItemsMerchant,
            updateOrderStatus
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
