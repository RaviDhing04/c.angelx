export const userLeftNavLinks = [
  { name: "Pending in Total", path: "/home/ordersList/", icon: "hourglass", enable: true },
  { name: "Arears in Total", path: "/home/ordersList/", icon: "Group 1030", enable: false },
  { name: "Lay Buys in Total", path: "/home/ordersList/", icon: "shipping", enable: true },
  { name: "Group Buys in Total", path: "/home/ordersList/", icon: "shipping", enable: true },
  { name: "Pre-orders in Total", path: "/home/ordersList/", icon: "clock", enable: false },
  { name: "Donations", path: "/home/ordersList/", icon: "donate", enable: false },
  { name: "Wishlist", path: "/home/viewAllProducts/", icon: "heart-filled", enable: true },
  { name: "Add Contacts", path: "/home/myContacts/", icon: "profile", enable: true }
];

export const merchantLeftNavLinks = {
  'Default': [
    { name: "Inventory", path: "/merchantHome/inventory/", icon: "inventory", enable: true },
    { name: "Causes", path: "/merchantHome/campaigns/", icon: "donate", enable: true },
    { name: "Add Discount Coupons", path: "/merchantHome/coupons/", icon: "coupon", enable: true },
    { name: "Subordinate Account", path: "/merchantHome/myEmployees/", icon: "Shape", enable: true },
    { name: "Sales/Pending Deliveriest", path: "/merchantHome/myEmployees/", icon: "hourglass", enable: false },
    { name: "Lay By Orders", path: "/merchantHome/myEmployees/", icon: "clock", enable: false },
    { name: "Group Purchase Orders", path: "/merchantHome/myEmployees/", icon: "shopping-cart", enable: false },
    { name: "Declined Orders", path: "/merchantHome/myEmployees/", icon: "blocked-symbol", enable: false },
    { name: "Patrons", path: "/merchantHome/Patrons/", icon: "profile", enable: true },
    { name: "Statistics", path: "/merchantHome/myEmployees/", icon: "bar-graph", enable: false }
  ],
  'Retail': [
    { name: "Inventory", path: "/merchantHome/inventory/", icon: "inventory", enable: true },
    { name: "Add Discount Coupons", path: "/merchantHome/coupons/", icon: "coupon", enable: true },
    { name: "Subordinate Account", path: "/merchantHome/myEmployees/", icon: "Shape", enable: true },
    { name: "Sales/Pending Deliveriest", path: "/merchantHome/myEmployees/", icon: "hourglass", enable: false },
    { name: "Lay By Orders", path: "/merchantHome/myEmployees/", icon: "clock", enable: false },
    { name: "Group Purchase Orders", path: "/merchantHome/myEmployees/", icon: "shopping-cart", enable: false },
    { name: "Declined Orders", path: "/merchantHome/myEmployees/", icon: "blocked-symbol", enable: false },
    { name: "Patrons", path: "/merchantHome/Patrons/", icon: "profile", enable: true },
    { name: "Statistics", path: "/merchantHome/myEmployees/", icon: "bar-graph", enable: false }
  ],
  'NPO': [
    { name: "Causes", path: "/merchantHome/campaigns/", icon: "donate", enable: true },
    { name: "Subordinate Account", path: "/merchantHome/myEmployees/", icon: "Shape", enable: true },
    { name: "Sales/Pending Deliveriest", path: "/merchantHome/myEmployees/", icon: "hourglass", enable: false },
    { name: "Lay By Orders", path: "/merchantHome/myEmployees/", icon: "clock", enable: false },
    { name: "Group Purchase Orders", path: "/merchantHome/myEmployees/", icon: "shopping-cart", enable: false },
    { name: "Declined Orders", path: "/merchantHome/myEmployees/", icon: "blocked-symbol", enable: false },
    { name: "Patrons", path: "/merchantHome/Patrons/", icon: "profile", enable: true },
    { name: "Statistics", path: "/merchantHome/myEmployees/", icon: "bar-graph", enable: false }
  ]
};

export const profileLeftNavLinks = [
  { name: "Edit Personal Details", path: "/profile/edit/", icon: "profile", enable: true },
  { name: "Manage Addresses", path: "/profile/addresses/", icon: "location", enable: true }
];

export const checkoutLeftNavLinks = [
  { name: "Shipping Address", path: "/checkout/shipping/", icon: "delivery", enable: true },
  { name: "Billing Address", path: "/checkout/billing/", icon: "credit-card", enable: true },
  { name: "Confirm Order", path: "/checkout/Confirm/", icon: "info", enable: true }
];

export const merchantList = [
  { name: "ProdTest@DeleteLater", path: "/" },
  { name: "Accousticsplace@oxfordstreet", path: "/" },
  { name: "ProdTest@DeleteLater", path: "/" },
  { name: "Lorem Ipsum", path: "/" },
  { name: "ProdTest@DeleteLater", path: "/" },
  { name: "Accousticsplace@oxfordstreet", path: "/" },
  { name: "Lorem Ipsum", path: "/" }
];

export const footerLinksLoggedin = [
  [
    { name: "About Us", path: "/aboutUs" },
    { name: "Support", path: "/support" },
    { name: "Corporate Info", path: "/aboutUs" },
    { name: "User Guide", path: "/aboutUs" },
    { name: "Technical Support", path: "/support" },
    { name: "Term & Conditions", path: "/aboutUs" },
    { name: "Privacy Policy", path: "/aboutUs" }
  ],
  [
    { name: "Sponsored", path: "/" },
    { name: "Previews", path: "/" },
    { name: "Categories", path: "/" },
    { name: "Advertisements", path: "/" }
  ],
  [
    { name: "My Profile", path: "/profile/edit/" },
    { name: "My Cart", path: "/" },
    { name: "My Whishlist", path: "/" },
    { name: "My Orders", path: "/" },
    { name: "My Contacts", path: "/" },
    { name: "Donations", path: "/" },
    { name: "Show Statistics", path: "/" }
  ]
];

