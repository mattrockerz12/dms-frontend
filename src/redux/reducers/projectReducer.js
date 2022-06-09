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
    case types.LOAD_PROJECT_DETAIL_SUCCESS:
      return {
        ...state,
        projects: action.payload,
      };
    case types.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, { ...action.payload }],
      };
    case types.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [
          ...state.projects.map((project) =>
            project.id === action.payload.id ? action.payload : project
          ),
        ],
      };
    case types.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [
          ...state.projects.filter(
            (project) => project.id !== action.payload.id
          ),
        ],
      };
    default:
      return state;
  }
};

export default projectReducer;
