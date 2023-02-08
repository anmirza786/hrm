import axios from "axios";
import { REQUEST_URL } from "../constantURL";
import * as actions from "../actionTypes/authActionTypes";

export const checkAuthenticated = () => async (dispatch) => {
  dispatch({
    type: actions.AUTHENTICATED_START,
  });
  const config = {
    headers: {
      Accept: "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(REQUEST_URL + "user/me", config);
    dispatch({
      type: actions.AUTHENTICATED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actions.AUTHENTICATED_FAIL,
      payload: err,
    });
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: actions.AUTHENTICATED_START,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(REQUEST_URL + `user/login`, body, config);
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(checkAuthenticated());
  } catch (error) {
    dispatch({
      error: error,
      type: actions.LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: actions.LOGOUT,
  });
};
export const register = (email, password) => async (dispatch) => {
  const body = JSON.stringify({
    isAdmin: false,
    isStaff: false,
    email,
    password,
  });

  const config = {
    headers: {
      "Content-Type": `application/json`,
    },
  };
  await axios
    .post(REQUEST_URL + `user/register`, body, config)
    .then((res) => {
      dispatch(signin(email, password));
      dispatch({
        type: actions.SIGNUP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      alert("User With This Email Already Exists");
      dispatch({
        error: error,
        type: actions.SIGNUP_FAIL,
      });
    });
};
