export const userLeftNavLinks = [
  { name: "Pending in Total", path: "/home/ordersList/", icon: "hourglass", enable: false },
  { name: "Arears in Total", path: "/home/ordersList/", icon: "Group 1030", enable: false },
  { name: "Lay Buys in Total", path: "/home/ordersList/", icon: "shipping", enable: false },
  { name: "Group Buys in Total", path: "/home/ordersList/", icon: "shipping", enable: false },
  { name: "Pre-orders in Total", path: "/home/ordersList/", icon: "clock", enable: false },
  { name: "Donations", path: "/home/ordersList/", icon: "donate", enable: false },
  { name: "Wishlist", path: "/home/viewAllProducts/", icon: "heart-filled", enable: false },
  { name: "Add Contacts", path: "/home/myContacts/", icon: "profile", enable: true }
];

export const merchantLeftNavLinks = [
  { name: "Inventory", path: "/merchantHome/inventory/", icon: "inventory", enable: true },
  { name: "Campaigns", path: "/merchantHome/campaigns/", icon: "donate", enable: true },
  { name: "Coupons", path: "/merchantHome/coupons/", icon: "coupon", enable: true },
  { name: "Add Employees", path: "/merchantHome/myEmployees/", icon: "profile", enable: true }
];

export const profileLeftNavLinks = [
  { name: "Edit Personal Details", path: "/profile/edit/", icon: "profile", enable: true },
  { name: "Manage Addresses", path: "/profile/addresses/", icon: "location", enable: true }
];

export const checkoutLeftNavLinks = [
  { name: "Shipping Address", path: "/checkout/shipping/", icon: "location", enable: true },
  { name: "Billing Address", path: "/checkout/billing/", icon: "credit-card", enable: true },
  { name: "Confirm Order", path: "/checkout/confirm/", icon: "location", enable: true }
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

export const footerLinks = [
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
  { name: "US Dollar", shortName: "USD", icon: "dollar", conversion: 0.061 },
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
    text: ["C-Angelx", "qiwuqrwbiu akjnwiohqwodjk", "kjabu9ajhdauiscasdmbiudn"],
    title: "Address",
    image: "address"
  },
  {
    text: ["+91 982 928 9821", "+91 982 928 9821"],
    title: "Call us at",
    image: "email"
  },
  {
    text: ["abc@anglex.com", "abc@anglex.com"],
    title: "Email",
    image: "email"
  }
];


export const getNotifications = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8];
}

export const registerFormFields = ["BusinessType", "BusinessContact", "Country", "BusinessEmail", "BusinessHandle", "OrgName", "OrgWebsite", "PaypalId", "PayFastId", "AddressType", "City", "Pincode", "Province", "StreetName", "StreetNumber", "Suburb"];

export const addProductFormFields = ["ProductName", "ProductCategory", "UnitPrice", "AvailableQuantity", "Currency", "Height", "Width", "Length", "Weight", "ProductDescription"];

export const addCampaignFormFields = ["ProductName", "ProductCategory", "Currency", "ProductDescription", "MinDonation", "TargetDonationAmount"];

export const addCouponFormFields = ["CouponCode", "Discount", "Currency", "MaxDiscountAmount", "CouponActiveFrom", "CouponExpiryDate", "CouponDescription"];

export const shippingAddressFormFields = ["Country", "AddressType", "City", "ZipCode", "Province", "StreetName", "StreetNumber", "Suburb"];

export const billingAddressFormFields = ["Country", "AddressType", "City", "ZipCode", "Province", "StreetName", "StreetNumber", "Suburb"];