export const footerLinksLoggedout = [
  [
    { name: "About Us", path: "/aboutUs" },
    { name: "Support", path: "/support" },
    { name: "Corporate Info", path: "/aboutUs" },
    { name: "User Guide", path: "/aboutUs" },

  ],
  [{ name: "Technical Support", path: "/support" },
  { name: "Term & Conditions", path: "/aboutUs" },
  { name: "Privacy Policy", path: "/aboutUs" },
  { name: "Advertisements", path: "/" }
  ],
  [
    { name: "Sponsored", path: "/" },
    { name: "Previews", path: "/" },
    { name: "Categories", path: "/", }
  ]
];

export const socialSharing = [
  { imgName: "facebook", path: "/" },
  { imgName: "twitter", path: "/" },
  { imgName: "google", path: "/" },
  { imgName: "linkedin", path: "/" },
  { imgName: "instagram", path: "/" },
  { imgName: "youtube", path: "/" }
];

export const currencies = [
  { name: "South African Rand", shortName: "ZAR", icon: "rand", conversion: 1 },
  { name: "US Dollar", shortName: "USD", icon: "dollar", conversion: 1 },
  { name: "Rupee", shortName: "INR", icon: "rupee-indian", conversion: 4.54 }
];

export const profileOptions = [
  { name: "Edit Profile", path: "/profile/edit/" },
  { name: "Manage Business", path: "/manageBusiness/" },
  { name: "Logout", path: "/" }
];

export const aboutUsText = [
  " C-Angelx is an ‘eCommerce-Mall’ & platform that enables virtually any type of merchant to create its e-commerce account within C-Angelx & then sell its merchandise or receive payments online (of sales, lay-bys, rent, etc), or for any NPO (Non Profit Organization) to fundraise most efficiently and receive donations online’ - (with acustomizable unique user-handle’ for its current & prospective patrons to find & follow its ecommerce account) all within the C-Angelx environment.",
  "C-Angelx doesn’t necessarily own the items displayed on the various accounts of the respective merchants, neither does it fundraise on behalf of NPOs - but rather serves also as a platform for prospective Patrons (customers, clients, supporters, etc) with C-Angelx accounts to also search, find and follow C-Angelx accounts of individual merchants and NPOs they like in order to interact with online’ using necessary tools made available to all users. The actual contract for sale or donation therefore’ is directly between the respective Merchants or NPOs & their Patrons (individuals)."
];

export const aboutUsGrid = [
  {
    text:
      "C-Angelx enables you to shop online, or donate to any listed NPO of your choice.",
    title: "Shop, Sell and Support",
    image: "aboutUs1"
  },
  {
    text:
      "You can create an online merchant & sell online, or an NPO/NGO account for superior fundraising and receiving donations.",
    title: "Give and Take",
    image: "aboutUs2"
  },
  {
    text:
      "C-Angelx has everything figured out for your merchant: Courier services will collect directly from your shop & deliver directly to your customers address, securely. No Hassles!",
    title: "One Stop Solution",
    image: "aboutUs3"
  },
  {
    text:
      "C-Angelx is designed with security in mind, & further hosted in highly secure & reliable global servers.",
    title: "Safe and Secured",
    image: "aboutUs4"
  },
  {
    text:
      "We have partnered with known and trusted 3rd party suppliers – for secure transactions, and courier services.",
    title: "Quick and Easy",
    image: "aboutUs5"
  }
];

export const supportText = ["Contact us for any help or to joint the team"];

export const supportGrid = [
  {
    text: ["C-Angelx", "H84 Midway Gardens", "First Avenue Midrand", "1685 Johannesburg South Africa"],
    title: "Address",
    image: "address"
  },
  {
    text: ["+91 xxx xxx xxxx", "+91 xxx xxx xxxx1"],
    title: "Call us at",
    image: "email"
  },
  {
    text: ["support@cAngelx.xom"],
    title: "Email",
    image: "email"
  }
];


export const getNotifications = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8];
}

export const registerFormFields = ["BusinessType", "BusinessContact", "Country", "DHLId", "BusinessEmail", "BusinessHandle", "OrgName", "TagsData", "OrgWebsite", "PaypalId", "PayFastId", "AddressType", "City", "Pincode", "Province", "StreetName", "StreetNumber", "Suburb"];

export const addProductFormFields = ["ProductName", "ProductCategory", "ProductSubCategory", "ProductType", "Height", "Width", "Length", "Depth", "Weight", "ProductDescription"];

export const addProductFormFieldsProductType = {
  "Electronics": ["Brand", "Model", "Type", "Ram", "Memory", "Os", "Processor", "Storage"],
  "Furnitures": ["Brand", "MaterialDescription"],
  "Shoes & Accessories": ["Brand", "MaterialDescription", "Ocassion"],
  "Clothing": ["Brand", "MaterialDescription", "Ocassion"]
}

export const addCampaignFormFields = ["ProductName", "ProductCategory", "Currency", "ProductDescription", "MinDonation", "TargetDonationAmount"];

export const addCouponFormFields = ["CouponCode", "Discount", "Currency", "MaxDiscountAmount", "CouponActiveFrom", "CouponExpiryDate", "CouponDescription"];

export const shippingAddressFormFields = ["Country", "AddressType", "City", "ZipCode", "Province", "StreetName", "StreetNumber", "Suburb"];

export const billingAddressFormFields = ["Country", "AddressType", "City", "ZipCode", "Province", "StreetName", "StreetNumber", "Suburb"];