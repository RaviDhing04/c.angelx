import React from "react";
import "./LeftNav.scss";
import { Nav, Card, Form, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import checkmark from "../../assets/checkmark.svg";

const LeftNav = props => {
  const { links, merchants, merchantId } = props;
  const userId = JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId;;

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
                      to={merchantId ? link.path + link.name + "/" + merchantId : link.path.includes('viewAllProducts') ? link.path + link.name : link.path + userId + "/" + link.name}
                    >
                      {link.name}
                    </Nav.Link>
                  </Nav> : (<Nav className="flex-column">
                    <div className="nav-link"> {link.name} </div>
                  </Nav>)}
                </div>
              );
            })}
        </Card.Body>
      </Card>
      {merchants.length ? (
        <div className="merchant-search">
          <div className="leftNav-heading">Merchant's & NPO's Followed</div>
          <Card className="list">
            <Form className="merchant-search-bar">
              <InputGroup className="search-input">
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
            </Form>
            <Card.Body>
              {merchants &&
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
                })}
            </Card.Body>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default LeftNav;
