import React, { useState } from "react";
import "./LeftNav.scss";
import { Nav, Card, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { uploadTermsAndConditions } from "../../store/actions";
import checkmark from "../../assets/checkmark.svg";

const LeftNav = props => {
  const { links, merchants, merchantId, showMerchants, count } = props;
  const userId = JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId;
  const [searchResults, setSearchResults] = useState([]);

  const filterMerchants = (val) => {
    let searchArray = val.trim().split(" ");
    let re = new RegExp(searchArray.join("|"), "i");
    let resultsObj = merchants && merchants.length && merchants.filter(merchant =>
      re.test(merchant.BusinessHandle.S)
    );
    setSearchResults(resultsObj);
  }

  const submit = (e) => {
    e.preventDefault();
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const addFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileString = await toBase64(file);
      const payload = { "FileExtention": "pdf", "MerchantId": merchantId, "base64": fileString.split(',')[1] }
      const res = await uploadTermsAndConditions(payload);
      res ? alert('Terms and Conditions updated successfully') : (function () { (alert('something went wrong, Please try again!')) }());
    }
  };

  return (
    <div className="leftNav">
      <div className="leftNav-heading">MANAGE</div>
      <Card className="list">
        <Card.Body>
          {links &&
            links.map(link => {
              return (
                <div key={link.name} className={window.location.href.includes(link.name.split(' ')[0]) ? "list-item active" : link.enable ? "list-item" : "list-item disable"}>
                  <img
                    className="nav-icon"
                    alt="bell-icon"
                    src={require(`../../assets/${link.icon}.svg`)}
                  ></img>
                  {link.enable ? <Nav className="flex-column">
                    <Nav.Link
                      as={Link}
                      to={merchantId ? link.path + ((link.name === "Add Discount Coupons") ? "Coupons" : link.name) + "/" + merchantId : link.path.includes('viewAllProducts') ? link.path + link.name : link.path + userId + "/" + link.name}
                    >
                      {link.name}
                    </Nav.Link>
                  </Nav> : (<Nav className="flex-column">
                    <div className="nav-link"> {link.name} </div>
                  </Nav>)}
                  {count && count[link.name] ? <span className="count">{count[link.name]}</span> : null}
                </div>
              );
            })}
        </Card.Body>
      </Card>
      {showMerchants ? (
        <div className="merchant-search">
          <div className="leftNav-heading">Merchant's & NPO's Followed</div>
          <Card className="list">
            <Form onSubmit={(e) => submit(e)} className="merchant-search-bar">
              <InputGroup className="search-input">
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  onChange={(e) => filterMerchants(e.target.value)}
                />
              </InputGroup>
            </Form>
            <Card.Body className="card-npo">
              {searchResults && searchResults.length ?
                (searchResults.map((merchant, i) => {
                  return (
                    <div key={i} className="list-item">
                      <Nav className="flex-column">
                        <Nav.Link
                          as={Link}
                          to={{
                            pathname: `/merchantHome/viewAllProducts/${"Latest Uploads"}/${merchant.MerchantId.S}`,
                            state: {
                              fromUser: true
                            }
                          }}
                        >
                          {merchant.BusinessHandle.S}
                        </Nav.Link>
                      </Nav>
                      <img
                        className="nav-icon"
                        alt="checkmark"
                        src={checkmark}
                      ></img>
                    </div>
                  );
                })) : (merchants &&
                  merchants.map((merchant, i) => {
                    return (
                      <div key={i} className="list-item">
                        <Nav className="flex-column">
                          <Nav.Link
                            as={Link}
                            to={{
                              pathname: `/merchantHome/viewAllProducts/${"Latest Uploads"}/${merchant.MerchantId.S}`,
                              state: {
                                fromUser: true
                              }
                            }}
                          >
                            {merchant && merchant.BusinessHandle.S}
                          </Nav.Link>
                        </Nav>
                        {merchant && merchant.VerificationStatus.S === 'Verified' ? <img
                          className="nav-icon"
                          alt="checkmark"
                          src={checkmark}
                        ></img> : null}
                      </div>
                    );
                  })
                )
              }
            </Card.Body>
          </Card>
        </div>
      ) : null}
      {showMerchants ? <Button className="statics-btn" >Show/Hide Statistics</Button> : null}
      {!showMerchants && merchantId ? <div onChange={addFile}>
        <label htmlFor="Upload_Terms" className="terms">Edit terms and conditions</label>
        <input id="Upload_Terms"
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
        /> </div> 
        // <a href="/support" className="terms" >Edit Terms and Conditionss</a>
         : null}
    </div>
  );
};

export default LeftNav;
