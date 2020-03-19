import React, {
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'
import './../style/shop-cart.scss'
import {
    useDispatch,
    useSelector
} from "react-redux";
import CartControl from "./CartControl";
import BScroll from "better-scroll";
import {EMPTY} from "../store/actionTypes";
function ShopCart() {
    const seller = useSelector(state => state.data.seller);
    const food = useSelector(state =>state.shop.food);
    const dispatch = useDispatch();
    const [show,setShow] = useState(false);
    const  { deliveryPrice,minPrice } = seller;
    const scrollRef = useRef();
    useEffect(() => {
        let scroll;
        if (scrollRef.current) {
             scroll = new BScroll(scrollRef.current,{
                 click:true
             })
        }
        return () => {
            if (scroll) {
                scroll.destroy()
            }
        }
    });
    const foodPrice = useMemo(() => {
        let payDesc;
        let count =0;
        let pay =0;
        food.forEach((item) =>{
            count +=Number(item.count);
            pay += Number(item.price * item.count);

        });
        if (pay ===0) {
            payDesc = `${minPrice} 元起送`
        } else if (pay <minPrice ) {
            let diff = minPrice -pay;
            payDesc = `还差${diff}元起送`
        }else {
            payDesc = `去结算`
        }
        return { pay,payDesc,count}
    },[food, minPrice]);
    const hide =() => {
            setShow(!show)
    };
    const pay =() => {
      if (foodPrice.pay < minPrice) {
          window.alert("您的商品价格低于起送价")
      }else {
          window.alert("您已支付成功，谢谢惠顾");
          dispatch({
              type:EMPTY
          });
          setShow(true)
      }
    };
    const empty = () =>{
       dispatch({
            type:EMPTY
        });
        setShow(false)
    };
    return (
        <div className='shop-cart'>
            <div className="content" onClick={hide} >
                <div className="content-left">
                    <div className="logo-wrapper">
                        <div className={food.length>0?'logo highlight':'logo'} >
                            <span className={food.length>0?'icon-cart highlight':'icon-cart'}/>
                        </div>
                        <div
                            className="num"
                            style={food.length>0?null:{display:'none'}}>{foodPrice.count}</div>
                    </div>
                    <div className={foodPrice.pay >0 ?'price highlight':'price'}>{foodPrice.pay}元</div>
                    <div className="desc">另需配送费¥ {deliveryPrice}元</div>
                </div>
                <div className="content-right">
                    <div className={foodPrice.pay >=minPrice ?'pay enough':'pay not-enough'} onClick={pay}>{foodPrice.payDesc}</div>
                </div>
            </div>
            {
                show ?
                    <>

                        <div className="shop-cart-list" >
                            <div className="list-header">
                                <h1 className="title">购物车</h1>
                                <span
                                    className="empty"
                                    onClick={empty}
                                >
                                清空
                            </span>
                            </div>
                            <div className="list-content" ref={scrollRef}>
                                <div>
                                    <ul>
                                        {
                                            food.length >0?food.map((food) => {
                                                return (
                                                    <li className="food">
                                                        <span className="name">{food.name}</span>
                                                        <div className="price">
                                                            <span>￥{food.price * food.count}</span>
                                                        </div>
                                                        <div className="cartcontrol-wrapper">
                                                            <CartControl food={food}/>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                                :<div className="cart-text">
                                                    <p className="text">您的购物车比您的钱包还空</p>
                                                </div>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="list-mask" onClick={hide}/>
                    </>
                    :null
            }
        </div>
    )
}
export default ShopCart;