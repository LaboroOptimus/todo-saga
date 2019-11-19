import {all, call, put, takeEvery} from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

const wait = ms => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    })
}

export function* fetchError() {
    yield put({type: 'FETCH_ERROR'})
}

export function* watchValidate() {
    yield takeEvery('VALIDATE', workerValidate)
}

export function* workerValidate() {
    yield put({type: 'ADD'});
    yield put({type: 'FETCH_NEW_TASK'});
}

export function* watchLoad() {
    yield takeEvery('LOAD', workerLoadData)
}

/* START TIMER */
export function* watchTimer() {
    yield takeEvery('PAUSE_ITEM', workerSetTimer)
}

export function* workerSetTimer(data) {

    while(true) {
        yield put({type: 'SET_TIMER', payload: data.payload});
        yield delay(1000);
    }
}
/* START TIMER */

/* END TIMER */
/*export function* watchEndTimer() {
    yield takeEvery('PAUSE_ITEM', workerEndTimer)
}*/


/* END TIMER */

export function* workerLoadData() {
    try {
        let user = localStorage.getItem('user').replace(/\./gi, '');
        const data = yield call(() => {
                return fetch(`https://todo-saga-987da.firebaseio.com/todo/${user}.json`)
                    .then(res => res.json())
            }
        );
        yield put({type: 'ADD_DATA', payload: data});
    } catch (error) {
        yield put(fetchError);
    }

}

export function* watchFilters() {
    yield takeEvery('FILTER_TASKS', workerFilter);
}

export function* workerFilter(data) {
    yield put({type: 'CHANGE_FILTER', payload: data.payload});

}

export function* watchFetchAsync() {
    yield takeEvery('FETCH_TODO', workerFetchTodo)
}

export function* workerFetchTodo() {
    try {
        const data = yield call(() => {
                return fetch('https://jsonplaceholder.typicode.com/posts/1')
                    .then(res => res.json())
            }
        );
        yield put({type: 'FETCH_SUCCESS', payload: data});
    } catch (error) {
        yield put(fetchError);
    }
}

export default function* rootSaga() {
    yield all([
        watchFetchAsync(),
        watchValidate(),
        watchFilters(),
        watchLoad(),
        watchTimer()
    ])
}