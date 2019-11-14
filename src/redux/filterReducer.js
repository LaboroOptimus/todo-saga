const initialState = {
    currentFilter: '',
};


export default function filterReducer(state = initialState, action) {
    console.log(state);
    switch (action.type) {
        case 'CHANGE_FILTER' :
            switch (action.payload) {
                case 'in work' :
                    return {
                        currentFilter: action.payload,
                    };
                case 'done' :
                    return {
                        currentFilter: action.payload
                    };
                case 'pause':
                    return {
                        currentFilter: action.payload
                    };
                default :
                    return {
                        currentFilter: 'all'
                    }
            }
        default:
            return state
    }
}

