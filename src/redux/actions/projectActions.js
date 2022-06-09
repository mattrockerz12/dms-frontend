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
    meta: data.meta,
  });
};

export const loadProjectDetail = (id) => async (dispatch) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/projects/details/${id}`
  );

  dispatch({
    type: types.LOAD_PROJECT_DETAIL_SUCCESS,
    payload: data.data,
  });
};

export const saveProject = (project) => async (dispatch) => {
  const { data } = await axios.post(
    "http://localhost:8000/api/projects",
    project
  );

  dispatch({
    type: types.CREATE_PROJECT_SUCCESS,
    payload: data,
  });
};

export const editProject = (project, id) => async (dispatch) => {
  const { data } = await axios.put(
    `http://localhost:8000/api/projects/${id}`,
    project
  );

  dispatch({
    type: types.UPDATE_PROJECT_SUCCESS,
    payload: data,
  });
};

export const removeProject = (project) => async (dispatch) => {
  await axios.delete(`http://localhost:8000/api/projects/${project.id}`);

  dispatch({
    type: types.DELETE_PROJECT_SUCCESS,
    payload: project,
  });
};
