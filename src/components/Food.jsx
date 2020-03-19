import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'
import '../style/food.scss'
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    ADD,
    SHOW
} from "../store/actionTypes";
import BScroll from "better-scroll";
import CartControl from "../components/CartControl";
import Split from "../components/Split";
import RatingSelect from "../components/RatingSlect";
import RatingSelectLI from "../components/RatingSelectLI";
// const POSITIVE =0;
// const NEGATIVE =1;
const ALL = 2;
function Food({selectFood}) {
    const onRef = useRef();
    const { image,name,sellCount,rating,price,oldPrice,info,ratings } = selectFood;
    const dispatch = useDispatch();
    const foodName = useSelector(state => state.shop.food);
    const [selectType,setSelectType] =useState(ALL);
    const [onlyContent,setOnlyContent] =useState(false);
    const desc = {
        all:"全部",
        positive:"满意",
        negative:"不满意"
    };
    const back = useCallback( back=> {
        dispatch({
            type:SHOW
        })
    },[dispatch]);
    useEffect(() =>{
        let scroll = new BScroll(onRef.current,{
            click:true
        });
        return () => {
            scroll.destroy()
        }
    },[]);
    const count = useMemo(() =>{
        let c;
        foodName.forEach((item) =>{
            if (item.name ===selectFood.name) {
                c = item.count
            }
        });
        return c
    },[foodName,selectFood]);
    function add() {
        let foods ={};
        setSelectType(ALL);
        foods.price = selectFood.price;
        foods.name = selectFood.name;
        return dispatch({
            type:ADD,
            foods
        })
    }
    function changType(type) {
        setSelectType(type)
    }
    function toggle() {
        setOnlyContent(c=>!c)
    }
    return (
        <div className='food' ref={onRef}>
            <div>
                <div className="img-header">
                    <div className='food-content'>
                        <img
                            src={image}
                            alt=""/>
                    </div>
                    <div className='back' onClick={back}>
                        <i className='icon-left'/>
                    </div>
                </div>
                <div className="content">
                    <h1 className="title">{name}</h1>
                    <div className="detail">
                        <div className="sell-count">月售{sellCount}</div>
                        <div className="rating">好评率{rating}%</div>
                    </div>
                    <div className="price">
                        <span className="now">￥{price}</span>
                        {
                            oldPrice ? <span className="old">￥{oldPrice}</span> :null
                        }
                    </div>
                    {
                        count>0?<div className="cart-control-wrapper">
                                <CartControl food={selectFood}/>
                            </div>
                            :null
                    }
                    {
                        !count ? <div className="buy" onClick={add}>加入购物车</div> :null
                    }
                </div>
                {
                    info ?<Split/>:null
                }
                {
                    info ? <div className="info">
                            <h1 className='title'>商品信息</h1>
                            <p className='text'>{info}</p>
                        </div>
                        :null
                }
                <Split/>
                <div className="rating">
                    <h1 className="title">商品评价</h1>
                    <RatingSelect
                        selectType={selectType}
                        toggle={toggle}
                        changeType={changType}
                        ratings={ratings}
                        desc={desc}
                        onlyContent={onlyContent}/>
                </div>
                <div className="rating-wrapper">
                    {
                        ratings&&ratings.length?
                            <ul>
                                {
                                    ratings.map((item) =>{
                                        return (
                                            <RatingSelectLI
                                                key={item.username}
                                                item={item}
                                                onlyContent={onlyContent}
                                                selectType={selectType}/>
                                        )
                                    })
                                }
                            </ul>
                               :null
                    }
                    {
                    !ratings || !ratings.length ? <div className="no-rating">暂无评价</div> :null
                    }
                </div>
            </div>
        </div>
    )
}

export default Food;