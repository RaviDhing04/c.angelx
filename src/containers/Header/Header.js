import React from "react";
import {Link} from "react-router-dom"
import { Navbar, Nav, Form, Container } from "react-bootstrap";
import brandlogo from "../../assets/brand-logo.svg";
import dollar from "../../assets/dollar.svg";
import globe from "../../assets/globe.svg";
import heart from "../../assets/heart.svg";
import shoppingcart from "../../assets/shopping-cart.svg";
import bell from "../../assets/bell.svg";
import profile from "../../assets/profile.svg";
import downArrow from "../../assets/down-arrow.svg";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Header.scss";

const Header = () => {
  return (
    <React.Fragment>
    <Container fluid className="header">
      <Navbar collapseOnSelect expand="md">
        <Navbar.Brand href="#home">
          <img className="brand-logo" alt="c.Anglex-logo" src={brandlogo}></img>
        </Navbar.Brand>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto left-links-wrapper">
            <Nav.Link className="left-links" as={Link} to={`/home`}>Home</Nav.Link>
            <Nav.Link href="#pricing" className="left-links">Support</Nav.Link>
            <Nav.Link href="#pricing" className="left-links">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <SearchBar />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto right-links-wrapper">
            <Nav.Link href="#deets">
              <img className="nav-icon" alt="dollor-icon" src={dollar}></img>{" "}
              USD{" "}
            </Nav.Link>
            <Nav.Link href="#deets">
              <img className="nav-icon" alt="globe-icon" src={globe}></img>{" "}
              English{" "}
            </Nav.Link>
            <Nav.Link href="#memes">
              <img className="nav-icon" alt="heart-icon" src={heart}></img>
            </Nav.Link>
            <Nav.Link href="#memes">
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
              <img className="nav-icon" alt="profile-icon" src={profile}></img>
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
