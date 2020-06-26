import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Form, Col, Button } from "react-bootstrap";
import { bindActionCreators } from "redux";
// import {
//   fetchProfileAddresses,
//   updateSelectedBusiness
// } from "../../store/actions";
import "./ProfileAddresses.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import plusIcon from "../../assets/plus.svg";
import CenterModal from "../../components/CenterModal/CenterModal";

const ProfileAddresses = props => {
  const { profileAddresses } = props;
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    async function fetchProfileAddresses() {
      const userId = props.match.params.userId;
      // const res = await props.fetchProfileAddresses({
      //   PatronId: "69116697064443"
      // }); // to be updated by userId
      // res ? setLoading(false) : console.log("err");
    }
    fetchProfileAddresses();
  }, []);

  const navigate = event => {
    // const merchantId = event.currentTarget.dataset.value;
    // await props.getSelectedAddress();
    setModalShow(true);
  };

  const addNewAddress = () => {};

  const addressForm = () => {
    return (
      <div className="AddAddresses">
        <Form id="AddAddressesForm" onSubmit={e => addNewAddress(e)}>
          <Form.Row className="width-25">
            <Col>
              <Form.Group controlId="AddressType">
                <Form.Label>Address Type</Form.Label>
                <Form.Control
                  as="select"
                  // defaultValue={
                  //   selectedBusinessDetails &&
                  //   selectedBusinessDetails.BusinessAddress.M.AddressType.S
                  // }
                  required
                >
                  <option value="testValue"> Address Type</option>
                  <option value="testValue"> India</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId="Country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  as="select"
                  // defaultValue={
                  //   selectedBusinessDetails && selectedBusinessDetails.Country.S
                  // }
                  required
                >
                  <option value="testValue"> Select Country</option>
                  <option value="testValue"> India</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="Pincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  // defaultValue={
                  //   selectedBusinessDetails &&
                  //   selectedBusinessDetails.BusinessAddress.M.PostalCode.S
                  // }
                  type="text"
                  placeholder="Type Pincode"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="Province">
                <Form.Label>Province</Form.Label>
                <Form.Control
                  // defaultValue={
                  //   selectedBusinessDetails &&
                  //   selectedBusinessDetails.BusinessAddress.M.Province.S
                  // }
                  type="text"
                  placeholder="Type Province"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="City">
                <Form.Label>City</Form.Label>
                <Form.Control
                  // defaultValue={
                  //   selectedBusinessDetails &&
                  //   selectedBusinessDetails.BusinessAddress.M.City.S
                  // }
                  type="text"
                  placeholder="City"
                  required
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row className="width-75">
            <Col>
              <Form.Group controlId="StreetName">
                <Form.Label>Street Name</Form.Label>
                <Form.Control
                  // defaultValue={
                  //   selectedBusinessDetails &&
                  //   selectedBusinessDetails.BusinessAddress.M.StreetName.S
                  // }
                  type="text"
                  placeholder="Type Street Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="StreetNumber">
                <Form.Label>Street Number</Form.Label>
                <Form.Control
                  // defaultValue={
                  //   selectedBusinessDetails &&
                  //   selectedBusinessDetails.BusinessAddress.M.StreetNumber.S
                  // }
                  type="text"
                  placeholder="Type Street Number"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="Suburb">
                <Form.Label>Suburb</Form.Label>
                <Form.Control
                  // defaultValue={
                  //   selectedBusinessDetails &&
                  //   selectedBusinessDetails.BusinessAddress.M.Suburb.S
                  // }
                  type="text"
                  placeholder="Type Suburb"
                  required
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <div className="buttons">
            <Button onClick={e => setModalShow(false)} className="cancelButton">
              Cancel
            </Button>
            <Button className="saveButton" type="submit">
              Save Address
            </Button>
          </div>
        </Form>
      </div>
    );
  };

  return !loading ? (
    !modalShow ? (
      <Container className="ProfileAddresses-page-container" fluid>
        <div className="ProfileAddresses-page">
          {/* <div className="ProfileAddresses-header">
          <span className="heading">Registered Businesses</span>
        </div> */}
          <div className="business-card-holder">
            {/* {profileAddresses.map(business => {
              return (
                <div
                  data-value={business.MerchantId.S}
                  onClick={e => navigate(e)}
                  key={business.MerchantId.S}
                  className="business-card"
                >
                  <p> {business.BusinessHandle.S}</p>
                  <span>{business.BusinessType.S}</span>
                  <button className="edit-business">Edit</button>
                </div>
              );
            })} */}
            <div className="business-card">
              <button
                onClick={() => setModalShow(true)}
                className="add-business"
              >
                <img className="plus-icon" alt="plus-icon" src={plusIcon}></img>
                Add New
              </button>
            </div>
          </div>
        </div>
      </Container>
    ) : (
      <CenterModal
        component={addressForm()}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    )
  ) : (
    <CustomLoader />
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // fetchProfileAddresses,
      // updateSelectedBusiness
    },
    dispatch
  );

const mapStatetoProps = ({ app: { manageBusiness } }) => {
  console.log(manageBusiness);
  return {
    profileAddresses: manageBusiness.profileAddresses
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(ProfileAddresses);
