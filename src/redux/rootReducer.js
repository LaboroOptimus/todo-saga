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
        case 'VALIDATE' :
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