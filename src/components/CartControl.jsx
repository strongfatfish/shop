import React, {
    useCallback,
    useMemo
} from "react";
import {
    useDispatch,
    useSelector
} from 'react-redux'
import './../style/cartcontrol.scss'
import {
    ADD,
    REMOVE
} from "../store/actionTypes";
function CartControl({food}) {
    const dispatch = useDispatch();
    const foodName = useSelector(state => state.shop.food);
    const count = useMemo(() =>{
        let c;
        foodName.forEach((item) =>{
            if (item.name ===food.name) {
                c = item.count
            }
        });
        return c
    },[foodName,food]);
    const addFood = useCallback((food) =>{
        let foods ={};
        foods.price = food.price;
        foods.name = food.name;
        return dispatch({
            type:ADD,
            foods
        })
    },[dispatch]);
    const removeFood =useCallback((food) =>{
        let foods ={};
        foods.price = food.price;
        foods.name = food.name;
        return dispatch({
            type:REMOVE,
            foods
        })
    },[dispatch]);
    return <div
        className="control">
        {
            count >=1
                ?
                <>
                    <div className="decease"
                         onClick={removeFood.bind(null,food)}>
                        <div className=" icon-remove"/>
                    </div>
                    <div className="count">{count}</div>
                </>
                : null
        }
        <div className='add'
             onClick={addFood.bind(null,food)}>
            <div className=" icon-add" />
        </div>
    </div>
}
export default React.memo(CartControl)