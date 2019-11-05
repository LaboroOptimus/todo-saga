const initialState = {
    currentFilter: 'all',
}

export default function filterReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_FILTER' :
            switch (action.payload) {
                case 'all' :
                    return {
                        currentFilter: action.payload
                    }
                case 'in work' :
                    return {
                        currentFilter: action.payload
                    }
                case 'done' :
                    return {
                        currentFilter: action.payload
                    };
                default :
                    return {
                        currentFilter: 'all'
                    }
            }

        case 'FILTER_TASKS' :
            switch (state.currentFilter) {
                case 'all':
                    return {
                        state// возвращаем все таски
                    };

                case 'in work':
                    const isInWork = (item) => {
                        if (item.complete) {
                            return false;
                        } else if (item.pause) {
                            return true;
                        } else {
                            return true;
                        }
                    };

                    /* let taskInWork = state.task.filter(isInWork);*/
                    return {
                        state // возвращаем только те, которые в работе, taskInWork
                    };
                case 'done':
                    return {
                        state // возвращаем завершенные
                    };
                default :
                    return {
                        state // дефолт
                    };
            }

        default:
            return state
    }

}