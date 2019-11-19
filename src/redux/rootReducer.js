import axios from 'axios'
import firebase from '../firebase.js'

const initialState = {
    text: '',
    description:'',
    hours: '',
    minutes: '',
    task: [],
    error: false,
    validate: false,
    errorsTypes: [],
    isLogin: false,
    user_email: ''
};

let user = '';
if (localStorage.getItem('user') === null) {
    user = ''
} else {
    user = localStorage.getItem('user').replace(/\./gi, '');
}
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'EXIT':
            localStorage.setItem('user', '');
            return {
                ...state,
                user_email: '',
                isLogin: false
            };
        case 'ADD_DATA':
            let fetch_data = [];

            for (let key in action.payload) {
                fetch_data.push(action.payload[key]);
            }

            return {
                ...state,
                task: fetch_data

            };
        case 'CHANGE_TEXT':
            return {
                ...state,
                text: action.payload
            };
        case 'CHANGE_HOURS':
            return {
                ...state,
                hours: action.payload
            };
        case 'CHANGE_MINUTES':
            return {
                ...state,
                minutes: action.payload
            };
        case 'CHANGE_DESC':
            return {
                ...state,
                description: action.payload
            };
        case 'SET_TIMER':


            let newTimerTask = [...state.task];
            for (let i = 0; i < newTimerTask.length; i++) {
                if (newTimerTask[i].id === action.payload.id) {
                        newTimerTask[i].timer = newTimerTask[i].timer + 1;

                }
            }

            return {
                task: newTimerTask,
                errorsTypes: []
            };
        case 'ADD':
            switch (state.error) {
                case false :
                    const time = new Date();
                    let hNow = time.getHours();
                    let mNow = time.getMinutes();
                    if (+mNow < 10) {
                        mNow = '0' + mNow;
                    }
                    let rand = 1 - 0.5 + Math.random() * (10000 - 1 + 1);
                    let id = Math.round(rand);


                    const data = {
                        text: state.text,
                        hours: state.hours,
                        minutes: state.minutes,
                        description: state.description,
                        timer: 0,
                        timeToEnd: Math.ceil((+state.hours * 60 + +state.minutes)/30),
                        time: hNow + ':' + mNow,
                        complete: false,
                        pause: true,
                        id: id,
                        user_email: state.user_email,
                    };

                    axios.post(`https://todo-saga-987da.firebaseio.com/todo/${user}.json`, data)
                        .then(response => {
                            console.log(response)
                        })
                        .catch(error => console.log(error));

                    return {
                        task: [...state.task, {
                            text: state.text,
                            hours: state.hours,
                            minutes: state.minutes,
                            description: state.description,
                            timeToEnd: Math.ceil((+state.hours * 60 + +state.minutes)/30),
                            timer: 0,
                            time: hNow + ':' + mNow,
                            complete: false,
                            pause: true,
                            id: id,
                            user_email: state.user_email
                        }],
                        text: '',
                        hours: '',
                        minutes: '',
                        description: '',
                        validate: false,
                        errorsTypes: []
                    };
                case true :
                    return {
                        ...state,
                    };
                default :
                    return state
            }
        case 'REMOVE_ITEM':
            firebase.database().ref(`todo/${user}`).orderByChild('id').equalTo(action.payload.id).once('value').then(function (snapshot) {
                snapshot.forEach(function (child) {
                    child.ref.remove();
                })
            });

            return {
                task: [
                    ...state.task.slice(0, action.payload.index),
                    ...state.task.slice(action.payload.index + 1)
                ],
                errorsTypes: []
            };
        case 'COMPLETE_ITEM':
            let newTask = [...state.task];
            for (let i = 0; i < newTask.length; i++) {
                if (newTask[i].id === action.payload.id) {
                    newTask[i].complete = true
                }
            }

            firebase.database().ref(`todo/${user}`).orderByChild('id').equalTo(action.payload.id).once('value').then(function (snapshot) {
                snapshot.forEach(function (child) {
                    child.ref.update({
                        complete: true
                    });
                })
            });

            return {
                task: newTask,
                errorsTypes: []
            };
        case 'PAUSE_ITEM':
            let pauseTasks = [...state.task];
            let pause = false;
            for (let i = 0; i < pauseTasks.length; i++) {
                if (pauseTasks[i].id === action.payload.id && !pauseTasks[i].complete) {
                    if (pauseTasks[i].pause) {
                        pause = false;
                        pauseTasks[i].pause = pause;

                    } else {
                        pause = true;
                        pauseTasks[i].pause = pause;
                    }

                }
            }
            firebase.database().ref(`todo/${user}`).orderByChild('id').equalTo(action.payload.id).once('value').then(function (snapshot) {
                snapshot.forEach(function (child) {
                    child.ref.update({
                        pause: pause
                    });
                })
            });

            return {
                task: pauseTasks,
                errorsTypes: []
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                task: [...state.task, {text: action.payload.title, hours: '01', minutes: '10'}]
            };
        case 'FETCH_ERROR' :
            return {
                ...state,
                error: true
            };
        case 'FILTER_TASKS' :
            switch (action.payload) {
                case 'in work':
                    const isInWork = (item) => {
                        if (item.complete) {
                            return 1;
                        } else {
                            return -1
                        }
                    };

                    let taskInWork = state.task.sort(isInWork);
                    return {
                        ...state,
                        task: taskInWork
                    };
                case 'done':
                    const isDone = (item) => {
                        if (item.complete) {
                            return -1
                        } else {
                            return 1
                        }
                    };

                    let taskIsDone = state.task.sort(isDone);
                    return {
                        ...state,
                        task: taskIsDone,
                    };

                case 'pause':
                    const isPause = (item) => {
                        if (item.pause) {
                            return -1
                        } else {
                            return 1
                        }
                    };

                    let isOnPause = state.task.sort(isPause);
                    return {
                        ...state,
                        task: isOnPause,
                    };

                default :
                    return {
                        ...state,
                    };
            }
        case 'VALIDATE':
            const errors = [];
            const validate = (text, hours, minutes) => {
                let i = 0;
                if (text.length === 0 || text.length < 6) {
                    errors.push('Неверное название задачи');
                    i++;
                }
                if (hours.length === 0 || hours.length < 1 || hours.length >= 3) {
                    errors.push('Неверное значение часов');
                    i++;
                }
                if (minutes.length === 0 || minutes.length < 1 || minutes.length >= 3) {
                    errors.push('Неверное значение минут');
                    i++;
                }
                return i <= 0;
            };
            switch (validate(state.text, state.hours, state.minutes)) {
                case false :
                    return {
                        ...state,
                        error: true,
                        validate: true,
                        errorsTypes: [...errors]
                    };
                case true :
                    return {
                        ...state,
                        error: false,
                        validate: true,
                        errorsTypes: []
                    };
                default:
                    return {
                        ...state,
                        error: false,
                        validate: true,
                        errorsTypes: []
                    }
            }
        case 'LOGIN':
            localStorage.setItem('user', `${state.user_email}`);
            user = localStorage.getItem('user');
            user = user.replace(/\./gi, '');
            return {
                ...state,
                isLogin: true,
            };
        case 'CHANGE_EMAIL' :
            return {
                ...state,
                user_email: action.payload
            };


        default:
            return state
    }
}

