const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";

function registerUserRequest() {
    return {type: REGISTER_USER_REQUEST};
}

const REGISTER_USER_REQUEST_SUCCESS = "REGISTER_USER_REQUEST_SUCCESS";

function registerUserRequestSucceed(data) {
    return {type: REGISTER_USER_REQUEST_SUCCESS, payload: data};
}

const REGISTER_USER_REQUEST_ERROR = "REGISTER_USER_REQUEST_ERROR";

function registerUserRequestError(err) {
    return {type: REGISTER_USER_REQUEST_ERROR, payload: err};
}

export const actionCreators = {
    register: (userData) => (dispatch) => {
        dispatch(registerUserRequest());
        apiClient.registerRequest(userData)
            .then((resp) => (dispatch(registerUserRequestSucceed(resp))))
            .catch((err) => registerUserRequestError(err))
    }
}

const apiClient = {
    registerRequest: async (data) => {
        return await fetch('api/account/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(async (response) => await response.json())
    }
}

const initialState = {
    serverAnswer: [],
    isLoading: false
};

export const reducer = (state, action) => {
    state = state || initialState;
    if (action.type === REGISTER_USER_REQUEST) {
        return {
            ...state, isLoading: true,
        }
    }
    if (action.type === REGISTER_USER_REQUEST_SUCCESS) {
        return {
            ...state, serverAnswer: action.payload, isLoading: false,
        }
    }
    return state;
};