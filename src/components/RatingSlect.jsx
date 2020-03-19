import React, {useMemo} from "react";
import PropTypes from 'prop-types'
import './../style/rating-select.scss'
const POSITIVE =0;
const NEGATIVE =1;
const ALL = 2;
function RatingSelect({ ratings,selectType,onlyContent,desc,changeType,toggle }) {
    const count = useMemo(()=>{
        let positive=[];
        let negative=[]
        for(let i = 0; i < ratings.length; i++){
            if (ratings[i].rateType === POSITIVE) {
                positive.push(ratings[i]);
            }else {
                negative.push(ratings[i]);
            }
        }
        return { positive,negative }
    },[ratings]);
    const change =(type) =>{
        changeType(type)
    };
    const toggleContent =() => {
        toggle()
    };
    return (
        <div className='rating-select'>
            <div className="rating-type">
                <span
                    onClick={change.bind(null,ALL)}
                    className={selectType =ALL ?'block positive active count':'block positive'}
                >
                    {desc.all}
                    <span
                        className="count">
                        {ratings.length}
                    </span>
                </span>
                <span
                    onClick={change.bind(null,POSITIVE)}
                    className={selectType =POSITIVE ?'block positive active count':'block positive'}
                >
                    {desc.positive}
                    <span
                        className="count">
                        {count.positive.length}
                    </span>
                </span>
                <span
                    onClick={change.bind(null,NEGATIVE)}
                    className={selectType =NEGATIVE ?'block negative active count':'block positive'}
                >
                    {desc.negative}
                    <span
                        className="count">
                        {count.negative.length}
                    </span>
                </span>
            </div>
            <div className={onlyContent?'switch on':'switch'}>
                <span className='icon-check' onClick={toggleContent} />
                <span className="text">只看有内容的评价</span>
            </div>
        </div>
    )
}
RatingSelect.prototype ={
    ratings: PropTypes.array.isRequired,
    selectType:PropTypes.number.isRequired,
    onlyContent:PropTypes.bool.isRequired,
    desc:PropTypes.object.isRequired
};
RatingSelect.default = {
    ratings:[],
    selectType:2,
    desc:{
        all:"全部",
        positive:"满意",
        negative:"不满意"

    }
};
export default RatingSelect