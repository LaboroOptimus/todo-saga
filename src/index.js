import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import reducer from "./redux/indexReducer";
import {Provider} from 'react-redux'
import rootSaga from './sagas/saga.js'
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/store";


/*const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);*/

/*sagaMiddleware.run(rootSaga);*/

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
