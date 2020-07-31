const baseUrl = "https://h6cru8yrb8.execute-api.us-east-2.amazonaws.com/api/";

const getApiEndPoints = val => {
  switch (val) {
    case "LatestProductsWithPagination":
      return baseUrl + "products/getlatestproducts";
    case "SponsoredProductsWithPagination":
      return baseUrl + "products/getsponsoredproducts";
    case "TrendingProductsWithPagination":
      return baseUrl + "products/getsponsoredproducts";
    case "WishlistProductsWithPagination":
      return baseUrl + "products/getsponsoredproducts";
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
      return baseUrl + "users/getallcontacts";
    case "SavedEmployees":
      return baseUrl + "business/getemployeelist";
    case "ContactWithEmail":
      return baseUrl + "users/getcontactdetails";
    case "addNewContact":
      return baseUrl + "users/addcontact";
    case "addNewEmployee":
      return baseUrl + "business/addemployee";
    case "deleteContact":
      return baseUrl + "users/deletecontact";
    case "deleteEmployee":
      return baseUrl + "business/deleteemployee";
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
    case "headerSearch":
      return baseUrl + "products/search";
    case "uploadImage":
      return baseUrl + "images/upload";
    case "deleteImage":
      return baseUrl + "images/delete";
    case "deleteProductFromCart":
      return baseUrl + "cart/deleteitem";
    case "getAllShippingAddress":
      return baseUrl + "users/addresses/shipping/getalladdresses?limit=10";
    case "addNewShippingAddress":
      return baseUrl + "users/addresses/shipping/addaddress";
    case "updateShippingAddress":
      return baseUrl + "users/addresses/shipping/updateaddress/";
    case "getAllBillingAddress":
      return baseUrl + "users/addresses/billing/getalladdresses?limit=10";
    case "addNewBillingAddress":
      return baseUrl + "users/addresses/billing/addaddress";
    case "updateBillingAddress":
      return baseUrl + "users/addresses/billing/updateaddress/";
    case "checkout":
      return baseUrl + "cart/checkout";
    case "addToWishlist":
      return baseUrl + "wishlist/addtowishlist";
    default:
      return "/";
  }
};

export default getApiEndPoints;
