const initialState = {
    editName: false,
    editEmail: false,
    isEmailChanged: false,
    isNameChanged: false,
    isNameShow: false,
    isEmailShow: false,
    name: '',
    email: '',
    fileSrc: '',
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_USER_DATA_SUCCESS':
            let image = action.payload[Object.keys(action.payload)[0]].image;
            let name = action.payload[Object.keys(action.payload)[0]].name;
            let email = action.payload[Object.keys(action.payload)[0]].email;

            console.log('LOAD_USER_DATA_SUCCESS', action.payload);
            return {
                ...state,
                fileSrc: image,
                name: name,
                email: email,
                isNameShow: true,
                isEmailShow: true
            };
        case 'UPLOAD_DATA_IMAGE':
            console.log('upload data image')
            return {
                ...state
            };
        case 'CHANGE_FILE':
            console.log('CHANGE_FILE');
            return {
                ...state,
                fileSrc: action.payload
            };
        case 'EDIT_NAME':
            return {
                ...state,
                editName: true
            };
        case 'EDIT_EMAIL':
            return {
                ...state,
                editEmail: true
            };
        case 'CHECK_EMAIL':
            return {
                ...state,
                editEmail: false,
                isEmailShow: true,
            };

        case 'CHECK_NAME':
            return {
                ...state,
                editName: false,
                isNameShow: true,
            };

        case 'CHANGE_EMAIL':
            return {
                ...state,
                isEmailChanged: true,
                email: action.payload
            };

        case 'CHANGE_NAME':
            return {
                ...state,
                isNameChanged: true,
                name: action.payload
            };

        default:
            return {
                ...state
            }
    }
}