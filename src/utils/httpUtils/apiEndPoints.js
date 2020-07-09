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
    case "deleteProduct":
      return baseUrl + "products/deleteproduct";
    case "deleteCoupon":
      return baseUrl + "coupons/deletecoupon";
    case "addProductToCart":
      return baseUrl + "cart/addtocart";
    case "SearchCategories":
      return baseUrl + "products/getproductcategories";
    case "BusinessDetails":
      return baseUrl + "business/getregisteredbusinessdetails";
    case "registerNewBusiness":
      return baseUrl + "business/registerbusiness";
    case "updateBusiness":
      return baseUrl + "business/updatebusinessdetails";
    case "MerchantAllCoupons":
      return baseUrl + "coupons/getmerchantcoupons";
    case "addNewProduct":
      return baseUrl + "products/addproduct";
    case "updateProduct":
      return baseUrl + "products/updateproductdetails";
    case "addNewCoupon":
      return baseUrl + "coupons/addcoupon";
    case "updateCoupon":
      return baseUrl + "coupons/updatecoupon";
    case "refreshToken":
      return baseUrl + "users/refreshtoken";
    case "login":
      return baseUrl + "users/login";
    case "signUp":
      return baseUrl + "users/signup";
    case "firstLogin":
      return baseUrl + "users/firstlogin";
    case "forgotPassword":
      return baseUrl + "users/forgotpassword";
    case "confirmForgotPassword":
      return baseUrl + "users/confirmforgotpassword";
    case "mainBanner":
      return baseUrl + "banners/getmainbannerdetails";
    case "dashboardBanner":
      return baseUrl + "banners/getdashboardbanners";
    default:
      return "/";
  }
};

export default getApiEndPoints;
