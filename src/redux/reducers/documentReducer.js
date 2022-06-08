import * as types from "../actions/actionTypes";

const initialState = {
  loading: false,
  documents: [],
  meta: {},
};

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: action.payload,
        meta: action.meta,
      };
    default:
      return state;
  }
};

export default documentReducer;
