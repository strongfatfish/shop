import React from 'react'
import { NavLink } from "react-router-dom";
import '../style/nav.scss'
function Nav() {
    return (
        <div className='nav'>
            <div className='nav-item'>
                <NavLink to='/goods'>商品</NavLink>
            </div>
            <div className='nav-item'>
                <NavLink to='ratings'>评论</NavLink>
            </div>
            <div className='nav-item'>
                <NavLink to='seller'>卖家</NavLink>
            </div>
        </div>
    )
}

export default Nav