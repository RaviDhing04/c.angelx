import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import brandlogo from "../../assets/brand-logo.svg";
import globe from "../../assets/globe.svg";
import heart from "../../assets/heart.svg";
import shoppingcart from "../../assets/shopping-cart.svg";
import bell from "../../assets/bell.svg";
import profile from "../../assets/profile.svg";
import downArrow from "../../assets/down-arrow.svg";
import SearchBar from "../../components/SearchBar/SearchBar";
import Notification from "../../components/Notification/Notification";
import { currencies, profileOptions } from "../../constants/constants";
import "./Header.scss";
import { setGlobalCurrency, getSearchCategories } from "../../store/actions";

const Header = props => {
  const [activeCurrency, setActiveCurrency] = useState(currencies[0]);
  const [showNotification, toggleNotification] = useState(false);

  const changeCurrency = e => {
    if (e && e.target) {
      const selected = currencies.find(currency => {
        return currency.name === e.target.attributes.value.nodeValue;
      });
      setActiveCurrency(selected);
      props.setGlobalCurrency(selected);
    }
  };

  useEffect(() => {
    props.setGlobalCurrency(activeCurrency);
    props.getSearchCategories();
  }, []);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      className="catagory-dropdown"
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              child => child
              //   !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );
  return (
    <React.Fragment>
      <Container fluid className="header">
        <Navbar collapseOnSelect>
          <Navbar.Brand as={Link} to={`/home`}>
            <img
              className="brand-logo"
              alt="c.Anglex-logo"
              src={brandlogo}
            ></img>
          </Navbar.Brand>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto left-links-wrapper">
              <Nav.Link className="left-links" as={Link} to={`/home`}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={`/support`} className="left-links">
                Support
              </Nav.Link>
              <Nav.Link as={Link} to={`/aboutUs`} className="left-links">
                About Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <SearchBar searchCategories={props.searchCategories}/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto right-links-wrapper">
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  <img
                    className="currency-icon"
                    alt={activeCurrency.icon + "name"}
                    src={require(`../../assets/${activeCurrency.icon}.svg`)}
                  ></img>
                  {activeCurrency.shortName}
                </Dropdown.Toggle>
                <Dropdown.Menu alignRight as={CustomMenu}>
                  {currencies.map(currency => {
                    return (
                      <Dropdown.Item
                        onClick={e => changeCurrency(e)}
                        eventKey="3"
                        value={currency.name}
                        active={activeCurrency.name === currency.name}
                      >
                        <img
                          className="currency-icon"
                          alt={currency.icon + "name"}
                          src={require(`../../assets/${currency.icon}.svg`)}
                        ></img>{" "}
                        {currency.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
              <img className="nav-icon" alt="globe-icon" src={globe}></img>{" "}
              English{" "}
              <Nav.Link
                as={Link}
                to={`/home/ordersList/${props.userId}/Wishlist`}
              >
                <img className="nav-icon" alt="heart-icon" src={heart}></img>
              </Nav.Link>
              <Nav.Link as={Link} to={`/cart/${props.userId}`}>
                <img
                  className="nav-icon"
                  alt="shoppingcart-icon"
                  src={shoppingcart}
                ></img>
              </Nav.Link>
              <Nav.Link onClick={() => toggleNotification(!showNotification)}>
                <img className="nav-icon" alt="bell-icon" src={bell}></img>
              </Nav.Link>
              {showNotification ? (
                <div className="notification-div">
                  <Notification />
                </div>
              ) : null}
              {/* <Nav.Link href="#memes">
                <img
                  className="nav-icon"
                  alt="profile-icon"
                  src={profile}
                ></img>
                <img
                  className="nav-icon"
                  alt="downArrow-icon"
                  src={downArrow}
                ></img>
              </Nav.Link> */}
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  <img
                    className="nav-icon"
                    alt="profile-icon"
                    src={profile}
                  ></img>
                  <img
                    className="nav-icon"
                    alt="downArrow-icon"
                    src={downArrow}
                  ></img>
                </Dropdown.Toggle>
                <Dropdown.Menu alignRight as={CustomMenu}>
                  {profileOptions.map((option, index) => {
                    return (
                      <Dropdown.Item
                        eventKey={index}
                        as={Link}
                        to={option.path + props.userId}
                      >
                        {option.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Navbar>
      </Container>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setGlobalCurrency,
      getSearchCategories
    },
    dispatch
  );

const mapStatetoProps = ({ app: { homePage, common } }) => {
  console.log(common);
  return {
    searchCategories: homePage.searchCategories
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Header);
