import {applyMiddleware, createStore} from "redux";
import reducer from "./indexReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from '../sagas/saga.js'


const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);