import {combineReducers} from 'redux'
import rootReducer from './rootReducer'
import filterReducer from "./filterReducer";
import profileReducer from './profileReducer';

export default combineReducers({
    filter: filterReducer,
    root: rootReducer,
    profile: profileReducer,
})

export const currentFilter = (state) => state.currentFilter;

