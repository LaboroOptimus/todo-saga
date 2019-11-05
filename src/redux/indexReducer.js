import {combineReducers} from 'redux'
import rootReducer from './rootReducer'
import filterReducer from "./filterReducer";


export default combineReducers({
    root: rootReducer,
    filter: filterReducer
})


