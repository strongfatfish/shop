import React from "react";
import './../style/line.scss'
function Line({ title }) {
    return (
        <div className="line-title">
            <div className="line"/>
            <div className="text">{title}</div>
            <div className="line"/>
        </div>
    )
}
export default Line