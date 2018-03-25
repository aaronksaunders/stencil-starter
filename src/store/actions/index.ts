import { firebaseAPI } from "./../../helpers/firebase-service";

export const setAppName = (appName: string) => async (dispatch, _getState) => {
  return dispatch({
    type: "SET_APP_NAME",
    appName
  });
};

export const doAuthCheck = () => async (dispatch, _getState) => {
    dispatch({ type: "AUTH_CHECK_PENDING" });
    return firebaseAPI.authCheck().then((user) => {
      dispatch({ type: "AUTH_CHECK_FULFILLED", user : user });
    });
};

export const doLogin = credentials => async (dispatch, _getState) => {
    dispatch({ type: "LOGIN_PENDING" });
    return firebaseAPI.login(credentials).then((user) => {
      dispatch({ type: "LOGIN_FULFILLED", user : user  });
      return user
    });
};

export const doLogout = () => async (dispatch, _getState) => {
  dispatch({ type: "LOGOUT_PENDING" });
  return firebaseAPI.logout().then(() => {
    dispatch({ type: "LOGOUT_FULFILLED", user : null  });
    return null
  });
};
