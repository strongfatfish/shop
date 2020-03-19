import {
    LOADING,
    REQUEST_DATA
} from "./actionTypes";

const initData = {
    loading:false,
    seller:{},
    goods:[],
    ratings:[]
};

export default (state=initData,action) => {
    switch (action.type) {
        case LOADING :
            return Object.assign(state,{loading: true});
        case REQUEST_DATA :
            return Object.assign(state,{...action.res,loading:false});
        default :
            return state
    }
}