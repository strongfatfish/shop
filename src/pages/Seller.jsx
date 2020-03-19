import React, {
    useEffect,
    useRef,
    useState
} from 'react'
import {useSelector} from "react-redux";
import './../style/seller.scss'
import Star from "../components/Star";
import Split from "../components/Split";
import BScroll from "better-scroll";

const classNames =['decrease','discount','guarantee','invoice','special'];
function Seller() {
    const seller = useSelector(state=>state.data.seller);
    const { name,score,ratingCount,sellCount,minPrice,deliveryPrice,deliveryTime,supports,bulletin,infos,pics } = seller;
    const [favorite,setFavorite] = useState('收藏');
    const scrollRef = useRef();
    const picListRef = useRef();
    function toggleFavorite() {
        if (favorite ==='收藏') {
            setFavorite('已收藏')
        }else {
            setFavorite('收藏')
        }
    }
    useEffect(() => {
        let scroll = new BScroll(scrollRef.current,{click:true});
        let picScroll = new BScroll(picListRef.current,{
            scrollX:true,
            eventPassthrough:"vertical"
        });
        let el = document.getElementsByClassName('pic-list')[0];
        let picwidth = 120;
        let margin= 6;
        if (pics) {
            let width = picwidth * pics.length - margin;
            el.style.width =width + "px";
        }
        return () => {
            scroll.destroy();
            picScroll.destroy()
        }
    },[pics]);
    return(
        <div className="seller" ref={scrollRef}>
            <div className="seller-content">
                <div className="overview">
                    <h1 className="title">{name}</h1>
                    <div className="desc">
                        <Star score={score} size={36} className='star'/>
                        <span className="text">({ratingCount})</span>
                        <span className="text">月售{sellCount}单</span>
                    </div>
                    <ul className="remark">
                        <li className="block">
                            <h2>起送价</h2>
                            <div className="content">
                                <span className="stress">{minPrice}</span>元
                            </div>
                        </li>
                        <li className="block">
                            <h2>商家配送</h2>
                            <div className="content">
                                <span className="stress">{deliveryPrice}</span>元
                            </div>
                        </li>
                        <li className="block">
                            <h2>平均配送时间</h2>
                            <div className="content">
                                <span className="stress">{deliveryTime}</span>分钟
                            </div>
                        </li>
                    </ul>
                    <div className="favorite" onClick={toggleFavorite}>
                        <span className={favorite==='收藏'? "icon-favorite" : "icon-favorite active"}/>
                        <span className="text">{favorite}</span>
                    </div>
                </div>
                <Split/>
                <div className="bulletin">
                    <h1 className="title">公告与活动</h1>
                    <div className="content-wrapper border-1px">
                        <p className="content">{bulletin}</p>
                    </div>
                    <ul className="supports">
                        {
                            supports ?
                                supports.map((item) => {
                                    return (
                                     <li className='support-item' key={item.type} >
                                        <span className={`icon ${classNames[item.type]}`} />
                                        <span className="text">{item.description}</span>
                                    </li>
                                )
                            })
                                    :null
                        }
                </ul>
            </div>
                <Split/>
                <div className="pics">
                    <h1 className="title">商家实景</h1>
                    <div
                        className="pic-wrapper"
                        ref={picListRef}
                        >
                        <ul className="pic-list">
                            {
                                pics ? pics.map((pic) => {
                                    return (
                                        <li className="pic-item" key={pic} >
                                            <img src={pic}
                                                 width="120"
                                                 height="90"
                                                 alt=""
                                            />
                                        </li>
                                    )
                                    })
                                :null
                            }
                        </ul>
                    </div>
                </div>
                <Split/>
                <div className="info">
                    <h1 className="title border-1px">商家信息</h1>
                    <ul>
                        {
                            infos ?
                                infos.map((info) => {
                                    return <li key={info} className="info-item">{info}</li>
                                 })
                                :null
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Seller