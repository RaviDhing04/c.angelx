import React, { useState } from "react";
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
    {/* &#x25bc; */}
    <img alt="search-icon" className="search-icon" src={downArrow}></img>
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
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

const SearchBar = props => {
  const [selectedCategory, setselectedCategory] = useState("");


  const changeCategory = (e) => {
    if (e && e.target) {
      debugger;
       const selected = props.searchCategories.find(category => {
        return category.CategoryId.S === e.target.attributes.value.nodeValue;
      });
       setselectedCategory(selected);
  }
}

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
              {selectedCategory ? selectedCategory.Title.S : 'All Categories'}
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
              {props.searchCategories.length > 0 &&
                props.searchCategories.map((category, index) => {
                return <Dropdown.Item active={(selectedCategory && (selectedCategory.CategoryId.S === category.CategoryId.S)) ? true : false} onClick={e => changeCategory(e)} value={category.CategoryId.S} eventKey={index}>{category.Title.S}</Dropdown.Item>
                })}
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup>
      </Form>
    </React.Fragment>
  );
};

export default SearchBar;
