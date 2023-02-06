import axios from "axios";
import { REQUEST_URL } from "../constantURL";
import * as actions from "../actionTypes/bookActionTypes";

export const deletebook = (id) => async (dispatch) => {
  dispatch({
    type: actions.REQUEST_START,
  });
  const config = {
    headers: {
      Accept: "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.delete(REQUEST_URL + `books/deletebook/${id}`, config);
    // console.log(res);
    dispatch({
      type: actions.BOOK_DELETED_SUCCESS,
      payload: res.data,
    });
    // dispatch(load_user());
  } catch (err) {
    dispatch({
      type: actions.BOOK_DELETED_FAIL,
      payload: err,
    });
  }
};

export const addbook = (bookname,author,category,published) => async (dispatch) => {
    const body = JSON.stringify({
        bookname: bookname,
        author: author,
        category: category,
        published: published
    })
    dispatch({
      type: actions.REQUEST_START,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    };
    await axios.post(REQUEST_URL + `books/add-book`, body, config)
      .then((res) => {
        dispatch({
          type: actions.ADDED_BOOK_SUCCESS,
          payload: res.data,
        });
      }).catch((error) => {
        // alert("User With This Email Already Exists")
        dispatch({
          error: error,
          type: actions.ADDED_BOOK_SUCCESS,
        });
      });
  };
