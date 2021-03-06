import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { footerLinksLoggedout, footerLinksLoggedin, socialSharing } from "../../constants/constants";
import brandlogo from "../../assets/brand-logo.png";
import dhl from "../../assets/dhl.svg";
import payfast from "../../assets/payfast.png";
import collivery from "../../assets/collivery.png";
import PayPal from "../../assets/PayPal.svg";
import { useAuth } from "../../context/auth";

const Footer = (props) => {
  const isAuthenticated = useAuth();
  const [footerLinks, setFooterLinks] = useState([]);

  useEffect(() => {
    setFooterLinks((isAuthenticated ? footerLinksLoggedin : footerLinksLoggedout))
  }, [isAuthenticated]);

  const makeItems = (link, k) => {
    let path = link.path;
    if (["My Profile", "My Cart", "My Orders", "My Contacts"].includes(link.name)) {
      path = path + props.userId;
      if (link.name === "My Orders") {
        path = path + "/Pending in Total";
      } else if (link.name === "My Contacts") {
        path = path + "/Add Contacts";
      }
    }
    console.log(path);
    if (["Privacy Policy", "Term & Conditions"].includes(link.name)) {
      return (
        <Nav key={k} className="flex-column">
          <a className="nav-link" href={path} target="blank">
            {link.name}
          </a>
        </Nav>)
    } else {
      return (<Nav key={k} className="flex-column">
        <Nav.Link as={Link} to={path}>
          {link.name}
        </Nav.Link>
      </Nav>)
    }
  }

  return (
    <Container className="footer" fluid>
      <Row className="links-row-1">
        <Col className="links-col" xs={7}>
          {footerLinks && footerLinks.length && footerLinks.map((links, i) => {
            return (
              <div className="footer-links" key={i}>
                {links.map((link, k) => {
                  return (
                    makeItems(link, k)
                  )
                })
                }
              </div>
            );
          })}
        </Col>
        <Col className="partner-info" >
          <div>
            <span className="partner-info-text">Third party partners</span>
            <div className="partner-info-grid">
              <div className="logo-border">
                <img
                  className="partner-logo"
                  alt="dhl"
                  src={dhl}
                ></img>
              </div>
              <div className="logo-border">
                <img
                  className="partner-logo"
                  alt="PayPal"
                  src={PayPal}
                ></img>
              </div>
              <div className="partner-info-grid">
                {/* <div className="logo-border">
                  <img
                    className="partner-logo"
                    alt="collivery"
                    src={collivery}
                  ></img>
                </div>
                <div className="logo-border">
                  <img
                    className="partner-logo"
                    alt="payfast"
                    src={payfast}
                  ></img>
                </div> */}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="links-row-2">
        <Col xs={1}></Col>
        <Col xs={2}>
          <div className="social-links">
            {socialSharing.map(social => {
              return (
                <a href={social.path}>
                  <img
                    className="nav-icon"
                    alt={social.imgName}
                    src={require(`../../assets/${social.imgName}.svg`)}
                  ></img>
                </a>
              );
            })}
          </div>
        </Col>
        <Col></Col>
      </Row>
      <Row className="links-row-3">
        <Col>
          <div className="footer-copyright">
            <span>copyright rights reserved 2020</span>
          </div>
          <div className="footer-copyright">
            <img
              className="footer-brand-logo"
              alt="c.Anglex-logo"
              src={brandlogo}
            ></img>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
