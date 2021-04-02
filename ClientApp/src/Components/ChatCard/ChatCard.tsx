import React from 'react'
import './ChatCard.css'
import ProfileImage from '../../Resources/Images/depositphotos_121233300-stock-illustration-female-default-avatar-gray-profile.jpg'
export const ChatCard = () => {
    return (
        <div className="chatCard">
            <div className="Photo">
                <img src={ProfileImage} className="ProfileImage" alt=""/>
            </div>
            <div>
                <div className="name">Jane doe</div>
                <div className="LastMessage"><p className="MessagePreview">Some Template text ✔✔ </p></div>
            </div>
        </div>
    )
}
