import axios from "axios";
import * as types from "./actionTypes";

export const loadProjects = (filters) => async (dispatch) => {
  const arr = [];

  if (filters.page) {
    arr.push(`page=${filters.page}`);
  }

  const { data } = await axios.get(
    `http://localhost:8000/api/projects?${arr.join("&")}`
  );

  dispatch({
    type: types.LOAD_PROJECTS_SUCCESS,
    payload: data.data,
    meta: data.data,
  });
};
