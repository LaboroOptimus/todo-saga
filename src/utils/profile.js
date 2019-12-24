import {store} from "../redux/store";
import firebase from "../firebase";

let user;

if (localStorage.getItem('user') === null) {
    user = ''
} else {
    user = localStorage.getItem('user').replace(/\./gi, '');
}

export const previewFile = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(store.dispatch({type:'CHANGE_FILE', payload: reader.result}))
        };
        reader.readAsDataURL(file);
        reader.onerror = reject;
    })
};

export const checkIfUserExists = (userId) => {
    let usersRef = firebase.database().ref(`users/${user}`);
    usersRef.child(userId).once('value', function(snapshot) {
        let exists = (snapshot.val() !== null);
        console.log('exists', exists)
    });
}

/*
export function readFile(a) {
    return {
        type: 'CHANGE_FILE',
        payload: a
    }
}
*/
