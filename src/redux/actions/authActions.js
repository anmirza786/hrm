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
    // console.log(res);
    dispatch({
      type: actions.AUTHENTICATED_SUCCESS,
      payload: res.data,
    });
    // dispatch(load_user());
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
  // console.log(body)
  try {
    const res = await axios.post(REQUEST_URL + `user/login`, body, config);
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: res.data,
    });
    // dispatch(load_user(true));
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
  // console.log(localStorage.getItem("token"));
};
export const register =
  (
    email,
    password
  ) =>
  async (dispatch) => {
    // dispatch({
    //   type: actions.AUTHENTICATED_START,
    // });
    const body = JSON.stringify({
        isAdmin: false,
        isStaff: false,
        email,
        password
    })
    // console.log(body)

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
        // dispatch(load_user());
      })
      .catch((error) => {
        alert("User With This Email Already Exists")
        dispatch({
          error: error,
          type: actions.SIGNUP_FAIL,
        });
      });
  };