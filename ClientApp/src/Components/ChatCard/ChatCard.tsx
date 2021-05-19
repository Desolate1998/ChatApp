import React from 'react'
import './ChatCard.css'
import ProfileImage from '../../Resources/Images/depositphotos_121233300-stock-illustration-female-default-avatar-gray-profile.jpg'

interface IProps{
    displayName:string;
    lastMessage?:string;
    displayePicture?:string;
    chatId:number;
    setActiveChatDisplay:Function;

}

export const ChatCard:React.FC<IProps> = ({displayName,lastMessage,setActiveChatDisplay,chatId}) => {
    return (
        <div className="chatCard" onClick={()=>{setActiveChatDisplay(chatId)}}>
            <div className="Photo">
                <img src={ProfileImage} className="ProfileImage" alt=""/>
            </div>
            <div>
                <div className="name">{displayName}</div>
                <div className="LastMessage"><p className="MessagePreview">{lastMessage} </p></div>
            </div>
        </div>
    )
}
