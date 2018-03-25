import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import todoStore from './todo-store'
import { combineReducers } from "redux";

let initialState = {
  appName: "Aaron's Test App",
  isPending: false,
  user: null
};

const reducer = (state = {}, action) => {

  switch (action.type) {
    case "SET_APP_NAME": {
      return { ...state, appName: action.appName };
    }
    case "AUTH_CHECK_PENDING":
    case "LOGIN_PENDING":
      return {
        ...state,
        isPending: true
      };

    case "AUTH_CHECK_FULFILLED":
    case "LOGIN_FULFILLED":
      return {
        ...state,
        isPending: false,
        user: action.user
      };

    case "LOGOUT_PENDING":
      return {
        ...state,
        isPending: true
      };

    case "LOGOUT_FULFILLED":
      return {
        ...state,
        isPending: false,
        user: null
      };

    default:
      return state;
  }
};

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore(
  combineReducers({ authStore: reducer, todoStore }),
  initialState,
  composeEnhancers(applyMiddleware(thunkMiddleware, logger))
);

export default store;
