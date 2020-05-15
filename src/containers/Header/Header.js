import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import brandlogo from "../../assets/brand-logo.svg";
import dollar from "../../assets/dollar.svg";
import globe from "../../assets/globe.svg";
import heart from "../../assets/heart.svg";
import shoppingcart from "../../assets/shopping-cart.svg";
import bell from "../../assets/bell.svg";
import profile from "../../assets/profile.svg";
import downArrow from "../../assets/down-arrow.svg";
import SearchBar from "../../components/SearchBar/SearchBar";
import { currencies } from "../../constants/constants";
import "./Header.scss";

const Header = props => {
  const [activeCurrency, setActiveCurrency] = useState({
    name: "US Dollar",
    shortName: "USD",
    icon: "dollar"
  });

  const changeCurrency = e => {
    if (e && e.target) {
      setActiveCurrency(
        currencies.find(currency => {
          return currency.name === e.target.attributes.value.nodeValue;
        })
      );
    }
  };

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
          <Navbar.Brand href="#home">
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
              <Nav.Link href="#pricing" className="left-links">
                Support
              </Nav.Link>
              <Nav.Link href="#pricing" className="left-links">
                About Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <SearchBar />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto right-links-wrapper">
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  <img
                    className="nav-icon"
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
                          className="nav-icon"
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
              <Nav.Link href="#memes">
                <img className="nav-icon" alt="heart-icon" src={heart}></img>
              </Nav.Link>
              <Nav.Link as={Link} to={`/cart/${props.userId}`}>
                <img
                  className="nav-icon"
                  alt="shoppingcart-icon"
                  src={shoppingcart}
                ></img>
              </Nav.Link>
              <Nav.Link href="#memes">
                <img className="nav-icon" alt="bell-icon" src={bell}></img>
              </Nav.Link>
              <Nav.Link href="#memes">
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
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Navbar>
      </Container>
    </React.Fragment>
  );
};

export default Header;
