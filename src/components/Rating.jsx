import React, {
    useCallback,
    useMemo
} from 'react';
import Star from "./Star";
import { formatDate } from './../common/date'
const ALL = 2;
const Rating = ({rating,onlyContent,selectType}) => {
    const show =useMemo(()=>{
        if (onlyContent && !rating.text) {
            return false;
        }
        if (selectType === ALL) {
            return true;
        } else {
            return rating.rateType === selectType;
        }
    },[rating.rateType, rating.text, onlyContent, selectType]);
    const date = useCallback((time) =>{
        let date = new Date(time);
        return  formatDate(date,'yyyy-MM-dd hh:mm')},[]);
    return (
        <>
            {
                show ?
                    <li className="ratings-item border-1px">
                        <div className="avatar">
                            <img
                                src={rating.avatar}
                                width={28}
                                alt=""
                            />
                        </div>
                        <div className="content">
                            <h1 className="name">{rating.name}</h1>
                            <div className="star-wrapper">
                                <Star
                                    size={24}
                                    score={rating.score}
                                />
                                {
                                    rating.deliveryTime ?
                                                            <span className="delivery">
                                                                {rating.deliveryTime}
                                                            </span>
                                                        :null
                                }
                            </div>
                            <p className="text">{rating.text}</p>
                            {
                                rating.recommend.length ?
                                                            <div className="recommend">
                                                                <span className="icon-up"/>
                                                                 {
                                                                     rating.recommend.map((item) =>{
                                                                        return <span key={item} className="item">{item}</span>
                                                                     })
                                                                 }
                                                            </div>
                                                        :null
                            }
                            <div className="time">{date(rating.rateTime)}</div>
                        </div>
                    </li>
                    : null
            }
        </>
    );
};

export default Rating;