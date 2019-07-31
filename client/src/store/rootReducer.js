import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import { authenticationReducer } from "views/authentication";

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});
