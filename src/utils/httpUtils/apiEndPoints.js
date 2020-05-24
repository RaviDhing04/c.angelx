const baseUrl = "https://h6cru8yrb8.execute-api.us-east-2.amazonaws.com/api/";

const getApiEndPoints = val => {
  switch (val) {
    case "LatestProductsWithPagination":
      return baseUrl + "products/getlatestproducts";
    case "SelectedProductDetails":
      return baseUrl + "products/getproductdetails";
    case "CartItems":
      return baseUrl + "cart/getcartdetails";
    case "OrderItems":
      return baseUrl + "cart/getcartdetails";
    case "FollowedMerchants":
      return baseUrl + "users/getfollowedmerchants";
    case "MerchantAllProducts":
      return baseUrl + "products/getallproducts";
    case "AllBusiness":
      return baseUrl + "business/getbusinessdetails";
    case "SavedContacts":
      return baseUrl + "users/getcontacts";
    case "ContactWithEmail":
      return baseUrl + "users/getcontactdetails";
    case "addNewContact":
      return baseUrl + "users/addcontact";
    case "deleteContact":
      return baseUrl + "users/deletecontact";
    case "addProductToCart":
      return baseUrl + "cart/addtocart";
    case "SearchCategories":
      return baseUrl + "products/getproductcategories";
    default:
      return "/";
  }
};

export default getApiEndPoints;
