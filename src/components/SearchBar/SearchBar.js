import React, {useState} from "react";
import {
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
  Form
} from "react-bootstrap";
import downArrow from "../../assets/down-arrow.svg";
import "./SearchBar.scss";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a className="catagory-dropdown"
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    {/* &#x25bc; */}
    <img alt="search-icon" src={downArrow}></img>
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

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

const SearchBar = () => {
  return (
    <React.Fragment>
      <Form className="search-bar">
        <InputGroup className="search-input">
          <FormControl
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon2"
          />

          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              All Categories
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
              <Dropdown.Item eventKey="1">Red</Dropdown.Item>
              <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
              <Dropdown.Item eventKey="3" active>
                Orange
              </Dropdown.Item>
              <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup>
      </Form>
    </React.Fragment>
  );
};

export default SearchBar;
