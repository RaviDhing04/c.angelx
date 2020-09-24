export const userLeftNavLinks = [
  { name: "Pending in Total", path: "/home/ordersList/", icon: "hourglass", enable: true },
  { name: "Arears in Total", path: "/home/ordersList/", icon: "Group 1030", enable: false },
  { name: "Lay Buys in Total", path: "/home/ordersList/", icon: "shipping", enable: true },
  { name: "Group Buys in Total", path: "/home/ordersList/", icon: "shipping", enable: true },
  { name: "Pre-orders in Total", path: "/home/ordersList/", icon: "clock", enable: false },
  { name: "Donations", path: "/home/ordersList/", icon: "donate", enable: true },
  { name: "Wishlist", path: "/home/viewAllProducts/", icon: "heart-filled", enable: true },
  { name: "Add Contacts", path: "/home/myContacts/", icon: "profile", enable: true }
];

export const merchantLeftNavLinks = {
  'Default': [
    { name: "Inventory", path: "/merchantHome/inventory/", icon: "inventory", enable: true },
    { name: "Causes", path: "/merchantHome/campaigns/", icon: "donate", enable: true },
    { name: "Add Discount Coupons", path: "/merchantHome/coupons/", icon: "coupon", enable: true },
    { name: "Subordinate Account", path: "/merchantHome/myEmployees/", icon: "Shape", enable: true },
    { name: "Sales-Pending Deliveries", path: "/merchantHome/ordersList/", icon: "hourglass", enable: true },
    { name: "Pending Total Orders", path: "/merchantHome/ordersList/", icon: "clock", enable: true },
    { name: "Lay Buy Orders", path: "/merchantHome/ordersList/", icon: "clock", enable: true },
    { name: "Group Purchase Orders", path: "/merchantHome/ordersList/", icon: "shopping-cart", enable: true },
    { name: "Declined Orders", path: "/merchantHome/ordersList/", icon: "blocked-symbol", enable: true },
    { name: "Patrons", path: "/merchantHome/Patrons/", icon: "profile", enable: true },
    { name: "Statistics", path: "/merchantHome/myEmployees/", icon: "bar-graph", enable: false }
  ],
  'Retail': [
    { name: "Inventory", path: "/merchantHome/inventory/", icon: "inventory", enable: true },
    { name: "Add Discount Coupons", path: "/merchantHome/coupons/", icon: "coupon", enable: true },
    { name: "Subordinate Account", path: "/merchantHome/myEmployees/", icon: "Shape", enable: true },
    { name: "Sales-Pending Deliveries", path: "/merchantHome/ordersList/", icon: "hourglass", enable: true },
    { name: "Pending Total Orders", path: "/merchantHome/ordersList/", icon: "clock", enable: true },
    { name: "Lay Buy Orders", path: "/merchantHome/ordersList/", icon: "clock", enable: true },
    { name: "Group Purchase Orders", path: "/merchantHome/ordersList/", icon: "shopping-cart", enable: true },
    { name: "Declined Orders", path: "/merchantHome/ordersList/", icon: "blocked-symbol", enable: true },
    { name: "Patrons", path: "/merchantHome/Patrons/", icon: "profile", enable: true },
    { name: "Statistics", path: "/merchantHome/myEmployees/", icon: "bar-graph", enable: false }
  ],
  'NPO': [
    { name: "Causes", path: "/merchantHome/campaigns/", icon: "donate", enable: true },
    { name: "Subordinate Account", path: "/merchantHome/myEmployees/", icon: "Shape", enable: true },
    { name: "Donations", path: "/merchantHome/ordersList/", icon: "donate", enable: true },
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
    { name: "Term & Conditions", path: "https://cangelx-documents.s3.us-east-2.amazonaws.com/C-Angelx-UserTerms%26Conditions.pdf" },
    { name: "Privacy Policy", path: "https://cangelx-documents.s3.us-east-2.amazonaws.com/C-Angelx-PrivacyPolicy.pdf" },
  ],
  [
    { name: "Sponsored", path: "/home/productsListing#Sponsored" },
    { name: "Followed", path: "/home/productsListing#Followed" },
    { name: "Advertisements", path: "#" }
  ],
  [
    { name: "My Profile", path: "/profile/edit/" },
    { name: "My Cart", path: "/cart/" },
    { name: "My Whishlist", path: "/home/viewAllProducts/Wishlist" },
    { name: "My Orders", path: "/home/ordersList/" },
    { name: "My Contacts", path: "/home/myContacts/" },
    { name: "Donations", path: `/home/ordersList/${JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).UserId}/Donations` },
    { name: "Show Statistics", path: "#" }
  ]
];

