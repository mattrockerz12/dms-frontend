import * as types from "../actions/actionTypes";

const initialState = {
  loading: false,
  documents: [],
  meta: {},
};

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: action.payload,
      };
    case types.LOAD_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: action.payload,
        meta: action.meta,
      };
    case types.CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        documents: [...state.documents, { ...action.payload }],
      };
    case types.UPDATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        documents: [
          ...state.documents.map((document) =>
            document.id === action.payload.id ? action.payload : document
          ),
        ],
      };
    case types.DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        documents: [
          ...state.documents.filter(
            (document) => document.id !== action.payload.id
          ),
        ],
      };
    default:
      return state;
  }
};

export default documentReducer;
