import { SET_USER_DATA } from './userActionTypes';

export const setUserData = (userData) => ({
    type: SET_USER_DATA,
    payload: userData,
});