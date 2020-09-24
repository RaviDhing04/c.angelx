import React, { useState, useEffect } from "react";
import {
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
  Form
} from "react-bootstrap";
import downArrow from "../../assets/down-arrow.svg";
import searchIcon from "../../assets/search-icon.png";
import "./SearchBar.scss";
import { debounce } from "../../utils/commonUtils/basicUtils";
import { Link, useHistory } from "react-router-dom";

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
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDiv, setShowDiv] = useState(false);
  const history = useHistory();

  useEffect(() => {
    window.addEventListener('click', function (event) {
      if (!event.target.matches('.search-input') && !event.target.matches('.search-results')) {
        setShowDiv(false);
      }
    });
  }, [])
  const changeCategory = (e) => {
    if (e && e.target) {
      ;
      const selected = props.searchCategories.find(category => {
        return category.CategoryId.S === e.target.attributes.value.nodeValue;
      });
      setselectedCategory(selected);
    }
  }

  const search = async (text) => {
    text ? setSearchText(text) : setSearchText('');
    const res = await props.fetchSearchResults(text, (selectedCategory && selectedCategory.Title && selectedCategory.Title.S ? selectedCategory.Title.S : ''));
    setSearchResults(res.Items);
    setShowDiv(true);
  }

  const navigateToSearchPage = (e) => {
    e.preventDefault();
    if (searchText) {
      document.getElementById("searchForm").reset();
      setSearchResults([]);
      history.push(`/home/search/${searchText}/${(selectedCategory && selectedCategory.Title && selectedCategory.Title.S ? selectedCategory.Title.S : 'x')}`);
    }
  }


  const fetchSearchResults = debounce((text) => { search(text) }, 400);
  console.log(fetchSearchResults);
  return (
    <React.Fragment>
      <Form className="search-bar" id="searchForm" onSubmit={(e) => navigateToSearchPage(e)}>
        <InputGroup className="search-input">
          <FormControl
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon2"
            onChange={(e) => fetchSearchResults(e.target.value)}
          // onBlur={closeDiv}
          />
          {showDiv && searchResults && searchResults.length ?
            <div className="search-results">
              {searchResults.map((item) => {
                return (<Link to={`/home/productDetail/${item.ProductId.S}/${item.Timestamp.S}`}>
                  <div className="result">
                    {/* <img alt="prod-img" src={item.ThumbnailImageURL.S}></img> */}
                    <p>{item.Name.S}</p>
                  </div> </Link>)
              })}
            </div> : null}

          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              {selectedCategory ? selectedCategory.Title.S : 'All Categories'}
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
            <Dropdown.Item value='All Categories' onClick={e => setselectedCategory('')}>All Categories</Dropdown.Item>
              {props.searchCategories.length > 0 &&
                props.searchCategories.map((category, index) => {
                  return <Dropdown.Item active={(selectedCategory && (selectedCategory.CategoryId.S === category.CategoryId.S)) ? true : false} onClick={e => changeCategory(e)} value={category.CategoryId.S} eventKey={index}>{category.Title.S}</Dropdown.Item>
                })}
            </Dropdown.Menu>
          </Dropdown>
          <div onClick={(e) => navigateToSearchPage(e)} className="searchIconDiv">
            <img className="searchIcon" src={searchIcon} alt="search" />
          </div>
        </InputGroup>
      </Form>
    </React.Fragment>
  );
};

export default SearchBar;
