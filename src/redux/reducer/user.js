import * as ActionType from "./../constant/constant";

const initialState = {
    user: {},
    listUser: [],
    infoUser: {},
    isLoading: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.USER_LOGIN_REQUEST:
            state.isLoading = true;
            return {
                ...state
            };

        case ActionType.USER_LOGIN_SUCCESS:
            state.isLoading = false;
            state.user = action.payload;
            return {
                ...state
            };
        case ActionType.USER_LOGIN_FAILED:
            state.isLoading = false;

            return {
                ...state
            };
        case ActionType.SET_USER_LOGIN:
            state.user = action.payload;
            return {
                ...state
            };

        case ActionType.GET_LIST_USER:
            state.listUser = action.listUser;
            return {
                ...state
            };

        case ActionType.GET_INFO_USER:
            state.infoUser = action.payload;

            return {
                ...state
            };

        default:
            return {
                ...state
            };
    }
};

export default userReducer;