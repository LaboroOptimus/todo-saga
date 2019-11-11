import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDiN-OlAl1qO8Rp0sOk4fNAHTguPAnVrZU",
    authDomain: "todo-saga-987da.firebaseapp.com",
    databaseURL: "https://todo-saga-987da.firebaseio.com",
    projectId: "todo-saga-987da",
    storageBucket: "todo-saga-987da.appspot.com",
    messagingSenderId: "105199191218",
    appId: "1:105199191218:web:589a3404ffa88f8126b5ab"
};
firebase.initializeApp(config);

export default firebase;