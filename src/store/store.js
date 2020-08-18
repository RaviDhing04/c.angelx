import { createStore, combineReducers, compose, applyMiddleware } from "redux";

import ReduxThunk from "redux-thunk";
import { appReducer } from "./reducers";
// if you're also using redux-thunk, add it as a middleware
const createStoreWithMiddleware = compose(applyMiddleware(ReduxThunk))(
  createStore
);

const rootReducer = combineReducers({
  app: appReducer
});

function configureStore(initialState = {}) {
  return createStoreWithMiddleware(rootReducer, initialState);
}

const store = configureStore(window.__REDUX_STATE__ || {});

export default store;
