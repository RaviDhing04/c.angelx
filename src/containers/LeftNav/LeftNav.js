import React from "react";
import "./LeftNav.scss";
import { Nav, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const LeftNav = props => {
  return (
    <div className="leftNav">
      <div className="leftNav-heading">MANAGE</div>
      <Card>
          <Card.Body>
        {props.links.map(link => {
          return (
            <Nav className="flex-column">
              <Nav.Link as={Link} to={link.path}>
                {link.name}
              </Nav.Link>
            </Nav>
          );
        })}
        </Card.Body>
      </Card>
    </div>
  );
};

export default LeftNav;
