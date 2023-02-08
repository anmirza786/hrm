import * as authactions from "./actionTypes/authActionTypes";
import * as booksactions from "./actionTypes/bookActionTypes";

export const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  error: null,
  user: null,
  loading: false,
  message: "",
  addedbook: {},
};

export function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case authactions.AUTHENTICATED_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case authactions.AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        user: payload,
      };
    case authactions.AUTHENTICATED_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.error,
      };
    case authactions.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        token: payload.token,
      };
    case authactions.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case authactions.SIGNUP_FAIL:
    case authactions.LOGIN_FAIL:
    case authactions.LOGOUT:
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.error,
      };
    case booksactions.REQUEST_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case booksactions.BOOK_DELETED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: "Book Deleted Successfully",
      };
    case booksactions.BOOK_DELETED_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: "Book Deleted Successfully",
      };
    case booksactions.ADDED_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: "Book Added Successfully",
        addedbook: payload,
      };
    case booksactions.ADDED_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: "Book Deleted Successfully",
        addedbook: null,
      };
    default:
      return state;
  }
}