export const footerLinksLoggedout = [
  [
    { name: "About Us", path: "/aboutUs" },
    { name: "Support", path: "/support" },
    { name: "Corporate Info", path: "/aboutUs" },
    { name: "User Guide", path: "/aboutUs" },

  ],
  [{ name: "Term & Conditions", path: "https://cangelx-documents.s3.us-east-2.amazonaws.com/C-Angelx-UserTerms%26Conditions.pdf" },
  { name: "Privacy Policy", path: "https://cangelx-documents.s3.us-east-2.amazonaws.com/C-Angelx-PrivacyPolicy.pdf" },
  { name: "Advertisements", path: "#" }
  ],
  [
    { name: "Sponsored", path: "/landing#Sponsored" },
    { name: "Previews", path: "/landing#Previews" },
    { name: "Categories", path: "/landing#Categories", }
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
      "C-Angelx enables individual Patrons (customers, supporters, etc) to follow listed merchants & NPOs of their choice on this platform -  & shop online, place lay-buys, or donate to any of the listed NPOs they like.",
    title: "Shop, Sell and Support",
    image: "aboutUs1"
  },
  {
    text:
      "You are also able to create an online merchant & sell online, or an NPO (cause) account for superior fundraising & receiving donations online safely. Add your staff as subordinates to upload inventory & process sales’ while you manage the business...",
    title: "Give and Take",
    image: "aboutUs2"
  },
  {
    text:
      "C-Angelx has everything figured out for your merchant: DHL Courier services can collect directly from your shop & deliver directly to your customer’s door, securely & safely. No Hassles!",
    title: "One Stop Solution",
    image: "aboutUs3"
  },
  {
    text:
      "C-Angelx is designed with security in mind, & further hosted in highly secure & reliable global servers’ as a Global-Platform.",
    title: "Safe and Secured",
    image: "aboutUs4"
  },
  {
    text:
      "We have partnered with known and trusted 3rd party suppliers in the global ecommerce industry – for secure transactions, and reliable courier services.",
    title: "Quick and Easy",
    image: "aboutUs5"
  },
  {
    text:
      "There are No fixed monthly fees on merchants, but a 3% commission for each sale - plus the separate Payment gateway’s fee of 2,9 – 3,5% (around 7% in total, which is still lower than the 10 – 15% charged by other platforms!). NPOs (causes) are exempt of our fee, except of the payment gateway’s fee.",
    title: "So how much",
    image: "aboutUs6"
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
    text: ["support@cangelx.com"],
    title: "Email",
    image: "email"
  },
  {
    text: ["adverts@cangelx.com"],
    title: "Adverts (For ads inquiries)",
    image: "email"
  }
];


export const getNotifications = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8];
}

export const registerFormFields = ["BusinessType", "BusinessContact", "Country", "DHLId", "BusinessEmail", "BusinessHandle", "OrgName", "MerchantBio", "TagsData", "OrgWebsite", "PaypalId", "PayFastId", "AddressType", "City", "Pincode", "Province", "StreetName", "StreetNumber", "Suburb"];

export const addProductFormFields = ["ProductName", "ProductCategory", "ProductSubCategory", "ProductType", "Height", "Width", "Length", "Depth", "Weight", "ProductDescription"];

export const addProductFormFieldsProductType = {
  "Electronics": ["Brand", "Model", "Type", "Ram", "Memory", "Os", "Processor", "Storage"],
  "Furniture": ["Brand", "MaterialDescription"],
  "Footware": ["Brand", "MaterialDescription", "Occasion"],
  "Accessories": ["Brand", "MaterialDescription", "Occasion"],
  "Clothing": ["Brand", "MaterialDescription", "Occasion"]
}

export const displayNameMap = {
  "Ram": "RAM",
  "Os": "OS",
  "MaterialDescription": "Material Description"
}

export const addCampaignFormFields = ["ProductName", "Currency", "ProductDescription", "MinDonation", "TargetDonationAmount"];

export const addCouponFormFields = ["CouponCode", "Discount", "Currency", "MaxDiscountAmount", "CouponActiveFrom", "CouponExpiryDate", "CouponDescription"];

export const shippingAddressFormFields = ["Country", "AddressType", "City", "Zipcode", "Province", "StreetName", "StreetNumber", "Suburb"];

export const billingAddressFormFields = ["Country", "AddressType", "City", "Zipcode", "Province", "StreetName", "StreetNumber", "Suburb"];

export const countryCodes = {
  "India": "India",
  "South Africa": "South Africa",
  "USA": "USA"
}