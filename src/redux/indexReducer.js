import {combineReducers} from 'redux'
import rootReducer from './rootReducer'
import filterReducer from "./filterReducer";

export default combineReducers({
    filter: filterReducer,
    root: rootReducer,

})

export const currentFilter = (state) => state.currentFilter;

