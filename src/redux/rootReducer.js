import axios from 'axios'


const initialState = {
    text: '',
    hours: '',
    minutes: '',
    task: [],
    error: false,
    validate: false,
    errorsTypes: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_DATA':
            console.log('пришло: ' + action.payload);
            return {
                ...state,
            }
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
        case 'ADD':
            switch (state.error) {
                case false :
                    const time = new Date();
                    const hNow = time.getHours();
                    const mNow = time.getMinutes();

                    const data = {
                        text: state.text,
                        hours: state.hours,
                        minutes: state.minutes,
                        time: hNow + ':' + mNow,
                        complete: false,
                        pause: false
                    }

                    axios.post('https://todo-saga-987da.firebaseio.com/todo.json', data)
                        .then(response => {
                            console.log(response)
                        })
                        .catch(error => console.log(error))

                    return {
                        task: [...state.task, {
                            text: state.text,
                            hours: state.hours,
                            minutes: state.minutes,
                            time: hNow + ':' + mNow,
                            complete: false,
                            pause: false
                        }],
                        text: '',
                        hours: '',
                        minutes: '',
                        validate: false,
                        errorsTypes: []
                    }
                case true :
                    return {
                        ...state,
                    }
                default :
                    return state
            }
        case 'REMOVE_ITEM':
            const data = {
                ...state.task.slice(0, action.payload),
                ...state.task.slice(action.payload + 1)
            }
            axios.delete('https://todo-saga-987da.firebaseio.com/todo.json');
            axios.post('https://todo-saga-987da.firebaseio.com/todo.json', data)
                .then(response => {
                    console.log(response)
                })
                .catch(error => console.log(error))


            return {
                task: [
                    ...state.task.slice(0, action.payload),
                    ...state.task.slice(action.payload + 1)
                ],
                errorsTypes: []
            }
        case 'COMPLETE_ITEM':
            let newTask = [...state.task];
            for (let i = 0; i < newTask.length; i++) {
                if (i === action.payload) {
                    newTask[i].complete = true
                }
            }
            axios.delete('https://todo-saga-987da.firebaseio.com/todo.json');
            axios.post('https://todo-saga-987da.firebaseio.com/todo.json', newTask)
                .then(response => {
                    console.log(response)
                })
                .catch(error => console.log(error))

            return {
                task: newTask,
                errorsTypes: []
            }
        case 'PAUSE_ITEM':
            let pauseTasks = [...state.task];
            for (let i = 0; i < pauseTasks.length; i++) {
                if (i === action.payload && !pauseTasks[i].complete) {
                    if (pauseTasks[i].pause) {
                        pauseTasks[i].pause = false
                    } else {
                        pauseTasks[i].pause = true
                    }

                }
            }
            axios.delete('https://todo-saga-987da.firebaseio.com/todo.json');
            axios.post('https://todo-saga-987da.firebaseio.com/todo.json', pauseTasks)
                .then(response => {
                    console.log(response)
                })
                .catch(error => console.log(error))
            return {
                task: pauseTasks,
                errorsTypes: []
            }
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
                    }

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
                    }

                    let isOnPause = state.task.sort(isPause);
                    return {
                        ...state,
                        task: isOnPause,
                    }

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
            }
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


        default:
            return state
    }
}

