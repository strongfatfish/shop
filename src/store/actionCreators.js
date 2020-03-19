import {
    REQUEST_DATA,
    LOADING,
    ADD,
    SHOW,
    EMPTY
} from './actionTypes'

export const resData = url => (dispatch) =>{
    dispatch ({
        type:LOADING
    });
    return setTimeout(() =>{
        fetch(url).then((res) => res.json()).then(res =>{
            dispatch({
                type:REQUEST_DATA,
                res:res.data
            })
        })
    },1000)
};
export const add = food => dispatch => {
    return dispatch({
        type:ADD,
        food
    })
};
export const show =() =>(dispatch)=> {
    return dispatch({
        type:SHOW
    })
};
export const empty =() =>dispatch => {
    return dispatch ({
        type:EMPTY
    })
};