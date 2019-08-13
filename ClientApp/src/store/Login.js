const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
function loginUserRequest() {
    return{type: LOGIN_USER_REQUEST}
}

const LOGIN_USER_REQUEST_SUCCESS = 'LOGIN_USER_REQUEST_SUCCESS';
function loginUserRequestSuccess(data) {
    return{type: LOGIN_USER_REQUEST_SUCCESS, payload: data}
}

const LOGIN_USER_REQUEST_ERROR = 'LOGIN_USER_REQUEST_ERROR';
function loginUserRequestError(err) {
    return{type: LOGIN_USER_REQUEST_ERROR, payload: err}
}

export const actionCreators = {
    login: (data) => (dispatch) => {
        dispatch(loginUserRequest());
        apiClient.loginRequest(data)
            .then((resp) => dispatch(loginUserRequestSuccess(resp)))
            .catch((err) => dispatch(loginUserRequestError(err)));
    },
};

const apiClient = {
    loginRequest: async (data) => {
        return await fetch('api/account/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(async (response) => await response.json())
    },
};

const initialState = {
    serverAnswer: {
        token: null,
        expiration: null,
        userName: null,
        userRole: null,
        loginError: null,
        statusCode: {
            statusCode: null,
        },
    },
    /*serverAnswer: [],*/
    isLoading: false
};

export const reducer = (state, action) =>{
    state = state || initialState;
    if (action.type === LOGIN_USER_REQUEST){
        return{
            ...state, isLoading: true,
        }
    }
    if (action.type === LOGIN_USER_REQUEST_SUCCESS){
        
        return {
            ...state, serverAnswer: action.payload, isLoading: false,
        }
    } 
    return state;
};