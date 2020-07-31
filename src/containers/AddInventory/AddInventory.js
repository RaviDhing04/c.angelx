import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, Col, InputGroup } from "react-bootstrap";
import { bindActionCreators } from "redux";
import {
  addNewProduct,
  getSelectedProductDetails,
  updateProduct,
  clearSelectedRow,
  uploadImage,
  deleteImage
} from "../../store/actions";
import "./AddInventory.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import plusIcon from "../../assets/plus.svg";
import { addProductFormFields } from "../../constants/constants";
import { useHistory } from "react-router-dom";
import deleteIcon from "../../assets/delete_outline.svg";

const AddInventory = props => {
  const [loading, setLoading] = useState(false);
  const [colors, addColors] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [images, addImages] = useState([]);
  const [thumbnail, addthumbnail] = useState([]);
  const { addNewProduct, selectedBusiness, selectedRow, updateProduct } = props;
  const action = props.match.params.action;
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      if (selectedRow) {
        const payload = {
          ProductId: selectedRow.ProductId.S,
          Timestamp: selectedRow.Timestamp.S
        };
        const res = await props.getSelectedProductDetails(payload);
        if (res) {
          await setProductDetails(res);
          setLoading(false);
        }
      } else {
        history.goBack();
      }
    }
    if (action === "edit") {
      fetchData();
    }

    return () => {
      props.clearSelectedRow();
    };
  }, []);

  useEffect(() => {
    console.log(productDetails);
    const colors = (productDetails && productDetails.ProductSpecifications.M.AvailableColors.S.split(' '));
    if (colors && colors.length) addColors([...colors]);
    const prodImages = [];
    productDetails && productDetails.ProductImages.L.forEach((img) => { if (img.S !== "null") { prodImages.push(img.S) } });
    if (prodImages && prodImages.length) addImages([...prodImages]);
  }, [productDetails]);

  const add = async event => {
    let payload = {
      ProductSpecifications: {},
      IsDonationCampaign: "false",
      DonationCampaignDetails: {
        MinDonation: "",
        Currency: "",
        TargetDonationAmount: ""
      }
    };
    const formElements = event.target.elements;
    addProductFormFields.forEach(field => {
      switch (field) {
        case "UnitPrice":
          payload.ProductSpecifications[field] = formElements[field].value;
          break;
        case "AvailableQuantity":
          payload.ProductSpecifications[field] = formElements[field].value;
          break;
        case "Currency":
          payload.ProductSpecifications[field] = formElements[field].value;
          break;
        case "Height":
          payload.ProductSpecifications[field] = formElements[field].value;
          break;
        case "Weight":
          payload.ProductSpecifications[field] = formElements[field].value;
          break;
        case "Width":
          payload.ProductSpecifications[field] = formElements[field].value;
          break;
        case "Length":
          payload.ProductSpecifications[field] = formElements[field].value;
          break;

        default:
          payload[field] = formElements[field].value;
          break;
      }
    });
    payload['ThumbnailImageURL'] = thumbnail[0] ? thumbnail[0] : null;
    payload['FullImageURL1'] = images[0] ? images[0] : null;
    payload['FullImageURL2'] = images[1] ? images[1] : null;
    payload['FullImageURL3'] = images[2] ? images[2] : null;
    payload["MerchantId"] = selectedBusiness.MerchantId.S;
    payload["MerchantHandle"] = selectedBusiness.BusinessHandle.S;
    if (action === 'edit') {
      payload['Timestamp'] = selectedRow.Timestamp.S;
      payload['ProductId'] = productDetails.ProductId.S;
      payload['IsActive'] = productDetails.IsActive.S;
    }
    payload.ProductSpecifications["AvailableColors"] = colors.join(' ');
    setLoading(true);
    console.log(JSON.stringify(payload));
    const res =
      action === "add" ? await addNewProduct(payload) : await updateProduct(payload);
    res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    history.goBack();
  };

  const cancel = async event => {
    setLoading(true);
    event.preventDefault();
    document.getElementById("AddProductForm").reset();
    setLoading(false);
  };


  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const addFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const fileType = event.target.files[0].type;
      const fileString = await toBase64(file);
      const payload = { "image_type": "product", "added_info": { "merchant_id": selectedBusiness.MerchantId.S }, "img": fileString.split(',')[1], "image_extension": fileType }
      const res = await props.uploadImage(payload);
      res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
      if (res) {
        addImages([...images, res.full_image_url]);
        addthumbnail([...thumbnail, res.thumb_image_url]);
      }
    }
  };

  const deleteImg = async (url) => {
    if (url) {
      setLoading(true);
      const res = await props.deleteImage({
        "path": url
      });
      res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
      if (res) {
        addImages([...images.filter(e => e !== url)]);
      }
    }
  };

  const setColor = event => {
    const color = event.currentTarget.parentElement.previousSibling.value;
    console.log(color);
    addColors([...colors, color]);
  };

  return !loading ? (
    <React.Fragment>
      <div className="add-inventory-heading">Add Inventory</div>
      <Container className="add-inventory-container" fluid>
        <div className="AddProduct">
          <Form id="AddProductForm" onSubmit={e => add(e)}>
            <Form.Row className="width-50">
              <Col>
                <Form.Group controlId="ProductName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    defaultValue={
                      productDetails &&
                      productDetails.Name.S
                    }
                    type="text"
                    placeholder="Type Name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="ProductCategory">
                  <Form.Label>Product Category</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={
                      productDetails &&
                      productDetails.ProductCategory.S
                    }
                    required
                  >
                    <option value="testValue"> Product Category</option>
                    <option value="testValue"> Electronics</option>
                    <option value="testValue"> Mobiles </option>
                  </Form.Control>
                </Form.Group>
              </Col>
              {/* <Col>
                <Form.Group controlId="SKUNumber">
                  <Form.Label>SKU Number</Form.Label>
                  <Form.Control
                    defaultValue={
                      selectedBusinessDetails && selectedBusinessDetails.Name.S
                    }
                    type="text"
                    placeholder="Type SKU"
                required />
                </Form.Group>
              </Col> */}
            </Form.Row>
            <Form.Row className={images.length > 0 ? `width-${25 * (images.length < 3 ? (images.length + 1) : images.length)}` : `width-25`}>
              {images.map((image, index) => {
                return (<Col key={index}>
                  <div className="prod-img">
                    <img className="prod-thumb" alt="prod-thumb" src={image} ></img>
                    <img onClick={() => deleteImg(image)} className="delete-icon" alt="delete-icon" src={deleteIcon}></img>
                  </div></Col>)
              })}
              {images.length < 3 ? <Col className="fileUpload-box">
                <Form.Group>
                  {/* <img src={gallery} alt="gallery"></img> */}
                  <Form.Label
                    htmlFor="fileUpload"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="add-business">
                      <img
                        className="plus-icon"
                        alt="plus-icon"
                        src={plusIcon}
                      ></img>
                      Add New
                    </span>{" "}
                    {/* Add file */}
                  </Form.Label>
                  <Form.Control
                    id="fileUpload"
                    type="file"
                    accept=".jgp, .png"
                    onChange={addFile}
                    style={{ display: "none" }}
                  />
                </Form.Group>
              </Col> : null}
            </Form.Row>
            <Form.Row className="">
              <Col>
                <Form.Group controlId="Color">
                  <Form.Label>
                    Available Colors{" "}
                    <span className="hint">
                      {" "}
                      Click on color box below to select colors from color
                      picker{" "}
                    </span>
                  </Form.Label>
                  <InputGroup className="width-25">
                    <Form.Control
                      // defaultValue={
                      //   selectedBusinessDetails &&
                      //   selectedBusinessDetails.BusinessHandle.S
                      // }
                      type="color"
                      defaultValue="#ff0000"
                      required
                    />
                    <InputGroup.Append>
                      <Button onClick={setColor} className="addColorButton">
                        Add Color
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Form.Row>
            {colors && colors.length ? (
              <Form.Row className="">
                <Form.Label className="width-100">Added Colors</Form.Label>
                {colors &&
                  colors.length &&
                  colors.map((color, index) => {
                    return (
                      <Col key={index}>
                        <Form.Group controlId="Color">
                          <Form.Control
                            // defaultValue={
                            //   selectedBusinessDetails &&
                            //   selectedBusinessDetails.BusinessHandle.S
                            // }
                            type="color"
                            value={color}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    );
                  })}
              </Form.Row>
            ) : null}
            <Form.Row>
              <Col>
                <Form.Group controlId="UnitPrice">
                  <Form.Label>Unit Price</Form.Label>
                  <Form.Control
                    defaultValue={
                      productDetails &&
                      productDetails.ProductSpecifications.M.UnitPrice.S
                    }
                    type="number"
                    placeholder=" Type Unit Price"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="AvailableQuantity">
                  <Form.Label>Available Quantity</Form.Label>
                  <Form.Control
                    defaultValue={
                      productDetails &&
                      productDetails.ProductSpecifications.M.AvailableQuantity.S
                    }
                    type="number"
                    placeholder=" Available Quantity"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Currency">
                  <Form.Label>Currency</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={
                      productDetails &&
                      productDetails.ProductSpecifications.M.Currency.S
                    }
                    required
                  >
                    <option value="testValue"> ZAR</option>
                    <option value="testValue"> USD</option>
                    <option value="testValue"> INR </option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="Height">
                  <Form.Label>Height (in cm)</Form.Label>
                  <Form.Control
                    defaultValue={
                      productDetails &&
                      productDetails.ProductSpecifications.M.Height.S
                    }
                    type="number"
                    placeholder=" Type Height (in cm)"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Width">
                  <Form.Label>Width (in cm)</Form.Label>
                  <Form.Control
                    defaultValue={
                      productDetails &&
                      productDetails.ProductSpecifications.M.Width.S
                    }
                    type="number"
                    placeholder=" Type Width (in cm)"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Length">
                  <Form.Label>Length (in cm)</Form.Label>
                  <Form.Control
                    defaultValue={
                      productDetails &&
                      productDetails.ProductSpecifications.M.Length.S
                    }
                    type="number"
                    placeholder=" Type Length (in cm)"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Weight">
                  <Form.Label>Weight (in kg)</Form.Label>
                  <Form.Control
                    defaultValue={
                      productDetails &&
                      productDetails.ProductSpecifications.M.Weight.S
                    }
                    type="number"
                    placeholder=" Type Weight (in kg)"
                    required
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="width-100">
              <Col>
                <Form.Group controlId="ProductDescription">
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    defaultValue={
                      productDetails &&
                      productDetails.Description.S
                    }
                    as="textarea"
                    placeholder="Type Product Description"
                    required
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <div className="buttons">
              <Button onClick={e => cancel(e)} className="cancelButton">
                Cancel
              </Button>
              <Button className="saveButton" type="submit">
                Save Inventory
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </React.Fragment>
  ) : (
      <CustomLoader />
    );
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addNewProduct,
      getSelectedProductDetails,
      updateProduct,
      clearSelectedRow,
      uploadImage,
      deleteImage
    },
    dispatch
  );

const mapStatetoProps = ({ app: { manageBusiness } }) => {
  return {
    selectedBusiness: manageBusiness.selectedBusiness,
    selectedRow: manageBusiness.selectedRow
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddInventory);
