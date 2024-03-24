import { createStore } from 'redux';

const initialState = {
    userData: null,
};

export const userReducer = (state = initialState, action) => {
    console.log('Reducer invoked:', action.type);
    console.log('Reducer invoked:', action.payload);
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                userData: action.payload,
            };
        default:
            return state;
    }
};

export const  store = createStore(userReducer);

