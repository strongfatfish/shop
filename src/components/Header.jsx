import React, { useState,useMemo } from "react";
import '../style/header.scss'
import Star from "./Star";
import Line from "./Line";
import {useSelector} from "react-redux";
const classNames =['decrease','discount','guarantee','invoice','special'];
function Header() {
    const seller = useSelector(state=>state.data.seller);
    const { avatar,name,description,deliveryTime,supports,bulletin,score } =seller;
    const [iconImg,setIconImg] =useState('icon');
    const [show,setShow] =useState(false);
    useMemo(() => {
        if (supports) {
            for (let i =0;i<classNames.length;i++) {
                if (i ===supports[0].type) {
                    let cln = `icon ${classNames[i]}`;
                    setIconImg(cln)
                }
            }
        }

    },[supports]);
    const showDetail = () => {
        setShow(true)
    };
    const hideDetail = () => {
        setShow(false)
    };
    return (
        <div className='header'>
            <div className="content-wrapper">
                <div className="avatar">
                    <img
                        width='64'
                        height='64'
                        src={avatar}
                        alt="头像"/>
                </div>
                <div className="content">
                    <div className="title">
                        <span className='brand'/>
                        <span className='name'>{ name }</span>
                    </div>
                    <div className='description'>
                        {description}/{deliveryTime}分钟送达
                    </div>
                    <div className="support">
                        <span className={iconImg}/>
                        <span className="text">
                            { supports ?
                                        supports[0].description
                                       :null
                            }
                        </span>
                    </div>
                </div>
                <div className="support-count" onClick={showDetail}>
                    <span className="count">
                        { supports ?
                                    supports.length+'个'
                                   :'...'}
                    </span>
                    <span className="icon-right"/>
                </div>
            </div>
            <div className="bulletin-wrapper" onClick={showDetail}>
                <span className="bulletin-title"/>
                <span className="bulletin-text"
                      style={{marginLeft:'4px'}}
                >
                    {bulletin}
                </span>
                <div className={'bulletin-icon'}>
                    <span className="icon-right" />
                </div>
            </div>
            <div className="background">
                <img
                    src={avatar}
                    alt=""
                    width='100%'
                    height="100%"/>
            </div>
            {
                show?
                    <div className="detail">
                        <div className="detail-wrapper clearfix">
                            <div className="detail-main">
                                <h1 className='name'>{name}</h1>
                                <div className="star-wrapper">
                                    <Star
                                        size={48}
                                        score={score}
                                    />
                                </div>
                                <Line title={'优惠信息'}/>
                                {
                                    supports ?
                                        <ul className='supports'>
                                            {supports.map((item) => {
                                                return <li className='support-item' key={item.type} >
                                                            <span className={`icon ${classNames[item.type]}`} />
                                                            <span className="text">{item.description}</span>
                                                       </li>
                                            })}
                                        </ul>
                                            :null
                                }
                                <Line title={'商家公告'}/>
                                <div className="bulletin">
                                    <p className="content">{bulletin}</p>
                                </div>
                            </div>
                        </div>
                        <div className="detail-close">
                            <span className='icon-close' onClick={hideDetail}/>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}
export default Header