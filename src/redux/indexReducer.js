import {combineReducers} from 'redux'
import rootReducer from './rootReducer'
import filterReducer from "./filterReducer";


export const reducer = combineReducers({
    rootReducer,
    filterReducer
})


