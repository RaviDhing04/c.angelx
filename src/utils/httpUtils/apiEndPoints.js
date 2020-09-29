const baseUrl = "https://h6cru8yrb8.execute-api.us-east-2.amazonaws.com/api/";

// const baseUrl = "https://h2wwgaxvwd.execute-api.us-east-2.amazonaws.com/api/";

const getApiEndPoints = val => {
  switch (val) {
    case "LatestProductsWithPagination":
      return baseUrl + "products/getlatestproducts";
    case "PreviewProductsWithPagination":
      return baseUrl + "products/getpreviewproducts";
    case "SponsoredProductsWithPagination":
      return baseUrl + "products/getsponsoredproducts";
    case "TrendingProductsWithPagination":
      return baseUrl + "products/getsponsoredproducts";
    case "WishlistProductsWithPagination":
      return baseUrl + "wishlist/getwishlistdetails";
    case "WishlistProducts":
      return baseUrl + "wishlist/getwishlistdetails";
    case "SelectedProductDetails":
      return baseUrl + "products/getproductdetails";
    case "CartItems":
      return baseUrl + "cart/getcartdetails";
    case "getShippingChagres":
      return baseUrl + "dhlraterequest";
    case "OrderItems":
      return baseUrl + "users/getorderhistoryforuser";
    case "OrderItemsMerchant":
      return baseUrl + "business/getorderdetailsformerchant";
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
    case "uploadTermsAndConditions":
      return baseUrl + "business/updatetermsandconditions";
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
    case "updateUserDetails":
      return baseUrl + "users/updateprofiledetails";
    case "followmerchant":
      return baseUrl + "users/followmerchant";
    case "unfollowmerchant":
      return baseUrl + "users/unfollowmerchant";
    case "support":
      return baseUrl + "sendsupportemail";
    case "UserLinkCount":
      return baseUrl + "users/getmanagepanelwithcountdata";
    case "MerchantLinkCount":
      return baseUrl + "business/getfollowedpatronscount";
    case "cartCount":
      return baseUrl + "cart/getcartitemcount";
    case "MerchantAllPatrons":
      return baseUrl + "business/getlistofpatronsfollowingmerchants";
    case "checkMerchantHandle":
      return baseUrl + "business/checkmerchanthandleisunique";
    case "RegisterBusinessMasterData":
      return baseUrl + "business/getmasterdataforregisterbusiness";
    case "BusinessDetailswithHandle":
      return baseUrl + "business/getbusinessdetailsbymerchanthandler";
    case "MasterDataInventory":
      return baseUrl + "products/getmasterdataforaddinventory";
    case "searchMerchants":
      return baseUrl + "business/search";
    case "ViralDonations":
      return baseUrl + "users/addusernotification";
    case "UserNotification":
      return baseUrl + "users/getnotifications";
    case "updateOrderStatus":
      return baseUrl + "business/updateorderstatus";
    case "verifyCoupon":
      return baseUrl + "coupons/verifycoupon";
    default:
      return "/";
  }
};

export default getApiEndPoints;
