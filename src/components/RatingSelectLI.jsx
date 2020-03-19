import React, {useMemo} from 'react';
import {formatDate} from "../common/date";
import '../style/rating-li.scss'
const ALL = 2;
function RatingSelectLI({item,onlyContent,selectType}) {
    const show =useMemo(()=>{
        if (onlyContent && !item.text) {
            return false;
        }
        if (selectType === ALL) {
            return true;
        } else {
            return item.rateType === selectType;
        }
    },[item.rateType, item.text, onlyContent, selectType]);
    const time = useMemo(() =>{
        let date = new Date(item.rateTime);
        return  formatDate(date,'yyyy-MM-dd hh:mm')
    },[item.rateTime]);
    return (
        <>
            {
                show ?
                    <li className="rating-item border-1px">
                        <div className="user">
                            <span className="name">{item.username}</span>
                            <img
                                className="avatar"
                                width="12"
                                height="12"
                                src={item.avatar}
                                alt=''
                            />
                        </div>
                        <div className="time">{time}</div>
                        <p className="text">
                            <span className={item.rateType===0 ?'icon-up':'icon-down'}/>
                            {item.text}
                        </p>
                    </li>
                    :null
            }
        </>
    )
}
export default RatingSelectLI