const initialState = {
  homePage: {
    latestProducts: {}
  }
};

export const appReducer = (state = initialState, { type, value }) => {
  switch (type) {
    case "LATEST_PRODUCTS":
      return {
        ...state,
        homePage: {
        latestProducts: value.payload
        }
      };
    default:
      return state;
  }
};
