const initialState = {
    text:'',
    hours:'',
    minutes:'',
    /*id:0,*/
    task:[],
    error: false,
    validate: false,
    testCounter: 0
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
            switch (state.error) {
                case false :
                    return {
                        task: [...state.task, {text: state.text, hours: state.hours, minutes: state.minutes}],
                        text: '',
                        hours: '',
                        minutes: '',
                        validate: false,
                        testCounter: state.testCounter + 1
                    }
                case true :
                    return {
                        ...state,
                    }
                default : return state
            }


        case 'REMOVE_ITEM':
            return {
                task:[
                    ...state.task.slice(0,action.payload),
                    ...state.task.slice(action.payload + 1)
                ]
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
        case 'VALIDATE' :
            switch (state.text) {
                case '' :
                    return {
                        ...state,
                        error: true,
                        validate: true,
                    }
                case '1' :
                    return {
                        ...state,
                        error: true,
                        validate: true,
                    }
                default:
                    return {
                        ...state,
                        error: false,
                        validate: true,
                    }
            }

        default:
            return state
    }
}