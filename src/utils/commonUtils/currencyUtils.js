// export let formatter =  new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: currencyCode,
// });
// let currencyCode = "INR";
// let conversionRate = 1;

const formatter = props => {
  return amount => {
    if (props) {
      const convertedAmount = +amount * props.conversion;
      let format = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: props.shortName
      });
      return format.format(convertedAmount);
    }
  };
};

export default formatter;
