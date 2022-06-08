import axios from "axios";
import * as types from "./actionTypes";

export const loadDocuments = (filters) => async (dispatch) => {
  const arr = [];

  if (filters.page) {
    arr.push(`page=${filters.page}`);
  }

  const { data } = await axios.get(
    `http://localhost:8000/api/documents?${arr.join("&")}`
  );

  dispatch({
    type: types.LOAD_DOCUMENTS_SUCCESS,
    payload: data.data,
    meta: data.meta,
  });
};
