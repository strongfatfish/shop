import React, {
    useEffect,
    useRef,
    useState
} from 'react'
import './../style/rating.scss'
import {useSelector} from "react-redux";
import Star from "../components/Star";
import RatingSelect from "../components/RatingSlect";
import BScroll from "better-scroll";
import Rating from "../components/Rating";
const ALL = 2;
function Ratings() {
    const seller = useSelector(state=>state.data.seller);
    const ratings =useSelector(state =>state.data.ratings);
    const [selectType,setSelectType] =useState(ALL);
    const [onlyContent,setOnlyContent] =useState([true]);
    const scrollRef = useRef();
    const desc = {
        all:"全部",
        positive:"满意",
        negative:"不满意"
    };
    useEffect(() =>{
        let scroll = new BScroll(scrollRef.current,{
            click:true
        });
        return () => {
            scroll.destroy()
        }
    });
    function changType(type) {
        setSelectType(type)
    }
    function toggle() {
        setOnlyContent(c => !c)
    }
    const { foodScore,rankRate,serviceScore,deliveryTime } = seller;
    return(
        <div className="ratings" ref={scrollRef}>
            <div className="rating-content">
                <div className="overview">
                    <div className="overview-left">
                        <h1 className="score">{foodScore}</h1>
                        <div className="title">综合评分</div>
                        <div className="rank">高于周边商家{rankRate}%</div>
                    </div>
                    <div className="overview-right">
                        <div className="score-wrapper">
                            <span className="title">服务态度</span>
                            <Star score={serviceScore} size={36}/>
                            <span className="score">{serviceScore}</span>
                        </div>
                        <div className="score-wrapper">
                            <span className="title">服务态度</span>
                            <Star
                                score={foodScore}
                                size={36}
                                className='star'
                            />
                            <span className="score">{foodScore}</span>
                        </div>
                        <div className="delivery-wrapper">
                            <span className="title">送达时间</span>
                            <span className="delivery-time">{deliveryTime}分钟</span>
                        </div>
                    </div>
                </div>
                <RatingSelect
                    selectType={selectType}
                    toggle={toggle}
                    changeType={changType}
                    ratings={ratings}
                    desc={desc}
                    onlyContent={onlyContent}
                />
                <div className="rating-wrapper">
                    <ul>
                        {
                            ratings.map((rating,index) =>{
                                return (
                                    <Rating rating={rating} key={index} onlyContent={onlyContent} selectType={selectType} />
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Ratings