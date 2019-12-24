import firebase from "../firebase";

const initialState = {
    imgLoad: false,
};


export default function filterReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPLOAD_IMAGE':
            var img = document.getElementById('img');
            console.log(img);
            var storageRef = firebase.storage().ref();
            var mountainImagesRef = storageRef.child('images/mountains.jpg');

            console.log(storageRef)



            console.log('upload_reducer')
            return {
                ...state,
                imgLoad: true
            };
        default:
            return {
                ...state
            }
    }
}