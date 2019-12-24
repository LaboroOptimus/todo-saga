import {all, call, put, takeEvery} from 'redux-saga/effects'
import firebase from "../firebase";
import axios from 'axios'


let user;

if (localStorage.getItem('user') === null) {
    user = ''
} else {
    user = localStorage.getItem('user').replace(/\./gi, '');
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

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

/* TIME TO SERVER */
export function* watchHours() {
    yield takeEvery('ADD_HOUR', workerLoadHours);
}

export function* workerLoadHours(data) {
    firebase.database().ref(`todo/${user}`).orderByChild('id').equalTo(data.payload.id).once('value').then(function (snapshot) {
        snapshot.forEach(function (child) {
            child.ref.update({
                timerHour: data.payload.hours
            });
        })
    });
    yield put({type: 'LOAD_HOURS_TO_SERVER'})
}

export function* watchMinutes() {
    yield takeEvery('ADD_MINUTE', workerLoadMinutes);
    yield takeEvery('ADD_MINUTE_END_REST', workerLoadMinutes);
    yield takeEvery('ADD_MINUTE_START_REST', workerLoadMinutes);
}

export function* workerLoadMinutes(data) {
    firebase.database().ref(`todo/${user}`).orderByChild('id').equalTo(data.payload.id).once('value').then(function (snapshot) {
        snapshot.forEach(function (child) {
            child.ref.update({
                timerMin: data.payload.minutes
            });
        })
    });
    yield put({type: 'LOAD_MINUTES_TO_SERVER'});
}

export function* watchExtraTime() {
    yield takeEvery('ADD_EXTRA_MINUTE', workerLoadExtraTime);
}

export function* workerLoadExtraTime(data) {
    yield put({type: 'LOAD_EXTRA_TIME_TO_SERVER'});
}

export function* watchExit() {
    yield takeEvery('EXIT', workerExit);
}

export function* workerExit() {
    window.location.reload();
    yield put({type: 'RELOAD'});
}


/* FETCH USER_IMAGE */
export function* watchChangeImage() {
    yield takeEvery('CHANGE_FILE', workerChangeImage)
}

export function* workerChangeImage(data) {
    axios.get(`https://todo-saga-987da.firebaseio.com/users.json`).then(response => {
        let users = Object.keys(response.data);
        let isUserExist = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i] === user) {
                isUserExist = true;
                break;
            }
        }

        if (isUserExist) {
            firebase.database().ref(`users/${user}`).once('value').then(function (snapshot) {
                snapshot.forEach(function (child) {
                    child.ref.update({
                        image: data.payload
                    });
                })
            });
        }

        else {
            let user_data = {
                image: data.payload
            };
            axios.post(`https://todo-saga-987da.firebaseio.com/users/${user}.json`, user_data)
                .then(response => {
                })
                .catch(error => console.log(error));
        }
    });
}

export function * watchLoadUserAvatar() {
    yield takeEvery('LOAD_USER', workerLoadUserAvatar)
}
export function * workerLoadUserAvatar() {
    try {
        const data = yield call(() => {
                return fetch(`https://todo-saga-987da.firebaseio.com/users/${user}.json`)
                    .then(res => res.json())
            }
        );
        yield put({type: 'LOAD_USER_AVATAR', payload: data});
    } catch (error) {
        yield put(fetchError);
    }
}

 export function * watchReloadProfile() {
    yield takeEvery('LOAD_USER_DATA', workerReloadProfile)
}

export function * workerReloadProfile() {
    try {
        const data = yield call(() => {
                return fetch(`https://todo-saga-987da.firebaseio.com/users/${user}.json`)
                    .then(res => res.json())
            }
        );
        yield put({type: 'LOAD_USER_DATA_SUCCESS', payload: data});
    } catch (error) {
        yield put(fetchError);
    }
}

/* TIME TO SERVER */
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
        watchMinutes(),
        watchExtraTime(),
        watchHours(),
        watchExit(),
        watchChangeImage(),
        watchReloadProfile(),
        watchLoadUserAvatar()

    ])
}