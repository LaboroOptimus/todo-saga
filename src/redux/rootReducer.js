const initialState = {
    text:'',
    hours:'',
    minutes:'',
    /*id:0,*/
    task:[],
    error: false
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_TEXT':
            return {
                ...state,
                text: action.payload
            }
        case 'CHANGE_HOURS':
            return {
                ...state,
                hours: action.payload
            }
        case 'CHANGE_MINUTES':
            return {
                ...state,
                minutes: action.payload
            }
        case 'ADD':
            return {
                task:[...state.task, {text: state.text, hours: state.hours, minutes: state.minutes}],
                text:'',
                hours:'',
                minutes: '',
            }
        case 'REMOVE_ITEM':
            return {
                task:[
                    ...state.task.slice(0,action.payload),
                    ...state.task.slice(action.payload + 1)
                ]
            }
        case 'CONSOLE_SAGA':
            return {
                ...state,
                text: 'SAGA'
            }

        case 'CONSOLE_ASYNC_SAGA':
            return {
                ...state,
                text: 'SAGA ASYNC'
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                task:[...state.task, {text: action.payload.title, hours:'01', minutes: '10'}]
            }
        case 'FETCH_ERROR' :
            return {
                ... state,
                error: true
            }
        default:
            return state
    }
}