import * as types from "../actionType/actiontype";

const initialState ={
    servers : [],
    server : {},
    loading: true
};
const serverReducer = (state =initialState,action) => {
    switch(action.type){
        case types.GET_SERVERS:
            return {
                ...state,
                servers:action.payload,
                loading:false,
            }
        default:
            return state;
    } 
}
export default serverReducer;
