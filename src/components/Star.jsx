import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import '../style/star.scss'


function Star({ size,score }) {
    const [classNames,setClassNames] = useState([]);
    useEffect(() => {
        const LENGTH = 5;
        const CLS_ON = 'on';
        const CLS_HALF = 'half';
        const CLS_OFF = 'off';
        let result = [];
        let scores = Math.floor(score*2) /2;
        let has = scores % 1 !== 0;
        let ini = Math.floor(scores);
        for (let i=0;i<ini;i++) {
            result.push(CLS_ON)
        }
        if (has) {
            result.push(CLS_HALF)
        }
        while(result.length <LENGTH) {
            result.push(CLS_OFF)
        }
        setClassNames(() =>result)
    },[score]);

    return (
        <div className={`star star-${size}`}>
            {
              classNames.map((star,i) =>{
                  return <span key={i} className={`star-item ${star}`}/>
              })
            }
        </div>
    )
}
Star.prototype = {
    size:PropTypes.number.isRequired,
    score:PropTypes.number.isRequired
};

export default Star