const initialState = {
    editName: false,
    editEmail: false,
    isEmailChanged: false,
    isNameChanged: false,
    isNameFalse: false,
    isEmailShow: false,
    name: '',
    email: '',
    fileSrc: 'https://via.placeholder.com/200',
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_FILE':
            console.log('change_file')
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