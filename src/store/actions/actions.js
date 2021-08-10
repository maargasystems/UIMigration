import axios from "axios";
import { dispatch } from "d3";
import * as types from "../actionType/actiontype";
export * from './settings.actions.js';
export * from './themes.actions.js';

const getServers = (servers) => ({
    type: types.GET_SERVERS,
    payload: servers,
})

export const loadservers = () => {
    return function (dispatch) {
        axios.get("http://localhost:3000/servers").then((resp) => {
            console.log("resp", resp)
            dispatch(getServers(resp.data))
        }).catch(error => console.log(error))
    };
};