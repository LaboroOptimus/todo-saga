import {store} from "../redux/store";

export const previewFile = (file) => {

  /*  reader.addEventListener('load',()=>{
        reader.readAsArrayBuffer(file)
    })*/

    //reader.readAsArrayBuffer(file);

    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
            /*resolve(readFile(reader.result));*/
            resolve(store.dispatch({type:'CHANGE_FILE', payload: reader.result}))
        };

        reader.readAsDataURL(file);
        reader.onerror = reject;
    })


};

export function readFile(a) {
    console.log('read file', a);
    return {
        type: 'CHANGE_FILE',
        payload: a
    }
}
