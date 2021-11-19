/* Hacemos la combinación de los reducers */



import loggedReducer from "./loggedReducer";
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    JWTToken : loggedReducer
});

export default allReducers;
