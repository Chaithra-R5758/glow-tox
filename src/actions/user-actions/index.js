import {
    USER_DATA
} from "../types";

export const setUserDetails = (data) => async (dispatch) => {
    dispatch({
        type: USER_DATA,
        payload: data,
    });
};