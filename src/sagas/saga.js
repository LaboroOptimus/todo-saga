import {all, call, put, takeEvery,cancel,select,take,fork ,getContext,takeLatest} from 'redux-saga/effects'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

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

/*TIMER */
export function* watchSetTimer() {
    yield takeEvery('SET_TIMER', workerSetTimer)
}

export function* workerSetTimer(data) {
    /*console.log('сага:', data.payload);*/
    yield put({type: 'CHECK_TIMER', payload: data.payload});
}


function* tick() {
    const playId = localStorage.getItem('play');
    while(true) {
        yield call(delay,1000);
        yield put({type: 'SET_TIMER', payload:playId});
    }
}

function* timer() {
    while(yield take('PLAY_ITEM')) {
        const bgSyncTask = yield fork(tick);
        yield take('PAUSE_ITEM')
        yield cancel(bgSyncTask)
    }
}

/*TIMER */


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
        timer(),
        watchSetTimer(),
    ])
}