export const getPomodoroTime = (start, end) => {
    // console.log('start', start);
    // console.log('end', end);
    // 800 1000
    // конец работы: 825, 855, 925, 955
    // конец отдыха 830, 900, 930, 1000
    let i = 0;
    let arr = [];
    arr[0] = start;
    while (true) {
        let point = arr[i] + 30;
        if (point > end) {
            break;
        } else {
            i++;
            arr.push(point);
        }
    }
    console.log('arr1', arr);
    return arr;
};


export const getPomodoroRest = (array) => {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
        arr[i] = array[i] - 5;
    }
    console.log('arr2', arr);
    return arr;
};

export const playPomodoroTimer = (index, id) => {

    localStorage.setItem('play', id);
    return {
        type: 'PLAY_ITEM',
        payload: {index, id}
    }
};


export const checkFormatTimer = (id, item, arr1, arr2) => {
    let second = item.s;
    let minutes = item.m;
    let hours = item.h;

    let timerCheckpointStartRest = arr1.splice(0, 1);
    let timerCheckpointEndRest = arr2;

    if (second < 60) {
        second = second + 1;
        return {
            type: 'ADD_SECOND',
            payload: {second, id},
        }
    } // добавление секунды в item

    /*if (second < 60) {
        second = second + 1;
        if (second%7 === 0) {
            return {
                type: 'ADD_SECOND_START_REST',
                payload: {second, id}
            }
        } else if (second%10 === 0) {
            return {
                type: 'ADD_SECOND_END_REST',
                payload: {second, id}
            }
        }

        else {
            return {
                type: 'ADD_SECOND',
                payload: {second, id},
            }
        }
   }*/else if (second >= 60) {
        minutes = minutes + 1;
        if (minutes === timerCheckpointStartRest[0]) {
            timerCheckpointStartRest.splice(0, 1);
            if (timerCheckpointStartRest.length === 0) {
                return {
                    type: 'ADD_EXTRA_MINUTE',
                    payload: {minutes, id}
                } // добавили штрафную минуту если массив пустой
            } else {
                return {
                    type: 'ADD_MINUTE_START_REST',
                    payload: {minutes, id},
                } // добавили обычную минуту если массив не пустой
            }
        }

        else if (minutes === timerCheckpointEndRest[0]) {
            timerCheckpointEndRest.splice(0, 1);
            if (timerCheckpointEndRest.length !== 0) {
                return {
                    type: 'ADD_MINUTE_END_REST',
                    payload: {minutes, id}
                }
            } // добавление конца отдыха только когда есть значения в массиве
        }

        else {
            return {
                type: 'ADD_MINUTE',
                payload: {minutes, id},
            } // добавили обычную минуту если текущее значение минут не совпадает ни с стартом, ни с концом отдыха
        }

    } else if (minutes >= 60) {
        hours = hours + 1;
        return {
            type: 'ADD_HOUR',
            payload: {hours, id},
        } // добавили час
    }

}


