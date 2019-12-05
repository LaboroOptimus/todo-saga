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

export const playPomodoroTimer = (index,id) => {

    localStorage.setItem('play', id);
    return {
        type: 'PLAY_ITEM',
        payload: {index, id}
    }
};



