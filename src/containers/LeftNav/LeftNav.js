import React from "react";
import "./LeftNav.scss";
import { Nav, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const LeftNav = props => {
  return (
    <div className="leftNav">
      <div className="leftNav-heading">MANAGE</div>
      <Card className="list">
        <Card.Body>
          {props.links.map(link => {
            return (
              <div key={link.name} className="list-item">
                <img className="nav-icon" alt="bell-icon" src={require(`../../assets/${link.icon}.svg`)}></img>
                <Nav className="flex-column">
                  <Nav.Link as={Link} to={link.path}>
                    {link.name}
                  </Nav.Link>
                </Nav>
              </div>
            );
          })}
        </Card.Body>
      </Card>
    </div>
  );
};

export default LeftNav;
