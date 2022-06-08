import { combineReducers } from "redux";
import dms from "./documentReducer";
import dmsProj from "./projectReducer";

const rootReducer = combineReducers({
  dms,
  dmsProj,
});

export default rootReducer;
