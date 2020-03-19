import {
    ADD,
    EMPTY,
    REMOVE,
    SHOW
} from "./actionTypes";

const initState = {
    show:false,
    food:[]
};
export default (state=initState,action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case ADD :
            let add;
            let exist = newState.food.some((item,i) =>{
                add =i;
                return item.name ===action.foods.name
            });
            if (!exist) {
                newState.food.push({name:action.foods.name,price:action.foods.price,count:1})
            } else {
                newState.food[add].count ++
            }
            return newState;
        case REMOVE :
            newState.food.forEach((item,index) => {
                if (item.name ===action.foods.name) {
                    item.count --
                }
                if (item.count === 0) {
                    newState.food.splice(index,1)
                }
            });
            return newState;
        case SHOW :
            newState.show = !newState.show;
            return newState;
        case EMPTY :
            newState.food =[];
            return newState;
        default :
            return state
    }
}