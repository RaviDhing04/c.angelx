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
    default:
      return "/";
  }
};

export default getApiEndPoints;
