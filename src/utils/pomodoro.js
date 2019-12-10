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


export const checkFormatTimer = (id, item) => {
    let second = item.s;
    let minutes = item.m;
    let hours = item.h;

    if (second < 60) {
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
    } else if (second >= 60) {
        minutes = minutes + 1;
        return {
            type: 'ADD_MINUTE',
            payload: {minutes, id},
        }
    } else if (minutes >= 60) {
        hours = hours + 1;
        return {
            type: 'ADD_HOUR',
            payload: {hours, id},
        }
    }

}


