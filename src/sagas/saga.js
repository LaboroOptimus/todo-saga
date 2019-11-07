import {all, call, put, takeEvery} from 'redux-saga/effects'

//const delay = (ms) => new Promise(res => setTimeout(res, ms))
//yield delay(1000)

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

export function* watchLoad(){
    yield takeEvery('LOAD', workerLoadData)

}

export function* workerLoadData() {
    try {
        const data = yield call(() => {
                return fetch('https://todo-saga-987da.firebaseio.com/todo.json')
                    .then(res => res.json())
            }
        );
        yield put({type: 'ADD_DATA', payload: data});
        console.log(data)
    } catch (error) {
        yield put(fetchError);
    }

}

export function* watchFilters() {
    yield takeEvery('FILTER_TASKS', workerFilter);
    // console.log('произошла смена фильтра из саги');
}

export function* workerFilter() {
    //yield delay(1000);
    // const filter = yield select(currentFilter);
    //console.log('сага передает' + filter);
    yield put({type: 'CHANGE_FILTER'});
    console.log('Вызвал фильтр тасков из саги');
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
        watchLoad()
    ])
}