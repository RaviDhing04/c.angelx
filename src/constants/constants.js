export const userLeftNavLinks = [
  { name: "Pending in Total", path: "/home/ordersList/", icon: "hourglass" },
  { name: "Arears in Total", path: "/home/ordersList/", icon: "Group 1030" },
  { name: "Lay Buys in Total", path: "/home/ordersList/", icon: "shipping" },
  { name: "Pre-orders in Total", path: "/home/ordersList/", icon: "clock" },
  { name: "Donations", path: "/home/ordersList/", icon: "donate" },
  { name: "Wishlist", path: "/home/ordersList/", icon: "heart" },
  { name: "Add Contacts", path: "/home/myContacts/", icon: "profile" }
];

export const merchantLeftNavLinks = [
  { name: "Inventory", path: "/merchantHome/inventory/", icon: "inventory" },
  { name: "Campaigns", path: "/merchantHome/campaigns/", icon: "donate" },
  { name: "Coupons", path: "/merchantHome/coupons/", icon: "coupon" }
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
    { name: "About Us", path: "/" },
    { name: "Support", path: "/" },
    { name: "Corporate Info", path: "/" },
    { name: "User Guide", path: "/" },
    { name: "Technical Support", path: "/" },
    { name: "Term & Conditions", path: "/" },
    { name: "Privacy Policy", path: "/" }
  ],
  [
    { name: "Sponsored", path: "/" },
    { name: "Previews", path: "/" },
    { name: "Categories", path: "/" },
    { name: "Advertisements", path: "/" }
  ],
  [
    { name: "My Profile", path: "/" },
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
  { name: "South African Rand", shortName: "ZAR", icon: "rand", conversion: 4.31 },
  { name: "US Dollar", shortName: "USD", icon: "dollar", conversion: 70 },
  { name: "Rupee", shortName: "INR", icon: "rupee-indian", conversion: 1 }
];

export const profileOptions = [
  { name: "Edit Profile", path: "/" },
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
  return [1,2,3,4,5,6,7,8];
}

export const registerFormFields = ["BusinessType", "BusinessContact", "Country", "BusinessEmail", "BusinessHandle", "OrgName", "OrgWebsite", "PaypalId", "PayFastId", "AddressType", "City", "Pincode", "Province", "StreetName", "StreetNumber", "Suburb"];

export const addProductFormFields = ["ProductName", "ProductCategory", "UnitPrice", "AvailableQuantity", "Currency", "ProductDescription"];

export const addCampaignFormFields = ["ProductName", "ProductCategory", "Currency", "ProductDescription", "MinDonation", "TargetDonationAmount"];

export const addCouponFormFields = ["CouponCode", "Discount(%)", "Currency", "MaxDiscountAmount", "CouponActiveFrom", "CouponExpiryDate", "CouponDescription"];
