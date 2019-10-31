import { put, takeEvery, all, call } from 'redux-saga/effects'


const delay = (ms) => new Promise(res => setTimeout(res, ms))


/*export function* consoleSaga() {
    yield delay(1000);
    yield put({ type: 'CONSOLE_SAGA' })
}*/

/*
export function* watchIncrementAsync() {
    yield takeEvery('CONSOLE_ASYNC_SAGA', consoleSaga)
}
*/

/*export function * fetchSuccess(data) {
    yield put({type:'FETCH_SUCCESS', payload: data})
}*/
export function * fetchError() {
    yield put({type:'FETCH_ERROR'})
}

export function * watchValidate() {
    yield takeEvery('VALIDATE', workerValidate)
}
// смотрит за событиями validate

export function * workerValidate() {
    yield delay(1000);
    yield put({type:'ADD'});
}
// выполняет action add

export function * watchFetchAsync() {
    yield takeEvery('FETCH_TODO', workerFetchTodo)
}

export function * workerFetchTodo() {
    try {
        const data = yield call(() => {
                return fetch('https://jsonplaceholder.typicode.com/posts/1')
                    .then(res => res.json())
            }
        );
        yield put({type:'FETCH_SUCCESS', payload:data});
    } catch (error) {
        yield put(fetchError);
    }
}

export default function* rootSaga() {
    yield all([
        watchFetchAsync(),
        watchValidate()
    ])
}