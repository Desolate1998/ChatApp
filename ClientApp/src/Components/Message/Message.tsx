import React from 'react'
import './MessageStyle.css'

interface IProps{
    Sender:boolean;
    Message:string;
}

export const Message:React.FC<IProps> = ({Sender,Message}) => {
    return (
        <div className={Sender?'sent':'Recived'}>
            <h3 className="MessageUserName">{}</h3>
            <pre className="MassagePre">{Message}</pre>
        </div>
    )
}
