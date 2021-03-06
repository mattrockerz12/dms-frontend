import axios from "axios";
import * as types from "./actionTypes";

export const getDocuments = () => async (dispatch) => {
  const { data } = await axios.get("http://localhost:8000/api/alldocuments");

  dispatch({
    type: types.GET_DOCUMENTS_SUCCESS,
    payload: data.data,
  });
};

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

export const saveDocument = (document) => async (dispatch) => {
  const { data } = await axios.post(
    "http://localhost:8000/api/documents",
    document
  );

  dispatch({
    type: types.CREATE_DOCUMENT_SUCCESS,
    payload: data,
  });
};

export const editDocument = (document, id) => async (dispatch) => {
  const { data } = await axios.put(
    `http://localhost:8000/api/documents/${id}`,
    document
  );

  dispatch({
    type: types.UPDATE_DOCUMENT_SUCCESS,
    payload: data,
  });
};

export const removeDocument = (document) => async (dispatch) => {
  await axios.delete(`http://localhost:8000/api/documents/${document.id}`);

  dispatch({
    type: types.DELETE_DOCUMENT_SUCCESS,
    payload: document,
  });
};
