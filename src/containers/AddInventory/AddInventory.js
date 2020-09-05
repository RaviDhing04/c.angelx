import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, Col, InputGroup } from "react-bootstrap";
import { bindActionCreators } from "redux";
import {
  addNewProduct,
  getSelectedProductDetails,
  getMasterDataInventory,
  updateProduct,
  clearSelectedRow,
  uploadImage,
  deleteImage
} from "../../store/actions";
import "./AddInventory.scss";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import plusIcon from "../../assets/plus.svg";
import { addProductFormFields, addProductFormFieldsProductType } from "../../constants/constants";
import { useHistory } from "react-router-dom";
import deleteIcon from "../../assets/delete_outline.svg";

const AddInventory = props => {
  const [loading, setLoading] = useState(false);
  const [imgloading, setImgLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [images, addImages] = useState([]);
  const [thumbnail, addthumbnail] = useState([]);
  const [productVariation, setProductVariation] = useState([{}]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [buttonClicked, setbuttonClicked] = useState(false);
  const { addNewProduct, selectedBusiness, selectedRow, updateProduct, inventoryMasterData } = props;
  const action = props.match.params.action;
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      if (selectedRow && selectedBusiness) {
        const payload = {
          ProductId: selectedRow.ProductId.S,
          Timestamp: selectedRow.Timestamp.S
        };
        setLoading(true);
        const res = await props.getSelectedProductDetails(payload);
        if (res) {
          await setProductDetails(res);
          setLoading(false);
        } else {
          setLoading(false);
          alert('Error occured while fetching product details, Please try again.')
        }
      } else {
        history.goBack();
      }
    }
    const fetchMaterData = async () => {
      if (!inventoryMasterData) {
        setLoading(true);
        const res = await props.getMasterDataInventory();
        if (res) {
          setLoading(false);
        } else {
          setLoading(false);
          alert('Something went wrong. Please try again later')
        }
      }
    }
    fetchMaterData();
    if (action === "edit") {
      fetchData();
    }

    if (!selectedBusiness) {
      history.goBack();
    }

    return () => {
      props.clearSelectedRow();
    };
  }, []);

  useEffect(() => {
    console.log(productDetails);
    const prodImages = [];
    const variations = [];
    setSelectedCategory(productDetails &&
      productDetails.ProductCategory.S);
    setSelectedSubCategory(productDetails &&
      productDetails.ProductSubCategory.S);
    productDetails && productDetails.ProductImages.L.forEach((img) => { if (img.S && img.S !== "null") { prodImages.push(img.S) } });
    if (prodImages && prodImages.length) addImages([...prodImages]);

    productDetails && productDetails.ProductVariations.L.forEach((variation) => {
      const obj = {}
      variation.M && Object.keys(variation.M).forEach((item) => {
        obj[item] = variation.M[item].S;
      });
      variations.push(obj);
    });
    if (variations && variations.length) setProductVariation([...variations]);
  }, [productDetails]);

  const add = async event => {
    let payload = {
      ProductSpecifications: {},
      PackageDimensions: {},
      IsDonationCampaign: "false",
      DonationCampaignDetails: {
        MinDonation: "",
        Currency: "",
        TargetDonationAmount: ""
      }
    };
    const formElements = event.target.elements;
    addProductFormFields.forEach(field => {
      if (["Height", "Weight", "Width", "Length", "Depth"].includes(field)) {
        payload.PackageDimensions[field] = formElements[field].value;
      } else {
        payload[field] = formElements[field].value;
      }
    });
    addProductFormFieldsProductType[selectedCategory].forEach(field => {
      payload.ProductSpecifications[field] = formElements[field].value ? formElements[field].value : '';
    });
    if (["Electronics", "Furnitures"].includes(selectedCategory)) {
      payload.ProductSpecifications['ProductDimensions'] = {};
      payload.ProductSpecifications['ProductDimensions']['Height'] = formElements.ProdHeight.value;
      payload.ProductSpecifications['ProductDimensions']['Weight'] = formElements.ProdWeight.value;
      payload.ProductSpecifications['ProductDimensions']['Width'] = formElements.ProdWidth.value;
      payload.ProductSpecifications['ProductDimensions']['Length'] = formElements.ProdLength.value;
      payload.ProductSpecifications['ProductDimensions']['Depth'] = formElements.ProdDepth.value;
    } else {
      payload.ProductSpecifications['AvailableSizes'] = formElements.AvailableSizes.value.split(',');
    }
    payload["IsSponsord"] = "false";
    payload['ProductVariations'] = productVariation;
    payload['ThumbnailImageURL'] = thumbnail[0] ? thumbnail[0] : '';
    payload['FullImageURL1'] = images[0] ? images[0] : '';
    payload['FullImageURL2'] = images[1] ? images[1] : '';
    payload['FullImageURL3'] = images[2] ? images[2] : '';
    payload["MerchantId"] = selectedBusiness.MerchantId.S;
    payload["MerchantHandle"] = selectedBusiness.BusinessHandle.S;
    if (action === 'edit') {
      payload['Timestamp'] = selectedRow.Timestamp.S;
      payload['ProductId'] = productDetails && productDetails.ProductId && productDetails.ProductId.S;
      payload['IsActive'] = productDetails && productDetails.IsActive && productDetails.IsActive.S;
      payload["IsInStock"] = productDetails && productDetails.IsInStock && productDetails.IsInStock.S;
    }
    setLoading(true);
    console.log(JSON.stringify(payload));
    const res =
      action === "add" ? await addNewProduct(payload) : await updateProduct(payload);
    res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    if (!buttonClicked) {
      history.goBack();
    } else {
      document.getElementById("AddProductForm").reset();
      addImages([]);
      addthumbnail([]);
      setProductVariation([{}]);
      setSelectedCategory('');
      setSelectedSubCategory('');
      setbuttonClicked(false);
    }
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
      setImgLoading(true);
      const fileType = event.target.files[0].type;
      const fileString = await toBase64(file);
      const payload = { "image_type": "product", "added_info": { "merchant_id": selectedBusiness.MerchantId.S }, "img": fileString.split(',')[1], "image_extension": fileType }
      const res = await props.uploadImage(payload);
      res ? setImgLoading(false) : (function () { setImgLoading(false); (alert('something went wrong, Please try again!')) }());
      if (res) {
        addImages([...images, res.full_image_url]);
        addthumbnail([...thumbnail, res.thumb_image_url]);
      }
    }
  };

  const deleteImg = async (url) => {
    if (url) {
      setImgLoading(true);
      const res = await props.deleteImage({
        "path": url
      });
      res ? setImgLoading(false) : (function () { setImgLoading(false); (alert('something went wrong, Please try again!')) }());
      if (res) {
        addImages([...images.filter(e => e !== url)]);
      }
    }
  };

  return !loading ? (
    <React.Fragment>
      {imgloading ? <CustomLoader /> : null}
      <div className="add-inventory-heading">Add Inventory</div>
      <Container className="add-inventory-container" fluid>
        <div className="AddProduct">
          <Form id="AddProductForm" onSubmit={e => add(e)}>
            {inventoryMasterData ? <Form.Row className="width-75">
              <Col>
                <Form.Group controlId="ProductCategory">
                  <Form.Label>Product Category</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={
                      productDetails &&
                      productDetails.ProductCategory.S
                    }
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    required
                  >
                    <option disabled value="" selected> Product Category</option>
                    {inventoryMasterData.productCategory.length && inventoryMasterData.productCategory.map((category, index) => {
                      return (<option key={index} value={category}> {category}</option>)
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                {selectedCategory ? <Form.Group controlId="ProductSubCategory">
                  <Form.Label>Product Sub Category</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={
                      productDetails &&
                      productDetails.ProductSubCategory.S
                    }
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    required
                  >
                    <option disabled value="" selected> Product Sub Category</option>
                    {inventoryMasterData[selectedCategory] && inventoryMasterData[selectedCategory].length && inventoryMasterData[selectedCategory].map((subCategory, index) => {
                      return (<option key={index} value={subCategory}> {subCategory}</option>)
                    })}
                  </Form.Control>
                </Form.Group> : null}
              </Col>
              <Col>
                {selectedSubCategory ? <Form.Group controlId="ProductType">
                  <Form.Label>Product Type</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={
                      productDetails &&
                      productDetails.ProductType.S
                    }
                    required
                  >
                    <option disabled value="" selected> Product Type</option>
                    {inventoryMasterData[selectedSubCategory] && inventoryMasterData[selectedSubCategory].length && inventoryMasterData[selectedSubCategory].map((type, index) => {
                      return (<option key={index} value={type}> {type}</option>)
                    })}
                  </Form.Control>
                </Form.Group> : null}
              </Col>
            </Form.Row> : null}
            <Form.Row className="width-25">
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
            <Form.Label>
              Available Colors{" "}
              <span className="hint">
                {" "}
                      (Click on color box below to select colors from color
                      picker){" "}
              </span>
            </Form.Label>
            {productVariation && productVariation.length && productVariation.map((item, index) => {
              let i = index;
              return (<Form.Row key={index} className="colors-row">
                <Col>
                  <Form.Group controlId="Color">
                    <Form.Control
                      type="color"
                      value={item.AvailableColor ? item.AvailableColor : '#ff0000'}
                      onChange={(e) => { productVariation[i]['AvailableColor'] = e.target.value; setProductVariation([...productVariation]) }}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="UnitPrice">
                    <Form.Control
                      type="number" min="1"
                      placeholder=" Type Unit Price"
                      value={item.UnitPrice ? item.UnitPrice : ''}
                      onChange={(e) => { productVariation[i]['UnitPrice'] = e.target.value; setProductVariation([...productVariation]) }}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="AvailableQuantity">
                    <Form.Control
                      type="number" min="1"
                      placeholder=" Available Quantity"
                      value={item.AvailableQuantity ? +item.AvailableQuantity : ''}
                      onChange={(e) => { productVariation[i]['AvailableQuantity'] = e.target.value; productVariation[i]['Currency'] = 'USD'; setProductVariation([...productVariation]) }}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="Currency">
                    <Form.Control
                      as="select"
                      value={item.Currency ? item.Currency : 'USD'}
                      onChange={(e) => { productVariation[i]['Currency'] = e.target.value; setProductVariation([...productVariation]) }}
                      required
                      disabled="true"
                    >
                      <option disabled value="" selected> Select Currency</option>
                      <option value="ZAR"> ZAR</option>
                      <option value="USD"> USD</option>
                      <option value="INR"> INR </option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <img onClick={() => setProductVariation([...productVariation, {}])} className="plus-icon" alt="plus-icon" src={plusIcon}></img>
                <img onClick={() => { if (productVariation.length > 1) { productVariation.splice(i, 1); setProductVariation([...productVariation]) } }} className="delete-icon" alt="delete-icon" src={deleteIcon}></img>
              </Form.Row>)
            })}
            <div className="product-specs">
              {selectedCategory ? <div className="sub-heading">Product Specifications</div> : null}
              {["Electronics", "Furnitures"].includes(selectedCategory) ? (<Form.Row>
                <Col>
                  <Form.Group controlId="ProdHeight">
                    <Form.Label>Height (in cm)</Form.Label>
                    <Form.Control
                      defaultValue={
                        productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.ProductDimensions &&
                        productDetails.ProductSpecifications.M.ProductDimensions.M && productDetails.ProductSpecifications.M.ProductDimensions.M.Height && productDetails.ProductSpecifications.M.ProductDimensions.M.Height.S
                      }
                      type="number" min="1"
                      placeholder=" Type Height (in cm)"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="ProdWidth">
                    <Form.Label>Width (in cm)</Form.Label>
                    <Form.Control
                      defaultValue={
                        productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.ProductDimensions &&
                        productDetails.ProductSpecifications.M.ProductDimensions.M && productDetails.ProductSpecifications.M.ProductDimensions.M.Width && productDetails.ProductSpecifications.M.ProductDimensions.M.Width.S
                      }
                      type="number" min="1"
                      placeholder=" Type Width (in cm)"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="ProdLength">
                    <Form.Label>Length (in cm)</Form.Label>
                    <Form.Control
                      defaultValue={
                        productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.ProductDimensions &&
                        productDetails.ProductSpecifications.M.ProductDimensions.M && productDetails.ProductSpecifications.M.ProductDimensions.M.Length && productDetails.ProductSpecifications.M.ProductDimensions.M.Length.S
                      }
                      type="number" min="1"
                      placeholder=" Type Length (in cm)"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="ProdWeight">
                    <Form.Label>Weight (in kg)</Form.Label>
                    <Form.Control
                      defaultValue={
                        productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.ProductDimensions &&
                        productDetails.ProductSpecifications.M.ProductDimensions.M && productDetails.ProductSpecifications.M.ProductDimensions.M.Weight && productDetails.ProductSpecifications.M.ProductDimensions.M.Weight.S
                      }
                      type="number" min="1"
                      placeholder=" Type Weight (in kg)"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="ProdDepth">
                    <Form.Label>Depth (in cm)</Form.Label>
                    <Form.Control
                      defaultValue={
                        productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.ProductDimensions &&
                        productDetails.ProductSpecifications.M.ProductDimensions.M && productDetails.ProductSpecifications.M.ProductDimensions.M.Depth && productDetails.ProductSpecifications.M.ProductDimensions.M.Depth.S
                      }
                      type="number" min="1"
                      placeholder=" Type Depth (in cm)"
                    />
                  </Form.Group>
                </Col>
              </Form.Row>) : null}
              {["Clothing", "Shoes & Accessories"].includes(selectedCategory) ? (<Form.Row className="width-50">
                <Col>
                  <Form.Group controlId="AvailableSizes">
                    <Form.Label>Avaialable Sizes <span className="hint">(After each size, please add a comma (,)) </span></Form.Label>
                    <Form.Control
                      defaultValue={
                        productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.AvailableSizes &&
                        productDetails.ProductSpecifications.M.AvailableSizes.L && productDetails.ProductSpecifications.M.AvailableSizes.L.reduce((acc, size, index, arr) => {
                          return acc + size.S + (index < arr.length - 1 ? "," : '');
                        }, "")
                      }
                      type="text"
                      placeholder=" Type Avaialable Sizes"
                    />
                  </Form.Group>
                </Col>
              </Form.Row>) : null}
              {["Electronics"].includes(selectedCategory) ? (
                <React.Fragment>
                  <Form.Row>
                    <Col>
                      <Form.Group controlId="Brand">
                        <Form.Label>Brand Name</Form.Label>
                        <Form.Control
                          defaultValue={
                            productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.Brand &&
                            productDetails.ProductSpecifications.M.Brand.S
                          }
                          type="text"
                          placeholder="Type Brand Name"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Model">
                        <Form.Label>Model Name</Form.Label>
                        <Form.Control
                          defaultValue={
                            productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.Model &&
                            productDetails.ProductSpecifications.M.Model.S
                          }
                          type="text"
                          placeholder="Type Model Name"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Type">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Control
                          defaultValue={
                            productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.Type &&
                            productDetails.ProductSpecifications.M.Type.S
                          }
                          type="text"
                          placeholder="Type Product Type"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Ram">
                        <Form.Label>Product Ram</Form.Label>
                        <Form.Control
                          defaultValue={
                            productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.Ram &&
                            productDetails.ProductSpecifications.M.Ram.S
                          }
                          type="text"
                          placeholder="Product Ram"
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row >
                    <Col>
                      <Form.Group controlId="Memory">
                        <Form.Label>Product Memory</Form.Label>
                        <Form.Control
                          defaultValue={
                            productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.Memory &&
                            productDetails.ProductSpecifications.M.Memory.S
                          }
                          type="text"
                          placeholder="Product Memory"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Os">
                        <Form.Label>Operating System</Form.Label>
                        <Form.Control
                          defaultValue={
                            productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.Os &&
                            productDetails.ProductSpecifications.M.Os.S
                          }
                          type="text"
                          placeholder="Operating System"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Processor">
                        <Form.Label>Processor</Form.Label>
                        <Form.Control
                          defaultValue={
                            productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.Processor &&
                            productDetails.ProductSpecifications.M.Processor.S
                          }
                          type="text"
                          placeholder="Processor"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Storage">
                        <Form.Label>Storage</Form.Label>
                        <Form.Control
                          defaultValue={
                            productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.Storage &&
                            productDetails.ProductSpecifications.M.Storage.S
                          }
                          type="text"
                          placeholder="Storage"
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                </React.Fragment>
              ) : null}
              <Form.Row>
                {["Clothing", "Shoes & Accessories", "Furnitures"].includes(selectedCategory) ? (
                  <React.Fragment>
                    <Col>
                      <Form.Group controlId="Brand">
                        <Form.Label>Brand Name</Form.Label>
                        <Form.Control
                          defaultValue={
                            productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.Brand &&
                            productDetails.ProductSpecifications.M.Brand.S
                          }
                          type="text"
                          placeholder="Type Brand Name"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="MaterialDescription">
                        <Form.Label>Material Description</Form.Label>
                        <Form.Control
                          defaultValue={
                            productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.MaterialDescription &&
                            productDetails.ProductSpecifications.M.MaterialDescription.S
                          }
                          type="text"
                          placeholder="Material Description"
                        />
                      </Form.Group>
                    </Col>
                  </React.Fragment>) : null}
                {["Clothing", "Shoes & Accessories"].includes(selectedCategory) ? (<Col>
                  <Form.Group controlId="Ocassion">
                    <Form.Label>Ocassion</Form.Label>
                    <Form.Control
                      defaultValue={
                        productDetails && productDetails.ProductSpecifications && productDetails.ProductSpecifications.M && productDetails.ProductSpecifications.M.Ocassion &&
                        productDetails.ProductSpecifications.M.Ocassion.S
                      }
                      type="text"
                      placeholder="Ocassion"
                    />
                  </Form.Group>
                </Col>) : null}
              </Form.Row>
            </div>
            <div className="sub-heading">Package Dimensions</div>
            <Form.Row>
              <Col>
                <Form.Group controlId="Height">
                  <Form.Label>Height (in cm)</Form.Label>
                  <Form.Control
                    defaultValue={
                      productDetails && productDetails.PackageDimensions && productDetails.PackageDimensions.M &&
                      productDetails.PackageDimensions.M.Height && productDetails.PackageDimensions.M.Height.S
                    }
                    type="number" min="1"
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
                      productDetails && productDetails.PackageDimensions && productDetails.PackageDimensions.M &&
                      productDetails.PackageDimensions.M.Width && productDetails.PackageDimensions.M.Width.S
                    }
                    type="number" min="1"
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
                      productDetails && productDetails.PackageDimensions && productDetails.PackageDimensions.M &&
                      productDetails.PackageDimensions.M.Length && productDetails.PackageDimensions.M.Length.S
                    }
                    type="number" min="1"
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
                      productDetails && productDetails.PackageDimensions && productDetails.PackageDimensions.M &&
                      productDetails.PackageDimensions.M.Weight && productDetails.PackageDimensions.M.Weight.S
                    }
                    type="number" min="1"
                    placeholder=" Type Weight (in kg)"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Depth">
                  <Form.Label>Depth (in cm)</Form.Label>
                  <Form.Control
                    defaultValue={
                      productDetails && productDetails.PackageDimensions && productDetails.PackageDimensions.M &&
                      productDetails.PackageDimensions.M.Depth && productDetails.PackageDimensions.M.Depth.S
                    }
                    type="number" min="1"
                    placeholder=" Type Depth (in cm)"
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
                Reset
              </Button>
              {action === 'edit' ? null : <Button
                onClick={() => setbuttonClicked(true)}
                type="submit"
                className="saveAnotherButton"
              >
                Save & Add New Inventory
              </Button>}
              <Button className="saveButton" type="submit">
                Save Inventory
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </React.Fragment >
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
      deleteImage,
      getMasterDataInventory
    },
    dispatch
  );

const mapStatetoProps = ({ app: { manageBusiness } }) => {
  return {
    selectedBusiness: manageBusiness.selectedBusiness,
    selectedRow: manageBusiness.selectedRow,
    inventoryMasterData: manageBusiness.inventoryMasterData
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddInventory);
