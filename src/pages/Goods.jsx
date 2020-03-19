import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import BScroll from "better-scroll";
import {
    useDispatch,
    useSelector
} from "react-redux"
import ShopCart from "../components/ShopCart";
import '../style/goods.scss'
import CartControl from "../components/CartControl";
import Food from "../components/Food";
import {SHOW} from "../store/actionTypes";
const classNames =['decrease','discount','guarantee','invoice','special'];
function Goods() {
    const goods = useSelector(state =>state.data.goods);
    const [scroll,setScroll] =useState(0);
    const [height,setHeight] =useState([]);
    const [selectFood,setSelectFood] = useState(({}));
    const [foodScroll,setFoodScroll] =useState(null);
    const [menuScroll,setMenuScroll] =useState(null);
    const show = useSelector(state => state.shop.show);
    const dispatch = useDispatch();
    const menuRef =useRef();
    const foodRef = useRef();
    const index = useMemo(() => {
        for (let i=0;i<height.length;i++) {
            if (scroll<=height[i]) {
                let list =document.getElementsByClassName('menu-item');
                let el =list[i];
                menuScroll.scrollToElement(el,300,0,0);
                return i
            }
        }
    },[scroll,menuScroll,height]);
    useEffect(()=> {
        let foodScroll = new BScroll(foodRef.current,{
            probeType: 3,
            click:true
        });
        setMenuScroll(new BScroll(menuRef.current,{probeType: 3,click:true}));
        if (foodScroll) {
            setFoodScroll(foodScroll);
            foodScroll.on('scroll',pos=> {
                setScroll(Math.abs(Math.round(pos.y)))
            })
        }
        let el = document.getElementsByClassName('food-list');
        let sum = 0;
        let heights = [];
        for (let i=0;i<el.length;i++) {
             let item = el[i].clientHeight;
            sum += item;
            heights.push(sum);
            setHeight(heights)
        }
    },[]);
    function handleMenu(i) {
        let list = document.getElementsByClassName('food-list');
        let el =list[i];
            foodScroll.scrollToElement(el,300,0,5)
    }
    const handleClick = useCallback((item) =>{
        console.log(item)
        setSelectFood(item);
        dispatch({
            type:SHOW
        })

    },[dispatch]);
    return (
        <div className='goods'>
            <div className="menu-wrapper" ref={menuRef} >
                <ul>
                    {
                        goods.map((item,i) => {
                             const className =i===index ?'menu-item hover' :'menu-item';
                            return (
                                <li
                                    key={item.name}
                                    className={className} >
                                    <span className={'text border-1px'}
                                          onClick={handleMenu.bind(null,i,index)}
                                    >
                                        {
                                            item.type>0
                                                ?  <span className={`icon ${classNames[item.type]}`} />
                                                :null
                                        }
                                     {item.name}
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div  >
            <div className="foods-wrapper" ref={foodRef}>
                <ul>
                    {goods.map((item,index) => {
                        return (
                            <li key={index} className="food-list">
                                <h1 className='title'>{item.name}</h1>
                                <ul>
                                    {
                                        item.foods.map((food) =>{
                                            return (
                                                    <li key={food.name} className="food-item border-1px" >
                                                        <div className='icon' onClick={handleClick.bind(null,food)}>
                                                            <img src={food.icon} width="57" height="57" alt=""/>
                                                        </div>
                                                        <div className='content'>
                                                            <h2 className='name'>{food.name}</h2>
                                                            <p className='desc'>{food.description}</p>
                                                            <div className='extra'>
                                                                <span className='count'>月售{food.sellCount}份</span>
                                                                <span>好评率{food.rating}%</span>
                                                            </div>
                                                            <div className="price">
                                                                <span className="now">￥{food.price}</span>
                                                                {
                                                                    food.oldPrice ? <span className="old">￥{food.oldPrice}</span> :null
                                                                }
                                                            </div>
                                                            <div className="cartcontrol-wrapper">
                                                                <CartControl food={food}/>
                                                            </div>
                                                        </div>
                                                    </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </div>
            {
                show ?<Food selectFood={selectFood}/>:null
            }
            <ShopCart selectFoods={selectFood}/>
        </div>
    );
}
export default Goods;