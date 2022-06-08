import * as types from "../actions/actionTypes";

const initialState = {
  loading: false,
  projects: [],
  meta: {},
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        meta: action.meta,
      };
    default:
      return state;
  }
};

export default projectReducer;
