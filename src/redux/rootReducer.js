import axios from 'axios'
import firebase from '../firebase.js'
import {getPomodoroRest, getPomodoroTime} from "../utils/pomodoro";

export const initialState = {
    text: '',
    description: '',
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




        case 'ADD_EXTRA_MINUTE':
            let addExtraMinute = [...state.task];

            for (let i = 0; i < addExtraMinute.length; i++) {
                if (addExtraMinute[i].id === action.payload.id) {
                    addExtraMinute[i].extraTime = addExtraMinute[i].extraTime + 1;
                }
            }

            return {
                ...state,
                task: addExtraMinute,
            };

        case 'ADD_MINUTE_START_REST':
            let startRestItems = [...state.task];

            for (let i = 0; i < startRestItems.length; i++) {
                if (startRestItems[i].id === action.payload.id) {
                    startRestItems[i].timerSec = 0;
                    startRestItems[i].timerMin = action.payload.minute;
                    alert('Задача' + '"' + startRestItems[i].title + '".' + 'Начать отдых');
                }
            }

            return {
                ...state,
                startRestItems
            };

        case 'ADD_MINUTE_END_REST':
            let endRestItems = [...state.task];

            for (let i = 0; i < endRestItems.length; i++) {
                if (endRestItems[i].id === action.payload.id) {
                    endRestItems[i].timerSec = 0;
                    endRestItems[i].timerMin = action.payload.minute;
                    alert('Задача' + '"' + endRestItems[i].title + '".' + 'Закончить отдых');
                }
            }

            return {
                ...state,
                endRestItems
            };

        case 'ADD_SECOND':
            let addSecondTasks = [...state.task];

            for (let i = 0; i < addSecondTasks.length; i++) {
                if (addSecondTasks[i].id === action.payload.id) {
                    addSecondTasks [i].timerSec = action.payload.second;
                }
            }

            return {
                ...state,
                task: addSecondTasks,
            };

        case 'ADD_MINUTE':
            let addMinuteTasks = [...state.task];
            for (let i = 0; i < addMinuteTasks.length; i++) {
                if (addMinuteTasks[i].id === action.payload.id) {
                    addMinuteTasks[i].timerSec = 0;
                    addMinuteTasks[i].timerMin = action.payload.minutes;
                }
            }
            return {
                ...state,
                task: addMinuteTasks
            };


        case 'ADD_HOUR':
            let addHourTasks = [...state.task];
            for (let i = 0; i < addHourTasks.length; i++) {
                if (addHourTasks[i].id === action.payload.id) {
                    addHourTasks[i].timerMin = 0;
                    addHourTasks[i].timerHour = action.payload.hours;
                }
            }

            return {
                ...state,
                task: addHourTasks
            };

        case 'ADD_DATA':
            let fetch_data = [];

            for (let key in action.payload) {
                fetch_data.push(action.payload[key]);
            }

            for (let i = 0; i < fetch_data.length; i++) {
                fetch_data[i].pause = true;
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

        case 'ADD':
            switch (state.error) {
                case false :
                    const time = new Date();
                    let hNow = time.getHours();
                    let mNow = time.getMinutes();
                    if (+mNow < 10) {
                        mNow = '0' + mNow;
                    }

                    const startTime = (time.getHours() * 60) + time.getMinutes();
                    const endTime = startTime + (+state.hours * 60 + +state.minutes);

                    let rand = 1 - 0.5 + Math.random() * (10000 - 1 + 1);
                    let id = Math.round(rand);

                    const data = {
                        text: state.text,
                        hours: state.hours,
                        minutes: state.minutes,
                        description: state.description,
                        pomodoroEndRest: getPomodoroTime(startTime, endTime),
                        pomodoroStartRest: getPomodoroRest(getPomodoroTime(startTime, endTime)),
                        timerSec: 0,
                        timerMin: 0,
                        timerHour: 0,
                        timeToEnd: Math.ceil((+state.hours * 60 + +state.minutes) / 30),
                        extraTime: 0,
                        time: hNow + ':' + mNow,
                        complete: false,
                        pause: true,
                        id: id,
                        user_email: state.user_email,
                        actions: [{
                            eventId: 0,
                            status: 'add',
                            time: (hNow * 60) + (mNow),
                        }]
                    };

                    console.log(data.pomodoroEndRest);
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
                            timeToEnd: Math.ceil((+state.hours * 60 + +state.minutes) / 30),
                            extraTime: 0,
                            pomodoroEndRest: getPomodoroTime(startTime, endTime),
                            pomodoroStartRest: getPomodoroRest(getPomodoroTime(startTime, endTime)),
                            timerSec: 0,
                            timerMin: 0,
                            timerHour: 0,
                            time: hNow + ':' + mNow,
                            complete: false,
                            pause: true,
                            id: id,
                            user_email: state.user_email,
                            actions: [{
                                eventId: 0,
                                status: 'add',
                                time: (+state.hours * 60) + (+state.minutes),
                            }]
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
            const completeTime = new Date();
            for (let i = 0; i < newTask.length; i++) {
                if (newTask[i].id === action.payload.id) {
                    var newActions = [...newTask[i].actions, {
                        eventId: 0,
                        status: 'complete',
                        time: completeTime.getHours() * 60 + completeTime.getMinutes(),
                    }];
                    newTask[i].complete = true;
                    newTask[i].actions = newActions;
                }
            }

            firebase.database().ref(`todo/${user}`).orderByChild('id').equalTo(action.payload.id).once('value').then(function (snapshot) {
                snapshot.forEach(function (child) {
                    child.ref.update({
                        complete: true,
                        actions: [...newActions]
                    });
                })
            });

            return {
                task: newTask,
                errorsTypes: []
            };
        case 'PAUSE_ITEM':
            let pauseTasks = [...state.task];
            const pauseTime = new Date();
            var pauseAction = {};

            for (let i = 0; i < pauseTasks.length; i++) {
                if (pauseTasks[i].id === action.payload.id && !pauseTasks[i].complete) {
                    var pauseActions = [...pauseTasks[i].actions];
                    pauseTasks[i].pause = true;
                    pauseAction = {
                        eventId: 2,
                        status: 'pause',
                        time: pauseTime.getHours() * 60 + pauseTime.getMinutes(),
                    }
                }
            }

            pauseActions.push(pauseAction);
            firebase.database().ref(`todo/${user}`).orderByChild('id').equalTo(action.payload.id).once('value').then(function (snapshot) {
                snapshot.forEach(function (child) {
                    child.ref.update({
                        pause: true,
                        actions: [...pauseActions]
                    });
                })
            });

            return {
                task: pauseTasks,
                errorsTypes: []
            };

        case 'PLAY_ITEM':
            let playTasks = [...state.task];
            // localStorage.setItem('play', action.payload.id);


            const playTime = new Date();
            var playAction = {};

            for (let i = 0; i < playTasks.length; i++) {
                if (playTasks[i].id === action.payload.id && !playTasks[i].complete) {
                    var playActions = [...playTasks[i].actions];
                    playTasks[i].pause = false;
                    playAction = {
                        eventId: 1,
                        status: 'play',
                        time: playTime.getHours() * 60 + playTime.getMinutes(),
                    }


                }
            }

            playActions.push(playAction);

            firebase.database().ref(`todo/${user}`).orderByChild('id').equalTo(action.payload.id).once('value').then(function (snapshot) {
                snapshot.forEach(function (child) {
                    child.ref.update({
                        pause: false,
                        actions: playActions
                    });
                })
            });

            return {
                task: playTasks,
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

