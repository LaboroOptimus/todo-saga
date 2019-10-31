import { combineReducers } from 'redux'
import rootReducer from './rootReducer'
import counter from './counter'

export default combineReducers({
    rootReducer,
    counter

})
