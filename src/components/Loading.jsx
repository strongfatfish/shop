import React from "react";
import "./../style/loading.scss"

function Loading() {
    return (
        <div className="loading">
            <div className="loading-transition">
                <p className="text">Loading...</p>
            </div>
        </div>
    )
}
export default Loading;