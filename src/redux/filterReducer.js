const initialState = {
    currentFilter: 'all',
}

// редьюсер 1
export default function filterReducer(state = initialState, action) {
    switch (action.currentFilter) {
        case 'CHANGE_FILTER' :
            switch (action.payload) {
                case 'all' :
                    return {
                        currentFilter: 'all'
                    }
                case 'in work' :
                    return {
                        currentFilter: 'in work'
                    }
                case 'done' :
                    return {
                        currentFilter: 'done'
                    }
                default :
                    return {
                        currentFilter: 'all'
                    }
            }
        case 'ANOTHER_ACTION' :
        default:
            return state
    }

}